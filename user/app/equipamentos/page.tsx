"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ShoppingCart, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { equipamentosAPI, addItemToCarrinho } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function EquipamentosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [equipamentos, setEquipamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addedToCart, setAddedToCart] = useState(null)
  const { toast } = useToast()

  // Buscar equipamentos do backend
  useEffect(() => {
    const fetchEquipamentos = async () => {
      try {
        setLoading(true)
        const data = await equipamentosAPI.getAll()
        setEquipamentos(data)
        setError(null)
      } catch (err) {
        console.error("Erro ao buscar equipamentos:", err)
        setError("Não foi possível carregar os equipamentos. Por favor, tente novamente mais tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchEquipamentos()
  }, [])

  // Função para adicionar ao carrinho
  const addToCart = async (equipment:any) => {
    try {
      // Preparar o item para adicionar ao carrinho
      const itemToAdd = {
        itemId: equipment.id,
        nome: equipment.nome,
        imagem: equipment.imagem || "/placeholder.svg?height=100&width=100",
        preco: equipment.precoMensal,
        quantidade: 1,
        periodo: "mensal",
        tipo: "equipamento",
      }

      // Adicionar ao carrinho via API
      await addItemToCarrinho(itemToAdd)

      // Feedback visual
      setAddedToCart(equipment.id)
      setTimeout(() => setAddedToCart(null), 2000)

      // Notificar o usuário
      toast({
        title: "Item adicionado",
        description: `${equipment.nome} foi adicionado ao seu carrinho.`,
      })

      // Disparar evento para atualizar o contador no header
      window.dispatchEvent(new Event("cartUpdated"))
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o item ao carrinho.",
        variant: "destructive",
      })
    }
  }

  // Filtrar equipamentos com base no termo de busca
  const filteredEquipamentos = equipamentos.filter(
    (item) =>
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.categoria && item.categoria.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.marca && item.marca.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Equipamentos para Aluguel</h1>

            {/* Barra de busca */}
            <div className="mb-6">
              <Input
                type="search"
                placeholder="Buscar equipamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
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
              <p className="mt-4 text-muted-foreground">Carregando equipamentos...</p>
            </div>
          ) : filteredEquipamentos.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Nenhum equipamento encontrado</h3>
              <p className="text-muted-foreground mb-4">Tente ajustar sua busca para encontrar o que procura.</p>
              <Button onClick={() => setSearchTerm("")}>Limpar busca</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredEquipamentos.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-card">
                    <Image
                      src={item.imagem || "/placeholder.svg?height=300&width=300"}
                      alt={item.nome}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        className={`mx-auto ${
                          addedToCart === item.id
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-primary hover:bg-primary/90 text-black"
                        }`}
                        onClick={() => addToCart(item)}
                        disabled={addedToCart === item.id}
                      >
                        {addedToCart === item.id ? (
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
                    <h3 className="font-medium">{item.nome}</h3>
                    <div className="flex justify-center gap-4 mt-1">
                      <span className="text-sm">
                        <span className="font-medium text-primary">R${item.precoMensal?.toFixed(2)}</span>/mês
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

