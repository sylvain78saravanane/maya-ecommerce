// app/api/admin/orders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyJwtToken } from '@/lib/jwt'

// GET: Récupérer toutes les commandes
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification admin
    const token = request.cookies.get('admin-token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const verifiedToken = await verifyJwtToken(token)
    if (!verifiedToken || !verifiedToken.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Récupérer les paramètres de requête
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    const sort = searchParams.get('sort') || 'desc'
    const search = searchParams.get('search')
    
    // Construire la requête
    const whereClause: any = {}
    
    if (status && status !== 'all') {
      whereClause.status = status
    }
    
    if (search) {
      whereClause.OR = [
        { id: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
      ]
    }
    
    // Récupérer les commandes avec les informations utilisateur
    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: {
                  select: { url: true },
                  take: 1,
                }
              }
            }
          }
        }
      },
      orderBy: { createdAt: sort === 'asc' ? 'asc' : 'desc' },
      ...(limit ? { take: parseInt(limit) } : {}),
    })
    
    // Reformater les données pour une meilleure lisibilité
    const formattedOrders = orders.map((order: {
      id: string
      createdAt: Date
      status: string
      total: number
      user: { id: string; name: string; email: string }
      address: string
      phone: string
      items: Array<{
        id: string
        productId: string
        product: { name: string; images: Array<{ url: string }> }
        quantity: number
        price: number
      }>
    }) => ({
      id: order.id,
      date: order.createdAt,
      status: order.status,
      total: order.total,
      customer: order.user.name,
      email: order.user.email,
      userId: order.user.id,
      address: order.address,
      phone: order.phone,
      items: order.items.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        image: item.product.images.length > 0 ? item.product.images[0].url : null,
        quantity: item.quantity,
        price: item.price,
      })),
    }))
    
    return NextResponse.json(formattedOrders)
  } catch (error) {
    console.error('Error getting orders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: Créer une nouvelle commande (pour les tests ou les commandes manuelles)
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification admin
    const token = request.cookies.get('admin-token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const verifiedToken = await verifyJwtToken(token)
    if (!verifiedToken || !verifiedToken.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Parse le corps de la requête
    const body = await request.json()
    const { userId, items, address, phone, status } = body
    
    // Validation de base
    if (!userId || !items || !Array.isArray(items) || items.length === 0 || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // Vérifier que les produits existent et calculer le total
    let total = 0
    const itemsToCreate = []
    
    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return NextResponse.json({ error: 'Invalid item data' }, { status: 400 })
      }
      
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      })
      
      if (!product) {
        return NextResponse.json({ error: `Product with ID ${item.productId} not found` }, { status: 404 })
      }
      
      const itemTotal = Number(product.price) * item.quantity
      total += itemTotal
      
      itemsToCreate.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      })
    }
    
    // Créer la commande avec les items
    const order = await prisma.order.create({
      data: {
        userId,
        status: status || 'PENDING',
        total,
        address,
        phone,
        items: {
          create: itemsToCreate
        }
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
    
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Endpoint pour les statistiques du tableau de bord
export async function PATCH(request: NextRequest) {
  try {
    // Vérifier l'authentification admin
    const token = request.cookies.get('admin-token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const verifiedToken = await verifyJwtToken(token)
    if (!verifiedToken || !verifiedToken.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Parse le corps de la requête
    const body = await request.json()
    const { timeframe } = body
    
    // Définir les périodes en fonction du timeframe
    const now = new Date()
    let startDate = new Date(now)
    
    switch (timeframe) {
      case 'daily':
        startDate.setHours(0, 0, 0, 0) // Début de la journée
        break
      case 'weekly':
        startDate.setDate(now.getDate() - 7)
        break
      case 'monthly':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'yearly':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setMonth(now.getMonth() - 1) // Par défaut mensuel
    }
    
    // Récupérer les statistiques des commandes
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate
        }
      },
      include: {
        items: true
      }
    })
    
    // Calculer les statistiques
    const totalRevenue = orders.reduce((total: number, order: { total: number }) => total + Number(order.total), 0)
    const orderCount = orders.length
    
    // Récupérer le nombre de nouveaux clients
    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })
    
    // Calculer le panier moyen
    const averageOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0
    
    // Récupérer les produits à faible stock
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock: {
          lte: 5 // Seuil de stock bas
        }
      },
      select: {
        id: true,
        name: true,
        stock: true,
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        stock: 'asc'
      },
      take: 5
    })
    
    // Récupérer les commandes récentes
    const recentOrders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    })
    
    const stats = {
      revenue: totalRevenue,
      orders: orderCount,
      customers: newUsers,
      avgOrder: averageOrderValue,
      lowStockProducts: lowStockProducts.map((product: {
        id: string
        name: string
        stock: number
        category: { name: string }
      }) => ({
        id: product.id,
        name: product.name,
        stock: product.stock,
        category: product.category.name,
        threshold: 5
      })),
      recentOrders: recentOrders.map((order: {
        id: string
        user: { name: string; email: string }
        createdAt: Date
        total: number
        status: string
      }) => ({
        id: order.id,
        customer: order.user.name,
        email: order.user.email,
        date: order.createdAt,
        total: order.total,
        status: order.status
      }))
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error getting dashboard stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}