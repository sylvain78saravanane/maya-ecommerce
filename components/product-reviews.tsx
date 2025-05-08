"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    user: {
      name: "Sophie Martin",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    rating: 5,
    date: "2023-05-15",
    text: "J'adore ce sac ! La qualité est exceptionnelle et je reçois des compliments à chaque fois que je le porte. Le fait qu'il soit fait à la main lui donne une valeur particulière.",
  },
  {
    id: "2",
    user: {
      name: "Marie Dubois",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    rating: 4,
    date: "2023-04-22",
    text: "Très beau sac, bien fini. La couleur est légèrement différente de celle sur les photos, mais ça reste un très bel article. La livraison a été rapide.",
  },
  {
    id: "3",
    user: {
      name: "Julie Lefebvre",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    rating: 5,
    date: "2023-03-10",
    text: "Ce sac est parfait pour l'été ! Léger, spacieux et très élégant. Je recommande vivement.",
  },
]

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState(mockReviews)
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour laisser un avis.",
        variant: "destructive",
      })
      return
    }

    if (rating === 0) {
      toast({
        title: "Note requise",
        description: "Veuillez attribuer une note à ce produit.",
        variant: "destructive",
      })
      return
    }

    if (newReview.trim() === "") {
      toast({
        title: "Avis requis",
        description: "Veuillez écrire votre avis sur ce produit.",
        variant: "destructive",
      })
      return
    }

    // Add new review
    const review = {
      id: `review_${Date.now()}`,
      user: {
        name: user.name,
        avatar: "/placeholder.svg?height=100&width=100", // Default avatar
      },
      rating,
      date: new Date().toISOString().split("T")[0],
      text: newReview,
    }

    setReviews([review, ...reviews])
    setNewReview("")
    setRating(0)

    toast({
      title: "Avis publié",
      description: "Merci d'avoir partagé votre avis sur ce produit.",
    })
  }

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div>
      {/* Reviews Summary */}
      <div className="mb-8 flex items-center">
        <div className="flex items-center mr-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "h-5 w-5",
                star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
              )}
            />
          ))}
        </div>
        <span className="font-medium">{averageRating.toFixed(1)}</span>
        <span className="mx-2 text-muted-foreground">•</span>
        <span className="text-muted-foreground">{reviews.length} avis</span>
      </div>

      {/* Write a Review */}
      <div className="mb-10 p-6 border border-border rounded-lg">
        <h3 className="font-medium mb-4">Partagez votre avis</h3>
        {user ? (
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <p className="text-sm mb-2">Votre note</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        star <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
            <Textarea
              placeholder="Partagez votre expérience avec ce produit..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="mb-4"
              rows={4}
            />
            <Button type="submit">Publier l&apos;avis</Button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="mb-4 text-muted-foreground">Connectez-vous pour laisser un avis</p>
            <Button asChild>
              <a href="/connexion">Se connecter</a>
            </Button>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6">
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                <Image
                  src={review.user.avatar || "/placeholder.svg"}
                  alt={review.user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{review.user.name}</p>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-4 w-4",
                          star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
