// app/admin/utilisateurs/page.tsx
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
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, MoreHorizontal, Pencil, Trash2, Search, ShoppingBag, Eye } from "lucide-react"

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isOrdersOpen, setIsOrdersOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        
        // Demo data - replace with API calls in production
        setUsers([
          {
            id: "user1",
            name: "Sophie Martin",
            email: "sophie.martin@example.com",
            createdAt: "2023-01-15",
            ordersCount: 5,
            totalSpent: 459.95,
            orders: [
              { id: "ORD-001", date: "2023-05-15", total: 89.99, status: "delivered" },
              { id: "ORD-008", date: "2023-04-22", total: 129.99, status: "delivered" },
            ],
          },
          {
            id: "user2",
            name: "Marie Dubois",
            email: "marie.dubois@example.com",
            createdAt: "2023-02-20",
            ordersCount: 3,
            totalSpent: 249.97,
            orders: [
              { id: "ORD-002", date: "2023-05-14", total: 149.98, status: "processing" },
              { id: "ORD-012", date: "2023-04-05", total: 49.99, status: "delivered" },
            ],
          },
          {
            id: "user3",
            name: "Julie Lefebvre",
            email: "julie.lefebvre@example.com",
            createdAt: "2023-03-05",
            ordersCount: 2,
            totalSpent: 139.98,
            orders: [
              { id: "ORD-003", date: "2023-05-14", total: 69.99, status: "shipped" },
              { id: "ORD-018", date: "2023-04-10", total: 69.99, status: "delivered" },
            ],
          },
        ])
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les utilisateurs",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchUsers()
  }, [toast])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddUser = async () => {
    try {
      // Validate form
      if (!newUser.name || !newUser.email || !newUser.password) {
        toast({
          title: "Erreur de validation",
          description: "Tous les champs sont obligatoires",
          variant: "destructive",
        })
        return
      }
      
      if (users.some(user => user.email === newUser.email)) {
        toast({
          title: "Erreur de validation",
          description: "Un utilisateur avec cet email existe déjà",
          variant: "destructive",
        })
        return
      }
      
      // Production: API call to add user
      const userToAdd = {
        id: `user-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        createdAt: new Date().toISOString().split('T')[0],
        ordersCount: 0,
        totalSpent: 0,
        orders: [],
      }
      
      setUsers([...users, userToAdd])
      setIsAddUserOpen(false)
      setNewUser({
        name: "",
        email: "",
        password: "",
      })
      
      toast({
        title: "Utilisateur ajouté",
        description: `L'utilisateur ${userToAdd.name} a été ajouté avec succès`,
      })
      
    } catch (error) {
      console.error("Error adding user:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'utilisateur",
        variant: "destructive",
      })
    }
  }

  const handleEditUser = async () => {
    try {
      if (!currentUser) return
      
      // Production: API call to update user
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? currentUser : user
      )
      
      setUsers(updatedUsers)
      setIsEditUserOpen(false)
      
      toast({
        title: "Utilisateur mis à jour",
        description: `L'utilisateur ${currentUser.name} a été mis à jour avec succès`,
      })
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'utilisateur",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      // Production: API call to delete user
      setUsers(users.filter(user => user.id !== id))
      
      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès",
      })
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un utilisateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un utilisateur</DialogTitle>
                <DialogDescription>Créez un nouveau compte utilisateur</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddUser}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <p>Chargement des utilisateurs...</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead>Total dépensé</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center gap-1 text-muted-foreground"
                        onClick={() => {
                          setCurrentUser(user)
                          setIsOrdersOpen(true)
                        }}
                      >
                        <ShoppingBag className="h-4 w-4" />
                        {user.ordersCount}
                      </Button>
                    </TableCell>
                    <TableCell>{user.totalSpent.toFixed(2)} €</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault()
                                  setCurrentUser(user)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              {currentUser && (
                                <>
                                  <DialogHeader>
                                    <DialogTitle>Modifier l'utilisateur</DialogTitle>
                                    <DialogDescription>Modifiez les informations de l'utilisateur</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-name">Nom complet</Label>
                                      <Input
                                        id="edit-name"
                                        value={currentUser.name}
                                        onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-email">Email</Label>
                                      <Input
                                        id="edit-email"
                                        type="email"
                                        value={currentUser.email}
                                        onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-password">Nouveau mot de passe (laisser vide pour ne pas changer)</Label>
                                      <Input
                                        id="edit-password"
                                        type="password"
                                        placeholder="Nouveau mot de passe"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
                                      Annuler
                                    </Button>
                                    <Button onClick={handleEditUser}>Enregistrer</Button>
                                  </DialogFooter>
                                </>
                              )}
                            </DialogContent>
                          </Dialog>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault()
                              setCurrentUser(user)
                              setIsOrdersOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Voir les commandes
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onSelect={(e) => {
                              e.preventDefault()
                              handleDeleteUser(user.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* User Orders Dialog */}
      <Dialog open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {currentUser && (
            <>
              <DialogHeader>
                <DialogTitle>Commandes de {currentUser.name}</DialogTitle>
                <DialogDescription>Historique des commandes de l'utilisateur</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {currentUser.orders.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">Cet utilisateur n'a pas encore effectué de commande.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Commande</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentUser.orders.map((order: any) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{new Date(order.date).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>{order.total.toFixed(2)} €</TableCell>
                          <TableCell>
                            <Badge className={
                              order.status === 'delivered' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                              order.status === 'shipped' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' :
                              'bg-blue-100 text-blue-800 hover:bg-blue-100'
                            }>
                              {order.status === 'delivered' ? 'Livrée' :
                               order.status === 'shipped' ? 'Expédiée' : 'En préparation'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}