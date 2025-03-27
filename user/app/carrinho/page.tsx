"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"
import { carrinhoAPI, updateItemQuantity, removeItemFromCarrinho, clearCarrinho, authAPI } from "@/lib/api"

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { toast } = useToast()

  // Carregar itens do carrinho do backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true)

        // Verificar se o usuário está autenticado
        if (!authAPI.isAuthenticated()) {
          // Carregar itens do localStorage para usuários não autenticados
          const localCart = JSON.parse(localStorage.getItem("cart") || "[]")
          setCartItems(localCart)
          setLoading(false)
          return
        }

        const items = await carrinhoAPI.getItems()
        setCartItems(items)
        setError(null)
      } catch (err) {
        console.error("Erro ao buscar itens do carrinho:", err)
        setError("Não foi possível carregar os itens do carrinho. Por favor, tente novamente mais tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [])

  // Atualizar quantidade de um item
  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return

    try {
      if (authAPI.isAuthenticated()) {
        await updateItemQuantity(id, newQuantity)
      } else {
        // Atualizar no localStorage para usuários não autenticados
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]")
        const updatedCart = localCart.map((item) => (item.id === id ? { ...item, quantidade: newQuantity } : item))
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        setCartItems(updatedCart)
      }

      // Atualizar o estado local
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantidade: newQuantity } : item)))

      // Disparar evento para atualizar o contador no header
      window.dispatchEvent(new Event("cartUpdated"))
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a quantidade do item.",
        variant: "destructive",
      })
    }
  }

  // Remover item do carrinho
  const handleRemoveItem = async (id) => {
    try {
      if (authAPI.isAuthenticated()) {
        await removeItemFromCarrinho(id)
      } else {
        // Remover do localStorage para usuários não autenticados
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]")
        const updatedCart = localCart.filter((item) => item.id !== id)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
      }

      // Atualizar o estado local
      setCartItems((prev) => prev.filter((item) => item.id !== id))

      // Disparar evento para atualizar o contador no header
      window.dispatchEvent(new Event("cartUpdated"))

      toast({
        title: "Item removido",
        description: "O item foi removido do seu carrinho.",
      })
    } catch (error) {
      console.error("Erro ao remover item:", error)
      toast({
        title: "Erro",
        description: "Não foi possível remover o item do carrinho.",
        variant: "destructive",
      })
    }
  }

  // Limpar o carrinho
  const handleClearCart = async () => {
    try {
      if (authAPI.isAuthenticated()) {
        await clearCarrinho()
      } else {
        // Limpar localStorage para usuários não autenticados
        localStorage.setItem("cart", "[]")
      }

      // Atualizar o estado local
      setCartItems([])

      // Disparar evento para atualizar o contador no header
      window.dispatchEvent(new Event("cartUpdated"))

      toast({
        title: "Carrinho limpo",
        description: "Todos os itens foram removidos do seu carrinho.",
      })
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error)
      toast({
        title: "Erro",
        description: "Não foi possível limpar o carrinho.",
        variant: "destructive",
      })
    }
  }

  // Ir para o checkout
  const handleGoToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de finalizar o pedido.",
        variant: "destructive",
      })
      return
    }

    // Redirecionar para a página de checkout
    router.push("/checkout")
  }

  // Calcular valores do carrinho
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.precoMensal || 0
    const quantity = item.quantidade || 1
    return sum + price * quantity
  }, 0)

  const entrega = subtotal > 300 ? 0 : 50
  const imposto = subtotal * 0.08
  const total = subtotal + entrega + imposto

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Seu Carrinho</h1>
          </div>

          {/* Exibir mensagem de erro se houver */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Exibir indicador de carregamento */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-muted-foreground">Carregando itens do carrinho...</p>
            </div>
          ) : cartItems.length === 0 ? (
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
                                src={item.imagem || "/placeholder.svg?height=100&width=100"}
                                alt={item.nome || "Produto"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.nome || "Produto"}</h3>
                              <p className="text-sm text-muted-foreground md:hidden mt-1">
                                R${item.precoMensal?.toFixed(2)} por {item.periodo || "mês"}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-1 h-auto p-0 text-sm text-destructive hover:text-destructive/80 md:hidden"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="mr-1 h-3 w-3" />
                                Remover
                              </Button>
                            </div>
                          </div>
                          <div className="col-span-2 text-center hidden md:block">
                            R${((parseFloat(item.precoMensal) || 0) * (item.quantidade || 1)).toFixed(2)}
                          </div>
                          <div className="col-span-2 flex items-center justify-center">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => handleUpdateQuantity(item.id, (item.quantidade || 1) - 1)}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Diminuir</span>
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantidade || 1}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => handleUpdateQuantity(item.id, (item.quantidade || 1) + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Aumentar</span>
                              </Button>
                            </div>
                          </div>
                          <div className="col-span-2 text-right flex items-center justify-between md:justify-end">
                            <span className="font-medium">
                              R${((parseFloat(item.precoMensal) || 0) * (item.quantidade || 1)).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive/80 hidden md:inline-flex"
                              onClick={() => handleRemoveItem(item.id)}
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
                    <Button variant="ghost" onClick={handleClearCart}>
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
                        <Button
                          className="w-full"
                          size="lg"
                          onClick={handleGoToCheckout}
                          disabled={cartItems.length === 0}
                        >
                          Finalizar Pedido
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

