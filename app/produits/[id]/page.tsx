import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductReviews from "@/components/product-reviews"
import RelatedProducts from "@/components/related-products"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"

// Mock products data
const products = [
  {
    id: "1",
    name: "Sac Bohème",
    price: 89.99,
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    category: "Sacs à main",
    description:
      "Ce sac bohème en crochet est parfait pour ajouter une touche d'élégance décontractée à votre tenue. Fabriqué à la main avec du coton biologique, il est à la fois durable et élégant. Sa taille moyenne le rend idéal pour un usage quotidien, avec suffisamment d'espace pour vos essentiels.",
    features: [
      "Fait à la main en coton biologique",
      "Doublure intérieure en coton",
      "Fermeture à glissière",
      "Poche intérieure zippée",
      "Dimensions: 30 x 25 x 10 cm",
      "Anse réglable",
    ],
    care: "Nettoyage à sec recommandé. En cas de tache, nettoyer délicatement avec un chiffon humide et laisser sécher à l'air libre. Éviter l'exposition prolongée au soleil pour préserver les couleurs.",
    inStock: true,
    colors: ["beige", "terracotta", "sage"],
  },
  // More products would be here
]

export function generateMetadata({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return {
      title: "Produit non trouvé | MAYA",
    }
  }

  return {
    title: `${product.name} | MAYA`,
    description: product.description.substring(0, 160),
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm mb-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link href="/boutique" className="text-muted-foreground hover:text-foreground">
            Boutique
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link
            href={`/collections/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-muted-foreground hover:text-foreground"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-secondary">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative rounded-md overflow-hidden bg-secondary cursor-pointer"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Vue ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold mb-6">{product.price.toFixed(2)} €</p>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Couleur</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                    style={{
                      backgroundColor:
                        color === "beige"
                          ? "#f5f0e8"
                          : color === "terracotta"
                            ? "#e07a5f"
                            : color === "sage"
                              ? "#84a98c"
                              : "#a8dadc",
                    }}
                    aria-label={`Couleur ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-4">
                {product.inStock ? (
                  <span className="text-green-600 font-medium">En stock</span>
                ) : (
                  <span className="text-red-600 font-medium">Rupture de stock</span>
                )}
              </p>

              {/* Rubrique de personnalisation */}
              <div className="mb-4">
                <label htmlFor="personalisation" className="block text-sm font-medium mb-1">
                  Ajouter une personnalisation (optionnel)
                </label>
                <textarea
                  id="personalisation"
                  name="personalisation"
                  rows={2}
                  className="w-full border border-border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Ex : Joyeux anniversaire, Sophie !"
                ></textarea>
              </div>

              <AddToCartButton product={product} />
            </div>

            <div className="border-t border-border pt-6">
              <Tabs defaultValue="description">
                <TabsList className="w-full justify-start border-b mb-6">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="features">Caractéristiques</TabsTrigger>
                  <TabsTrigger value="care">Entretien</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="text-muted-foreground">
                  <p>{product.description}</p>
                </TabsContent>
                <TabsContent value="features">
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="care" className="text-muted-foreground">
                  <p>{product.care}</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Avis clients</h2>
          <ProductReviews productId={product.id} />
        </section>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Vous aimerez aussi</h2>
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </section>
      </div>
    </div>
  )
}
