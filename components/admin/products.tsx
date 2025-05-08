"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "Sac Bohème",
    price: 89.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Sacs à main",
    stock: 15,
  },
  {
    id: "2",
    name: "Pochette Été",
    price: 49.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Pochettes",
    stock: 8,
  },
  {
    id: "3",
    name: "Panier Plage",
    price: 69.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Paniers",
    stock: 2,
  },
  {
    id: "4",
    name: "Mini Sac Crochet",
    price: 59.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Sacs à main",
    stock: 10,
  },
  {
    id: "5",
    name: "Grand Cabas",
    price: 99.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Sacs à main",
    stock: 7,
  },
]

export default function AdminProducts() {
  const [products, setProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "/placeholder.svg?height=500&width=500",
    description: "",
  })
  const { toast } = useToast()

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddProduct = () => {
    const productToAdd = {
      id: `${Date.now()}`,
      name: newProduct.name,
      price: Number.parseFloat(newProduct.price),
      image: newProduct.image,
      category: newProduct.category,
      stock: Number.parseInt(newProduct.stock),
      description: newProduct.description,
    }

    setProducts([...products, productToAdd])
    setNewProduct({
      name: "",
      price: "",
      category: "",
      stock: "",
      image: "/placeholder.svg?height=500&width=500",
      description: "",
    })
    setIsAddProductOpen(false)

    toast({
      title: "Produit ajouté",
      description: `${productToAdd.name} a été ajouté avec succès.`,
    })
  }

  const handleEditProduct = () => {
    if (!currentProduct) return

    const updatedProducts = products.map((product) => (product.id === currentProduct.id ? currentProduct : product))

    setProducts(updatedProducts)
    setIsEditProductOpen(false)

    toast({
      title: "Produit mis à jour",
      description: `${currentProduct.name} a été mis à jour avec succès.`,
    })
  }

  const handleDeleteProduct = (id: string) => {
    const productToDelete = products.find((product) => product.id === id)
    if (!productToDelete) return

    setProducts(products.filter((product) => product.id !== id))

    toast({
      title: "Produit supprimé",
      description: `${productToDelete.name} a été supprimé avec succès.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="w-full max-w-sm">
          <Input
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                  <Label htmlFor="name">Nom du produit</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Input
                    id="category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
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
            {filteredProducts.map((product) => (
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
                  <span className={product.stock < 5 ? "text-destructive font-medium" : ""}>{product.stock}</span>
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
                                          price: Number.parseFloat(e.target.value),
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-category">Catégorie</Label>
                                    <Input
                                      id="edit-category"
                                      value={currentProduct.category}
                                      onChange={(e) =>
                                        setCurrentProduct({ ...currentProduct, category: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-stock">Stock</Label>
                                    <Input
                                      id="edit-stock"
                                      type="number"
                                      value={currentProduct.stock}
                                      onChange={(e) =>
                                        setCurrentProduct({ ...currentProduct, stock: Number.parseInt(e.target.value) })
                                      }
                                    />
                                  </div>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
