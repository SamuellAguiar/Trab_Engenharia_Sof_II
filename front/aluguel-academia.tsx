"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ShoppingCart,
  Heart,
  Search,
  ChevronDown,
  Globe,
  User,
  Menu,
  X,
  Star,
  Truck,
  ShieldCheck,
  Clock,
  CreditCard,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function AluguelAcademia() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const equipamentosDestaque = [
    {
      id: 1,
      nome: "Esteira Profissional",
      imagem: "/placeholder.svg?height=300&width=300",
      preco: 299.99,
      precoOferta: 249.99,
      categoria: "Cardio",
    },
    {
      id: 2,
      nome: "Bicicleta Ergométrica",
      imagem: "/placeholder.svg?height=300&width=300",
      preco: 189.99,
      precoOferta: 149.99,
      categoria: "Cardio",
    },
    {
      id: 3,
      nome: "Conjunto de Pesos",
      imagem: "/placeholder.svg?height=300&width=300",
      preco: 124.99,
      precoOferta: 99.99,
      categoria: "Musculação",
    },
    {
      id: 4,
      nome: "Banco Multifuncional",
      imagem: "/placeholder.svg?height=300&width=300",
      preco: 134.99,
      precoOferta: 119.99,
      categoria: "Musculação",
    },
  ]

  const depoimentos = [
    {
      id: 1,
      nome: "Carlos Silva",
      imagem: "/placeholder.svg?height=80&width=80",
      avaliacao: 5,
      texto:
        "Aluguei uma esteira por 3 meses e foi a melhor decisão. Equipamento de qualidade e entrega pontual. Recomendo!",
    },
    {
      id: 2,
      nome: "Mariana Oliveira",
      imagem: "/placeholder.svg?height=80&width=80",
      avaliacao: 5,
      texto:
        "O conjunto de pesos que aluguei estava em perfeito estado. O processo de devolução foi super simples. Ótimo serviço!",
    },
    {
      id: 3,
      nome: "Pedro Santos",
      imagem: "/placeholder.svg?height=80&width=80",
      avaliacao: 4,
      texto:
        "A bicicleta ergométrica que aluguei transformou meus treinos em casa. Atendimento excelente e preço justo.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="FitRent Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold">FitRent</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Início
              </Link>
              <Link href="/equipamentos" className="text-sm font-medium transition-colors hover:text-primary">
                Equipamentos
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                  Categorias <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/categoria/cardio" className="w-full">
                      Cardio
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/categoria/musculacao" className="w-full">
                      Musculação
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/categoria/funcional" className="w-full">
                      Funcional
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/categoria/acessorios" className="w-full">
                      Acessórios
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/sobre" className="text-sm font-medium transition-colors hover:text-primary">
                Sobre
              </Link>
              <Link href="/contato" className="text-sm font-medium transition-colors hover:text-primary">
                Contato
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="w-[200px] pl-8 md:w-[250px] rounded-full bg-muted"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Idioma</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Português</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
              <span className="sr-only">Entrar</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                2
              </Badge>
              <span className="sr-only">Carrinho</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4 bg-background">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar..." className="w-full pl-8 rounded-full bg-muted" />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Início
              </Link>
              <Link href="/equipamentos" className="text-sm font-medium transition-colors hover:text-primary">
                Equipamentos
              </Link>
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium transition-colors hover:text-primary">
                  Categorias <ChevronDown className="h-4 w-4" />
                </summary>
                <nav className="mt-2 ml-4 flex flex-col space-y-2">
                  <Link href="/categoria/cardio" className="text-sm transition-colors hover:text-primary">
                    Cardio
                  </Link>
                  <Link href="/categoria/musculacao" className="text-sm transition-colors hover:text-primary">
                    Musculação
                  </Link>
                  <Link href="/categoria/funcional" className="text-sm transition-colors hover:text-primary">
                    Funcional
                  </Link>
                  <Link href="/categoria/acessorios" className="text-sm transition-colors hover:text-primary">
                    Acessórios
                  </Link>
                </nav>
              </details>
              <Link href="/sobre" className="text-sm font-medium transition-colors hover:text-primary">
                Sobre
              </Link>
              <Link href="/contato" className="text-sm font-medium transition-colors hover:text-primary">
                Contato
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Banner Principal */}
        <section className="relative">
          <div className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Monte sua academia em casa sem gastar muito
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Alugue equipamentos de academia profissionais por semanas ou meses. Entrega e montagem incluídas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="font-medium">
                    Ver Equipamentos
                  </Button>
                  <Button size="lg" variant="outline" className="font-medium">
                    Como Funciona
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Equipamentos de academia"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categorias de Produtos */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">
              Categorias de Equipamentos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {["Cardio", "Musculação", "Funcional", "Acessórios"].map((categoria) => (
                <Link
                  key={categoria}
                  href={`/categoria/${categoria.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg bg-background shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=${categoria}`}
                      alt={categoria}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 w-full p-4">
                      <h3 className="text-lg font-semibold text-white">{categoria}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Produtos em Destaque */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Equipamentos em Destaque</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipamentosDestaque.map((produto) => (
                <div key={produto.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-background">
                    <Image
                      src={produto.imagem || "/placeholder.svg"}
                      alt={produto.nome}
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
                      {produto.categoria}
                    </Badge>
                    <h3 className="font-medium">{produto.nome}</h3>
                    <div className="flex justify-center gap-2">
                      <span className="text-muted-foreground line-through">R${produto.preco.toFixed(2)}/mês</span>
                      <span className="font-medium text-primary">R${produto.precoOferta.toFixed(2)}/mês</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button variant="outline" size="lg">
                Ver Todos os Equipamentos
              </Button>
            </div>
          </div>
        </section>

        {/* Por que Escolher Nossa Empresa */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">
              Por que Escolher a FitRent
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Truck className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Entrega e Montagem</h3>
                  <p className="text-muted-foreground">
                    Entregamos e montamos os equipamentos em sua casa sem custo adicional.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <ShieldCheck className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Equipamentos de Qualidade</h3>
                  <p className="text-muted-foreground">
                    Todos os equipamentos são de marcas reconhecidas e passam por manutenção regular.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Clock className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Flexibilidade de Planos</h3>
                  <p className="text-muted-foreground">
                    Alugue por semanas ou meses, com possibilidade de renovação ou troca de equipamentos.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <CreditCard className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Pagamento Facilitado</h3>
                  <p className="text-muted-foreground">
                    Diversas opções de pagamento, incluindo parcelamento sem juros em até 12x.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">
              O que Nossos Clientes Dizem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {depoimentos.map((depoimento) => (
                <Card key={depoimento.id} className="bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={depoimento.imagem || "/placeholder.svg"}
                        alt={depoimento.nome}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{depoimento.nome}</h3>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < depoimento.avaliacao ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{depoimento.texto}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Receba Nossas Ofertas</h2>
              <p className="max-w-[600px] text-primary-foreground/90 md:text-lg">
                Inscreva-se para receber ofertas exclusivas, dicas de treino e novidades sobre equipamentos.
              </p>
              <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
                <Input type="email" placeholder="Seu e-mail" className="bg-primary-foreground text-foreground" />
                <Button variant="secondary">Inscrever-se</Button>
              </div>
              <p className="text-xs text-primary-foreground/70">
                Ao se inscrever, você concorda com nossos Termos de Serviço e Política de Privacidade.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="FitRent Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-xl font-bold">FitRent</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Sua solução completa para aluguel de equipamentos de academia. Transforme sua casa em um espaço fitness.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Equipamentos</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Todos os Equipamentos
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Cardio
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Musculação
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Funcional
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Acessórios
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Empresa</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Sobre Nós
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Trabalhe Conosco
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Imprensa
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Suporte</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Central de Ajuda
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Contato
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Devolução e Reembolso
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Informações de Entrega
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Contato</h3>
              <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <p>Av. Paulista, 1000, São Paulo</p>
                <p>São Paulo, SP 01310-100</p>
                <p>Email: contato@fitrent.com.br</p>
                <p>Telefone: (11) 3456-7890</p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} FitRent. Todos os direitos reservados.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Política de Privacidade
                </Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Termos de Serviço
                </Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Política de Cookies
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/placeholder.svg?height=30&width=40&text=Visa" alt="Visa" width={40} height={30} />
                <Image src="/placeholder.svg?height=30&width=40&text=MC" alt="Mastercard" width={40} height={30} />
                <Image src="/placeholder.svg?height=30&width=40&text=PayPal" alt="PayPal" width={40} height={30} />
                <Image src="/placeholder.svg?height=30&width=40&text=Pix" alt="Pix" width={40} height={30} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

