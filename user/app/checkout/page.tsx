"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { AlertCircle, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AuthGuard from "@/components/auth-guard"
import { useToast } from "@/components/ui/use-toast"
import { carrinhoAPI, authAPI, createPedido } from "@/lib/api"

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [newAddress, setNewAddress] = useState({
    nome: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    telefone: "",
    principal: false,
  })
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [orderNotes, setOrderNotes] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState(null)

  // Carregar itens do carrinho e endereços do usuário
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Verificar se o usuário está autenticado e obter dados do usuário
        if (!authAPI.isAuthenticated()) {
          setError("Você precisa estar logado para finalizar o pedido.")
          setLoading(false)
          return
        }

        // Obter o usuário atual
        const currentUser = authAPI.getCurrentUser()
        setUser(currentUser)

        if (!currentUser || !currentUser.id) {
          setError("Não foi possível identificar o usuário.")
          setLoading(false)
          return
        }

        // Buscar itens do carrinho
        const items = await carrinhoAPI.getItems()
        setCartItems(items)

        // Buscar endereços do usuário
        const userAddresses = await authAPI.getAddresses(currentUser.id)
        setAddresses(userAddresses)

        // Selecionar o endereço principal por padrão
        const defaultAddress = userAddresses.find((addr) => addr.principal) || userAddresses[0]
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id)
        } else {
          // Se não houver endereços, mostrar o formulário para adicionar um novo
          setShowNewAddressForm(true)
        }

        setError(null)
      } catch (err) {
        console.error("Erro ao carregar dados:", err)
        setError(
          "Não foi possível carregar os dados necessários para o checkout. Por favor, tente novamente mais tarde.",
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Manipular mudanças no formulário de novo endereço
  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Atualizar a função handleAddAddress para usar o usuário do estado
  const handleAddAddress = async (e) => {
    e.preventDefault()

    try {
      // Validação básica
      if (
        !newAddress.nome ||
        !newAddress.cep ||
        !newAddress.logradouro ||
        !newAddress.numero ||
        !newAddress.bairro ||
        !newAddress.cidade ||
        !newAddress.estado
      ) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios do endereço.",
          variant: "destructive",
        })
        return
      }

      if (!user || !user.id) {
        toast({
          title: "Erro",
          description: "Usuário não identificado. Por favor, faça login novamente.",
          variant: "destructive",
        })
        return
      }

      // Adicionar endereço
      const addedAddress = await authAPI.addAddress(user.id, newAddress)

      // Atualizar a lista de endereços
      setAddresses((prev) => [...prev, addedAddress])

      // Selecionar o novo endereço
      setSelectedAddressId(addedAddress.id)

      // Esconder o formulário
      setShowNewAddressForm(false)

      toast({
        title: "Endereço adicionado",
        description: "O endereço foi adicionado com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao adicionar endereço:", error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o endereço. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Finalizar pedido
  const handleFinalizePedido = async () => {
    try {
      // Validações
      if (cartItems.length === 0) {
        toast({
          title: "Carrinho vazio",
          description: "Adicione itens ao carrinho antes de finalizar o pedido.",
          variant: "destructive",
        })
        return
      }

      if (!selectedAddressId && !showNewAddressForm) {
        toast({
          title: "Endereço necessário",
          description: "Por favor, selecione um endereço de entrega ou adicione um novo.",
          variant: "destructive",
        })
        return
      }

      if (showNewAddressForm) {
        toast({
          title: "Endereço incompleto",
          description: "Por favor, complete e salve o endereço antes de finalizar o pedido.",
          variant: "destructive",
        })
        return
      }

      setIsProcessing(true)

      // Calcular valores do pedido
      const subtotal = cartItems.reduce((sum, item) => {
        const price = item.preco || 0
        const quantity = item.quantidade || 1
        return sum + price * quantity
      }, 0)

      const entrega = subtotal > 300 ? 0 : 50
      const imposto = subtotal * 0.08
      const total = subtotal + entrega + imposto

      // Obter o endereço selecionado
      const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId)

      // Criar o pedido
      const pedido = {
        itens: cartItems,
        subtotal,
        taxaEntrega: entrega,
        impostos: imposto,
        total,
        status: "PENDENTE",
        dataHora: new Date().toISOString(),
        enderecoEntrega: selectedAddress,
        formaPagamento: paymentMethod,
        observacoes: orderNotes,
      }

      // Enviar o pedido para o backend
      //const novoPedido = await createPedido(pedido)

      // Limpar o carrinho após criar o pedido
      await carrinhoAPI.clear()
      alert("Pedido finalizado com sucesso!")
      // Redirecionar para a página de confirmação com o ID do pedido
      router.push(`/`)
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error)
      toast({
        title: "Erro",
        description: "Não foi possível finalizar o pedido. Por favor, tente novamente.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  // Calcular valores do carrinho
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.preco || 0
    const quantity = item.quantidade || 1
    return sum + price * quantity
  }, 0)

  const entrega = subtotal > 300 ? 0 : 50
  const imposto = subtotal * 0.08
  const total = subtotal + entrega + imposto

  return (
    <AuthGuard optional={true}>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          <div className="container px-4 py-8 md:px-6 md:py-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Finalizar Pedido</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/carrinho" className="hover:text-primary">
                  Carrinho
                </Link>
                <span className="mx-2">/</span>
                <span>Checkout</span>
              </div>
            </div>

            {/* Exibir mensagem de erro se houver */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Exibir indicador de carregamento */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-muted-foreground">Carregando dados do checkout...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  {/* Endereço de Entrega */}
                  <div className="bg-card rounded-lg border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Endereço de Entrega</h2>
                      {!showNewAddressForm && addresses.length > 0 && (
                        <Button variant="outline" size="sm" onClick={() => setShowNewAddressForm(true)}>
                          Adicionar Novo Endereço
                        </Button>
                      )}
                    </div>

                    {addresses.length > 0 && !showNewAddressForm && (
                      <div className="space-y-4">
                        <RadioGroup
                          value={selectedAddressId?.toString()}
                          onValueChange={(value) => setSelectedAddressId(Number.parseInt(value))}
                        >
                          {addresses.map((address) => (
                            <div key={address.id} className="flex items-start space-x-2 border rounded-md p-4">
                              <RadioGroupItem
                                value={address.id.toString()}
                                id={`address-${address.id}`}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <Label htmlFor={`address-${address.id}`} className="font-medium cursor-pointer">
                                  {address.nome}{" "}
                                  {address.principal && <span className="text-primary">(Principal)</span>}
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {address.logradouro}, {address.numero}{" "}
                                  {address.complemento && `, ${address.complemento}`}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {address.bairro}, {address.cidade} - {address.estado}
                                </p>
                                <p className="text-sm text-muted-foreground">CEP: {address.cep}</p>
                                {address.telefone && (
                                  <p className="text-sm text-muted-foreground">Tel: {address.telefone}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                        <Button variant="link" className="px-0" onClick={() => setShowNewAddressForm(true)}>
                          Adicionar outro endereço
                        </Button>
                      </div>
                    )}

                    {showNewAddressForm && (
                      <form onSubmit={handleAddAddress} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome do destinatário *</Label>
                          <Input
                            id="nome"
                            name="nome"
                            value={newAddress.nome}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cep">CEP *</Label>
                            <Input id="cep" name="cep" value={newAddress.cep} onChange={handleAddressChange} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input
                              id="telefone"
                              name="telefone"
                              value={newAddress.telefone}
                              onChange={handleAddressChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="logradouro">Endereço *</Label>
                          <Input
                            id="logradouro"
                            name="logradouro"
                            value={newAddress.logradouro}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="numero">Número *</Label>
                            <Input
                              id="numero"
                              name="numero"
                              value={newAddress.numero}
                              onChange={handleAddressChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="complemento">Complemento</Label>
                            <Input
                              id="complemento"
                              name="complemento"
                              value={newAddress.complemento}
                              onChange={handleAddressChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bairro">Bairro *</Label>
                          <Input
                            id="bairro"
                            name="bairro"
                            value={newAddress.bairro}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cidade">Cidade *</Label>
                            <Input
                              id="cidade"
                              name="cidade"
                              value={newAddress.cidade}
                              onChange={handleAddressChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="estado">Estado *</Label>
                            <Select
                              value={newAddress.estado}
                              onValueChange={(value) => setNewAddress((prev) => ({ ...prev, estado: value }))}
                            >
                              <SelectTrigger id="estado">
                                <SelectValue placeholder="Selecione o estado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="AC">Acre</SelectItem>
                                <SelectItem value="AL">Alagoas</SelectItem>
                                <SelectItem value="AP">Amapá</SelectItem>
                                <SelectItem value="AM">Amazonas</SelectItem>
                                <SelectItem value="BA">Bahia</SelectItem>
                                <SelectItem value="CE">Ceará</SelectItem>
                                <SelectItem value="DF">Distrito Federal</SelectItem>
                                <SelectItem value="ES">Espírito Santo</SelectItem>
                                <SelectItem value="GO">Goiás</SelectItem>
                                <SelectItem value="MA">Maranhão</SelectItem>
                                <SelectItem value="MT">Mato Grosso</SelectItem>
                                <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                                <SelectItem value="MG">Minas Gerais</SelectItem>
                                <SelectItem value="PA">Pará</SelectItem>
                                <SelectItem value="PB">Paraíba</SelectItem>
                                <SelectItem value="PR">Paraná</SelectItem>
                                <SelectItem value="PE">Pernambuco</SelectItem>
                                <SelectItem value="PI">Piauí</SelectItem>
                                <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                                <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                                <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                                <SelectItem value="RO">Rondônia</SelectItem>
                                <SelectItem value="RR">Roraima</SelectItem>
                                <SelectItem value="SC">Santa Catarina</SelectItem>
                                <SelectItem value="SP">São Paulo</SelectItem>
                                <SelectItem value="SE">Sergipe</SelectItem>
                                <SelectItem value="TO">Tocantins</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="principal"
                            name="principal"
                            checked={newAddress.principal}
                            onCheckedChange={(checked) =>
                              setNewAddress((prev) => ({ ...prev, principal: checked === true }))
                            }
                          />
                          <Label htmlFor="principal" className="text-sm font-normal">
                            Definir como endereço principal
                          </Label>
                        </div>

                        <div className="flex justify-between pt-4">
                          {addresses.length > 0 && (
                            <Button type="button" variant="outline" onClick={() => setShowNewAddressForm(false)}>
                              Cancelar
                            </Button>
                          )}
                          <Button type="submit">Salvar Endereço</Button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Método de Pagamento */}
                  <div className="bg-card rounded-lg border p-6">
                    <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="h-5 w-5" />
                          Cartão de Crédito
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 2L2 7L12 12L22 7L12 2Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 17L12 22L22 17"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 12L12 17L22 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          PIX
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border rounded-md p-4">
                        <RadioGroupItem value="boleto" id="boleto" />
                        <Label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                            <line
                              x1="7"
                              y1="15"
                              x2="17"
                              y2="15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          Boleto Bancário
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Observações do Pedido */}
                  <div className="bg-card rounded-lg border p-6">
                    <h2 className="text-xl font-semibold mb-4">Observações do Pedido (Opcional)</h2>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea
                        id="notes"
                        placeholder="Instruções especiais para entrega ou qualquer outra informação"
                        className="min-h-[100px]"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Resumo do Pedido */}
                <div>
                  <div className="sticky top-20">
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>

                        <div className="mb-4">
                          <h3 className="font-medium mb-2">Itens ({cartItems.length})</h3>
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {cartItems.map((item) => (
                              <div key={item.id} className="flex gap-3">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                  <Image
                                    src={item.imagem || "/placeholder.svg?height=100&width=100"}
                                    alt={item.nome || "Produto"}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium">{item.nome || "Produto"}</h4>
                                  <p className="text-xs text-muted-foreground">
                                    {item.quantidade || 1}x {item.periodo || "diário"} - R$
                                    {item.preco?.toFixed(2) }
                                    /un
                                  </p>
                                </div>
                                <div className="text-sm font-medium">
                                  R${((item.preco || 0) * (item.quantidade || 1)).toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>R${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Entrega</span>
                            <span>{entrega === 0 ? "Grátis" : `R$${entrega.toFixed(2)}`}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Impostos</span>
                            <span>R${imposto.toFixed(2)}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between font-medium text-lg">
                            <span>Total</span>
                            <span>R${total.toFixed(2)}</span>
                          </div>

                          <div className="pt-4">
                            <Button
                              className="w-full"
                              size="lg"
                              onClick={handleFinalizePedido}
                              disabled={
                                isProcessing || cartItems.length === 0 || showNewAddressForm || !selectedAddressId
                              }
                            >
                              {isProcessing ? (
                                <>
                                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                  Processando...
                                </>
                              ) : (
                                <>
                                  Finalizar Pedido
                                  <Check className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  )
}

