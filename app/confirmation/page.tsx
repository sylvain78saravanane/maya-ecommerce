"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronRight, Clock, Mail, ShoppingBag, Truck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [orderDate, setOrderDate] = useState("")
  
  // Simuler la récupération des détails de commande
  useEffect(() => {
    // Générer un numéro de commande aléatoire
    const generateOrderNumber = () => {
      const prefix = "MAY";
      const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
      return `${prefix}-${randomNum}`;
    };
    
    // Date formatée
    const formatDate = () => {
      const now = new Date();
      return now.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };
    
    setOrderNumber(generateOrderNumber());
    setOrderDate(formatDate());
  }, []);

  // Simuler des données de commande (en production, ces données viendraient de votre API)
  const orderDetails = {
    items: [
      {
        id: "1",
        name: "Sac Bohème",
        price: 89.99,
        image: "/placeholder.svg?height=500&width=500",
        quantity: 1,
      },
      {
        id: "2",
        name: "Pochette Été",
        price: 49.99,
        image: "/placeholder.svg?height=500&width=500",
        quantity: 2,
      },
    ],
    shipping: {
      method: "Standard",
      cost: 4.99,
      address: "123 Rue de Paris, 75001 Paris, France",
      estimatedDelivery: "3-5 jours ouvrés",
    },
    payment: {
      method: "Carte bancaire",
      lastDigits: "1234",
    },
    totals: {
      subtotal: 189.97,
      shipping: 0, // Livraison gratuite car > 100€
      total: 189.97,
    },
    contact: {
      email: "client@example.com",
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Confirmation Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Commande confirmée !</h1>
            <p className="text-muted-foreground">
              Merci pour votre commande.
            </p>
          </div>

          {/* Order Info Card */}
          <Card className="mb-8">
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h2 className="font-semibold">Commande #{orderNumber}</h2>
                  <p className="text-sm text-muted-foreground">Passée le {orderDate}</p>
                </div>
                <Button variant="outline" asChild className="mt-4 md:mt-0">
                  <Link href="/mon-compte/commandes">
                    Voir les détails
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <Separator />

              {/* Order Status */}
              <div>
                <h3 className="font-medium mb-4">Statut de la commande</h3>
                <div className="grid grid-cols-4 gap-2 text-center relative">
                  {/* Progress Bar */}
                  <div className="absolute top-4 left-0 w-full h-1 bg-muted">
                    <div className="h-full bg-green-600 w-1/4"></div>
                  </div>
                  
                  {/* Steps */}
                  <div className="flex flex-col items-center">
                    <div className="rounded-full w-8 h-8 flex items-center justify-center bg-green-600 text-white z-10 mb-2">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium">Confirmée</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full w-8 h-8 flex items-center justify-center bg-muted z-10 mb-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">En préparation</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full w-8 h-8 flex items-center justify-center bg-muted z-10 mb-2">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">Expédiée</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="rounded-full w-8 h-8 flex items-center justify-center bg-muted z-10 mb-2">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">Livrée</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-4">Articles commandés</h3>
                <div className="space-y-4">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Shipping & Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Livraison</h3>
                  <p className="text-sm">{orderDetails.shipping.method}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Estimation: {orderDetails.shipping.estimatedDelivery}
                  </p>
                  <p className="text-sm">{orderDetails.shipping.address}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Paiement</h3>
                  <p className="text-sm">{orderDetails.payment.method}</p>
                  {orderDetails.payment.lastDigits && (
                    <p className="text-sm text-muted-foreground">
                      **** **** **** {orderDetails.payment.lastDigits}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Order Totals */}
              <div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{orderDetails.totals.subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Livraison</span>
                    <span>{orderDetails.totals.shipping === 0 ? "Gratuit" : `${orderDetails.totals.shipping.toFixed(2)} €`}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2">
                    <span>Total</span>
                    <span>{orderDetails.totals.total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <div className="bg-muted/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Et maintenant ?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-0.5 text-maya-terracotta" />
                <div>
                  <p className="font-medium">Vérifiez votre boîte de réception</p>
                  <p className="text-sm text-muted-foreground">
                    Un email de confirmation contenant tous les détails de votre commande a été envoyé à l'adresse email que vous avez fournie.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Truck className="h-5 w-5 mt-0.5 text-maya-terracotta" />
                <div>
                  <p className="font-medium">Suivez votre commande</p>
                  <p className="text-sm text-muted-foreground">
                    Vous recevrez un email avec les informations de suivi dès que votre commande sera expédiée.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShoppingBag className="h-5 w-5 mt-0.5 text-maya-terracotta" />
                <div>
                  <p className="font-medium">Consultez vos commandes</p>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez suivre l'état de votre commande et consulter votre historique d'achats dans votre compte.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link href="/boutique">Continuer mes achats</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/mon-compte/commandes">Mes commandes</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}