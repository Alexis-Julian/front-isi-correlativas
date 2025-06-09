"use client"

import { useAuth } from "@/contexts/auth-context"
import LoginForm from "@/components/login-form"
import UserProfile from "@/components/user-profile"
import Navigation from "@/components/navigation"

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        <Navigation />
        {isAuthenticated ? <UserProfile /> : <LoginForm />}
      </div>
    </main>
  )
}
