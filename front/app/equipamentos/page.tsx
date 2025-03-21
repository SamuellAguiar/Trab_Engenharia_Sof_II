"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
// Adicionar o import do Check
import { ShoppingCart, Heart, Search, ChevronDown, Filter, X, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export default function EquipamentosPage() {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedFilters, setSelectedFilters] = useState({
    categorias: [],
    marcas: [],
    periodos: [],
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [addedToCart, setAddedToCart] = useState(null)

  const equipamentos = [
    {
      id: 1,
      nome: "Esteira Profissional",
      imagem: "/placeholder.svg?height=300&width=300",
      precoDiario: 29.99,
      precoSemanal: 149.99,
      precoMensal: 299.99,
      categoria: "Cardio",
      marca: "Movement",
      avaliacao: 5,
    },
    {
      id: 2,
      nome: "Bicicleta Ergométrica",
      imagem: "/placeholder.svg?height=300&width=300",
      precoDiario: 19.99,
      precoSemanal: 99.99,
      precoMensal: 199.99,
      categoria: "Cardio",
      marca: "Caloi",
      avaliacao: 4,
    },
    {
      id: 3,
      nome: "Conjunto de Halteres",
      imagem: "/placeholder.svg?height=300&width=300",
      precoDiario: 14.99,
      precoSemanal: 79.99,
      precoMensal: 149.99,
      categoria: "Musculação",
      marca: "Polimet",
      avaliacao: 5,
    },
    {
      id: 4,
      nome: "Banco Multifuncional",
      imagem: "/placeholder.svg?height=300&width=300",
      precoDiario: 12.99,
      precoSemanal: 69.99,
      precoMensal: 129.99,
      categoria: "Musculação",
      marca: "Kikos",
      avaliacao: 4,
    },
    {
      id: 5,
      nome: "Elíptico",
      imagem: "/placeholder.svg?height=300&width=300",
      precoDiario: 24.99,
      precoSemanal: 129.99,
      precoMensal: 249.99,
      categoria: "Cardio",
      marca: "Movement",
      avaliacao: 5,
    },
    {
      id: 6,
      nome: "Máquina de Musculação",
      imagem: "/placeholder.svg?height=300&width=300",
      precoDiario: 34.99,
      precoSemanal: 179.99,
      precoMensal: 349.99,
      categoria: "Musculação",
      marca: "Athletic",
      avaliacao: 4,
    },
    {
      id: 7,
      nome: "Kit Funcional",
      imagem: "/placeholder.svg?height=300&width=300",
      precoDiario: 9.99,
      precoSemanal: 49.99,
      precoMensal: 99.99,
      categoria: "Funcional",
      marca: "Acte",
      avaliacao: 4,
    },
    {
      id: 8,
      nome: "Rolo de Massagem",
      imagem: "/placeholder.svg?height=300&width=300",
      precoDiario: 4.99,
      precoSemanal: 19.99,
      precoMensal: 39.99,
      categoria: "Acessórios",
      marca: "Acte",
      avaliacao: 5,
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
      marcas: [],
      periodos: [],
    })
    setPriceRange([0, 500])
  }

  // Modificar a função addToCart para garantir que os itens adicionados ao carrinho tenham a propriedade preco
  const addToCart = (equipamento) => {
    // Verificar se o equipamento já está no carrinho
    const existingItemIndex = cartItems.findIndex((item) => item.id === equipamento.id)

    // Garantir que o item tenha a propriedade preco
    const itemToAdd = {
      ...equipamento,
      preco: equipamento.precoDiario || equipamento.dailyPrice || 0,
      periodo: "diario",
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
    setAddedToCart(equipamento.id)

    // Limpar o feedback após 2 segundos
    setTimeout(() => {
      setAddedToCart(null)
    }, 2000)

    // Salvar no localStorage para persistência
    localStorage.setItem("fitrent-cart", JSON.stringify(updatedCart))

    // Disparar evento para atualizar o contador do carrinho
    window.dispatchEvent(new Event("cartUpdated"))
  }

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

  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`space-y-6 ${isMobile ? "" : "sticky top-20"}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Filtros</h3>
        {(selectedFilters.categorias.length > 0 ||
          selectedFilters.marcas.length > 0 ||
          selectedFilters.periodos.length > 0 ||
          priceRange[0] > 0 ||
          priceRange[1] < 500) && (
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
          <AccordionItem value="categorias">
            <AccordionTrigger>Categorias</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Cardio", "Musculação", "Funcional", "Acessórios"].map((categoria) => (
                  <div key={categoria} className="flex items-center space-x-2">
                    <Checkbox
                      id={`categoria-${categoria}`}
                      checked={selectedFilters.categorias.includes(categoria)}
                      onCheckedChange={() => toggleFilter("categorias", categoria)}
                    />
                    <Label htmlFor={`categoria-${categoria}`} className="text-sm font-normal cursor-pointer">
                      {categoria}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="preco">
            <AccordionTrigger>Faixa de Preço Mensal (R$)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 px-1">
                <Slider
                  defaultValue={[0, 500]}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">R${priceRange[0]}</span>
                  <span className="text-sm">R${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="marcas">
            <AccordionTrigger>Marcas</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Movement", "Caloi", "Polimet", "Kikos", "Athletic", "Acte"].map((marca) => (
                  <div key={marca} className="flex items-center space-x-2">
                    <Checkbox
                      id={`marca-${marca}`}
                      checked={selectedFilters.marcas.includes(marca)}
                      onCheckedChange={() => toggleFilter("marcas", marca)}
                    />
                    <Label htmlFor={`marca-${marca}`} className="text-sm font-normal cursor-pointer">
                      {marca}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="periodos">
            <AccordionTrigger>Período de Aluguel</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Diário", "Semanal", "Mensal"].map((periodo) => (
                  <div key={periodo} className="flex items-center space-x-2">
                    <Checkbox
                      id={`periodo-${periodo}`}
                      checked={selectedFilters.periodos.includes(periodo)}
                      onCheckedChange={() => toggleFilter("periodos", periodo)}
                    />
                    <Label htmlFor={`periodo-${periodo}`} className="text-sm font-normal cursor-pointer">
                      {periodo}
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

  const filteredEquipamentos = equipamentos.filter((item) => {
    // Filtrar por categoria
    if (selectedFilters.categorias.length > 0 && !selectedFilters.categorias.includes(item.categoria)) {
      return false
    }

    // Filtrar por marca
    if (selectedFilters.marcas.length > 0 && !selectedFilters.marcas.includes(item.marca)) {
      return false
    }

    // Filtrar por preço mensal
    if (item.precoMensal < priceRange[0] || item.precoMensal > priceRange[1]) {
      return false
    }

    return true
  })

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Equipamentos para Aluguel</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span>Equipamentos</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros - Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <FilterSidebar />
        </div>

        {/* Filtros - Mobile */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetContent side="left" className="w-full sm:max-w-md">
            <SheetHeader className="mb-4">
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>Refine sua busca de equipamentos</SheetDescription>
            </SheetHeader>
            <FilterSidebar isMobile={true} />
          </SheetContent>
        </Sheet>

        {/* Grade de Equipamentos */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="md:hidden flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>

              {/* Filtros ativos */}
              <div className="flex flex-wrap gap-2">
                {selectedFilters.categorias.map((categoria) => (
                  <Badge
                    key={`cat-${categoria}`}
                    variant="outline"
                    className="flex items-center gap-1 bg-primary/10 text-primary border-primary/30"
                  >
                    {categoria}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("categorias", categoria)} />
                  </Badge>
                ))}
                {selectedFilters.marcas.map((marca) => (
                  <Badge
                    key={`marca-${marca}`}
                    variant="outline"
                    className="flex items-center gap-1 bg-primary/10 text-primary border-primary/30"
                  >
                    {marca}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("marcas", marca)} />
                  </Badge>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 500) && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-primary/10 text-primary border-primary/30"
                  >
                    R${priceRange[0]} - R${priceRange[1]}/mês
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 500])} />
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {filteredEquipamentos.length} itens
              </span>
              <Select defaultValue="destaque">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="destaque">Destaque</SelectItem>
                  <SelectItem value="preco-baixo">Preço: Menor para Maior</SelectItem>
                  <SelectItem value="preco-alto">Preço: Maior para Menor</SelectItem>
                  <SelectItem value="novos">Mais Recentes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredEquipamentos.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Nenhum equipamento encontrado</h3>
              <p className="text-muted-foreground mb-4">Tente ajustar seus filtros para encontrar o que procura.</p>
              <Button onClick={clearFilters}>Limpar todos os filtros</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEquipamentos.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-lg bg-card">
                    <Image
                      src={item.imagem || "/placeholder.svg"}
                      alt={item.nome}
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
                            ADICIONADO AO CARRINHO
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            ALUGAR AGORA
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 text-center">
                    <Badge variant="outline" className="mb-2">
                      {item.categoria}
                    </Badge>
                    <h3 className="font-medium">{item.nome}</h3>
                    <div className="flex justify-center gap-4">
                      <span className="text-sm">
                        <span className="font-medium text-primary font-bold">R${item.precoDiario.toFixed(2)}</span>/dia
                      </span>
                      <span className="text-sm">
                        <span className="font-medium text-primary font-bold">R${item.precoMensal.toFixed(2)}</span>/mês
                      </span>
                    </div>
                    <div className="flex justify-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < item.avaliacao ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Paginação */}
          <div className="flex items-center justify-center space-x-2 mt-12">
            <Button variant="outline" size="icon" disabled>
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="icon">
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

