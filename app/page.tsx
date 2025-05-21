"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import NewsletterPopup from "@/components/newsletter-popup"
import TestimonialSlider from "@/components/testimonial-slider"
import { ArrowRight } from "lucide-react"

// Mock data for featured products
const featuredProducts = [
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
]

// Mock data for collections
const collections = [
  {
    id: "sacs-a-main",
    name: "Sacs à main",
    image: "/placeholder.svg?height=600&width=600",
    count: 12,
  },
  {
    id: "pochettes",
    name: "Pochettes",
    image: "/placeholder.svg?height=600&width=600",
    count: 8,
  },
  {
    id: "paniers",
    name: "Paniers",
    image: "/placeholder.svg?height=600&width=600",
    count: 6,
  },
]

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà vu l'animation
    const hasSeenAnimation = localStorage.getItem('maya-animation-seen');
    
    if (hasSeenAnimation) {
      setShowAnimation(false);
    } else {
      // Démarrer l'animation
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 500);

      const completionTimer = setTimeout(() => {
        setAnimationComplete(true);
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(completionTimer);
      };
    }
  }, []);

  const handleDiscoverClick = () => {
    // Marquer l'animation comme vue
    localStorage.setItem('maya-animation-seen', 'true');
    
    // Masquer l'animation
    setShowAnimation(false);
  };

  return (
    <>
      {showAnimation && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center overflow-hidden z-50">
          {/* Fond avec motif crochet subtil */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-repeat" style={{ backgroundImage: "url('/placeholder.svg?height=100&width=100')" }}></div>
          </div>
          
          {/* Conteneur d'animation */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Lettres du logo */}
            <div className="flex items-center relative mb-8">
              <span 
                className={`text-7xl md:text-9xl font-bold transition-all duration-1000 ease-in-out ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'
                }`}
                style={{ color: '#e07a5f', transitionDelay: '200ms' }}
              >
                M
              </span>
              <span 
                className={`text-7xl md:text-9xl font-bold transition-all duration-1000 ease-in-out ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'
                }`}
                style={{ color: '#84a98c', transitionDelay: '400ms' }}
              >
                A
              </span>
              <span 
                className={`text-7xl md:text-9xl font-bold transition-all duration-1000 ease-in-out ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'
                }`}
                style={{ color: '#a8dadc', transitionDelay: '600ms' }}
              >
                Y
              </span>
              <span 
                className={`text-7xl md:text-9xl font-bold transition-all duration-1000 ease-in-out ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'
                }`}
                style={{ color: '#f5f0e8', transitionDelay: '800ms' }}
              >
                A
              </span>
            </div>
            
            {/* Tagline */}
            <div 
              className={`text-lg md:text-xl text-gray-600 mb-12 transition-all duration-1000 ease-in-out ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              Artisanat Crochet Durable & Élégant
            </div>
            
            {/* Éléments décoratifs - formes de crochet stylisées */}
            <div className="absolute -z-10 opacity-20">
              <div 
                className={`w-64 h-64 rounded-full border-8 border-dashed transition-all duration-1500 ${
                  loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'
                }`}
                style={{ borderColor: '#e07a5f', transitionDelay: '300ms' }}
              ></div>
            </div>
            
            <div className="absolute -z-10 opacity-20">
              <div 
                className={`w-80 h-80 rounded-full border-8 border-dotted transition-all duration-1500 ${
                  loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'
                }`}
                style={{ borderColor: '#84a98c', transitionDelay: '600ms' }}
              ></div>
            </div>
            
            {/* Bouton Découvrir */}
            <button
              onClick={handleDiscoverClick}
              className={`relative px-8 py-3 text-lg font-medium rounded-md transition-all duration-1000 ease-in-out overflow-hidden ${
                loaded && animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                backgroundColor: '#f5f0e8',
                color: '#2f3e46',
                transitionDelay: '1200ms',
              }}
            >
              <span className="relative z-10">Découvrir</span>
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="absolute inset-0 transform transition-transform duration-500 ease-in-out -translate-x-full hover:translate-x-0"
                  style={{ backgroundColor: '#e07a5f' }}
                ></div>
              </div>
            </button>
          </div>
          
          {/* Animation de fil de crochet */}
          <div className="absolute bottom-8 w-full flex justify-center">
            <div 
              className={`h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent transition-all duration-2000 ease-in-out ${
                loaded ? 'w-64 opacity-70' : 'w-0 opacity-0'
              }`}
              style={{ transitionDelay: '800ms' }}
            ></div>
          </div>
        </div>
      )}

      {/* Hero Section - Votre contenu existant */}
      <section className="pt-32 pb-16 hero-section">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Artisanat Crochet Durable & Élégant</h1>
              <p className="text-lg mb-8 text-muted-foreground">
                Découvrez notre collection de sacs en crochet faits à la main, alliant tradition artisanale et design
                contemporain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/boutique">Découvrir la collection</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/notre-histoire">Notre savoir-faire</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative h-[400px] md:h-[500px] w-full">
                <Image
                  src="/placeholder.svg?height=1000&width=800"
                  alt="Sac en crochet MAYA"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-maya-beige p-4 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Fait à la main</p>
                <p className="text-xs text-muted-foreground">Chaque pièce est unique</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Nouveautés</h2>
            <Link href="/collections/nouveautes" className="flex items-center text-sm font-medium hover:text-accent">
              Voir tout <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 bg-maya-beige">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Nos Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-square relative">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                      <p>{collection.count} produits</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold mb-6">Comment sont fabriqués nos sacs</h2>
              <p className="mb-4">
                Chaque sac MAYA est fabriqué à la main avec amour et attention aux détails. Nous utilisons uniquement
                des matériaux durables et de haute qualité pour créer des pièces qui durent dans le temps.
              </p>
              <p className="mb-6">
                Notre processus de fabrication combine techniques traditionnelles de crochet et design contemporain,
                résultant en des pièces uniques qui racontent une histoire.
              </p>
              <Button asChild>
                <Link href="/notre-histoire">En savoir plus</Link>
              </Button>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Processus de fabrication"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Matériaux durables"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Artisanat crochet"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Détails de finition"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-maya-beige">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Ce que disent nos clients</h2>
          <TestimonialSlider />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 newsletter-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez notre newsletter</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Inscrivez-vous pour recevoir nos actualités, nos offres exclusives et 15% de réduction sur votre première
            commande.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <Input type="email" placeholder="Votre email" required className="flex-1" />
            <Button type="submit">S&apos;inscrire</Button>
          </form>
        </div>
      </section>

      {/* Newsletter Popup */}
      <NewsletterPopup />
    </>
  )
}
