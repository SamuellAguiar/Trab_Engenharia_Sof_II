import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-primary/30 bg-card">
      <div className="container px-4 py-8 md:px-6">
        {/* Versão simplificada do footer */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold">
              FitMove
            </Link>
            <p className="text-sm text-muted-foreground">
              Sua solução para aluguel de equipamentos de academia. Transforme sua casa em um espaço fitness.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Links Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/equipamentos"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Equipamentos
              </Link>
              <Link
                href="/sobre"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Sobre Nós
              </Link>
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Login
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contato</h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <p>Av. Paulista, 1000, São Paulo</p>
              <p>Email: contato@fitmove.com.br</p>
              <p>Telefone: (11) 3456-7890</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} FitMove. Todos os direitos reservados.
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

