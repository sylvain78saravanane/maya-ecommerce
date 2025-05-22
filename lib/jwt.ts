// lib/jwt.ts
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

type JwtPayload = {
  id: string
  email: string
  name: string
  isAdmin: boolean
  iat: number
  exp: number
}

export function signJwtToken(payload: object, options?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, options)
}

export async function verifyJwtToken(token: string): Promise<JwtPayload | null> {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload
    return payload
  } catch (error) {
    console.error('JWT verification error:', error)
    return null
  }
}