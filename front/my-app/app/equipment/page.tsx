"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Search, ChevronDown, Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export default function EquipmentPage() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    brands: [],
    rentalPeriods: [],
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const equipment = [
    {
      id: 1,
      name: "Commercial Treadmill",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 29.99,
      weeklyPrice: 149.99,
      monthlyPrice: 449.99,
      category: "Cardio",
      brand: "LifeFitness",
      rating: 5,
    },
    {
      id: 2,
      name: "Adjustable Dumbbell Set",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 14.99,
      weeklyPrice: 79.99,
      monthlyPrice: 249.99,
      category: "Strength",
      brand: "Bowflex",
      rating: 4,
    },
    {
      id: 3,
      name: "Spinning Bike",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 19.99,
      weeklyPrice: 99.99,
      monthlyPrice: 299.99,
      category: "Cardio",
      brand: "Peloton",
      rating: 5,
    },
    {
      id: 4,
      name: "Olympic Weight Bench",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 12.99,
      weeklyPrice: 69.99,
      monthlyPrice: 199.99,
      category: "Strength",
      brand: "Rogue",
      rating: 4,
    },
    {
      id: 5,
      name: "Rowing Machine",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 24.99,
      weeklyPrice: 129.99,
      monthlyPrice: 379.99,
      category: "Cardio",
      brand: "Concept2",
      rating: 5,
    },
    {
      id: 6,
      name: "Power Rack",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 22.99,
      weeklyPrice: 119.99,
      monthlyPrice: 349.99,
      category: "Strength",
      brand: "Rogue",
      rating: 4,
    },
    {
      id: 7,
      name: "Kettlebell Set",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 9.99,
      weeklyPrice: 49.99,
      monthlyPrice: 149.99,
      category: "Functional",
      brand: "TRX",
      rating: 4,
    },
    {
      id: 8,
      name: "Massage Gun",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 7.99,
      weeklyPrice: 39.99,
      monthlyPrice: 119.99,
      category: "Recovery",
      brand: "Theragun",
      rating: 5,
    },
  ]

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => {
      const current = [...prev[type]]
      const index = current.indexOf(value)

      if (index === -1) {
        current.push(value)
      } else {
        current.splice(index, 1)
      }

      return {
        ...prev,
        [type]: current,
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters({
      categories: [],
      brands: [],
      rentalPeriods: [],
    })
    setPriceRange([0, 100])
  }

  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`space-y-6 ${isMobile ? "" : "sticky top-20"}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Filters</h3>
        {(selectedFilters.categories.length > 0 ||
          selectedFilters.brands.length > 0 ||
          selectedFilters.rentalPeriods.length > 0 ||
          priceRange[0] > 0 ||
          priceRange[1] < 100) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 text-xs text-primary hover:text-primary/80"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <Accordion type="single" collapsible defaultValue="categories">
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Cardio", "Strength", "Functional", "Recovery"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedFilters.categories.includes(category)}
                      onCheckedChange={() => toggleFilter("categories", category)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>Daily Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 px-1">
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="brands">
            <AccordionTrigger>Brands</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["LifeFitness", "Bowflex", "Peloton", "Rogue", "Concept2", "TRX", "Theragun"].map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedFilters.brands.includes(brand)}
                      onCheckedChange={() => toggleFilter("brands", brand)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rental-period">
            <AccordionTrigger>Rental Period</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Daily", "Weekly", "Monthly"].map((period) => (
                  <div key={period} className="flex items-center space-x-2">
                    <Checkbox
                      id={`period-${period}`}
                      checked={selectedFilters.rentalPeriods.includes(period)}
                      onCheckedChange={() => toggleFilter("rentalPeriods", period)}
                    />
                    <Label htmlFor={`period-${period}`} className="text-sm font-normal cursor-pointer">
                      {period}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )

  const filteredEquipment = equipment.filter((item) => {
    // Filter by category
    if (selectedFilters.categories.length > 0 && !selectedFilters.categories.includes(item.category)) {
      return false
    }

    // Filter by brand
    if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(item.brand)) {
      return false
    }

    // Filter by price
    if (item.dailyPrice < priceRange[0] || item.dailyPrice > priceRange[1]) {
      return false
    }

    return true
  })

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Equipment</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Equipment</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <FilterSidebar />
        </div>

        {/* Filters - Mobile */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetContent side="left" className="w-full sm:max-w-md">
            <SheetHeader className="mb-4">
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow down your equipment search</SheetDescription>
            </SheetHeader>
            <FilterSidebar isMobile={true} />
          </SheetContent>
        </Sheet>

        {/* Equipment Grid */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="md:hidden flex items-center gap-2"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              {/* Active filters */}
              <div className="flex flex-wrap gap-2">
                {selectedFilters.categories.map((category) => (
                  <Badge key={`cat-${category}`} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("categories", category)} />
                  </Badge>
                ))}
                {selectedFilters.brands.map((brand) => (
                  <Badge key={`brand-${brand}`} variant="secondary" className="flex items-center gap-1">
                    {brand}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("brands", brand)} />
                  </Badge>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 100) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    ${priceRange[0]} - ${priceRange[1]}/day
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 100])} />
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground hidden sm:inline">{filteredEquipment.length} items</span>
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredEquipment.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No equipment found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to find what you're looking for.</p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEquipment.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-background">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Add to wishlist</span>
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Quick view</span>
                      </Button>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <Button className="mx-auto" asChild>
                        <Link href={`/equipment/${item.id}`}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Rent Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 text-center">
                    <Badge variant="outline" className="mb-2">
                      {item.category}
                    </Badge>
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex justify-center gap-4">
                      <span className="text-sm">
                        <span className="font-medium text-primary">${item.dailyPrice.toFixed(2)}</span>/day
                      </span>
                      <span className="text-sm">
                        <span className="font-medium text-primary">${item.weeklyPrice.toFixed(2)}</span>/week
                      </span>
                    </div>
                    <div className="flex justify-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 mt-12">
            <Button variant="outline" size="icon" disabled>
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="icon">
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

