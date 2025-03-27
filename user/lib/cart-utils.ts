// Utilitários simplificados para gerenciamento do carrinho
import { addItemToCarrinho, removeItemFromCarrinho, updateItemQuantity, clearCarrinho } from "./api"

// Tipo para os itens do carrinho
export interface CartItem {
  id: number
  itemId: number
  nome: string
  imagem: string
  preco: number
  quantidade: number
  periodo: string
  tipo: string
}

// Função para adicionar um item ao carrinho
export async function addToCart(item: any) {
  try {
    // Verificar se o item tem todos os campos necessários
    if (!item || !item.id || !item.nome) {
      console.error("Item inválido:", item)
      throw new Error("Item inválido para adicionar ao carrinho")
    }

    const cartItem = {
      itemId: item.id,
      nome: item.nome,
      imagem: item.imagem || "/placeholder.svg?height=100&width=100",
      preco: Number.parseFloat(item.preco || item.valor || "0"),
      quantidade: 1,
      periodo: item.periodo || "diario",
      tipo: item.tipo || "equipamento",
    }

    await addItemToCarrinho(cartItem)

    // Disparar evento para atualizar o contador no header
    const event = new CustomEvent("cartUpdated")
    window.dispatchEvent(event)

    return { success: true, message: "Item adicionado ao carrinho" }
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error)
    return { success: false, message: "Erro ao adicionar item ao carrinho" }
  }
}

// Função para remover um item do carrinho
export async function removeFromCart(id: number): Promise<boolean> {
  try {
    await removeItemFromCarrinho(id)

    // Disparar evento para atualizar o contador no header
    const event = new CustomEvent("cartUpdated")
    window.dispatchEvent(event)

    return true
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error)
    return false
  }
}

// Função para atualizar a quantidade de um item no carrinho
export async function updateCartItemQuantity(id: number, quantity: number): Promise<boolean> {
  try {
    if (quantity < 1) return false

    await updateItemQuantity(id, quantity)

    // Disparar evento para atualizar o contador no header
    const event = new CustomEvent("cartUpdated")
    window.dispatchEvent(event)

    return true
  } catch (error) {
    console.error("Erro ao atualizar quantidade do item:", error)
    return false
  }
}

// Função para limpar o carrinho
export async function clearCart(): Promise<boolean> {
  try {
    await clearCarrinho()

    // Disparar evento para atualizar o contador no header
    const event = new CustomEvent("cartUpdated")
    window.dispatchEvent(event)

    return true
  } catch (error) {
    console.error("Erro ao limpar carrinho:", error)
    return false
  }
}

