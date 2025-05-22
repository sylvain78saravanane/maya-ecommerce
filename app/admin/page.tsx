// app/admin/page.tsx
"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  ShoppingBag, 
  Users, 
  Package, 
  TrendingUp 
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState("weekly")
  const [stats, setStats] = useState({
    revenue: { daily: 0, weekly: 0, monthly: 0, yearly: 0 },
    orders: { daily: 0, weekly: 0, monthly: 0, yearly: 0 },
    customers: { daily: 0, weekly: 0, monthly: 0, yearly: 0 }, 
    avgOrder: { daily: 0, weekly: 0, monthly: 0, yearly: 0 }
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // En production, ceci serait un appel API à votre backend
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Simuler des données pour la démo
        setStats({
          revenue: { 
            daily: 1250, 
            weekly: 8750, 
            monthly: 35000, 
            yearly: 420000 
          },
          orders: { 
            daily: 14, 
            weekly: 98, 
            monthly: 412, 
            yearly: 4856 
          },
          customers: { 
            daily: 5, 
            weekly: 32, 
            monthly: 145, 
            yearly: 1856 
          }, 
          avgOrder: { 
            daily: 89.28, 
            weekly: 89.28, 
            monthly: 84.95, 
            yearly: 86.49 
          }
        })
        
        setRecentOrders([
          { id: "ORD-001", customer: "Sophie Martin", date: "2023-05-15", total: 89.99, status: "Livrée" },
          { id: "ORD-002", customer: "Marie Dubois", date: "2023-05-14", total: 149.98, status: "En préparation" },
          { id: "ORD-003", customer: "Julie Lefebvre", date: "2023-05-14", total: 69.99, status: "Expédiée" },
          { id: "ORD-004", customer: "Camille Rousseau", date: "2023-05-13", total: 129.99, status: "En préparation" },
          { id: "ORD-005", customer: "Léa Bernard", date: "2023-05-12", total: 54.99, status: "Livrée" },
        ])
        
        setLowStockProducts([
          { id: "PROD-001", name: "Sac Bohème", stock: 3, threshold: 5 },
          { id: "PROD-003", name: "Panier Plage", stock: 2, threshold: 5 },
          { id: "PROD-006", name: "Pochette Soirée", stock: 4, threshold: 5 },
        ])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Aujourd&apos;hui</SelectItem>
            <SelectItem value="weekly">Cette semaine</SelectItem>
            <SelectItem value="monthly">Ce mois</SelectItem>
            <SelectItem value="yearly">Cette année</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d&apos;affaires</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.revenue[timeframe as keyof typeof stats.revenue].toLocaleString()} €
            </div>
            <p className="text-xs text-muted-foreground">+12.5% par rapport à la période précédente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.orders[timeframe as keyof typeof stats.orders].toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+8.2% par rapport à la période précédente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.customers[timeframe as keyof typeof stats.customers].toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+15.3% par rapport à la période précédente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.avgOrder[timeframe as keyof typeof stats.avgOrder].toFixed(2)} €
            </div>
            <p className="text-xs text-muted-foreground">+2.1% par rapport à la période précédente</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>Les 5 dernières commandes passées sur votre boutique</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.total.toFixed(2)} €</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock faible</CardTitle>
            <CardDescription>Produits dont le stock est inférieur au seuil d&apos;alerte</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Seuil</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-red-500 font-medium">{product.stock}</TableCell>
                    <TableCell>{product.threshold}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}