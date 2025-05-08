"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const { toast } = useToast()

  const shipping = subtotal > 100 ? 0 : 5.99
  const total = subtotal + shipping - discount

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault()

    // Mock promo code validation
    if (promoCode.toUpperCase() === "MAYA15") {
      const discountAmount = subtotal * 0.15
      setDiscount(discountAmount)
      toast({
        title: "Code promo appliqué",
        description: "15% de réduction appliqué à votre commande.",
      })
    } else {
      toast({
        title: "Code promo invalide",
        description: "Le code promo saisi n'est pas valide.",
        variant: "destructive",
      })
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-8">Vous n&apos;avez pas encore ajouté de produits à votre panier.</p>
            <Button asChild size="lg">
              <Link href="/boutique">Découvrir nos produits</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-background rounded-lg border border-border p-6">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <Link href={`/produits/${item.id}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.price.toFixed(2)} € / unité</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border flex justify-between">
                <Button variant="outline" onClick={clearCart}>
                  Vider le panier
                </Button>
                <Button asChild variant="outline">
                  <Link href="/boutique">Continuer les achats</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Livraison</span>
                  <span>{shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Réduction</span>
                    <span>-{discount.toFixed(2)} €</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>

              {/* Promo Code */}
              <form onSubmit={handleApplyPromoCode} className="mb-6">
                <p className="text-sm mb-2">Code promo</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Entrez votre code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button type="submit" variant="outline">
                    Appliquer
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Essayez "MAYA15" pour 15% de réduction</p>
              </form>

              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">
                  Passer à la caisse
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Livraison gratuite à partir de 100€ d&apos;achat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
