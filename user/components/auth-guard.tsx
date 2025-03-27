"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authAPI } from "@/lib/api"

export default function AuthGuard({ children, optional = false }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const checkAuth = () => {
      try {
        const authenticated = authAPI.isAuthenticated ? authAPI.isAuthenticated() : false
        setIsAuthenticated(authenticated)
        setLoading(false)

        if (!authenticated && !optional) {
          // Redirecionar para a página de login com o retorno para a página atual
          const returnUrl = encodeURIComponent(pathname)
          router.push(`/login?returnUrl=${returnUrl}`)
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        setIsAuthenticated(false)
        setLoading(false)
        if (!optional) {
          router.push("/login")
        }
      }
    }

    checkAuth()
  }, [router, pathname, optional])

  // Mostrar nada enquanto verifica a autenticação
  if (loading) {
    return null
  }

  // Renderizar os filhos se o usuário estiver autenticado ou se a autenticação for opcional
  return isAuthenticated || optional ? children : null
}

