import ProductCard from "@/components/product-card"

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
]

export default function RelatedProducts({
  currentProductId,
  category,
}: {
  currentProductId: string
  category: string
}) {
  // Filter products by category and exclude current product
  const relatedProducts = products
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, 4) // Limit to 4 products

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
