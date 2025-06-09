"use client"

import { useAuth } from "@/contexts/auth-context"
import { useSubjects } from "@/hooks/use-subjects"
import type { Subject } from "@/types/subject"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SubjectsTable() {
  const { subjects, isLoading, error } = useSubjects()
  const { user } = useAuth()

  // Función para verificar si una materia está regularizada
  const isSubjectRegularized = (subjectId: number) => {
    return user?.regularizedSubjects?.includes(subjectId) || false
  }

  // Función para verificar si una materia está aprobada
  const isSubjectApproved = (subjectId: number) => {
    return user?.approvedSubjects?.includes(subjectId) || false
  }

  // Función para obtener nombres de materias por IDs
  const getSubjectNamesByIds = (ids: number[]) => {
    return ids
      .map((id) => `* ${subjects.find((s) => s.id === id)?.name || `Materia ${id}`}`)
      .join("\n");
  };

  // Función para obtener el color del badge según el año
  const getYearBadgeVariant = (year: number) => {
    switch (year) {
      case 1:
        return "default"
      case 2:
        return "secondary"
      case 3:
        return "outline"
      case 4:
        return "destructive"
      case 5:
        return "default"
      default:
        return "secondary"
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <Clock className="h-6 w-6 animate-spin mr-2" />
            <p>Cargando materias...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan 2023 - Ingeniería en Sistemas</CardTitle>
        <CardDescription>Listado completo de materias con correlatividades y estado actual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">AÑO</TableHead>
                <TableHead className="w-20">CÓDIGO</TableHead>
                <TableHead>MATERIA</TableHead>
                <TableHead className="w-16">HS</TableHead>
                <TableHead className="w-20">TIPO</TableHead>
                <TableHead className="w-20">REGULAR</TableHead>
                <TableHead className="w-20">APROBADA</TableHead>
                <TableHead>PARA CURSAR</TableHead>
                <TableHead>PARA RENDIR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject: Subject) => (
                <TableRow key={subject.id}>
                  <TableCell>
                    <Badge variant={getYearBadgeVariant(subject.courseYear)}>{subject.courseYear}°</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{subject.code}</TableCell>
                  <TableCell className="font-medium">{subject.name}</TableCell>
                  <TableCell className="text-center">{subject.weeklyHours || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {subject.termType === "ANUAL" ? "ANUAL" : "CUATR"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {isSubjectRegularized(subject.id) ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {isSubjectApproved(subject.id) ? (
                      <CheckCircle className="h-5 w-5 text-blue-600 mx-auto" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-sm align-top">
                    {subject.requiredSubjectsToEnroll.length > 0 ? (
                      <ul className="list-disc list-inside max-w-xs">
                        {subject.requiredSubjectsToEnroll.map((id) => {
                          const name = subjects.find((s) => s.id === id)?.name || `Materia ${id}`;
                          return <li key={id}>{name}</li>;
                        })}
                      </ul>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm align-top">
                    {subject.requiredSubjectsToPass.length > 0 ? (
                      <ul className="list-disc list-inside max-w-xs">
                        {subject.requiredSubjectsToPass.map((id) => {
                          const name = subjects.find((s) => s.id === id)?.name || `Materia ${id}`;
                          return <li key={id}>{name}</li>;
                        })}
                      </ul>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {subjects.length === 0 && <div className="text-center py-8 text-gray-500">No se encontraron materias</div>}
      </CardContent>
    </Card>
  )
}
