"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import AdminDashboard from "@/components/admin/dashboard"
import AdminProducts from "@/components/admin/products"
import AdminOrders from "@/components/admin/orders"
import AdminCustomers from "@/components/admin/customers"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is an admin
    // This is a mock implementation
    if (user) {
      // In a real app, you would check if the user has admin privileges
      setIsAdmin(true)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6">Accès restreint</h1>
          <p className="mb-8 text-muted-foreground">
            Vous devez être connecté en tant qu&apos;administrateur pour accéder à cette page.
          </p>
          <Button onClick={() => router.push("/connexion")}>Se connecter</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Administration</h1>

        <Tabs defaultValue="dashboard">
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="customers">Clients</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>

          <TabsContent value="customers">
            <AdminCustomers />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
