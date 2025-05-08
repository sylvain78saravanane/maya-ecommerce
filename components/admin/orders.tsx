"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Search, Eye } from "lucide-react"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    customer: "Sophie Martin",
    email: "sophie.martin@example.com",
    date: "2023-05-15",
    total: 89.99,
    status: "delivered",
    items: [{ id: "1", name: "Sac Bohème", price: 89.99, quantity: 1 }],
    address: {
      street: "123 Rue de Paris",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
  },
  {
    id: "ORD-002",
    customer: "Marie Dubois",
    email: "marie.dubois@example.com",
    date: "2023-05-14",
    total: 149.98,
    status: "processing",
    items: [
      { id: "2", name: "Pochette Été", price: 49.99, quantity: 1 },
      { id: "4", name: "Mini Sac Crochet", price: 59.99, quantity: 1 },
      { id: "6", name: "Pochette Soirée", price: 39.99, quantity: 1 },
    ],
    address: {
      street: "456 Avenue des Champs-Élysées",
      city: "Paris",
      postalCode: "75008",
      country: "France",
    },
  },
  {
    id: "ORD-003",
    customer: "Julie Lefebvre",
    email: "julie.lefebvre@example.com",
    date: "2023-05-14",
    total: 69.99,
    status: "shipped",
    items: [{ id: "3", name: "Panier Plage", price: 69.99, quantity: 1 }],
    address: {
      street: "789 Boulevard Saint-Michel",
      city: "Paris",
      postalCode: "75005",
      country: "France",
    },
  },
  {
    id: "ORD-004",
    customer: "Camille Rousseau",
    email: "camille.rousseau@example.com",
    date: "2023-05-13",
    total: 129.99,
    status: "processing",
    items: [
      { id: "5", name: "Grand Cabas", price: 99.99, quantity: 1 },
      { id: "2", name: "Pochette Été", price: 29.99, quantity: 1 },
    ],
    address: {
      street: "101 Rue de Rivoli",
      city: "Paris",
      postalCode: "75001",
      country: "France",
    },
  },
  {
    id: "ORD-005",
    customer: "Léa Bernard",
    email: "lea.bernard@example.com",
    date: "2023-05-12",
    total: 54.99,
    status: "delivered",
    items: [{ id: "6", name: "Pochette Soirée", price: 54.99, quantity: 1 }],
    address: {
      street: "202 Avenue Montaigne",
      city: "Paris",
      postalCode: "75008",
      country: "France",
    },
  },
]

export default function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const { toast } = useToast()

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))

    setOrders(updatedOrders)

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }

    toast({
      title: "Statut mis à jour",
      description: `La commande ${orderId} est maintenant "${getStatusLabel(newStatus)}".`,
    })
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "processing":
        return "En préparation"
      case "shipped":
        return "Expédiée"
      case "delivered":
        return "Livrée"
      default:
        return status
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            En préparation
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Expédiée
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Livrée
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order)
    setIsOrderDetailsOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="w-full sm:w-auto flex-1 relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une commande..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="processing">En préparation</SelectItem>
            <SelectItem value="shipped">Expédiée</SelectItem>
            <SelectItem value="delivered">Livrée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commande</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p>{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                  </div>
                </TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell>{order.total.toFixed(2)} €</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => viewOrderDetails(order)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Détails de la commande {selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  Commande passée le {new Date(selectedOrder.date).toLocaleDateString("fr-FR")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Statut</h3>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => handleStatusChange(selectedOrder.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Changer le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">En préparation</SelectItem>
                      <SelectItem value="shipped">Expédiée</SelectItem>
                      <SelectItem value="delivered">Livrée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Client</h3>
                  <p>{selectedOrder.customer}</p>
                  <p className="text-muted-foreground">{selectedOrder.email}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Adresse de livraison</h3>
                  <p>{selectedOrder.address.street}</p>
                  <p>
                    {selectedOrder.address.postalCode} {selectedOrder.address.city}
                  </p>
                  <p>{selectedOrder.address.country}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Produits</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.quantity} x {item.name}
                        </span>
                        <span>{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 font-medium flex justify-between">
                      <span>Total</span>
                      <span>{selectedOrder.total.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
