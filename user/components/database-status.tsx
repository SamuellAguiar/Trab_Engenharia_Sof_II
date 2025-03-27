"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

export default function DatabaseStatus() {
  const [status, setStatus] = useState("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081"
        const response = await fetch(`${API_URL}/db-health`)

        if (response.ok) {
          const data = await response.json()
          setStatus(data.status === "UP" ? "connected" : "error")
          setMessage(data.message)
        } else {
          setStatus("error")
          setMessage("Erro ao conectar com o banco de dados")
        }
      } catch (error) {
        setStatus("error")
        setMessage("Não foi possível verificar o status do banco de dados")
      }
    }

    checkDatabase()
  }, [])

  return (
    <div className="p-4 mb-4 border rounded-lg">
      <div className="flex items-center">
        {status === "loading" && (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin text-primary" />
            <span>Verificando conexão com o banco de dados...</span>
          </>
        )}

        {status === "connected" && (
          <>
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            <span>Banco de dados conectado: {message}</span>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
            <span>Problema na conexão: {message}</span>
          </>
        )}
      </div>
    </div>
  )
}

