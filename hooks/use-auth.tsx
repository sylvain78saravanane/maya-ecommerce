// hooks/use-auth.ts
"use client"

import { createContext, useContext, useState, useEffect } from "react"
import Cookies from 'js-cookie'

type User = {
  id: string
  name: string
  email: string
  isAdmin?: boolean
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  loginAdmin: (email: string, password: string, adminCode: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        setLoading(true)
        
        // Check for admin token first
        const adminToken = Cookies.get('admin-token')
        if (adminToken) {
          // Verify admin token on server
          const response = await fetch('/api/admin/verify', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
            return
          }
        }
        
        // If no valid admin token, check for regular user
        const userToken = Cookies.get('user-token')
        if (userToken) {
          // Verify user token on server
          const response = await fetch('/api/auth/verify', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
            return
          }
        }
        
        // No valid tokens found
        setUser(null)
      } catch (error) {
        console.error("Auth check failed:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Call the login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      if (!response.ok) {
        throw new Error('Login failed')
      }
      
      const data = await response.json()
      
      // Store token in cookie
      Cookies.set('user-token', data.token, { expires: 7 })
      
      // Set user state
      setUser(data.user)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Call the register API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })
      
      if (!response.ok) {
        throw new Error('Registration failed')
      }
      
      const data = await response.json()
      
      // Store token in cookie
      Cookies.set('user-token', data.token, { expires: 7 })
      
      // Set user state
      setUser(data.user)
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }
  
  const loginAdmin = async (email: string, password: string, adminCode: string) => {
    setLoading(true)
    try {
      // Call the admin login API
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, adminCode }),
      })
      
      if (!response.ok) {
        throw new Error('Admin login failed')
      }
      
      const data = await response.json()
      
      // Store token in cookie
      Cookies.set('admin-token', data.token, { expires: 1 }) // Admin tokens expire faster
      
      // Set user state
      setUser(data.user)
    } catch (error) {
      console.error("Admin login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    // Remove tokens
    Cookies.remove('user-token')
    Cookies.remove('admin-token')
    
    // Clear user state
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        loginAdmin,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}