"use client"

import { useContext } from "react"
import { createContext } from "react"

// This is just a re-export of the auth context
// The actual implementation is in components/auth-provider.tsx
export function useAuth() {
  // This will be properly defined when the AuthProvider is used
  // We're just creating a placeholder here for type checking
  const AuthContext = createContext<any>(undefined)
  const context = useContext(AuthContext)

  // In a real implementation, we would check if the context exists
  // But since this is just a re-export, we'll return an empty object
  return (
    context || {
      user: null,
      login: async () => {},
      register: async () => {},
      logout: () => {},
      loading: false,
    }
  )
}
