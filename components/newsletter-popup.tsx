"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Check if the popup has been shown before
    const hasShownPopup = localStorage.getItem("maya_newsletter_popup")

    if (!hasShownPopup) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Remember that we've shown the popup
    localStorage.setItem("maya_newsletter_popup", "true")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement newsletter subscription
    console.log("Newsletter subscription:", email)

    // Close popup and remember
    handleClose()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <Card className="w-full max-w-md relative">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>

        <CardHeader>
          <CardTitle>15% de réduction sur votre première commande</CardTitle>
          <CardDescription>
            Inscrivez-vous à notre newsletter pour recevoir des offres exclusives et les dernières nouveautés.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                S&apos;inscrire et obtenir 15% de réduction
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground text-center">
            En vous inscrivant, vous acceptez de recevoir nos emails marketing et confirmez avoir lu notre politique de
            confidentialité.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
