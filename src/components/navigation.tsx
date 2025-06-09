"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, User, LogOut } from "lucide-react"

export default function Navigation() {
  const { user, logout, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return null
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="font-medium">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-sm text-muted-foreground">({user?.role})</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Link>
            </Button>

            <Button asChild variant="outline" size="sm">
              <Link href="/subjects">
                <BookOpen className="h-4 w-4 mr-2" />
                Materias
              </Link>
            </Button>

            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
