"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Search, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <svg width="40" height="40" viewBox="0 0 40 40" className="text-primary" fill="currentColor">
              <rect width="12" height="40" rx="2" />
              <rect x="16" y="10" width="8" height="30" rx="2" />
              <rect x="28" y="20" width="12" height="20" rx="2" />
            </svg>
            <span className="text-xl font-bold text-white">FITMOVE</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/sobre" className="text-sm font-medium text-white transition-colors hover:text-primary">
              Sobre nós
            </Link>
            <Link href="/equipamentos" className="text-sm font-medium text-white transition-colors hover:text-primary">
              Equipamentos
            </Link>
            <Link href="/planos" className="text-sm font-medium text-white transition-colors hover:text-primary">
              Planos
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:text-primary hover:bg-white/10"
            asChild
          >
            <Link href="/login">
              <span className="text-sm font-bold">Login</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:text-primary hover:bg-white/10"
            asChild
          >
            <Link href="/carrinho">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary font-bold border-0">
                2
              </Badge>
              <span className="sr-only">Carrinho</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 p-4 space-y-4 bg-black/90">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-full pl-8 rounded-full bg-white/10 border-white/20 text-white"
            />
          </div>
          <nav className="flex flex-col space-y-4">
            <Link href="/sobre" className="text-sm font-medium text-white transition-colors hover:text-primary">
              Sobre nós
            </Link>
            <Link href="/equipamentos" className="text-sm font-medium text-white transition-colors hover:text-primary">
              Equipamentos
            </Link>
            <Link href="/planos" className="text-sm font-medium text-white transition-colors hover:text-primary">
              Planos
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

