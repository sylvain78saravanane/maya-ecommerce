// app/admin/categories/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { useToast } from "@/hooks/use-toast"
import { Plus, MoreHorizontal, Pencil, Trash2, Package } from "lucide-react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<any>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        
        // Demo data - replace with API calls in production
        setCategories([
          { id: "cat1", name: "Sacs à main", description: "Sacs à main en crochet", productsCount: 7 },
          { id: "cat2", name: "Pochettes", description: "Pochettes de soirée et petits sacs", productsCount: 4 },
          { id: "cat3", name: "Paniers", description: "Paniers de plage et de rangement", productsCount: 3 },
        ])
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les catégories",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchCategories()
  }, [toast])

  const handleAddCategory = async () => {
    try {
      // Validate form
      if (!newCategory.name) {
        toast({
          title: "Erreur de validation",
          description: "Le nom de la catégorie est obligatoire",
          variant: "destructive",
        })
        return
      }
      
      // Production: API call to add category
      const categoryToAdd = {
        id: `cat-${Date.now()}`,
        name: newCategory.name,
        description: newCategory.description,
        productsCount: 0,
      }
      
      setCategories([...categories, categoryToAdd])
      setIsAddCategoryOpen(false)
      setNewCategory({
        name: "",
        description: "",
      })
      
      toast({
        title: "Catégorie ajoutée",
        description: `La catégorie ${categoryToAdd.name} a été ajoutée avec succès`,
      })
      
    } catch (error) {
      console.error("Error adding category:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la catégorie",
        variant: "destructive",
      })
    }
  }

  const handleEditCategory = async () => {
    try {
      if (!currentCategory) return
      
      // Production: API call to update category
      const updatedCategories = categories.map(category => 
        category.id === currentCategory.id ? currentCategory : category
      )
      
      setCategories(updatedCategories)
      setIsEditCategoryOpen(false)
      
      toast({
        title: "Catégorie mise à jour",
        description: `La catégorie ${currentCategory.name} a été mise à jour avec succès`,
      })
    } catch (error) {
      console.error("Error updating category:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la catégorie",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      const categoryToDelete = categories.find(cat => cat.id === id)
      
      if (categoryToDelete?.productsCount > 0) {
        toast({
          title: "Impossible de supprimer",
          description: `Cette catégorie contient ${categoryToDelete.productsCount} produits. Veuillez d'abord déplacer ou supprimer ces produits.`,
          variant: "destructive",
        })
        return
      }
      
      // Production: API call to delete category
      setCategories(categories.filter(category => category.id !== id))
      
      toast({
        title: "Catégorie supprimée",
        description: "La catégorie a été supprimée avec succès",
      })
    } catch (error) {
      console.error("Error deleting category:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des catégories</h1>
        
        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une catégorie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une catégorie</DialogTitle>
              <DialogDescription>Créez une nouvelle catégorie pour vos produits</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de la catégorie *</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddCategory}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <p>Chargement des catégories...</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Produits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Aucune catégorie trouvée
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.description || "-"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                        {category.productsCount}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault()
                                  setCurrentCategory(category)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              {currentCategory && (
                                <>
                                  <DialogHeader>
                                    <DialogTitle>Modifier la catégorie</DialogTitle>
                                    <DialogDescription>Modifiez les informations de la catégorie</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-name">Nom de la catégorie</Label>
                                      <Input
                                        id="edit-name"
                                        value={currentCategory.name}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-description">Description</Label>
                                      <Textarea
                                        id="edit-description"
                                        value={currentCategory.description}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                                        rows={3}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsEditCategoryOpen(false)}>
                                      Annuler
                                    </Button>
                                    <Button onClick={handleEditCategory}>Enregistrer</Button>
                                  </DialogFooter>
                                </>
                              )}
                            </DialogContent>
                          </Dialog>
                          <DropdownMenuItem
                            className="text-destructive"
                            onSelect={(e) => {
                              e.preventDefault()
                              handleDeleteCategory(category.id)
                            }}
                            disabled={category.productsCount > 0}
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
    </div>
  )
}