"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { equipamentosAPI, carrinhoAPI, usuariosAPI } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function EquipamentoDetalhesPage() {
  const { id } = useParams()
  const [equipamento, setEquipamento] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [periodo, setPeriodo] = useState("diario")
  const { toast } = useToast()
  const userId = usuariosAPI.getCurrentUserId()

  useEffect(() => {
    const fetchEquipamento = async () => {
      try {
        setLoading(true)
        const data = await equipamentosAPI.getById(id)
        setEquipamento(data)
        setError(null)
      } catch (err) {
        console.error("Erro ao buscar equipamento:", err)
        setError("Não foi possível carregar os detalhes do equipamento.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchEquipamento()
    }
  }, [id])

  const handleAddToCart = async () => {
    try {
      if (!equipamento) return

      // Preparar o item para adicionar ao carrinho
      const itemToAdd = {
        itemId: equipamento.id,
        tipo: "equipamento",
        nome: equipamento.nome,
        imagem: equipamento.imagem,
        preco:
          periodo === "diario"
            ? equipamento.precoDiario
            : periodo === "semanal"
              ? equipamento.precoSemanal
              : equipamento.precoMensal,
        periodo: periodo,
        quantidade: 1,
      }

      // Adicionar ao carrinho no backend
      await carrinhoAPI.addItem(userId, itemToAdd)

      // Disparar evento para atualizar o contador do carrinho
      window.dispatchEvent(new Event("cartUpdated"))

      toast({
        title: "Adicionado ao carrinho",
        description: `${equipamento.nome} foi adicionado ao seu carrinho.`,
      })
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o item ao carrinho.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="animate-pulse">Carregando detalhes do equipamento...</div>
      </div>
    )
  }

  if (error || !equipamento) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Erro</h2>
          <p className="mb-6">{error || "Equipamento não encontrado."}</p>
          <Button asChild>
            <Link href="/equipamentos">Voltar para Equipamentos</Link>
          </Button>
        </div>
      </div>
    )
  }

  const precoAtual =
    periodo === "diario"
      ? equipamento.precoDiario
      : periodo === "semanal"
        ? equipamento.precoSemanal
        : equipamento.precoMensal

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/equipamentos" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Equipamentos
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">{equipamento.nome}</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/equipamentos" className="hover:text-primary">
            Equipamentos
          </Link>
          <span className="mx-2">/</span>
          <span>{equipamento.nome}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={equipamento.imagem || "/placeholder.svg?height=600&width=600"}
            alt={equipamento.nome}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= (equipamento.avaliacao || 4) ? "fill-primary text-primary" : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">{equipamento.avaliacoes || 12} avaliações</span>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">
              R${precoAtual.toFixed(2)}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                / {periodo === "diario" ? "dia" : periodo === "semanal" ? "semana" : "mês"}
              </span>
            </h2>
            <p className="text-muted-foreground">{equipamento.descricao}</p>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h3 className="font-medium mb-3">Período de Aluguel</h3>
            <RadioGroup value={periodo} onValueChange={setPeriodo} className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem value="diario" id="diario" className="peer sr-only" />
                <Label
                  htmlFor="diario"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="font-semibold">Diário</span>
                  <span className="text-sm text-muted-foreground">R${equipamento.precoDiario.toFixed(2)}/dia</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="semanal" id="semanal" className="peer sr-only" />
                <Label
                  htmlFor="semanal"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="font-semibold">Semanal</span>
                  <span className="text-sm text-muted-foreground">R${equipamento.precoSemanal.toFixed(2)}/semana</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="mensal" id="mensal" className="peer sr-only" />
                <Label
                  htmlFor="mensal"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="font-semibold">Mensal</span>
                  <span className="text-sm text-muted-foreground">R${equipamento.precoMensal.toFixed(2)}/mês</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            <Button size="lg" onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/carrinho">Ver Carrinho</Link>
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Entrega e retirada disponíveis</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Garantia de qualidade e manutenção</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="descricao">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="descricao">Descrição</TabsTrigger>
            <TabsTrigger value="especificacoes">Especificações</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>
          <TabsContent value="descricao" className="mt-6">
            <div className="prose max-w-none">
              <p>{equipamento.descricao}</p>
              <p>
                Este equipamento é ideal para academias, estúdios de fitness e uso doméstico. Fabricado com materiais de
                alta qualidade, oferece durabilidade e desempenho excepcional para seus treinos.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="especificacoes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Dimensões</h3>
                <p className="text-sm text-muted-foreground">
                  {equipamento.dimensoes || "120 x 80 x 140 cm (C x L x A)"}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Peso</h3>
                <p className="text-sm text-muted-foreground">{equipamento.peso || "75 kg"}</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Material</h3>
                <p className="text-sm text-muted-foreground">
                  {equipamento.material || "Aço carbono com pintura eletrostática"}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Capacidade</h3>
                <p className="text-sm text-muted-foreground">{equipamento.capacidade || "Suporta até 150 kg"}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="avaliacoes" className="mt-6">
            <div className="space-y-6">
              {(
                equipamento.comentarios || [
                  {
                    nome: "João Silva",
                    data: "12/03/2023",
                    avaliacao: 5,
                    comentario: "Excelente equipamento, muito bem conservado e funcionando perfeitamente.",
                  },
                  {
                    nome: "Maria Oliveira",
                    data: "28/02/2023",
                    avaliacao: 4,
                    comentario: "Ótimo custo-benefício. A entrega foi rápida e o equipamento estava em boas condições.",
                  },
                ]
              ).map((comentario, index) => (
                <div key={index} className="border-b pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{comentario.nome}</h4>
                    <span className="text-sm text-muted-foreground">{comentario.data}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= comentario.avaliacao ? "fill-primary text-primary" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm">{comentario.comentario}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

