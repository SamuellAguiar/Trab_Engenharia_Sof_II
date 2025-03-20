"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Search, Star, Clock, ShieldCheck, Truck, Dumbbell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const featuredEquipment = [
    {
      id: 1,
      name: "Esteira Profissional",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 29.99,
      weeklyPrice: 149.99,
      category: "Cardio",
    },
    {
      id: 2,
      name: "Kit Halteres Ajustáveis",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 14.99,
      weeklyPrice: 79.99,
      category: "Musculação",
    },
    {
      id: 3,
      name: "Bicicleta Ergométrica",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 19.99,
      weeklyPrice: 99.99,
      category: "Cardio",
    },
    {
      id: 4,
      name: "Banco Multifuncional",
      image: "/placeholder.svg?height=300&width=300",
      dailyPrice: 12.99,
      weeklyPrice: 69.99,
      category: "Musculação",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Silva",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Alugar uma esteira para meu home office foi a melhor decisão. O equipamento estava em perfeitas condições e a entrega foi super rápida!",
    },
    {
      id: 2,
      name: "Miguel Oliveira",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Precisei de pesos para um programa de treinamento de 3 meses. O processo de aluguel foi tranquilo e a qualidade do equipamento superou minhas expectativas.",
    },
    {
      id: 3,
      name: "Camila Dias",
      image: "/placeholder.svg?height=80&width=80",
      rating: 4,
      text: "Ótimo serviço! Aluguei uma bicicleta ergométrica durante o inverno e me manteve ativa. A opção de aluguel mensal economizou muito dinheiro.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header is in components/header.tsx */}

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Orange%20Dynamic%20Gym%20Presentation.jpg-HsYHlfI5ml7Mpwiy98gpydiqAjOWDx.jpeg"
              alt="Treino fitness"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          </div>

          <div className="container relative z-10 px-4 md:px-6 flex flex-col h-full justify-end pb-20 md:pb-32">
            <div className="max-w-4xl flex flex-col items-start gap-6">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white">Seu treino,</h2>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary">
                  SUA ESCOLHA,
                </h1>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                  NOSSO EQUIPAMENTO
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                  size="lg"
                  className="font-bold text-lg bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6"
                >
                  ALUGUE JÁ
                </Button>
                <Button size="lg" variant="outline" className="font-medium border-white text-white hover:bg-white/10">
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Categories */}
        <section className="bg-accent py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Navegue por Categoria</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {["Cardio", "Musculação", "Funcional", "Recuperação"].map((category) => (
                <Link
                  key={category}
                  href={`/categoria/${category.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg bg-card shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=${category}`}
                      alt={category}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 w-full p-4">
                      <h3 className="text-lg font-semibold text-white">{category}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Equipment */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Equipamentos em Destaque</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEquipment.map((equipment) => (
                <div key={equipment.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-card">
                    <Image
                      src={equipment.image || "/placeholder.svg"}
                      alt={equipment.name}
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
                        <span className="sr-only">Adicionar aos favoritos</span>
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Visualização rápida</span>
                      </Button>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <Button className="mx-auto">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Alugar Agora
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 text-center">
                    <Badge variant="outline" className="mb-2">
                      {equipment.category}
                    </Badge>
                    <h3 className="font-medium">{equipment.name}</h3>
                    <div className="flex justify-center gap-4">
                      <span className="text-sm">
                        <span className="font-medium text-primary">R${equipment.dailyPrice.toFixed(2)}</span>/dia
                      </span>
                      <span className="text-sm">
                        <span className="font-medium text-primary">R${equipment.weeklyPrice.toFixed(2)}</span>/semana
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Ver Todos os Equipamentos
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-accent py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Navegue e Selecione</h3>
                <p className="text-muted-foreground">
                  Escolha entre nossa ampla gama de equipamentos de fitness de alta qualidade para sua casa ou academia.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Escolha o Período</h3>
                <p className="text-muted-foreground">
                  Selecione opções de aluguel diário, semanal ou mensal para se adequar ao seu cronograma e orçamento.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Entrega e Montagem</h3>
                <p className="text-muted-foreground">
                  Entregamos, montamos e demonstramos como usar o equipamento com segurança em seu espaço.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">
              Por Que Escolher a FitMove
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-primary/50">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Dumbbell className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Equipamentos Premium</h3>
                  <p className="text-muted-foreground">
                    Equipamentos de fitness de nível comercial mantidos nos mais altos padrões.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-primary/50">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <ShieldCheck className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Higienizados e Seguros</h3>
                  <p className="text-muted-foreground">
                    Todos os equipamentos são completamente limpos e higienizados entre aluguéis.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-primary/50">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Truck className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Entrega Gratuita</h3>
                  <p className="text-muted-foreground">
                    Entrega, montagem e retirada gratuitas para aluguéis acima de R$300.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-primary/50">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Clock className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Termos Flexíveis</h3>
                  <p className="text-muted-foreground">
                    Opções de aluguel diário, semanal ou mensal sem compromissos de longo prazo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-accent py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">
              O Que Nossos Clientes Dizem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{testimonial.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="rounded-lg bg-primary text-primary-foreground p-8 md:p-10">
              <div className="grid gap-6 md:grid-cols-2 md:gap-10 items-center">
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">Pronto para Começar Sua Jornada Fitness?</h2>
                  <p className="mt-4 text-primary-foreground/90 md:text-lg">
                    Obtenha o equipamento que você precisa sem o compromisso de longo prazo. Opções de aluguel flexíveis
                    para cada objetivo fitness.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                  <Button size="lg" variant="secondary">
                    Ver Equipamentos
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Fale Conosco
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="border-t py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Assine Nossa Newsletter</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                Inscreva-se para receber ofertas especiais, dicas de fitness e promoções exclusivas de equipamentos.
              </p>
              <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
                <Input type="email" placeholder="Digite seu email" className="bg-card" />
                <Button>Inscrever-se</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Ao se inscrever, você concorda com nossos Termos de Serviço e Política de Privacidade.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer is in components/footer.tsx */}
    </div>
  )
}

