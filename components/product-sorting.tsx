"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import ProductFilters from "@/components/product-filters"

const sortOptions = [
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix: croissant" },
  { value: "price-desc", label: "Prix: décroissant" },
  { value: "name-asc", label: "Nom: A-Z" },
  { value: "name-desc", label: "Nom: Z-A" },
]

export default function ProductSorting() {
  const [sortBy, setSortBy] = useState("newest")

  return (
    <div className="flex items-center gap-4">
      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="lg:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filtres</SheetTitle>
            <SheetDescription>Affinez votre recherche avec nos filtres</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <ProductFilters />
          </div>
        </SheetContent>
      </Sheet>

      {/* Sorting Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Trier par: {sortOptions.find((option) => option.value === sortBy)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={sortBy === option.value ? "bg-accent/50" : ""}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
