"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Filter, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export default function PlanosPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    categorias: [],
    niveis: [],
    duracao: [],
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [addedToCart, setAddedToCart] = useState(null)

  const categorias = [
    { id: "cardio", nome: "Cardio" },
    { id: "musculacao", nome: "Musculação" },
    { id: "funcional", nome: "Funcional" },
    { id: "acessorios", nome: "Acessórios" },
  ]

  const niveis = [
    { id: "iniciante", nome: "Iniciante" },
    { id: "intermediario", nome: "Intermediário" },
    { id: "avancado", nome: "Avançado" },
  ]

  const duracoes = [
    { id: "semanal", nome: "Semanal" },
    { id: "mensal", nome: "Mensal" },
    { id: "trimestral", nome: "Trimestral" },
  ]

  const todosPlanos = [
    {
      id: 1,
      nome: "Plano Iniciante",
      subtitulo: "StartFit",
      imagem:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%281%29-OMD0pKKlttyPA3k029eEsCKLJfBbQK.png",
      equipamentos: [
        "1 Bicicleta Ergométrica",
        "1 Par de Halteres",
        "1 Faixa de Resistência",
        "1 Corda para Pular",
        "1 Colchonete",
      ],
      duracao: "1 mês",
      preco: 199,
      destaque: true,
      categorias: ["cardio", "acessorios"],
      nivel: "iniciante",
      duracaoTipo: "mensal",
    },
    {
      id: 2,
      nome: "Plano Intermediário",
      subtitulo: "ProgressFit",
      imagem:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%284%29-EGokDMmq8AkpDjALz5kl8Uzwls7oZa.png",
      equipamentos: [
        "1 Esteira ou Bicicleta Ergométrica",
        "2 Pares de Halteres",
        "1 Banco de Supino Ajustável",
        "1 Kit de Elásticos",
        "1 Kettlebell",
      ],
      duracao: "1 mês",
      preco: 299,
      destaque: false,
      categorias: ["cardio", "musculacao"],
      nivel: "intermediario",
      duracaoTipo: "mensal",
    },
    {
      id: 3,
      nome: "Plano Avançado",
      subtitulo: "ProFit",
      imagem:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%286%29-wGAWYtOzNVnavK1POP0tbINBcPzKee.png",
      equipamentos: [
        "1 Esteira",
        "1 Bicicleta Ergométrica",
        "3 Pares de Halteres",
        "1 Banco de Supino Ajustável",
        "1 Barra com Anilhas",
        "1 Kit de Elásticos Profissional",
      ],
      duracao: "1 mês",
      preco: 499,
      destaque: false,
      categorias: ["cardio", "musculacao", "funcional"],
      nivel: "avancado",
      duracaoTipo: "mensal",
    },
    {
      id: 4,
      nome: "Plano Funcional",
      subtitulo: "FunctionalFit",
      imagem:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%282%29-AfaHIKEOrKgSpJxUdUux0DjX3inNxx.png",
      equipamentos: ["1 Kit de Elásticos", "1 Kettlebell", "1 Corda para Pular", "1 Medicine Ball", "1 TRX"],
      duracao: "1 mês",
      preco: 249,
      destaque: false,
      categorias: ["funcional", "acessorios"],
      nivel: "intermediario",
      duracaoTipo: "mensal",
    },
    {
      id: 5,
      nome: "Plano Cardio",
      subtitulo: "CardioFit",
      imagem:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%287%29-2sKJqP2lo06iysOVU8DhF1JxUoWiFT.png",
      equipamentos: [
        "1 Esteira Profissional",
        "1 Bicicleta Ergométrica",
        "1 Elíptico",
        "1 Monitor Cardíaco",
        "1 Corda para Pular",
      ],
      duracao: "3 meses",
      preco: 399,
      destaque: false,
      categorias: ["cardio"],
      nivel: "intermediario",
      duracaoTipo: "trimestral",
    },
    {
      id: 6,
      nome: "Plano Força",
      subtitulo: "PowerFit",
      imagem:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%285%29-Evx6TaIMik11OcjTX8mwVdc8D9MmGG.png",
      equipamentos: [
        "1 Rack de Musculação",
        "1 Banco Ajustável",
        "1 Barra Olímpica",
        "100kg de Anilhas",
        "3 Pares de Halteres",
      ],
      duracao: "1 mês",
      preco: 449,
      destaque: false,
      categorias: ["musculacao"],
      nivel: "avancado",
      duracaoTipo: "mensal",
    },
  ]

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => {
      const current = [...prev[type]]
      const index = current.indexOf(value)

      if (index === -1) {
        current.push(value)
      } else {
        current.splice(index, 1)
      }

      return {
        ...prev,
        [type]: current,
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters({
      categorias: [],
      niveis: [],
      duracao: [],
    })
  }

  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`space-y-6 ${isMobile ? "" : "sticky top-20"}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg text-white">Filtros</h3>
        {(selectedFilters.categorias.length > 0 ||
          selectedFilters.niveis.length > 0 ||
          selectedFilters.duracao.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 text-xs text-primary hover:text-primary/80"
          >
            Limpar tudo
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <Accordion type="single" collapsible defaultValue="categorias">
          <AccordionItem value="categorias" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-primary">Categorias</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categorias.map((categoria) => (
                  <div key={categoria.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`categoria-${categoria.id}`}
                      checked={selectedFilters.categorias.includes(categoria.id)}
                      onCheckedChange={() => toggleFilter("categorias", categoria.id)}
                      className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label
                      htmlFor={`categoria-${categoria.id}`}
                      className="text-sm font-normal cursor-pointer text-white"
                    >
                      {categoria.nome}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="niveis" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-primary">Nível</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {niveis.map((nivel) => (
                  <div key={nivel.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`nivel-${nivel.id}`}
                      checked={selectedFilters.niveis.includes(nivel.id)}
                      onCheckedChange={() => toggleFilter("niveis", nivel.id)}
                      className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor={`nivel-${nivel.id}`} className="text-sm font-normal cursor-pointer text-white">
                      {nivel.nome}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="duracao" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-primary">Duração</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {duracoes.map((duracao) => (
                  <div key={duracao.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`duracao-${duracao.id}`}
                      checked={selectedFilters.duracao.includes(duracao.id)}
                      onCheckedChange={() => toggleFilter("duracao", duracao.id)}
                      className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor={`duracao-${duracao.id}`} className="text-sm font-normal cursor-pointer text-white">
                      {duracao.nome}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )

  // Modificar a função addToCart para garantir que os itens adicionados ao carrinho tenham a propriedade preco
  const addToCart = (plano) => {
    // Verificar se o plano já está no carrinho
    const existingItemIndex = cartItems.findIndex((item) => item.id === plano.id)

    // Garantir que o item tenha a propriedade preco
    const itemToAdd = {
      ...plano,
      preco: plano.preco || 0,
      periodo: "mensal",
    }

    let updatedCart
    if (existingItemIndex >= 0) {
      // Se já estiver no carrinho, incrementa a quantidade
      updatedCart = [...cartItems]
      updatedCart[existingItemIndex].quantidade = (updatedCart[existingItemIndex].quantidade || 1) + 1
      setCartItems(updatedCart)
    } else {
      // Se não estiver no carrinho, adiciona com quantidade 1
      updatedCart = [...cartItems, { ...itemToAdd, quantidade: 1 }]
      setCartItems(updatedCart)
    }

    // Feedback visual
    setAddedToCart(plano.id)

    // Limpar o feedback após 2 segundos
    setTimeout(() => {
      setAddedToCart(null)
    }, 2000)

    // Salvar no localStorage para persistência
    localStorage.setItem("fitrent-cart", JSON.stringify(updatedCart))

    // Disparar evento para atualizar o contador do carrinho
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const filteredPlanos = todosPlanos.filter((plano) => {
    // Filtrar por categoria
    if (
      selectedFilters.categorias.length > 0 &&
      !plano.categorias.some((cat) => selectedFilters.categorias.includes(cat))
    ) {
      return false
    }

    // Filtrar por nível
    if (selectedFilters.niveis.length > 0 && !selectedFilters.niveis.includes(plano.nivel)) {
      return false
    }

    // Filtrar por duração
    if (selectedFilters.duracao.length > 0 && !selectedFilters.duracao.includes(plano.duracaoTipo)) {
      return false
    }

    return true
  })

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("fitrent-cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e)
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Banner Principal */}
        <section className="relative bg-black py-12">
          <div className="container px-4 md:px-6 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Nossos Planos</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Escolha o plano ideal para seus objetivos de fitness. Todos incluem entrega, montagem e manutenção.
            </p>
          </div>
        </section>

        {/* Planos com Filtro */}
        <section className="py-12 md:py-20 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filtros - Desktop */}
              <div className="hidden md:block w-64 shrink-0">
                <FilterSidebar />
              </div>

              {/* Filtros - Mobile */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetContent side="left" className="w-full sm:max-w-md bg-black border-white/10">
                  <SheetHeader className="mb-4">
                    <SheetTitle className="text-white">Filtros</SheetTitle>
                    <SheetDescription className="text-white/70">Refine sua busca de planos</SheetDescription>
                  </SheetHeader>
                  <FilterSidebar isMobile={true} />
                </SheetContent>
              </Sheet>

              {/* Conteúdo Principal */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="md:hidden flex items-center gap-2 border-white/30 text-white"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <Filter className="h-4 w-4" />
                      Filtros
                    </Button>

                    {/* Filtros ativos */}
                    <div className="flex flex-wrap gap-2">
                      {selectedFilters.categorias.map((categoriaId) => {
                        const categoria = categorias.find((c) => c.id === categoriaId)
                        return (
                          <Badge
                            key={`cat-${categoriaId}`}
                            variant="outline"
                            className="flex items-center gap-1 bg-primary/10 text-primary border-primary/30"
                          >
                            {categoria?.nome}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => toggleFilter("categorias", categoriaId)}
                            />
                          </Badge>
                        )
                      })}

                      {selectedFilters.niveis.map((nivelId) => {
                        const nivel = niveis.find((n) => n.id === nivelId)
                        return (
                          <Badge
                            key={`nivel-${nivelId}`}
                            variant="outline"
                            className="flex items-center gap-1 bg-primary/10 text-primary border-primary/30"
                          >
                            {nivel?.nome}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("niveis", nivelId)} />
                          </Badge>
                        )
                      })}

                      {selectedFilters.duracao.map((duracaoId) => {
                        const duracao = duracoes.find((d) => d.id === duracaoId)
                        return (
                          <Badge
                            key={`duracao-${duracaoId}`}
                            variant="outline"
                            className="flex items-center gap-1 bg-primary/10 text-primary border-primary/30"
                          >
                            {duracao?.nome}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("duracao", duracaoId)} />
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-white/70 hidden sm:inline">
                      {filteredPlanos.length} planos encontrados
                    </span>
                  </div>
                </div>

                {filteredPlanos.length === 0 ? (
                  <div className="text-center py-12 bg-black/30 rounded-lg border border-white/10">
                    <h3 className="text-lg font-medium mb-2 text-white">Nenhum plano encontrado</h3>
                    <p className="text-white/70 mb-4">Tente ajustar seus filtros para encontrar o plano ideal.</p>
                    <Button onClick={clearFilters} className="bg-primary text-black hover:bg-primary/90">
                      Limpar filtros
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {filteredPlanos.map((plano) => (
                      <div
                        key={plano.id}
                        className={`relative overflow-hidden rounded-lg border ${plano.destaque ? "border-primary" : "border-white/10"}`}
                      >
                        {plano.destaque && (
                          <div className="absolute top-0 right-0 bg-primary text-black font-bold py-1 px-4 text-sm z-10">
                            MAIS POPULAR
                          </div>
                        )}

                        <div className="relative h-[200px] w-full overflow-hidden">
                          <Image
                            src={plano.imagem || "/placeholder.svg"}
                            alt={plano.nome}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-6">
                            <h2 className="text-primary text-xl font-bold">{plano.nome}</h2>
                            <h3 className="text-white text-3xl font-bold">{plano.subtitulo}</h3>
                          </div>
                        </div>

                        <div className="p-6 bg-black">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="bg-primary/20 p-2 rounded">
                              <Check className="h-5 w-5 text-primary" />
                            </div>
                            <h4 className="text-primary text-xl font-bold">EQUIPAMENTOS</h4>
                          </div>

                          <ul className="space-y-2 mb-6">
                            {plano.equipamentos.map((item, index) => (
                              <li key={index} className="flex items-center text-white">
                                <span className="mr-2 text-primary">•</span> {item}
                              </li>
                            ))}
                          </ul>

                          <div className="bg-white/5 p-4 rounded-lg mb-6">
                            <ul className="space-y-2">
                              <li className="flex items-center text-white">
                                <span className="mr-2 text-primary">•</span> Duração do Aluguel: {plano.duracao}
                              </li>
                              <li className="flex items-center text-white">
                                <span className="mr-2 text-primary">•</span> Preço: R$ {plano.preco}/mês
                              </li>
                            </ul>
                          </div>

                          <Button
                            className={`w-full font-bold py-3 ${
                              addedToCart === plano.id
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-primary hover:bg-primary/90 text-black"
                            }`}
                            onClick={() => addToCart(plano)}
                            disabled={addedToCart === plano.id}
                          >
                            {addedToCart === plano.id ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                ADICIONADO AO CARRINHO
                              </>
                            ) : (
                              "ADICIONAR AO CARRINHO"
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-12 md:py-16 bg-black">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">Todos os planos incluem</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-6 rounded-lg">
                <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Entrega e Montagem</h3>
                <p className="text-white/70">
                  Entregamos e montamos todos os equipamentos em sua casa sem custo adicional.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-lg">
                <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Manutenção Inclusa</h3>
                <p className="text-white/70">Manutenção preventiva e corretiva durante todo o período de aluguel.</p>
              </div>

              <div className="bg-white/5 p-6 rounded-lg">
                <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sem Fidelidade</h3>
                <p className="text-white/70">
                  Cancele ou altere seu plano a qualquer momento sem multas ou taxas adicionais.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  Pronto para transformar sua rotina de exercícios?
                </h2>
                <p className="text-black/80 max-w-xl">
                  Escolha o plano ideal para você e comece a treinar em casa com equipamentos profissionais.
                </p>
              </div>
              <Button className="bg-black text-white hover:bg-black/80 font-bold px-8 py-6 text-lg">
                ESCOLHA SEU PLANO <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

