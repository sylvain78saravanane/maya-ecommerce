// app/admin/layout.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  
  const activeMenuItem = pathname?.split('/').slice(2)[0] || "dashboard"

  // Protect admin routes
  useEffect(() => {
    // In a real app, check if user has admin role
    if (!loading && !user) {
      router.push("/connexionAdmin")
    }
  }, [user, loading, router])

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen bg-muted/20">
        <div className="w-64 border-r bg-background p-4">
          <Skeleton className="h-8 w-24 mb-8" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-8">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-[600px] w-full rounded-md" />
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!user) {
    return null
  }

  const menuItems = [
    { label: "Tableau de bord", icon: LayoutDashboard, href: "/admin", id: "dashboard" },
    { label: "Produits", icon: Package, href: "/admin/produits", id: "produits" },
    { label: "Catégories", icon: Package, href: "/admin/categories", id: "categories" },
    { label: "Commandes", icon: ShoppingBag, href: "/admin/commandes", id: "commandes" },
    { label: "Utilisateurs", icon: Users, href: "/admin/utilisateurs", id: "utilisateurs" },
    { label: "Administrateurs", icon: Users, href: "/admin/administrateurs", id: "administrateurs" },
    { label: "Paramètres", icon: Settings, href: "/admin/parametres", id: "parametres" },
  ]

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <div className="w-64 border-r bg-background">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link href="/admin" className="text-xl font-bold">
              MAYA Admin
            </Link>
          </div>
          
          <div className="flex-1 px-4 py-2">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant={activeMenuItem === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start ${activeMenuItem === item.id ? "bg-accent text-accent-foreground" : ""}`}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-red-500" onClick={() => router.push('/')}>
              <LogOut className="mr-2 h-5 w-5" />
              Retour au site
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-8">
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}