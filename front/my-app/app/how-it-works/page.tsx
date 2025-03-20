import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorksPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">How It Works</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>How It Works</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Renting Fitness Equipment Made Simple</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We've streamlined the process of renting high-quality fitness equipment to make your fitness journey as smooth
          as possible.
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
            1
          </div>
          <Card className="pt-8">
            <CardContent className="text-center">
              <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Select</h3>
              <p className="text-muted-foreground">
                Explore our wide range of high-quality fitness equipment. Filter by category, brand, or price to find
                exactly what you need.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
            2
          </div>
          <Card className="pt-8">
            <CardContent className="text-center">
              <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Rental Period</h3>
              <p className="text-muted-foreground">
                Select daily, weekly, or monthly rental options to fit your schedule and budget. Flexible terms with no
                long-term commitments.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
            3
          </div>
          <Card className="pt-8">
            <CardContent className="text-center">
              <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Delivery & Setup</h3>
              <p className="text-muted-foreground">
                We deliver, set up, and demonstrate how to use the equipment safely in your space. Free delivery on
                orders over $100.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Steps */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
            4
          </div>
          <Card className="pt-8">
            <CardContent className="text-center">
              <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Your Equipment</h3>
              <p className="text-muted-foreground">
                Use your rented equipment for the duration of your rental period. Our team is available for support if
                you have any questions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
            5
          </div>
          <Card className="pt-8">
            <CardContent className="text-center">
              <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <polyline points="1 20 1 14 7 14"></polyline>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Return or Extend</h3>
              <p className="text-muted-foreground">
                When your rental period ends, we'll pick up the equipment, or you can easily extend your rental if you
                need more time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Benefits of Renting with FitRent</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">For Home Users</h3>
            <ul className="space-y-3">
              {[
                "Try before you buy - test equipment before making a purchase",
                "No long-term commitment or large upfront investment",
                "Access to commercial-grade equipment at affordable prices",
                "Perfect for temporary fitness goals or seasonal training",
                "Free delivery, setup, and pickup included",
                "Maintenance and support included during rental period",
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">For Business Users</h3>
            <ul className="space-y-3">
              {[
                "Outfit temporary gym spaces or pop-up fitness studios",
                "Supplement existing equipment during peak seasons",
                "Test new equipment types before purchasing for your facility",
                "Flexible rental terms to match your business needs",
                "Bulk rental discounts available",
                "Professional installation and maintenance included",
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              question: "What is included in the rental fee?",
              answer:
                "Our rental fee includes the equipment, delivery, professional setup, demonstration of proper use, maintenance during the rental period, and pickup at the end of your rental term.",
            },
            {
              question: "Can I extend my rental period?",
              answer:
                "Yes, you can extend your rental at any time. Simply contact our customer service team at least 3 days before your rental period ends, and we'll arrange the extension at the current rental rates.",
            },
            {
              question: "Is there a security deposit required?",
              answer:
                "Yes, we require a refundable security deposit that varies based on the equipment value. The deposit is fully refunded when the equipment is returned in good condition.",
            },
            {
              question: "What if the equipment breaks during my rental?",
              answer:
                "We provide full maintenance support during your rental period. If any issues arise, contact our support team and we'll send a technician to repair or replace the equipment at no additional cost.",
            },
            {
              question: "Do you offer delivery to all areas?",
              answer:
                "We currently deliver to most major metropolitan areas and surrounding suburbs. Enter your zip code during checkout to confirm delivery availability in your area.",
            },
            {
              question: "Can I purchase the equipment after renting?",
              answer:
                "Yes, we offer a rent-to-own option. If you decide to purchase the equipment, a portion of your rental payments can be applied toward the purchase price. Contact our sales team for details.",
            },
          ].map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg bg-primary text-primary-foreground p-8 md:p-10 text-center">
        <h2 className="text-2xl font-bold md:text-3xl mb-4">Ready to Get Started?</h2>
        <p className="max-w-2xl mx-auto mb-6 text-primary-foreground/90">
          Browse our selection of premium fitness equipment and find the perfect fit for your fitness goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary">
            Browse Equipment
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <Link href="/contact">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

