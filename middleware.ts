// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyJwtToken } from '@/lib/jwt'

export async function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isAdminApiRoute = request.nextUrl.pathname.startsWith('/api/admin')
  
  // If it's not an admin route, continue
  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next()
  }
  
  // Skip auth check for admin login page
  if (request.nextUrl.pathname === '/connexionAdmin') {
    return NextResponse.next()
  }

  // Get the token from cookies
  const token = request.cookies.get('admin-token')?.value
  
  // If there's no token, redirect to login
  if (!token) {
    if (isAdminApiRoute) {
      // For API routes, return a 401 response
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // For page routes, redirect to login
    return NextResponse.redirect(new URL('/connexionAdmin', request.url))
  }
  
  try {
    // Verify the token
    const verifiedToken = await verifyJwtToken(token)
    
    // If the token is invalid or the user is not an admin, redirect to login
    if (!verifiedToken || !verifiedToken.isAdmin) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/connexionAdmin', request.url))
    }
    
    // Continue to the route
    return NextResponse.next()
  } catch (error) {
    // If token verification fails, redirect to login
    if (isAdminApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/connexionAdmin', request.url))
  }
}

// Configure which routes to apply the middleware to
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}