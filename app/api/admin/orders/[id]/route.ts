// app/api/admin/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyJwtToken } from '@/lib/jwt'

// GET: Récupérer une commande spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const id = params.id
    
    // Récupérer la commande avec les informations détaillées
    const order = await prisma.order.findUnique({
      where: { id },
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
      }
    })
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    // Reformater la commande pour une meilleure lisibilité
    const formattedOrder = {
      id: order.id,
      date: order.createdAt,
      status: order.status,
      total: order.total,
      customer: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },
      address: order.address,
      phone: order.phone,
      items: order.items.map((item: typeof order.items[number]) => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        image: item.product.images.length > 0 ? item.product.images[0].url : null,
        quantity: item.quantity,
        price: item.price,
        total: Number(item.price) * item.quantity,
      })),
    }
    
    return NextResponse.json(formattedOrder)
  } catch (error) {
    console.error(`Error getting order ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH: Mettre à jour le statut d'une commande
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const id = params.id
    
    // Vérifier que la commande existe
    const order = await prisma.order.findUnique({
      where: { id }
    })
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    // Parse le corps de la requête
    const body = await request.json()
    const { status } = body
    
    // Validation du statut
    if (!status || !['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
    }
    
    // Mettre à jour le statut de la commande
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })
    
    return NextResponse.json({
      id: updatedOrder.id,
      status: updatedOrder.status,
      customer: updatedOrder.user.name,
      email: updatedOrder.user.email
    })
  } catch (error) {
    console.error(`Error updating order ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE: Annuler une commande
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const id = params.id
    
    // Vérifier que la commande existe
    const order = await prisma.order.findUnique({
      where: { id }
    })
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    // Option 1: Supprimer complètement la commande (déconseillé en production)
    // await prisma.order.delete({
    //   where: { id }
    // })
    
    // Option 2: Marquer la commande comme annulée (recommandé)
    await prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' }
    })
    
    // Option 3: Pour les commandes PENDING ou PROCESSING, on pourrait restaurer le stock
    if (order.status === 'PENDING' || order.status === 'PROCESSING') {
      // Récupérer les items de la commande
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId: id }
      })
      
      // Mettre à jour le stock pour chaque produit
      for (const item of orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { 
            stock: {
              increment: item.quantity
            }
          }
        })
      }
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'La commande a été annulée avec succès.'
    })
  } catch (error) {
    console.error(`Error cancelling order ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}