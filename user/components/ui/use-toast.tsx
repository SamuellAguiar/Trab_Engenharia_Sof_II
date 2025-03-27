"use client"

import type React from "react"

import type { ToastProps } from "@/components/ui/toast"

type Toast = Omit<ToastProps, "id">

import { useState, createContext, useContext } from "react"

// Create a context for the toast
const ToastContext = createContext<{
  toast: (props: Toast) => void
  toasts: ToastProps[]
}>({
  toast: () => {},
  toasts: [],
})

// Provider component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: Toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...props, id }])

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }

  return <ToastContext.Provider value={{ toast, toasts }}>{children}</ToastContext.Provider>
}

// Hook to use the toast
export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Standalone toast function for use outside of components
export const toast = (props: Toast) => {
  // This is a fallback for when the context isn't available
  console.warn("Toast used outside of ToastProvider. Toast may not appear.")

  // We'll still try to show something in the console
  console.info("Toast:", props)
}

