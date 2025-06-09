"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function UserProfile() {
  const { user, logout, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No has iniciado sesión</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Perfil de Usuario</CardTitle>
        <CardDescription>Información de tu cuenta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback>
              {user.firstName[0]?.toUpperCase()}
              {user.lastName[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <Badge variant="secondary">{user.role}</Badge>
          </div>

          {user.regularizedSubjects.length > 0 && (
            <div>
              <p className="text-sm font-medium">Materias Regularizadas:</p>
              <p className="text-sm text-muted-foreground">{user.regularizedSubjects.length} materias</p>
            </div>
          )}

          {user.approvedSubjects.length > 0 && (
            <div>
              <p className="text-sm font-medium">Materias Aprobadas:</p>
              <p className="text-sm text-muted-foreground">{user.approvedSubjects.length} materias</p>
            </div>
          )}
        </div>

        <div className="pt-4">
          <Button onClick={logout} variant="outline" className="w-full">
            Cerrar Sesión
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
