"use client"

import SubjectsTable from "@/components/subjects-table"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"

export default function SubjectsPage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Debes iniciar sesión para ver las materias</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <SubjectsTable />
    </div>
  )
}
