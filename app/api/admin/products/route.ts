// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyJwtToken } from '@/lib/jwt'

// GET: Récupérer tous les produits
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
    const categoryId = searchParams.get('categoryId')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    
    // Construire la requête
    const whereClause: any = {}
    
    if (categoryId) {
      whereClause.categoryId = categoryId
    }
    
    if (featured === 'true') {
      whereClause.featured = true
    }
    
    // Récupérer les produits
    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
        images: true,
      },
      orderBy: { createdAt: 'desc' },
      ...(limit ? { take: parseInt(limit) } : {}),
    })
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error getting products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: Créer un nouveau produit
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
    const { name, description, price, categoryId, stock, featured, images } = body
    
    // Validation de base
    if (!name || !categoryId || price === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Vérifier que la catégorie existe
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    })
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    
    // Créer le produit avec une transaction
    const product = await prisma.$transaction(async (tx:any) => {
      // Créer le produit
      const newProduct = await tx.product.create({
        data: {
          name,
          description,
          price: typeof price === 'string' ? parseFloat(price) : price,
          categoryId,
          stock: stock || 0,
          featured: featured || false,
        },
      })
      
      // Ajouter les images si présentes
      if (images && Array.isArray(images) && images.length > 0) {
        await tx.image.createMany({
          data: images.map(url => ({
            url,
            productId: newProduct.id,
          })),
        })
      }
      
      // Retourner le produit avec ses images
      return tx.product.findUnique({
        where: { id: newProduct.id },
        include: {
          category: true,
          images: true,
        },
      })
    })
    
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}