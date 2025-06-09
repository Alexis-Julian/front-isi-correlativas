"use client"

import { useState, useEffect } from "react"
import type { Subject } from "@/types/subject"

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://api-isi-correlatividades.vercel.app/api/subjects")

      if (!response.ok) {
        throw new Error("Error al cargar las materias")
      }

      const data = await response.json()
      setSubjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubjects()
  }, [])

  return { subjects, isLoading, error, refetch: fetchSubjects }
}
