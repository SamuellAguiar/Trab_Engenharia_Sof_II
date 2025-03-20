"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Share2, Star, Check, Info, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function EquipmentDetailPage({ params }: { params: { id: string } }) {
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState("daily")
  const [quantity, setQuantity] = useState(1)

  // In a real app, you would fetch this data based on the ID
  const equipment = {
    id: params.id,
    name: "Commercial Treadmill",
    description:
      "Professional-grade treadmill with a powerful motor, spacious running surface, and advanced features for an effective cardio workout. Suitable for all fitness levels.",
    features: [
      "3.5 HP continuous duty motor",
      "0-12 mph speed range",
      "0-15% incline range",
      '20" x 60" running surface',
      "LCD display with workout programs",
      "Heart rate monitoring",
      "Foldable design for easy storage",
      "Maximum user weight: 350 lbs",
    ],
    specifications: {
      brand: "LifeFitness",
      model: "T5 Track Connect",
      dimensions: '80" L x 34" W x 54" H',
      weight: "250 lbs",
      powerRequirements: "120V, 15A circuit",
      warranty: "Included during rental period",
    },
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    pricing: {
      daily: 29.99,
      weekly: 149.99,
      monthly: 449.99,
    },
    category: "Cardio",
    brand: "LifeFitness",
    rating: 4.8,
    reviewCount: 24,
    availability: "In Stock",
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value)
    }
  }

  const getPriceForSelectedPeriod = () => {
    return equipment.pricing[selectedRentalPeriod]
  }

  const getTotalPrice = () => {
    return getPriceForSelectedPeriod() * quantity
  }

  const rentalPeriodLabel = {
    daily: "day",
    weekly: "week",
    monthly: "month",
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/equipment" className="hover:text-primary">
            Equipment
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/equipment/${equipment.category.toLowerCase()}`} className="hover:text-primary">
            {equipment.category}
          </Link>
          <span className="mx-2">/</span>
          <span>{equipment.name}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-background">
            <Image
              src={equipment.images[0] || "/placeholder.svg"}
              alt={equipment.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {equipment.images.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-background">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${equipment.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{equipment.category}</Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {equipment.availability}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold">{equipment.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(equipment.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {equipment.rating} ({equipment.reviewCount} reviews)
              </span>
            </div>
          </div>

          <p className="text-muted-foreground">{equipment.description}</p>

          <div className="space-y-4 border-t border-b py-6">
            <h3 className="font-medium">Rental Period</h3>
            <RadioGroup
              value={selectedRentalPeriod}
              onValueChange={setSelectedRentalPeriod}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                <RadioGroupItem value="daily" id="daily" className="sr-only" />
                <Label htmlFor="daily" className="flex flex-col cursor-pointer">
                  <span className="font-medium">Daily</span>
                  <span className="text-2xl font-bold text-primary">${equipment.pricing.daily.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">per day</span>
                </Label>
              </div>
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                <RadioGroupItem value="weekly" id="weekly" className="sr-only" />
                <Label htmlFor="weekly" className="flex flex-col cursor-pointer">
                  <span className="font-medium">Weekly</span>
                  <span className="text-2xl font-bold text-primary">${equipment.pricing.weekly.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">per week</span>
                </Label>
              </div>
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
                <Label htmlFor="monthly" className="flex flex-col cursor-pointer">
                  <span className="font-medium">Monthly</span>
                  <span className="text-2xl font-bold text-primary">${equipment.pricing.monthly.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">per month</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-32">
              <Label htmlFor="quantity" className="mb-2 block">
                Quantity
              </Label>
              <div className="flex">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                  className="h-10 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Total</Label>
              <div className="text-2xl font-bold">${getTotalPrice().toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">
                for {quantity} {quantity === 1 ? "item" : "items"} per {rentalPeriodLabel[selectedRentalPeriod]}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="secondary" className="flex-1">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
            <Button size="lg" variant="outline" className="sm:flex-none">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>Free delivery on orders over $100</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>Free assembly and setup</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              <span>Maintenance included during rental period</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="features">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger
              value="features"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Features
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              FAQ
            </TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {equipment.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Product video would be displayed here</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="space-y-4">
                  {Object.entries(equipment.specifications).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 border-b pb-2">
                      <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                      <div>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Dimensions</h3>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Product dimensions diagram would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-5xl font-bold mb-2">{equipment.rating}</div>
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(equipment.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">Based on {equipment.reviewCount} reviews</div>
                    <Button>Write a Review</Button>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {[
                      {
                        name: "Sarah J.",
                        rating: 5,
                        date: "2 months ago",
                        comment:
                          "Excellent treadmill! It was delivered on time and the setup was quick and professional. The machine is sturdy and runs smoothly. Perfect for my home gym setup.",
                      },
                      {
                        name: "Michael T.",
                        rating: 4,
                        date: "3 months ago",
                        comment:
                          "Great quality treadmill with all the features I needed. The only reason for 4 stars is that the delivery was a day late, but the team was very apologetic and professional.",
                      },
                    ].map((review, index) => (
                      <div key={index} className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{review.name}</div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                        <div className="flex mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="faq" className="pt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  {
                    question: "What is included in the rental?",
                    answer:
                      "The rental includes the equipment, delivery, professional setup, demonstration of proper use, and maintenance during the rental period. We also provide pickup at the end of your rental term.",
                  },
                  {
                    question: "Can I extend my rental period?",
                    answer:
                      "Yes, you can extend your rental at any time. Simply contact our customer service team at least 3 days before your rental period ends, and we'll arrange the extension at the current rental rates.",
                  },
                  {
                    question: "What if the equipment breaks during my rental?",
                    answer:
                      "We provide full maintenance support during your rental period. If any issues arise, contact our support team and we'll send a technician to repair or replace the equipment at no additional cost.",
                  },
                  {
                    question: "Is there a security deposit required?",
                    answer:
                      "Yes, we require a refundable security deposit that varies based on the equipment value. The deposit is fully refunded when the equipment is returned in good condition.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h4>
                    <p className="mt-2 text-muted-foreground pl-7">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Equipment */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: 2,
              name: "Spinning Bike",
              image: "/placeholder.svg?height=300&width=300",
              dailyPrice: 19.99,
              weeklyPrice: 99.99,
              category: "Cardio",
            },
            {
              id: 3,
              name: "Elliptical Trainer",
              image: "/placeholder.svg?height=300&width=300",
              dailyPrice: 24.99,
              weeklyPrice: 129.99,
              category: "Cardio",
            },
            {
              id: 4,
              name: "Rowing Machine",
              image: "/placeholder.svg?height=300&width=300",
              dailyPrice: 22.99,
              weeklyPrice: 119.99,
              category: "Cardio",
            },
            {
              id: 5,
              name: "Stair Climber",
              image: "/placeholder.svg?height=300&width=300",
              dailyPrice: 26.99,
              weeklyPrice: 139.99,
              category: "Cardio",
            },
          ].map((item) => (
            <div key={item.id} className="group relative">
              <div className="aspect-square overflow-hidden rounded-lg bg-background">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <Button className="mx-auto" asChild>
                    <Link href={`/equipment/${item.id}`}>View Details</Link>
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16">
        <Card>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Need Help Choosing Equipment?</h3>
                <p className="text-muted-foreground mb-4">
                  Our fitness experts can help you select the right equipment for your goals, space, and budget.
                </p>
                <Button asChild>
                  <Link href="/contact">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-40 md:h-full rounded-lg overflow-hidden bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Support team image would be displayed here</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

