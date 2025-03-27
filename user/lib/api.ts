// URL base da API - Configurada através da variável de ambiente NEXT_PUBLIC_API_URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081"

/**
 * Função auxiliar para lidar com erros de fetch
 * Verifica se a resposta é ok e retorna o JSON, ou lança um erro
 */
const handleFetchError = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

/**
 * Função para verificar se o backend está disponível
 * Usa um cache para evitar múltiplas verificações desnecessárias
 */
let backendAvailable:any = null
export const checkBackendAvailability = async () => {
  if (backendAvailable !== null) return backendAvailable

  try {
    // Usa AbortController para limitar o tempo de espera da requisição
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const response = await fetch(`${API_URL}/health`, {
      signal: controller.signal,
    }).catch(() => ({ ok: false }))

    clearTimeout(timeoutId)
    backendAvailable = response.ok
    return backendAvailable
  } catch (error) {
    console.warn("Backend não disponível:", error)
    backendAvailable = false
    return false
  }
}

/**
 * Reseta o status do backend para forçar nova verificação
 * Útil quando queremos tentar reconectar após uma falha
 */
export const resetBackendStatus = () => {
  backendAvailable = null
}

/**
 * API de Equipamentos
 * Contém métodos para interagir com a API de equipamentos
 */
export const equipamentosAPI = {
  // Buscar todos os equipamentos
  getAll: async (params = {}) => {
    try {
      // Construir os parâmetros de consulta
      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(key, v))
        } else if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })

      const url = `${API_URL}/equipamentos/buscarTodos${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
      const response = await fetch(url)
      return handleFetchError(response)
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error)
      throw error
    }
  },

  // Buscar um equipamento por ID
  getById: async (id:any) => {
    try {
      const response = await fetch(`${API_URL}/equipamentos/${id}`)
      return handleFetchError(response)
    } catch (error) {
      console.error(`Erro ao buscar equipamento ${id}:`, error)
      throw error
    }
  },

  // Buscar equipamentos por categoria
  getByCategoria: async (categoria:any) => {
    try {
      const response = await fetch(`${API_URL}/equipamentos/categoria/${categoria}`)
      return handleFetchError(response)
    } catch (error) {
      console.error(`Erro ao buscar equipamentos da categoria ${categoria}:`, error)
      throw error
    }
  },

  // Buscar equipamentos com filtros
  search: async (searchTerm = "", filters = {}) => {
    try {
      const queryParams = new URLSearchParams()

      if (searchTerm) {
        queryParams.append("q", searchTerm)
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(key, v))
        } else if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })

      const url = `${API_URL}/equipamentos/search${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
      const response = await fetch(url)
      return handleFetchError(response)
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error)
      throw error
    }
  },
}

/**
 * API de Carrinho
 * Contém métodos para interagir com a API de carrinho
 */
export const carrinhoAPI = {
  // Buscar itens do carrinho
  getItems: async (userId:any) => {
    try {
      const response = await fetch(`${API_URL}/carrinho`)
      return handleFetchError(response)
    } catch (error) {
      console.error("Erro ao buscar itens do carrinho:", error)
      throw error
    }
  },

  // Adicionar item ao carrinho
  addItem: async (userId:any, item:any) => {
    try {
      const response = await fetch(`${API_URL}/carrinho/adicionar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
      return handleFetchError(response)
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error)
      throw error
    }
  },

  // Remover item do carrinho
  removeItem: async (userId:any, itemId:any) => {
    try {
      const response = await fetch(`${API_URL}/carrinho/remover/${itemId}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`)
      }
      return true
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error)
      throw error
    }
  },

  // Atualizar quantidade de um item no carrinho
  updateQuantity: async (userId:any, itemId:any, quantidade:any) => {
    try {
      const response = await fetch(`${API_URL}/carrinho/atualizar/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantidade }),
      })
      return handleFetchError(response)
    } catch (error) {
      console.error("Erro ao atualizar quantidade do item:", error)
      throw error
    }
  },

  // Limpar o carrinho
  clear: async (userId:any) => {
    try {
      const response = await fetch(`${API_URL}/carrinho/limpar`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `Erro ${response.status}: ${response.statusText}`)
      }
      return true
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error)
      throw error
    }
  },
}

