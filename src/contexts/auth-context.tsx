"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Actualizar la interfaz User para que coincida con tu respuesta de API
interface User {
  id: number
  email: string
  role: string
  firstName: string
  lastName: string
  created: string
  edited: string
  regularizedSubjects: number[]
  approvedSubjects: number[]
}

// Actualizar AuthContextType para incluir refreshToken
interface AuthContextType {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

// Provider del contexto
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  // En el AuthProvider, actualizar los estados
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Actualizar el useEffect para cargar los tokens correctos
  useEffect(() => {
    const savedAccessToken = localStorage.getItem("accessToken")
    const savedRefreshToken = localStorage.getItem("refreshToken")
    const savedUser = localStorage.getItem("authUser")

    if (savedAccessToken && savedRefreshToken && savedUser) {
      setAccessToken(savedAccessToken)
      setRefreshToken(savedRefreshToken)
      setUser(JSON.parse(savedUser))
    }

    setIsLoading(false)
  }, [])

  // Actualizar la función login para manejar tu estructura de respuesta
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Aquí harías la llamada a tu API de autenticación
      const response = await fetch("https://api-isi-correlatividades.vercel.app/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Error en el login")
      }

      const data = await response.json()

      // Extraer tokens y datos del usuario
      const { accessToken: newAccessToken, refreshToken: newRefreshToken, ...userData } = data

      // Guardar tokens y usuario
      setAccessToken(newAccessToken)
      setRefreshToken(newRefreshToken)
      setUser(userData)

      // Guardar en localStorage
      localStorage.setItem("accessToken", newAccessToken)
      localStorage.setItem("refreshToken", newRefreshToken)
      localStorage.setItem("authUser", JSON.stringify(userData))
    } catch (error) {
      console.error("Error durante el login:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Actualizar la función logout
  const logout = () => {
    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("authUser")
  }

  // Actualizar el value del contexto
  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user && !!accessToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
