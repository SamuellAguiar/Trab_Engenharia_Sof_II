import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-primary/30 bg-card">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="FitRent Logo"
                width={40}
                height={40}
                className="rounded-full bg-primary"
              />
              <span className="text-xl font-bold">FitRent</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Sua solução completa para aluguel de equipamentos de academia. Transforme sua casa em um espaço fitness.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Equipamentos</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/equipamentos"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Todos os Equipamentos
              </Link>
              <Link
                href="/categoria/cardio"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Cardio
              </Link>
              <Link
                href="/categoria/musculacao"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Musculação
              </Link>
              <Link
                href="/categoria/funcional"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Funcional
              </Link>
              <Link
                href="/categoria/acessorios"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Acessórios
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Empresa</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/sobre"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Sobre Nós
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Trabalhe Conosco
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Imprensa
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Blog
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Suporte</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Central de Ajuda
              </Link>
              <Link
                href="/contato"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Contato
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Devolução e Reembolso
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Informações de Entrega
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contato</h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <p>Av. Paulista, 1000, São Paulo</p>
              <p>São Paulo, SP 01310-100</p>
              <p>Email: contato@fitrent.com.br</p>
              <p>Telefone: (11) 3456-7890</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} FitRent. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Política de Privacidade
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Termos de Serviço
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Política de Cookies
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/placeholder.svg?height=30&width=40&text=Visa" alt="Visa" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40&text=MC" alt="Mastercard" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40&text=PayPal" alt="PayPal" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40&text=Pix" alt="Pix" width={40} height={30} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

