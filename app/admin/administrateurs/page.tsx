// app/admin/administrateurs/page.tsx
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
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, Search, ShieldCheck } from "lucide-react"

export default function AdminsPage() {
  const [admins, setAdmins] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false)
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin" // Default role
  })
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch admins from API
    const fetchAdmins = async () => {
      try {
        setIsLoading(true)
        
        // Demo data - replace with API calls in production
        setAdmins([
          {
            id: "admin1",
            name: "Laurent Dubois",
            email: "laurent.dubois@maya-bags.com",
            role: "super-admin",
            lastLogin: "2023-05-18T14:30:00Z",
            createdAt: "2022-01-10",
          },
          {
            id: "admin2",
            name: "Claire Martin",
            email: "claire.martin@maya-bags.com",
            role: "admin",
            lastLogin: "2023-05-17T09:15:00Z",
            createdAt: "2022-03-15",
          },
          {
            id: "admin3",
            name: "Thomas Bernard",
            email: "thomas.bernard@maya-bags.com",
            role: "editor",
            lastLogin: "2023-05-16T16:45:00Z",
            createdAt: "2022-06-22",
          },
        ])
      } catch (error) {
        console.error("Error fetching admins:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les administrateurs",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchAdmins()
  }, [toast])

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddAdmin = async () => {
    try {
      // Validate form
      if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
        toast({
          title: "Erreur de validation",
          description: "Tous les champs sont obligatoires",
          variant: "destructive",
        })
        return
      }
      
      if (admins.some(admin => admin.email === newAdmin.email)) {
        toast({
          title: "Erreur de validation",
          description: "Un administrateur avec cet email existe déjà",
          variant: "destructive",
        })
        return
      }
      
      // Production: API call to add admin
      const adminToAdd = {
        id: `admin-${Date.now()}`,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        lastLogin: null,
        createdAt: new Date().toISOString().split('T')[0],
      }
      
      setAdmins([...admins, adminToAdd])
      setIsAddAdminOpen(false)
      setNewAdmin({
        name: "",
        email: "",
        password: "",
        role: "admin"
      })
      
      toast({
        title: "Administrateur ajouté",
        description: `L'administrateur ${adminToAdd.name} a été ajouté avec succès`,
      })
      
    } catch (error) {
      console.error("Error adding admin:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'administrateur",
        variant: "destructive",
      })
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super-admin':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Super Admin</Badge>
      case 'admin':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Admin</Badge>
      case 'editor':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Éditeur</Badge>
      default:
        return <Badge>{role}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des administrateurs</h1>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un administrateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          
          <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un administrateur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un administrateur</DialogTitle>
                <DialogDescription>Créez un nouveau compte administrateur</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle *</Label>
                  <select
                    id="role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={newAdmin.role}
                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Éditeur</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddAdminOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddAdmin}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <p>Chargement des administrateurs...</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead>Date de création</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Aucun administrateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <ShieldCheck className={`h-4 w-4 mr-2 ${
                          admin.role === 'super-admin' ? 'text-purple-500' : 
                          admin.role === 'admin' ? 'text-blue-500' : 'text-green-500'
                        }`} />
                        {admin.name}
                      </div>
                    </TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{getRoleBadge(admin.role)}</TableCell>
                    <TableCell>
                      {admin.lastLogin ? 
                        new Date(admin.lastLogin).toLocaleString('fr-FR', {
                          dateStyle: 'short',
                          timeStyle: 'short'
                        }) : 
                        'Jamais connecté'
                      }
                    </TableCell>
                    <TableCell>{new Date(admin.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="rounded-lg border bg-card p-6 mt-10">
        <h2 className="text-xl font-semibold mb-4">Informations sur les rôles</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 mt-0.5">Super Admin</Badge>
            <div>
              <p className="font-medium">Accès complet</p>
              <p className="text-sm text-muted-foreground">Peut gérer tous les aspects du site, y compris les autres administrateurs.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mt-0.5">Admin</Badge>
            <div>
              <p className="font-medium">Accès étendu</p>
              <p className="text-sm text-muted-foreground">Peut gérer les produits, les commandes et les utilisateurs, mais pas les autres administrateurs.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-0.5">Éditeur</Badge>
            <div>
              <p className="font-medium">Accès limité</p>
              <p className="text-sm text-muted-foreground">Peut gérer les produits et voir les commandes, mais ne peut pas gérer les utilisateurs ou modifier les paramètres.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}