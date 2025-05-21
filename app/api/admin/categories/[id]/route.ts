// app/api/admin/categories/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyJwtToken } from '@/lib/jwt'

// GET: Récupérer une catégorie spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    // Récupérer la catégorie avec le nombre de produits
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    
    // Reformater les données
    const formattedCategory = {
      id: category.id,
      name: category.name,
      description: category.description,
      productsCount: category._count.products,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    }
    
    return NextResponse.json(formattedCategory)
  } catch (error) {
    console.error(`Error getting category ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT: Mettre à jour une catégorie
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
    
    // Vérifier que la catégorie existe
    const existingCategory = await prisma.category.findUnique({
      where: { id }
    })
    
    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    
    // Parse le corps de la requête
    const body = await request.json()
    const { name, description } = body
    
    // Validation de base
    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
    }
    
    // Vérifier si une autre catégorie avec ce nom existe déjà
    if (name !== existingCategory.name) {
      const duplicateCategory = await prisma.category.findFirst({
        where: { 
          name: { equals: name, mode: 'insensitive' },
          id: { not: id }
        }
      })
      
      if (duplicateCategory) {
        return NextResponse.json({ error: 'A category with this name already exists' }, { status: 400 })
      }
    }
    
    // Mettre à jour la catégorie
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        description
      }
    })
    
    // Récupérer le nombre de produits associés
    const productCount = await prisma.product.count({
      where: { categoryId: id }
    })
    
    // Reformater la réponse
    const formattedCategory = {
      ...updatedCategory,
      productsCount: productCount
    }
    
    return NextResponse.json(formattedCategory)
  } catch (error) {
    console.error(`Error updating category ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE: Supprimer une catégorie
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
    
    // Vérifier que la catégorie existe
    const category = await prisma.category.findUnique({
      where: { id }
    })
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    
    // Vérifier s'il y a des produits associés à cette catégorie
    const productsCount = await prisma.product.count({
      where: { categoryId: id }
    })
    
    if (productsCount > 0) {
      return NextResponse.json({
        error: 'Cannot delete category with products',
        message: `Cette catégorie contient ${productsCount} produit(s). Veuillez d'abord déplacer ou supprimer ces produits.`
      }, { status: 400 })
    }
    
    // Supprimer la catégorie
    await prisma.category.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting category ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}