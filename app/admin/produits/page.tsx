// app/admin/produits/page.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Plus, MoreHorizontal, Pencil, Trash2, Search } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    stock: "",
    image: "/placeholder.svg?height=500&width=500",
  })
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Fetch products and categories from API
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Demo data - replace with API calls
        setProducts([
          {
            id: "1",
            name: "Sac Bohème",
            price: 89.99,
            image: "/placeholder.svg?height=500&width=500",
            category: "Sacs à main",
            categoryId: "cat1",
            description: "Ce sac bohème en crochet est parfait pour ajouter une touche d'élégance décontractée à votre tenue.",
            stock: 15,
          },
          {
            id: "2",
            name: "Pochette Été",
            price: 49.99,
            image: "/placeholder.svg?height=500&width=500",
            category: "Pochettes",
            categoryId: "cat2",
            description: "Légère et colorée, cette pochette est idéale pour vos soirées d'été.",
            stock: 8,
          },
          {
            id: "3",
            name: "Panier Plage",
            price: 69.99,
            image: "/placeholder.svg?height=500&width=500",
            category: "Paniers",
            categoryId: "cat3",
            description: "Ce panier de plage spacieux accueillera toutes vos affaires pour une journée à la plage.",
            stock: 2,
          },
        ])
        
        setCategories([
          { id: "cat1", name: "Sacs à main" },
          { id: "cat2", name: "Pochettes" },
          { id: "cat3", name: "Paniers" },
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les données",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [toast])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddProduct = async () => {
    try {
      // Validate form
      if (!newProduct.name || !newProduct.price || !newProduct.categoryId || !newProduct.stock) {
        toast({
          title: "Erreur de validation",
          description: "Veuillez remplir tous les champs obligatoires",
          variant: "destructive",
        })
        return
      }
      
      // Production: API call to add product
      const productToAdd = {
        id: `product-${Date.now()}`,
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        categoryId: newProduct.categoryId,
        category: categories.find(c => c.id === newProduct.categoryId)?.name || "",
        image: newProduct.image,
        stock: parseInt(newProduct.stock),
      }
      
      setProducts([...products, productToAdd])
      setIsAddProductOpen(false)
      setNewProduct({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        stock: "",
        image: "/placeholder.svg?height=500&width=500",
      })
      
      toast({
        title: "Produit ajouté",
        description: `Le produit ${productToAdd.name} a été ajouté avec succès`,
      })
      
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit",
        variant: "destructive",
      })
    }
  }

  const handleEditProduct = async () => {
    try {
      if (!currentProduct) return
      
      // Production: API call to update product
      const updatedProducts = products.map(product => 
        product.id === currentProduct.id ? 
        {
          ...currentProduct,
          category: categories.find(c => c.id === currentProduct.categoryId)?.name || currentProduct.category,
        } : product
      )
      
      setProducts(updatedProducts)
      setIsEditProductOpen(false)
      
      toast({
        title: "Produit mis à jour",
        description: `Le produit ${currentProduct.name} a été mis à jour avec succès`,
      })
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le produit",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      // Production: API call to delete product
      setProducts(products.filter(product => product.id !== id))
      
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès",
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des produits</h1>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un produit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajouter un produit</DialogTitle>
                <DialogDescription>Remplissez les informations pour ajouter un nouveau produit</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du produit *</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie *</Label>
                    <Select 
                      value={newProduct.categoryId} 
                      onValueChange={(value) => setNewProduct({ ...newProduct, categoryId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">URL de l'image</Label>
                  <Input
                    id="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    placeholder="URL de l'image"
                  />
                  <p className="text-xs text-muted-foreground">Laissez vide pour utiliser l'image par défaut</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddProduct}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <p>Chargement des produits...</p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Aucun produit trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10 rounded-md overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price.toFixed(2)} €</TableCell>
                    <TableCell>
                      <Badge className={product.stock < 5 ? "bg-red-100 text-red-800 hover:bg-red-100" : ""}>
                        {product.stock}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault()
                                  setCurrentProduct(product)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              {currentProduct && (
                                <>
                                  <DialogHeader>
                                    <DialogTitle>Modifier le produit</DialogTitle>
                                    <DialogDescription>Modifiez les informations du produit</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-name">Nom du produit</Label>
                                        <Input
                                          id="edit-name"
                                          value={currentProduct.name}
                                          onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-price">Prix (€)</Label>
                                        <Input
                                          id="edit-price"
                                          type="number"
                                          step="0.01"
                                          value={currentProduct.price}
                                          onChange={(e) =>
                                            setCurrentProduct({
                                              ...currentProduct,
                                              price: parseFloat(e.target.value),
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-category">Catégorie</Label>
                                        <Select 
                                          value={currentProduct.categoryId} 
                                          onValueChange={(value) => setCurrentProduct({ ...currentProduct, categoryId: value })}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder={currentProduct.category} />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {categories.map((category) => (
                                              <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-stock">Stock</Label>
                                        <Input
                                          id="edit-stock"
                                          type="number"
                                          value={currentProduct.stock}
                                          onChange={(e) =>
                                            setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-description">Description</Label>
                                      <Textarea
                                        id="edit-description"
                                        value={currentProduct.description}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                        rows={4}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-image">URL de l'image</Label>
                                      <Input
                                        id="edit-image"
                                        value={currentProduct.image}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
                                      Annuler
                                    </Button>
                                    <Button onClick={handleEditProduct}>Enregistrer</Button>
                                  </DialogFooter>
                                </>
                              )}
                            </DialogContent>
                          </Dialog>
                          <DropdownMenuItem
                            className="text-destructive"
                            onSelect={(e) => {
                              e.preventDefault()
                              handleDeleteProduct(product.id)
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
    </div>
  )
}