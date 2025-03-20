"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Search, ChevronDown, Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const categoriaInfo = {
  cardio: {
    titulo: "Equipamentos de Cardio",
    descricao: "Esteiras, bicicletas ergométricas, elípticos e outros equipamentos para treino cardiovascular.",
    imagem: "/placeholder.svg?height=400&width=1200&text=Cardio",
  },
  musculacao: {
    titulo: "Equipamentos de Musculação",
    descricao: "Pesos, bancos, máquinas e acessórios para treino de força e hipertrofia.",
    imagem: "/placeholder.svg?height=400&width=1200&text=Musculação",
  },
  funcional: {
    titulo: "Equipamentos Funcionais",
    descricao: "Kettlebells, TRX, medicine balls e outros equipamentos para treino funcional.",
    imagem: "/placeholder.svg?height=400&width=1200&text=Funcional",
  },
  acessorios: {
    titulo: "Acessórios de Treino",
    descricao: "Colchonetes, elásticos, rolos de massagem e outros acessórios para complementar seu treino.",
    imagem: "/placeholder.svg?height=400&width=1200&text=Acessórios",
  },
}

// Banco de dados simulado de equipamentos
const todosEquipamentos = [
  {
    id: 1,
    nome: "Esteira Profissional",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 29.99,
    precoSemanal: 149.99,
    precoMensal: 299.99,
    categoria: "cardio",
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
    categoria: "cardio",
    marca: "Caloi",
    avaliacao: 4,
  },
  {
    id: 3,
    nome: "Elíptico",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 24.99,
    precoSemanal: 129.99,
    precoMensal: 249.99,
    categoria: "cardio",
    marca: "Movement",
    avaliacao: 5,
  },
  {
    id: 4,
    nome: "Conjunto de Halteres",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 14.99,
    precoSemanal: 79.99,
    precoMensal: 149.99,
    categoria: "musculacao",
    marca: "Polimet",
    avaliacao: 5,
  },
  {
    id: 5,
    nome: "Banco Multifuncional",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 12.99,
    precoSemanal: 69.99,
    precoMensal: 129.99,
    categoria: "musculacao",
    marca: "Kikos",
    avaliacao: 4,
  },
  {
    id: 6,
    nome: "Máquina de Musculação",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 34.99,
    precoSemanal: 179.99,
    precoMensal: 349.99,
    categoria: "musculacao",
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
    categoria: "funcional",
    marca: "Acte",
    avaliacao: 4,
  },
  {
    id: 8,
    nome: "TRX",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 7.99,
    precoSemanal: 39.99,
    precoMensal: 89.99,
    categoria: "funcional",
    marca: "TRX",
    avaliacao: 5,
  },
  {
    id: 9,
    nome: "Kettlebell",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 5.99,
    precoSemanal: 29.99,
    precoMensal: 69.99,
    categoria: "funcional",
    marca: "Polimet",
    avaliacao: 4,
  },
  {
    id: 10,
    nome: "Rolo de Massagem",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 4.99,
    precoSemanal: 19.99,
    precoMensal: 39.99,
    categoria: "acessorios",
    marca: "Acte",
    avaliacao: 5,
  },
  {
    id: 11,
    nome: "Kit de Elásticos",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 3.99,
    precoSemanal: 14.99,
    precoMensal: 29.99,
    categoria: "acessorios",
    marca: "Acte",
    avaliacao: 4,
  },
  {
    id: 12,
    nome: "Colchonete",
    imagem: "/placeholder.svg?height=300&width=300",
    precoDiario: 2.99,
    precoSemanal: 9.99,
    precoMensal: 19.99,
    categoria: "acessorios",
    marca: "Kikos",
    avaliacao: 4,
  },
]

export default function CategoriaPage({ params }: { params: { slug: string } }) {
  const categoria = params.slug
  const info = categoriaInfo[categoria] || {
    titulo: "Categoria não encontrada",
    descricao: "Esta categoria não existe em nosso sistema.",
    imagem: "/placeholder.svg?height=400&width=1200",
  }

  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedFilters, setSelectedFilters] = useState({
    marcas: [],
    periodos: [],
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Filtrar equipamentos pela categoria atual
  const equipamentosDaCategoria = todosEquipamentos.filter((item) => item.categoria === categoria)

  // Obter marcas únicas para esta categoria
  const marcasUnicas = [...new Set(equipamentosDaCategoria.map((item) => item.marca))]

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
      marcas: [],
      periodos: [],
    })
    setPriceRange([0, 500])
  }

  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`space-y-6 ${isMobile ? "" : "sticky top-20"}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Filtros</h3>
        {(selectedFilters.marcas.length > 0 ||
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
        <Accordion type="single" collapsible defaultValue="preco">
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
                {marcasUnicas.map((marca) => (
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

  const filteredEquipamentos = equipamentosDaCategoria.filter((item) => {
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
        <h1 className="text-3xl font-bold mb-2">{info.titulo}</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link href="/equipamentos" className="hover:text-primary">
            Equipamentos
          </Link>
          <span className="mx-2">/</span>
          <span>{info.titulo}</span>
        </div>
      </div>

      {/* Banner da categoria */}
      <div className="relative h-[200px] md:h-[300px] rounded-lg overflow-hidden mb-8">
        <Image src={info.imagem || "/placeholder.svg"} alt={info.titulo} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{info.titulo}</h2>
            <p className="text-white/90">{info.descricao}</p>
          </div>
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
                className="md:hidden flex items-center gap-2"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>

              {/* Filtros ativos */}
              <div className="flex flex-wrap gap-2">
                {selectedFilters.marcas.map((marca) => (
                  <Badge key={`marca-${marca}`} variant="secondary" className="flex items-center gap-1">
                    {marca}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("marcas", marca)} />
                  </Badge>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 500) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
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
                  <div className="aspect-square overflow-hidden rounded-lg bg-background">
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
                      <Button className="mx-auto" asChild>
                        <Link href={`/equipamentos/${item.id}`}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Alugar Agora
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 text-center">
                    <Badge variant="outline" className="mb-2">
                      {item.marca}
                    </Badge>
                    <h3 className="font-medium">{item.nome}</h3>
                    <div className="flex justify-center gap-4">
                      <span className="text-sm">
                        <span className="font-medium text-primary">R${item.precoDiario.toFixed(2)}</span>/dia
                      </span>
                      <span className="text-sm">
                        <span className="font-medium text-primary">R${item.precoMensal.toFixed(2)}</span>/mês
                      </span>
                    </div>
                    <div className="flex justify-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < item.avaliacao ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
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
          {filteredEquipamentos.length > 0 && (
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
              <Button variant="outline" size="icon">
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

