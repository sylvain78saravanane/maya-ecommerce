"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

// Mock filter options
const categories = [
  { id: "sacs-a-main", label: "Sacs à main" },
  { id: "pochettes", label: "Pochettes" },
  { id: "paniers", label: "Paniers" },
]

const colors = [
  { id: "beige", label: "Beige" },
  { id: "terracotta", label: "Terracotta" },
  { id: "sage", label: "Vert Sauge" },
  { id: "blue", label: "Bleu Pâle" },
  { id: "black", label: "Noir" },
  { id: "white", label: "Blanc" },
]

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleColorChange = (colorId: string) => {
    setSelectedColors((prev) => (prev.includes(colorId) ? prev.filter((id) => id !== colorId) : [...prev, colorId]))
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setPriceRange([0, 100])
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Filtres</h3>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Réinitialiser
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "colors"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Catégories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Prix</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 100]} max={200} step={1} value={priceRange} onValueChange={handlePriceChange} />
              <div className="flex justify-between">
                <span className="text-sm">{priceRange[0]}€</span>
                <span className="text-sm">{priceRange[1]}€</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger>Couleurs</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color.id}`}
                    checked={selectedColors.includes(color.id)}
                    onCheckedChange={() => handleColorChange(color.id)}
                  />
                  <label htmlFor={`color-${color.id}`} className="text-sm cursor-pointer">
                    {color.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
