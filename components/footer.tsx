"use client"

import type React from "react"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Twitter } from "lucide-react"

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Implement newsletter subscription
    console.log("Newsletter subscription")
  }

  return (
    <footer className="bg-maya-beige text-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold">
              MAYA
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Artisanat crochet durable & élégant. Chaque pièce est unique et fabriquée à la main avec amour.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Boutique</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/boutique" className="hover:text-accent">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link href="/collections/sacs-a-main" className="hover:text-accent">
                  Sacs à main
                </Link>
              </li>
              <li>
                <Link href="/collections/pochettes" className="hover:text-accent">
                  Pochettes
                </Link>
              </li>
              <li>
                <Link href="/collections/paniers" className="hover:text-accent">
                  Paniers
                </Link>
              </li>
              <li>
                <Link href="/collections/nouveautes" className="hover:text-accent">
                  Nouveautés
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/notre-histoire" className="hover:text-accent">
                  Comment sont fabriqués nos produits ?
                </Link>
              </li>
              <li>
                <Link href="/livraison" className="hover:text-accent">
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Inscrivez-vous pour recevoir nos actualités et 15% de réduction sur votre première commande.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input type="email" placeholder="Votre email" required className="bg-white" />
              <Button type="submit" className="w-full">
                S&apos;inscrire
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} MAYA. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/mentions-legales" className="hover:text-accent">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="hover:text-accent">
                Politique de confidentialité
              </Link>
              <Link href="/conditions-generales" className="hover:text-accent">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
