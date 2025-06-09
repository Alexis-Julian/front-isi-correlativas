"use client"

import { useAuth } from "@/contexts/auth-context"

// Hook personalizado para hacer peticiones autenticadas
export const useAuthApi = () => {
  const { accessToken } = useAuth()

  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    }

    return fetch(url, {
      ...options,
      headers,
    })
  }

  return { authFetch }
}