/**
 * API de Pedidos
 * Contém métodos para interagir com a API de pedidos
 */
export const pedidosAPI = {
  // Criar um novo pedido
  create: async (userId:any, pedido:any) => {
    try {
      const response = await fetch(`${API_URL}/pedidos/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      })
      return handleFetchError(response)
    } catch (error) {
      console.error("Erro ao criar pedido:", error)
      throw error
    }
  },

  // Buscar pedidos do usuário
  getByUser: async (userId:any) => {
    try {
      const response = await fetch(`${API_URL}/pedidos/${userId}`)
      return handleFetchError(response)
    } catch (error) {
      console.error("Erro ao buscar pedidos do usuário:", error)
      throw error
    }
  },

  // Buscar um pedido específico
  getById: async (userId:any, pedidoId:any) => {
    try {
      const response = await fetch(`${API_URL}/pedidos/${userId}/${pedidoId}`)
      return handleFetchError(response)
    } catch (error) {
      console.error(`Erro ao buscar pedido ${pedidoId}:`, error)
      throw error
    }
  },
}

/**
 * API de Usuários
 * Contém métodos para interagir com a API de usuários
 */
export const usuariosAPI = {
  // Obter o ID do usuário atual
  // Em uma aplicação real, isso viria de um sistema de autenticação
  getCurrentUserId: () => {
    return "user123"
  },
}

/**
 * Função para obter a contagem de itens no carrinho
 */
export async function getCarrinhoCount() {
  try {
    const userId = usuariosAPI.getCurrentUserId()
    const items = await carrinhoAPI.getItems(userId)
    return items.reduce((total:any, item:any) => total + (item.quantidade || 1), 0)
  } catch (error) {
    console.error("Erro ao obter contagem do carrinho:", error)
    return 0
  }
}

/**
 * Funções auxiliares para simplificar o uso da API
 */
export const addItemToCarrinho = async (item:any) => {
  const userId = usuariosAPI.getCurrentUserId()
  return await carrinhoAPI.addItem(userId, item)
}

export const removeItemFromCarrinho = async (itemId:any) => {
  const userId = usuariosAPI.getCurrentUserId()
  return await carrinhoAPI.removeItem(userId, itemId)
}

export const updateItemQuantity = async (itemId:any, quantity:any) => {
  const userId = usuariosAPI.getCurrentUserId()
  return await carrinhoAPI.updateQuantity(userId, itemId, quantity)
}

export const clearCarrinho = async () => {
  const userId = usuariosAPI.getCurrentUserId()
  return await carrinhoAPI.clear(userId)
}

export const createPedido = async (pedido:any) => {
  const userId = usuariosAPI.getCurrentUserId()
  return await pedidosAPI.create(userId, pedido)
}

/**
 * API de Autenticação
 * Contém métodos para login, cadastro e gerenciamento de usuários
 */

export const authAPI = {
  // Registrar um novo usuário
  register: async (userData:any) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      return handleFetchError(response)
    } catch (error) {
      console.error("Erro ao registrar usuário:", error)
      throw error
    }
  },

  // Login de usuário
  login: async (credentials:any) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
      const data = await handleFetchError(response)

      // Salvar token e informações do usuário no localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      return data
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      throw error
    }
  },

  // Logout de usuário
  logout: () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    // Redirecionar para a página de login ou home
    window.location.href = "/login"
  },


  // Verificar se o usuário está autenticado
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem("authToken")
    return !!token
  },

  // Obter o usuário atual
  getCurrentUser: () => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },
  // Atualizar perfil do usuário
  updateProfile: async (userId:any, userData:any) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      })
      const updatedUser = await handleFetchError(response)

      // Atualizar informações do usuário no localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser))

      return updatedUser
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      throw error
    }
  },

  // Adicionar endereço ao usuário
  addAddress: async (userId:any, addressData:any) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch(`${API_URL}/users/${userId}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      })
      return handleFetchError(response)
    } catch (error) {
      console.error("Erro ao adicionar endereço:", error)
      throw error
    }
  },

  
  // Obter endereços do usuário
  getAddresses: async (userId:any) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch(`${API_URL}/users/${userId}/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return handleFetchError(response)
    } catch (error) {
      console.error("Erro ao buscar endereços:", error)
      throw error
    }
  },
}

