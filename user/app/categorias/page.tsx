"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CategoriasPage() {
  const categorias = [
    {
      id: 1,
      nome: "Cardio",
      descricao: "Equipamentos para treino cardiovascular e resistência",
      imagens: [
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%281%29-OMD0pKKlttyPA3k029eEsCKLJfBbQK.png",
          alt: "Bicicleta ergométrica",
        },
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%287%29-2sKJqP2lo06iysOVU8DhF1JxUoWiFT.png",
          alt: "Homem treinando em bicicleta ergométrica",
        },
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%288%29-8cgwK7a6jYQRrbwQvWvjb46MnSY3Zg.png",
          alt: "Mulher treinando em equipamento cardio",
        },
      ],
      slug: "cardio",
    },
    {
      id: 2,
      nome: "Musculação",
      descricao: "Equipamentos para ganho de força e hipertrofia",
      imagens: [
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%284%29-EGokDMmq8AkpDjALz5kl8Uzwls7oZa.png",
          alt: "Banco de supino com barra",
        },
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%285%29-Evx6TaIMik11OcjTX8mwVdc8D9MmGG.png",
          alt: "Par de halteres",
        },
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MlDdcduWF3q9wPfmKOK7XMjBUxlUl7.png",
          alt: "Kettlebell",
        },
      ],
      slug: "musculacao",
    },
    {
      id: 3,
      nome: "Funcional",
      descricao: "Equipamentos para treino funcional e mobilidade",
      imagens: [
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%282%29-AfaHIKEOrKgSpJxUdUux0DjX3inNxx.png",
          alt: "Mulher usando faixa elástica",
        },
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%283%29-OYRV00Y2NknLMkUowz3qxPaqaIfELm.png",
          alt: "Corda de pular",
        },
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%286%29-wGAWYtOzNVnavK1POP0tbINBcPzKee.png",
          alt: "Mulher usando máquina de remo",
        },
      ],
      slug: "funcional",
    },
    {
      id: 4,
      nome: "Acessórios",
      descricao: "Complementos para otimizar seus treinos",
      imagens: [
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%282%29-AfaHIKEOrKgSpJxUdUux0DjX3inNxx.png",
          alt: "Faixas elásticas",
        },
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%283%29-OYRV00Y2NknLMkUowz3qxPaqaIfELm.png",
          alt: "Corda de pular",
        },
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%285%29-Evx6TaIMik11OcjTX8mwVdc8D9MmGG.png",
          alt: "Halteres leves",
        },
      ],
      slug: "acessorios",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Banner Principal */}
        <section className="relative bg-black py-12">
          <div className="container px-4 md:px-6 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Categorias de Equipamentos</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Explore nossa ampla seleção de equipamentos fitness de alta qualidade para aluguel. Encontre o equipamento
              perfeito para seus objetivos.
            </p>
          </div>
        </section>

        {/* Categorias em Destaque */}
        <section className="py-12 md:py-20 bg-black">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {categorias.slice(0, 2).map((categoria) => (
                <div
                  key={categoria.id}
                  className="group relative overflow-hidden rounded-lg border border-white/10 h-[400px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                  <div className="relative h-full w-full overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-2 w-full h-full p-4">
                        <div className="col-span-2 h-48 relative overflow-hidden rounded-lg">
                          <Image
                            src={categoria.imagens[0].url || "/placeholder.svg"}
                            alt={categoria.imagens[0].alt}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="h-32 relative overflow-hidden rounded-lg">
                          <Image
                            src={categoria.imagens[1].url || "/placeholder.svg"}
                            alt={categoria.imagens[1].alt}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="h-32 relative overflow-hidden rounded-lg">
                          <Image
                            src={categoria.imagens[2].url || "/placeholder.svg"}
                            alt={categoria.imagens[2].alt}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
                    <h2 className="text-primary text-2xl font-bold mb-2">{categoria.nome}</h2>
                    <p className="text-white/80 mb-4">{categoria.descricao}</p>
                    <Button className="bg-primary text-black hover:bg-primary/90 font-bold" asChild>
                      <Link href={`/categoria/${categoria.slug}`}>
                        Ver Equipamentos <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categorias.slice(2, 4).map((categoria) => (
                <div
                  key={categoria.id}
                  className="group relative overflow-hidden rounded-lg border border-white/10 h-[400px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                  <div className="relative h-full w-full overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-2 w-full h-full p-4">
                        <div className="col-span-2 h-48 relative overflow-hidden rounded-lg">
                          <Image
                            src={categoria.imagens[0].url || "/placeholder.svg"}
                            alt={categoria.imagens[0].alt}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="h-32 relative overflow-hidden rounded-lg">
                          <Image
                            src={categoria.imagens[1].url || "/placeholder.svg"}
                            alt={categoria.imagens[1].alt}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="h-32 relative overflow-hidden rounded-lg">
                          <Image
                            src={categoria.imagens[2].url || "/placeholder.svg"}
                            alt={categoria.imagens[2].alt}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
                    <h2 className="text-primary text-2xl font-bold mb-2">{categoria.nome}</h2>
                    <p className="text-white/80 mb-4">{categoria.descricao}</p>
                    <Button className="bg-primary text-black hover:bg-primary/90 font-bold" asChild>
                      <Link href={`/categoria/${categoria.slug}`}>
                        Ver Equipamentos <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Pronto para começar seu treino?</h2>
                <p className="text-black/80 max-w-xl">
                  Escolha a categoria ideal para seus objetivos e alugue equipamentos profissionais para treinar em
                  casa.
                </p>
              </div>
              <Button className="bg-black text-white hover:bg-black/80 font-bold px-8 py-6 text-lg">
                VER TODOS EQUIPAMENTOS <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

