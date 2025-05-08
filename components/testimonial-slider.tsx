"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock testimonials data
const testimonials = [
  {
    id: "1",
    name: "Sophie Martin",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "J'adore mon sac MAYA ! La qualité est exceptionnelle et je reçois des compliments à chaque fois que je le porte. Le fait qu'il soit fait à la main lui donne une valeur particulière.",
  },
  {
    id: "2",
    name: "Marie Dubois",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Superbe qualité et design unique. Ce sac est devenu mon accessoire préféré pour l'été. Le service client est également impeccable !",
  },
  {
    id: "3",
    name: "Julie Lefebvre",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "Très satisfaite de mon achat. Le sac est magnifique et correspond parfaitement à la description. Seul petit bémol : le délai de livraison un peu long.",
  },
  {
    id: "4",
    name: "Camille Rousseau",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Un grand merci à l'équipe MAYA pour ce magnifique sac. On sent vraiment le travail artisanal et l'attention aux détails. Je recommande vivement !",
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const goToPrevious = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setAutoplay(false)
    setCurrentIndex(index)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4 md:px-10">
              <div className="bg-background rounded-lg p-6 md:p-8 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              index === currentIndex ? "bg-accent" : "bg-gray-300",
            )}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
