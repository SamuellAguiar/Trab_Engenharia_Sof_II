import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Award, Users, ThumbsUp, Dumbbell } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sobre a FitRent</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span>Sobre</span>
        </div>
      </div>

      {/* Seção História */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Nossa História</h2>
          <p className="text-muted-foreground mb-4">
            Fundada em 2018, a FitRent nasceu com uma missão simples: tornar equipamentos de academia de alta qualidade
            acessíveis a todos, sem o peso da propriedade.
          </p>
          <p className="text-muted-foreground mb-4">
            O que começou como uma pequena operação local cresceu e se tornou um serviço de aluguel de equipamentos de
            fitness confiável em várias cidades. Nosso fundador, Carlos Silva, um entusiasta de fitness e empreendedor,
            reconheceu a necessidade de acesso flexível a equipamentos de academia premium.
          </p>
          <p className="text-muted-foreground">
            Hoje, continuamos guiados pelo nosso compromisso de promover fitness e bem-estar através de soluções de
            equipamentos acessíveis. Cada peça em nosso inventário é cuidadosamente selecionada para garantir que atenda
            aos nossos altos padrões de qualidade, durabilidade e desempenho.
          </p>
        </div>
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=400&width=600" alt="Equipe FitRent" fill className="object-cover" />
        </div>
      </div>

      {/* Seção Valores */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Na FitRent, nossos valores fundamentais orientam tudo o que fazemos, desde a seleção de equipamentos até o
            atendimento ao cliente.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Dumbbell className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Qualidade em Primeiro Lugar</h3>
            <p className="text-muted-foreground">
              Oferecemos apenas equipamentos de nível comercial e duráveis que atendem aos nossos rigorosos padrões de
              qualidade.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Acessibilidade</h3>
            <p className="text-muted-foreground">
              Acreditamos que todos merecem acesso a equipamentos de fitness de qualidade, independentemente do
              orçamento ou espaço disponível.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Foco no Cliente</h3>
            <p className="text-muted-foreground">
              Dedicamo-nos a fornecer um serviço excepcional e construir relacionamentos duradouros com nossos clientes.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <ThumbsUp className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Confiabilidade</h3>
            <p className="text-muted-foreground">
              Cumprimos nossas promessas com equipamentos bem mantidos, entrega pontual e suporte responsivo.
            </p>
          </div>
        </div>
      </div>

      {/* Seção Equipe */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Conheça Nossa Equipe</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            As pessoas apaixonadas por trás da FitRent que trabalham incansavelmente para trazer os melhores
            equipamentos de fitness para você.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { nome: "Carlos Silva", cargo: "Fundador & CEO", imagem: "/placeholder.svg?height=300&width=300" },
            { nome: "Ana Oliveira", cargo: "Diretora de Operações", imagem: "/placeholder.svg?height=300&width=300" },
            {
              nome: "Ricardo Santos",
              cargo: "Especialista em Equipamentos",
              imagem: "/placeholder.svg?height=300&width=300",
            },
            { nome: "Juliana Costa", cargo: "Experiência do Cliente", imagem: "/placeholder.svg?height=300&width=300" },
          ].map((membro, index) => (
            <div key={index} className="bg-card rounded-lg border overflow-hidden">
              <div className="relative h-64 w-full">
                <Image src={membro.imagem || "/placeholder.svg"} alt={membro.nome} fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{membro.nome}</h3>
                <p className="text-muted-foreground">{membro.cargo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção Estatísticas */}
      <div className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { numero: "5+", label: "Anos no Mercado" },
            { numero: "10k+", label: "Clientes Satisfeitos" },
            { numero: "500+", label: "Opções de Equipamentos" },
            { numero: "12", label: "Cidades Atendidas" },
          ].map((stat, index) => (
            <div key={index} className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.numero}</div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Depoimentos */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Não acredite apenas em nossa palavra. Veja o que nossos clientes têm a dizer sobre sua experiência com a
            FitRent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              depoimento:
                "A FitRent tornou possível para mim treinar em casa durante a pandemia sem investir milhares em equipamentos. A esteira estava em perfeitas condições e a equipe de entrega foi profissional e prestativa.",
              nome: "Jessica T.",
              local: "São Paulo, SP",
            },
            {
              depoimento:
                "Como personal trainer, precisei montar rapidamente um espaço de treinamento temporário para clientes. A FitRent entregou tudo o que eu precisava em 48 horas. A qualidade dos equipamentos foi excepcional.",
              nome: "Marcos L.",
              local: "Rio de Janeiro, RJ",
            },
            {
              depoimento:
                "Aluguei um remo para experimentar antes de comprar. O processo foi tão tranquilo e a taxa mensal tão razoável que acabei mantendo o aluguel. Ótimo serviço e suporte!",
              nome: "Sofia R.",
              local: "Belo Horizonte, MG",
            },
          ].map((depoimento, index) => (
            <div key={index} className="bg-muted rounded-lg p-6">
              <div className="mb-4">
                <svg
                  className="h-8 w-8 text-primary opacity-50"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-muted-foreground mb-4">{depoimento.depoimento}</p>
              <div>
                <p className="font-medium">{depoimento.nome}</p>
                <p className="text-sm text-muted-foreground">{depoimento.local}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-lg bg-primary text-primary-foreground p-8 md:p-10 text-center">
        <h2 className="text-2xl font-bold md:text-3xl mb-4">Pronto para Começar Sua Jornada Fitness?</h2>
        <p className="max-w-2xl mx-auto mb-6 text-primary-foreground/90">
          Explore nossa seleção de equipamentos de fitness premium e encontre a solução perfeita para seus objetivos de
          condicionamento físico.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/equipamentos">Ver Equipamentos</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <Link href="/contato">Fale Conosco</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

