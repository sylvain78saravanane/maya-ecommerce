// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyJwtToken } from '@/lib/jwt'
import bcrypt from 'bcrypt'

// GET: Récupérer tous les utilisateurs
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
    const isAdmin = searchParams.get('isAdmin')
    const limit = searchParams.get('limit')
    
    // Construire la requête
    const whereClause: any = {}
    
    if (isAdmin === 'true') {
      whereClause.isAdmin = true
    } else if (isAdmin === 'false') {
      whereClause.isAdmin = false
    }
    
    // Récupérer les utilisateurs avec le total de leurs commandes
    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        orders: {
          select: {
            id: true,
            total: true,
            status: true,
            createdAt: true,
          }
        },
        _count: {
          select: { orders: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      ...(limit ? { take: parseInt(limit) } : {}),
    })
    
    // Reformater les données pour inclure le total dépensé
    type UserWithOrders = {
      id: string
      name: string
      email: string
      isAdmin: boolean
      createdAt: Date
      updatedAt: Date
      orders: {
        id: string
        total: number | string
        status: string
        createdAt: Date
      }[]
      _count: {
        orders: number
      }
    }

    const formattedUsers = users.map((user: UserWithOrders) => {
      // Calculer le total dépensé par l'utilisateur
      const totalSpent = user.orders.reduce((total, order) => {
        return total + Number(order.total)
      }, 0)
      
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        ordersCount: user._count.orders,
        totalSpent,
        // On limite les commandes aux 5 plus récentes pour la réponse
        orders: user.orders
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
      }
    })
    
    return NextResponse.json(formattedUsers)
  } catch (error) {
    console.error('Error getting users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: Créer un nouvel utilisateur
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
    const { name, email, password, isAdmin } = body
    
    // Validation de base
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
    }
    
    // Vérifier si un utilisateur avec cet email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 400 })
    }
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}