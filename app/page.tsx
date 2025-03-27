"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Dados mockados para equipamentos
const mockEquipamentos = [
  {
    id: 1,
    nome: "Esteira Profissional",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 29.99,
    precoMensal: 299.99,
    categoria: "Cardio",
  },
  {
    id: 2,
    nome: "Bicicleta Ergométrica",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 19.99,
    precoMensal: 199.99,
    categoria: "Cardio",
  },
  {
    id: 3,
    nome: "Conjunto de Halteres",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 14.99,
    precoMensal: 149.99,
    categoria: "Musculação",
  },
  {
    id: 4,
    nome: "Banco Multifuncional",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 12.99,
    precoMensal: 129.99,
    categoria: "Musculação",
  },
]

export default function HomePage() {
  const [addedToCart, setAddedToCart] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  // Função para adicionar ao carrinho
  const addToCart = (equipment:any) => {
    // Adicionar ao carrinho local
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    cart.push({
      id: equipment.id,
      nome: equipment.nome,
      preco: equipment.precoDiario,
      quantidade: 1,
    })
    localStorage.setItem("cart", JSON.stringify(cart))

    // Atualizar contagem
    setCartCount(cart.length)

    // Feedback visual
    setAddedToCart(equipment.id)
    setTimeout(() => setAddedToCart(null), 2000)

    // Disparar evento para atualizar o contador no header
    window.dispatchEvent(new Event("cartUpdated"))
  }

  // Carregar carrinho do localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.length)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner com imagem de fundo */}
        <section className="relative h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
              alt="Equipamentos de academia"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Equipamentos de academia para sua casa</h1>
              <p className="text-lg mb-6">
                Alugue equipamentos profissionais por dia, semana ou mês. Entrega e montagem incluídas.
              </p>
              <Button size="lg" className="bg-primary text-black hover:bg-primary/90" asChild>
                <Link href="/equipamentos">Ver Equipamentos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Equipamentos em Destaque */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8">Equipamentos em Destaque</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockEquipamentos.map((equipment) => (
                <div key={equipment.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-card">
                    <Image
                      src={equipment.imagem || "/placeholder.svg"}
                      alt={equipment.nome}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        className={`mx-auto ${
                          addedToCart === equipment.id
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-primary hover:bg-primary/90 text-black"
                        }`}
                        onClick={() => addToCart(equipment)}
                        disabled={addedToCart === equipment.id}
                      >
                        {addedToCart === equipment.id ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            ADICIONADO
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            ALUGAR
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-medium">{equipment.nome}</h3>
                    <div className="flex justify-center gap-4 mt-1">
                      <span className="text-sm">
                        <span className="font-medium text-primary">R${equipment.precoDiario.toFixed(2)}</span>/dia
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button asChild>
                <Link href="/equipamentos">Ver Todos os Equipamentos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-black py-12">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
            <p className="max-w-2xl mx-auto mb-6">
              Transforme sua casa em uma academia com equipamentos profissionais por uma fração do custo.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/equipamentos">Ver Equipamentos</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

