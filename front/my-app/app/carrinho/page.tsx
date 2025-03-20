"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      nome: "Esteira Profissional",
      imagem: "/placeholder.svg?height=100&width=100",
      preco: 299.99,
      periodo: "mensal",
      quantidade: 1,
    },
    {
      id: 2,
      nome: "Conjunto de Halteres",
      imagem: "/placeholder.svg?height=100&width=100",
      preco: 149.99,
      periodo: "mensal",
      quantidade: 1,
    },
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantidade: newQuantity } : item)))
  }

  const updatePeriod = (id, newPeriod) => {
    // Em uma aplicação real, você buscaria o preço atualizado com base no novo período
    const priceMap = {
      1: { diario: 29.99, semanal: 149.99, mensal: 299.99 },
      2: { diario: 14.99, semanal: 79.99, mensal: 149.99 },
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, periodo: newPeriod, preco: priceMap[id][newPeriod] } : item)),
    )
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.preco * item.quantidade, 0)
  const entrega = subtotal > 300 ? 0 : 50
  const imposto = subtotal * 0.08
  const total = subtotal + entrega + imposto

  const periodoLabel = {
    diario: "dia",
    semanal: "semana",
    mensal: "mês",
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seu Carrinho</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span>Carrinho</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground mb-8">
            Parece que você ainda não adicionou nenhum equipamento ao seu carrinho.
          </p>
          <Button asChild>
            <Link href="/equipamentos">Ver Equipamentos</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Equipamento</div>
                  <div className="col-span-2 text-center">Preço</div>
                  <div className="col-span-2 text-center">Quantidade</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>
                <Separator />
                {cartItems.map((item) => (
                  <div key={item.id} className="py-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden">
                          <Image
                            src={item.imagem || "/placeholder.svg"}
                            alt={item.nome}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.nome}</h3>
                          <div className="flex items-center mt-1">
                            <Select value={item.periodo} onValueChange={(value) => updatePeriod(item.id, value)}>
                              <SelectTrigger className="h-8 w-[120px] text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="diario">Aluguel Diário</SelectItem>
                                <SelectItem value="semanal">Aluguel Semanal</SelectItem>
                                <SelectItem value="mensal">Aluguel Mensal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <p className="text-sm text-muted-foreground md:hidden mt-1">
                            R${item.preco.toFixed(2)} por {periodoLabel[item.periodo]}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1 h-auto p-0 text-sm text-destructive hover:text-destructive/80 md:hidden"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Remover
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2 text-center hidden md:block">
                        R${item.preco.toFixed(2)} por {periodoLabel[item.periodo]}
                      </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Diminuir</span>
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantidade}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Aumentar</span>
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2 text-right flex items-center justify-between md:justify-end">
                        <span className="font-medium">R${(item.preco * item.quantidade).toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive/80 hidden md:inline-flex"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remover</span>
                        </Button>
                      </div>
                    </div>
                    {cartItems.indexOf(item) < cartItems.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-muted p-6 rounded-b-lg">
                <Button variant="outline" asChild>
                  <Link href="/equipamentos">Continuar Alugando</Link>
                </Button>
                <Button variant="ghost" onClick={() => setCartItems([])}>
                  Limpar Carrinho
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Entrega</span>
                    <span>{entrega === 0 ? "Grátis" : `R$${entrega.toFixed(2)}`}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Impostos</span>
                    <span>R${imposto.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>R${total.toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/checkout">
                        Finalizar Pedido
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">ou</span>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Input type="text" placeholder="Código promocional" className="rounded-r-none" />
                        <Button className="rounded-l-none">Aplicar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Precisa de Ajuda?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Nossos especialistas em equipamentos fitness estão disponíveis para ajudar com seu aluguel.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
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
                      className="h-4 w-4 text-primary"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>(11) 3456-7890</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-2">
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
                      className="h-4 w-4 text-primary"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>suporte@fitrent.com.br</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

