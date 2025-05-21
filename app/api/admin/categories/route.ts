// app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyJwtToken } from '@/lib/jwt'

// GET: Récupérer toutes les catégories
export async function GET(request: NextRequest) {
  try {
    // Récupérer les catégories avec le compte de produits
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    })
    
    // Reformater les données pour inclure le comptage des produits
    const formattedCategories = categories.map((category: typeof categories[number]) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      productsCount: category._count.products,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    }))
    
    return NextResponse.json(formattedCategories)
  } catch (error) {
    console.error('Error getting categories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: Créer une nouvelle catégorie
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
    const { name, description } = body
    
    // Validation de base
    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
    }
    
    // Vérifier si une catégorie avec ce nom existe déjà
    const existingCategory = await prisma.category.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } }
    })
    
    if (existingCategory) {
      return NextResponse.json({ error: 'A category with this name already exists' }, { status: 400 })
    }
    
    // Créer la catégorie
    const category = await prisma.category.create({
      data: {
        name,
        description
      }
    })
    
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}