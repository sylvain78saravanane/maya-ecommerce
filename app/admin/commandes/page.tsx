// app/admin/commandes/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Search, Eye, FileDown, Calendar } from "lucide-react"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        
        // Demo data - replace with API calls in production
        setOrders([
          {
            id: "ORD-001",
            customer: "Sophie Martin",
            email: "sophie.martin@example.com",
            date: "2023-05-15",
            total: 89.99,
            status: "delivered",
            items: [
              { id: "1", name: "Sac Bohème", price: 89.99, quantity: 1 }
            ],
            address: {
              street: "123 Rue de Paris",
              city: "Paris",
              postalCode: "75001",
              country: "France",
            },
            phone: "+33612345678",
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
            phone: "+33623456789",
          },
          {
            id: "ORD-003",
            customer: "Julie Lefebvre",
            email: "julie.lefebvre@example.com",
            date: "2023-05-14",
            total: 69.99,
            status: "shipped",
            items: [
              { id: "3", name: "Panier Plage", price: 69.99, quantity: 1 }
            ],
            address: {
              street: "789 Boulevard Saint-Michel",
              city: "Paris",
              postalCode: "75005",
              country: "France",
            },
            phone: "+33634567890",
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
            phone: "+33645678901",
          },
          {
            id: "ORD-005",
            customer: "Léa Bernard",
            email: "lea.bernard@example.com",
            date: "2023-05-12",
            total: 54.99,
            status: "delivered",
            items: [
              { id: "6", name: "Pochette Soirée", price: 54.99, quantity: 1 }
            ],
            address: {
              street: "202 Avenue Montaigne",
              city: "Paris",
              postalCode: "75008",
              country: "France",
            },
            phone: "+33656789012",
          },
        ])
      } catch (error) {
        console.error("Error fetching orders:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les commandes",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchOrders()
  }, [toast])

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter(order => {
    // Check if order matches search query
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if order matches status filter
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    try {
      // Production: API call to update order status
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      
      setOrders(updatedOrders);
      
      // If we're looking at the order details, update the current order too
      if (currentOrder && currentOrder.id === orderId) {
        setCurrentOrder({ ...currentOrder, status: newStatus });
      }
      
      toast({
        title: "Statut mis à jour",
        description: `La commande ${orderId} est maintenant "${getStatusLabel(newStatus)}".`,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de la commande",
        variant: "destructive",
      });
    }
  };

  const viewOrderDetails = (order: any) => {
    setCurrentOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En préparation</Badge>;
      case 'shipped':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Expédiée</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Livrée</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Annulée</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'processing':
        return 'En préparation';
      case 'shipped':
        return 'Expédiée';
      case 'delivered':
        return 'Livrée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const exportOrdersToCSV = () => {
    try {
      // For demo purposes only - in production, API call or implement proper CSV export
      toast({
        title: "Export réussi",
        description: "Les commandes ont été exportées au format CSV.",
      });
    } catch (error) {
      console.error("Error exporting orders:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'exporter les commandes",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des commandes</h1>
        
        <Button variant="outline" onClick={exportOrdersToCSV}>
          <FileDown className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
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
            <SelectItem value="cancelled">Annulée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <p>Chargement des commandes...</p>
        </div>
      ) : (
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
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Aucune commande trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p>{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {new Date(order.date).toLocaleDateString('fr-FR')}
                      </div>
                    </TableCell>
                    <TableCell>{order.total.toFixed(2)} €</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => viewOrderDetails(order)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {currentOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Détails de la commande {currentOrder.id}</DialogTitle>
                <DialogDescription>
                  Commande passée le {new Date(currentOrder.date).toLocaleDateString('fr-FR')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Statut</h3>
                  <Select
                    value={currentOrder.status}
                    onValueChange={(value) => handleStatusChange(currentOrder.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Changer le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">En préparation</SelectItem>
                      <SelectItem value="shipped">Expédiée</SelectItem>
                      <SelectItem value="delivered">Livrée</SelectItem>
                      <SelectItem value="cancelled">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Client</h3>
                  <p>{currentOrder.customer}</p>
                  <p className="text-muted-foreground">{currentOrder.email}</p>
                  {currentOrder.phone && <p className="text-muted-foreground">{currentOrder.phone}</p>}
                </div>

                <div>
                  <h3 className="font-medium mb-2">Adresse de livraison</h3>
                  <p>{currentOrder.address.street}</p>
                  <p>
                    {currentOrder.address.postalCode} {currentOrder.address.city}
                  </p>
                  <p>{currentOrder.address.country}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Produits</h3>
                  <div className="space-y-2">
                    {currentOrder.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.quantity} x {item.name}
                        </span>
                        <span>{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 font-medium flex justify-between">
                      <span>Total</span>
                      <span>{currentOrder.total.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOrderDetailsOpen(false)}>
                  Fermer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}