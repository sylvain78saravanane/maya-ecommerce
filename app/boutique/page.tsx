import { Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import ProductSorting from "@/components/product-sorting"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Boutique | MAYA",
  description:
    "Découvrez notre collection de sacs en crochet faits à la main, alliant artisanat traditionnel et design moderne.",
}

// Mock products data
const products = [
  {
    id: "1",
    name: "Sac Bohème",
    price: 89.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Sacs à main",
  },
  {
    id: "2",
    name: "Pochette Été",
    price: 49.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Pochettes",
  },
  {
    id: "3",
    name: "Panier Plage",
    price: 69.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Paniers",
  },
  {
    id: "4",
    name: "Mini Sac Crochet",
    price: 59.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Sacs à main",
  },
  {
    id: "5",
    name: "Grand Cabas",
    price: 99.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Sacs à main",
  },
  {
    id: "6",
    name: "Pochette Soirée",
    price: 54.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Pochettes",
  },
  {
    id: "7",
    name: "Panier Pique-nique",
    price: 79.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Paniers",
  },
  {
    id: "8",
    name: "Sac Bandoulière",
    price: 74.99,
    image: "/placeholder.svg?height=500&width=500",
    category: "Sacs à main",
  },
]

export default function BoutiquePage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Boutique</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters />
          </div>

          <div className="flex-1">
            {/* Sorting and Mobile Filter Button */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">{products.length} produits</p>
              <ProductSorting />
            </div>

            {/* Product Grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid products={products} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  )
}
