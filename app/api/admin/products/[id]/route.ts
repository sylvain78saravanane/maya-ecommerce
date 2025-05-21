// app/api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyJwtToken } from '@/lib/jwt'

// GET: Récupérer un produit spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    // Récupérer le produit
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
      },
    })
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    return NextResponse.json(product)
  } catch (error) {
    console.error(`Error getting product ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT: Mettre à jour un produit
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
    
    // Vérifier que le produit existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    })
    
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    // Parse le corps de la requête
    const body = await request.json()
    const { name, description, price, categoryId, stock, featured, images } = body
    
    // Valider les champs requis
    if (name === undefined && price === undefined && categoryId === undefined) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }
    
    // Si categoryId est présent, vérifier que la catégorie existe
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      })
      
      if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 })
      }
    }
    
    // Mettre à jour le produit avec une transaction
    const updatedProduct = await prisma.$transaction(async (tx:any) => {
      // Mettre à jour le produit
      const product = await tx.product.update({
        where: { id },
        data: {
          ...(name !== undefined && { name }),
          ...(description !== undefined && { description }),
          ...(price !== undefined && { price: typeof price === 'string' ? parseFloat(price) : price }),
          ...(categoryId !== undefined && { categoryId }),
          ...(stock !== undefined && { stock: typeof stock === 'string' ? parseInt(stock) : stock }),
          ...(featured !== undefined && { featured }),
        },
      })
      
      // Gérer les images si présentes
      if (images && Array.isArray(images)) {
        // Supprimer les images existantes
        await tx.image.deleteMany({
          where: { productId: id },
        })
        
        // Ajouter les nouvelles images
        if (images.length > 0) {
          await tx.image.createMany({
            data: images.map(url => ({
              url,
              productId: id,
            })),
          })
        }
      }
      
      // Retourner le produit mis à jour
      return tx.product.findUnique({
        where: { id },
        include: {
          category: true,
          images: true,
        },
      })
    })
    
    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error(`Error updating product ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE: Supprimer un produit
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
    
    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id },
    })
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    // Vérifier si le produit est associé à des commandes
    const orderItems = await prisma.orderItem.findMany({
      where: { productId: id },
      take: 1, // On ne veut que vérifier s'il y en a au moins un
    })
    
    if (orderItems.length > 0) {
      // Option 1: Empêcher la suppression si le produit a des commandes
      // return NextResponse.json({ 
      //   error: 'Cannot delete product with existing orders',
      //   message: 'Ce produit est associé à des commandes existantes. Considérez plutôt de le marquer comme indisponible.'
      // }, { status: 400 })
      
      // Option 2: Supprimer le produit mais conserver les références dans les commandes
      // On ne fait rien de spécial ici, car les références seront conservées
    }
    
    // Suppression en cascade (les images seront automatiquement supprimées grâce à onDelete: Cascade)
    await prisma.product.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting product ${params.id}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}