"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, ShoppingCart, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getCarrinhoCount, authAPI } from "@/lib/api"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState(null)
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Função para atualizar a contagem do carrinho
  const updateCartCount = async () => {
    try {
      // Busca a contagem de itens no carrinho da API
      const count = await getCarrinhoCount()
      setCartCount(count)
    } catch (error) {
      console.error("Erro ao atualizar contagem do carrinho:", error)
    }
  }

  // Verificar autenticação e carregar dados do usuário
  useEffect(() => {
    const checkAuth = () => {
      try {
        const isAuthenticated = authAPI.isAuthenticated ? authAPI.isAuthenticated() : false
        if (isAuthenticated) {
          const userData = authAPI.getCurrentUser ? authAPI.getCurrentUser() : null
          setUser(userData)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        setUser(null)
      }
    }

    checkAuth()

    // Carregar contagem inicial do carrinho
    updateCartCount()

    // Adicionar listener para eventos de atualização do carrinho
    const handleCartUpdate = () => {
      updateCartCount()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)

    // Adicionar listener para eventos de autenticação
    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener("authChanged", handleAuthChange)

    // Cleanup - remove os listeners quando o componente é desmontado
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
      window.removeEventListener("authChanged", handleAuthChange)
    }
  }, [])

  // Função para fazer logout
  const handleLogout = () => {
    authAPI.logout()
    // O redirecionamento é feito dentro da função logout
  }

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          FitMove
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link href="/equipamentos" className="text-white hover:text-gray-300">
            Produtos
          </Link>
          <Link href="/sobre" className="text-white hover:text-gray-300">
            Sobre
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
          )}

          <Link href="/carrinho" className="relative">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden text-gray-600" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="text-2xl font-bold text-primary">
                FitMove
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/equipamentos"
                className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                Equipamentos
              </Link>
              <Link
                href="/sobre"
                className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                Sobre
              </Link>
              <Link
                href="/carrinho"
                className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
                onClick={toggleMenu}
              >
                Carrinho ({cartCount})
              </Link>
              {user ? (
                <>
                  <Link
                    href="/perfil"
                    className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
                    onClick={toggleMenu}
                  >
                    Meu Perfil
                  </Link>
                  <Link
                    href="/pedidos"
                    className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
                    onClick={toggleMenu}
                  >
                    Meus Pedidos
                  </Link>
                  <button
                    className="text-left text-gray-600 hover:text-primary py-2 border-b border-gray-100"
                    onClick={() => {
                      toggleMenu()
                      handleLogout()
                    }}
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-primary py-2 border-b border-gray-100"
                  onClick={toggleMenu}
                >
                  Entrar / Cadastrar
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

