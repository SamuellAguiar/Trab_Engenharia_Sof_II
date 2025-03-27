"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { pedidosAPI, usuariosAPI } from "@/lib/api"

export default function ConfirmacaoPage() {
  const [pedido, setPedido] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()
  const pedidoId = searchParams.get("pedidoId")
  const userId = usuariosAPI.getCurrentUserId()

  useEffect(() => {
    const fetchPedido = async () => {
      if (!pedidoId) {
        setError("ID do pedido não fornecido")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await pedidosAPI.getById(userId, pedidoId)
        setPedido(data)
        setError(null)
      } catch (err) {
        console.error("Erro ao buscar pedido:", err)
        setError("Não foi possível carregar os detalhes do pedido. Por favor, tente novamente mais tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchPedido()
  }, [pedidoId, userId])

  // Exibir indicador de carregamento
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">Carregando detalhes do pedido...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Exibir mensagem de erro
  if (error || !pedido) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error || "Pedido não encontrado"}</AlertDescription>
              </Alert>
              <div className="text-center">
                <p className="text-muted-foreground mb-6">Não foi possível encontrar informações sobre seu pedido.</p>
                <Button asChild>
                  <Link href="/equipamentos">Ver Equipamentos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  // Formatar a data do pedido
  const orderDate = new Date(pedido.dataHora).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  // Calcular data estimada de entrega (3 dias úteis)
  const deliveryDate = new Date(pedido.dataHora)
  deliveryDate.setDate(deliveryDate.getDate() + 3)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Pedido Confirmado!</h1>
            <p className="text-muted-foreground">
              Obrigado pelo seu pedido. Sua solicitação foi recebida e está sendo processada.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-semibold">Pedido #{pedido.id}</h2>
                    <p className="text-sm text-muted-foreground">Realizado em {orderDate}</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {pedido.status}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Package className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">Processando</h3>
                    <p className="text-xs text-muted-foreground">Seu pedido está sendo preparado</p>
                  </div>

                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Package className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">Entrega</h3>
                    <p className="text-xs text-muted-foreground">Você receberá informações de rastreamento em breve</p>
                  </div>

                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">Entrega Estimada</h3>
                    <p className="text-xs text-muted-foreground">{formattedDeliveryDate}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Itens do Pedido</h3>
                  <div className="space-y-4">
                    {pedido.itens.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium">{item.nome}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantidade: {item.quantidade || 1} | Período: {item.periodo || "diário"}
                          </p>
                        </div>
                        <p className="font-medium">R${((item.preco || 0) * (item.quantidade || 1)).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R${pedido.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entrega</span>
                    <span>{pedido.taxaEntrega === 0 ? "Grátis" : `R$${pedido.taxaEntrega.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impostos</span>
                    <span>R${pedido.impostos.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>R${pedido.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">O que acontece agora?</h2>
            <p className="text-muted-foreground">
              Você receberá um e-mail de confirmação com os detalhes do seu pedido e informações de rastreamento assim
              que seu pedido for enviado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild>
                <Link href="/equipamentos">Continuar Alugando</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Voltar para Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

