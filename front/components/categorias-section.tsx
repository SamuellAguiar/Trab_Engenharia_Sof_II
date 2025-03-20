import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CategoriasSection() {
  const categorias = [
    {
      id: 1,
      nome: "Cardio",
      descricao: "Equipamentos para treino cardiovascular",
      imagem:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%281%29-OMD0pKKlttyPA3k029eEsCKLJfBbQK.png",
      imagemAlt: "Bicicleta ergométrica",
      slug: "cardio",
    },
    {
      id: 2,
      nome: "Musculação",
      descricao: "Equipamentos para ganho de força",
      imagem:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%284%29-EGokDMmq8AkpDjALz5kl8Uzwls7oZa.png",
      imagemAlt: "Banco de supino com barra",
      slug: "musculacao",
    },
    {
      id: 3,
      nome: "Funcional",
      descricao: "Equipamentos para treino funcional",
      imagem:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%286%29-wGAWYtOzNVnavK1POP0tbINBcPzKee.png",
      imagemAlt: "Mulher usando máquina de remo",
      slug: "funcional",
    },
    {
      id: 4,
      nome: "Acessórios",
      descricao: "Complementos para seus treinos",
      imagem:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%283%29-OYRV00Y2NknLMkUowz3qxPaqaIfELm.png",
      imagemAlt: "Corda de pular",
      slug: "acessorios",
    },
  ]

  return (
    <section className="bg-black py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl text-white">
          Navegue por Categoria
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categorias.map((categoria) => (
            <Link
              key={categoria.id}
              href={`/categoria/${categoria.slug}`}
              className="group relative overflow-hidden rounded-lg bg-card shadow-md transition-all hover:shadow-lg border border-white/10"
            >
              <div className="aspect-square relative">
                <Image
                  src={categoria.imagem || "/placeholder.svg"}
                  alt={categoria.imagemAlt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 w-full p-4">
                  <h3 className="text-lg font-semibold text-white">{categoria.nome}</h3>
                  <p className="text-sm text-white/70">{categoria.descricao}</p>
                  <div className="mt-2 flex items-center text-primary text-sm font-medium">
                    Ver equipamentos <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

