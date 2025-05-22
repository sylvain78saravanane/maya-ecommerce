// app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyJwtToken } from '@/lib/jwt'
import bcrypt from 'bcrypt'

// GET: Récupérer un utilisateur spécifique
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
    
    // Récupérer l'utilisateur avec ses commandes
    const user = await prisma.user.findUnique({
      where: { id },
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
            items: {
              select: {
                id: true,
                quantity: true,
                price: true,
                product: {
                  select: {
                    id: true,
                    name: true,
                    images: {
                      select: {
                        url: true
                      },
                      take: 1
                    }
                  }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // Calculer le total dépensé
    const totalSpent = user.orders.reduce((total: number, order: { total: number | string }) => {
      return total + Number(order.total)
    }, 0)
    
    // Reformater les données
    const formattedUser = {
      ...user,
      totalSpent,
      ordersCount: user.orders.length
    }
    
    return NextResponse.json(formattedUser)
  } catch (error) {
    console.error(`Error getting user ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT: Mettre à jour un utilisateur
export async function PUT(
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
    
    // Vérifier que l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })
    
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // Parse le corps de la requête
    const body = await request.json()
    const { name, email, password, isAdmin } = body
    
    // Si l'email change, vérifier qu'il n'est pas déjà utilisé
    if (email && email !== existingUser.email) {
      const duplicateUser = await prisma.user.findUnique({
        where: { email }
      })
      
      if (duplicateUser) {
        return NextResponse.json({ error: 'A user with this email already exists' }, { status: 400 })
      }
    }
    
    // Préparer les données de mise à jour
    const updateData: any = {}
    
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (isAdmin !== undefined) updateData.isAdmin = isAdmin
    
    // Hash le nouveau mot de passe si fourni
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }
    
    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error(`Error updating user ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE: Supprimer un utilisateur
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
    
    // Empêcher un admin de se supprimer lui-même
    if (verifiedToken.id === id) {
      return NextResponse.json({ 
        error: 'Cannot delete your own account',
        message: 'Vous ne pouvez pas supprimer votre propre compte.'
      }, { status: 400 })
    }
    
    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: { orders: true }
        }
      }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // Option 1: Empêcher la suppression si l'utilisateur a des commandes
    if (user._count.orders > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete user with orders',
        message: `Cet utilisateur a ${user._count.orders} commande(s). La suppression est impossible pour préserver l'historique des commandes.`
      }, { status: 400 })
    }
    
    // Option 2: Alternative - anonymiser l'utilisateur au lieu de le supprimer
    // const anonymizedEmail = `deleted_${Math.random().toString(36).substring(2, 15)}@deleted.com`
    // await prisma.user.update({
    //   where: { id },
    //   data: {
    //     name: 'Utilisateur supprimé',
    //     email: anonymizedEmail,
    //     password: await bcrypt.hash(Math.random().toString(36), 10),
    //   }
    // })
    
    // Supprimer l'utilisateur (seulement s'il n'a pas de commandes)
    await prisma.user.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting user ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}