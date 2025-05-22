// app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Vérifier les variables d'environnement
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET not set. Admin authentication will not work properly')
}

// Code d'administration pour la sécurité supplémentaire
const ADMIN_CODE = process.env.ADMIN_CODE || 'MAYA-ADMIN-2024'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { email, password, adminCode } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Vérifier le code admin
    if (adminCode !== ADMIN_CODE) {
      return NextResponse.json({ error: 'Invalid admin code' }, { status: 401 })
    }

    // Rechercher l'utilisateur dans la base de données
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Vérifier si l'utilisateur existe et est un administrateur
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Vérifier le mot de passe
    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Créer un token JWT
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '8h' }
    )

    // Mettre à jour le dernier login
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        updatedAt: new Date() 
      }
    })

    // Retourner le token et les infos utilisateur (sans mot de passe)
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      },
      token
    })

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}