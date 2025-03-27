import DatabaseStatus from "@/components/database-status"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>

        <DatabaseStatus />

        {/* Resto do conteúdo da página */}
        <div className="grid gap-6 mt-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Gerenciamento de Equipamentos</h2>
            <p className="text-muted-foreground mb-4">
              Adicione, edite ou remova equipamentos disponíveis para aluguel.
            </p>
            <div className="flex justify-end">
              <button className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/90">
                Gerenciar Equipamentos
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Gerenciamento de Usuários</h2>
            <p className="text-muted-foreground mb-4">Visualize e gerencie contas de usuários da plataforma.</p>
            <div className="flex justify-end">
              <button className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/90">
                Gerenciar Usuários
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

