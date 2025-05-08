"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag, Users, CreditCard, TrendingUp, Package } from "lucide-react"

// Mock data for dashboard
const salesData = {
  daily: 1250,
  weekly: 8750,
  monthly: 35000,
  yearToDate: 420000,
}

const recentOrders = [
  { id: "ORD-001", customer: "Sophie Martin", date: "2023-05-15", total: 89.99, status: "Livrée" },
  { id: "ORD-002", customer: "Marie Dubois", date: "2023-05-14", total: 149.98, status: "En préparation" },
  { id: "ORD-003", customer: "Julie Lefebvre", date: "2023-05-14", total: 69.99, status: "Expédiée" },
  { id: "ORD-004", customer: "Camille Rousseau", date: "2023-05-13", total: 129.99, status: "En préparation" },
  { id: "ORD-005", customer: "Léa Bernard", date: "2023-05-12", total: 54.99, status: "Livrée" },
]

const lowStockItems = [
  { id: "PROD-001", name: "Sac Bohème", stock: 3, threshold: 5 },
  { id: "PROD-003", name: "Panier Plage", stock: 2, threshold: 5 },
  { id: "PROD-006", name: "Pochette Soirée", stock: 4, threshold: 5 },
]

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState("weekly")

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d&apos;affaires</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeframe === "daily" && `${salesData.daily.toLocaleString()} €`}
              {timeframe === "weekly" && `${salesData.weekly.toLocaleString()} €`}
              {timeframe === "monthly" && `${salesData.monthly.toLocaleString()} €`}
              {timeframe === "yearToDate" && `${salesData.yearToDate.toLocaleString()} €`}
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
              {timeframe === "daily" && "14"}
              {timeframe === "weekly" && "98"}
              {timeframe === "monthly" && "412"}
              {timeframe === "yearToDate" && "4,856"}
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
              {timeframe === "daily" && "5"}
              {timeframe === "weekly" && "32"}
              {timeframe === "monthly" && "145"}
              {timeframe === "yearToDate" && "1,856"}
            </div>
            <p className="text-xs text-muted-foreground">+15.3% par rapport à la période précédente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeframe === "daily" && "89.28 €"}
              {timeframe === "weekly" && "89.28 €"}
              {timeframe === "monthly" && "84.95 €"}
              {timeframe === "yearToDate" && "86.49 €"}
            </div>
            <p className="text-xs text-muted-foreground">+2.1% par rapport à la période précédente</p>
          </CardContent>
        </Card>
      </div>

      {/* Time Period Selector */}
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Aujourd&apos;hui</SelectItem>
            <SelectItem value="weekly">Cette semaine</SelectItem>
            <SelectItem value="monthly">Ce mois</SelectItem>
            <SelectItem value="yearToDate">Cette année</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Recent Orders and Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>Les 5 dernières commandes passées sur votre boutique</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total.toFixed(2)} €</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock faible</CardTitle>
            <CardDescription>Produits dont le stock est inférieur au seuil d&apos;alerte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.id}</p>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2 text-destructive" />
                    <p className="font-medium text-destructive">{item.stock} en stock</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
