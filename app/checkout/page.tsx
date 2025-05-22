"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Check,
  CreditCard,
  MailOpen,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react"

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    // Shipping information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    // Payment information
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    // Other
    shippingMethod: "standard", // standard or express
    paymentMethod: "card", // card or paypal
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const shipping = formData.shippingMethod === "standard" ? 4.99 : 9.99
  const total = subtotal + shipping

  // Free shipping threshold
  const freeShippingThreshold = 100
  const isFreeShipping = subtotal >= freeShippingThreshold
  const actualShipping = isFreeShipping ? 0 : shipping
  const finalTotal = subtotal + actualShipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate processing time
    setTimeout(() => {
      // In a real app, this would be an API call to process the order

      // Show success message
      toast({
        title: "Commande confirmée !",
        description: "Votre commande a été traitée avec succès. Vous recevrez un email de confirmation.",
      })

      // Clear cart
      clearCart()

      // Redirect to confirmation page
      router.push("/confirmation")
      
      setIsProcessing(false)
    }, 2000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Paiement</h1>
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <ShieldCheck className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-8">
              Vous n'avez pas d'articles dans votre panier. Veuillez ajouter des produits avant de procéder au paiement.
            </p>
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Paiement</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="flex-1">
              <form onSubmit={handleSubmit}>
                <Tabs defaultValue="shipping" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="shipping">Livraison</TabsTrigger>
                    <TabsTrigger value="payment">Paiement</TabsTrigger>
                    <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
                  </TabsList>

                  {/* Shipping Tab */}
                  <TabsContent value="shipping" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code Postal *</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays *</Label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          required
                        >
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                          <option value="Luxembourg">Luxembourg</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <h3 className="font-medium text-lg">Méthode de livraison</h3>
                      <RadioGroup
                        defaultValue="standard"
                        value={formData.shippingMethod}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, shippingMethod: value }))}
                      >
                        <div className="flex items-start space-x-2 mb-3">
                          <div className="flex items-center h-5 mt-1">
                            <RadioGroupItem value="standard" id="standard" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor="standard" className="font-medium">
                              Livraison standard
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              2-3 jours ouvrés ({isFreeShipping ? "Gratuit" : `${shipping.toFixed(2)} €`})
                              {!isFreeShipping && (
                                <span className="ml-2 text-xs">
                                  (Livraison gratuite à partir de {freeShippingThreshold} €)
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="flex items-center h-5 mt-1">
                            <RadioGroupItem value="express" id="express" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor="express" className="font-medium">
                              Livraison express
                            </Label>
                            <p className="text-sm text-muted-foreground">24h (commande avant 12h) - 9,99 €</p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes de commande (optionnel)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Instructions spéciales pour la livraison..."
                        value={formData.notes}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="pt-4 flex justify-end">
                      <Button
                        type="button"
                        onClick={() => (document.querySelector('[data-value="payment"]') as HTMLElement | null)?.click()}
                      >
                        Continuer vers le paiement
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Payment Tab */}
                  <TabsContent value="payment" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Méthode de paiement</h3>
                      <RadioGroup
                        defaultValue="card"
                        value={formData.paymentMethod}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                      >
                        <div className="flex items-start space-x-2 mb-3">
                          <div className="flex items-center h-5 mt-1">
                            <RadioGroupItem value="card" id="card" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor="card" className="font-medium">
                              Carte bancaire
                            </Label>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="flex items-center h-5 mt-1">
                            <RadioGroupItem value="stripe" id="stripe" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor="stripe" className="font-medium">
                              Stripe
                            </Label>
                            <p className="text-sm text-muted-foreground">Paiement sécurisé avec Stripe</p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.paymentMethod === "card" && (
                      <div className="space-y-6 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Titulaire de la carte *</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Numéro de carte *</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Date d'expiration *</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/AA"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center rounded-lg border p-4 mt-6 bg-background/50">
                      <ShieldCheck className="h-5 w-5 text-green-500 mr-3" />
                      <p className="text-sm text-muted-foreground">
                        Toutes les transactions sont sécurisées et chiffrées. Vos informations sont en sécurité.
                      </p>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button type="button" variant="outline" onClick={() => document.querySelector('[data-value="shipping"]')?.click()}>
                        Retour
                      </Button>
                      <Button type="button" onClick={() => document.querySelector('[data-value="confirmation"]')?.click()}>
                        Continuer
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Confirmation Tab */}
                  <TabsContent value="confirmation" className="space-y-6">
                    <div className="space-y-6">
                      <h3 className="font-medium text-lg">Résumé de la commande</h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <MapPin className="h-5 w-5 text-maya-terracotta" />
                                <h4 className="font-medium">Adresse de livraison</h4>
                              </div>
                              <div className="text-sm">
                                <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                                <p>{formData.address}</p>
                                <p>{formData.postalCode} {formData.city}</p>
                                <p>{formData.country}</p>
                                <p>{formData.phone}</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <Truck className="h-5 w-5 text-maya-terracotta" />
                                <h4 className="font-medium">Méthode de livraison</h4>
                              </div>
                              <div className="text-sm">
                                {formData.shippingMethod === "standard" ? (
                                  <p>Livraison standard (2-3 jours ouvrés)</p>
                                ) : (
                                  <p>Livraison express (24h)</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <CreditCard className="h-5 w-5 text-maya-terracotta" />
                              <h4 className="font-medium">Méthode de paiement</h4>
                            </div>
                            <div className="text-sm">
                              {formData.paymentMethod === "card" ? (
                                <>
                                  <p>Carte bancaire</p>
                                  <p>Carte se terminant par **** **** **** {formData.cardNumber.slice(-4)}</p>
                                </>
                              ) : (
                                <p>Stripe</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <MailOpen className="h-5 w-5 text-maya-terracotta" />
                              <h4 className="font-medium">Informations de contact</h4>
                            </div>
                            <div className="text-sm">
                              <p>Email: {formData.email}</p>
                              <p>Une confirmation de commande sera envoyée à cette adresse.</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="pt-6">
                        <h4 className="font-medium mb-3">Articles dans votre panier</h4>
                        <div className="space-y-3">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-2 border-b">
                              <div className="flex items-center">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h5 className="font-medium">{item.name}</h5>
                                  <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button type="button" variant="outline" onClick={() => document.querySelector('[data-value="payment"]')?.click()}>
                        Retour
                      </Button>
                      <Button type="submit" disabled={isProcessing}>
                        {isProcessing ? "Traitement..." : "Confirmer la commande"}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="sticky top-32">
                <Card className="w-full">
                  <CardContent className="p-6 space-y-5">
                    <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sous-total</span>
                        <span>{subtotal.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Livraison</span>
                        <span>{isFreeShipping ? "Gratuit" : `${actualShipping.toFixed(2)} €`}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{finalTotal.toFixed(2)} €</span>
                    </div>

                    <div className="pt-4 space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <Check className="h-4 w-4" />
                        <span>{isFreeShipping ? "Livraison gratuite appliquée" : `Livraison gratuite à partir de ${freeShippingThreshold} €`}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Paiement 100% sécurisé</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}