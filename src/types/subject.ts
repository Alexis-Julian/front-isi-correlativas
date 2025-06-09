export interface Subject {
  id: number
  name: string
  code: number
  termType: "ANUAL" | "CUATRIMESTRAL"
  totalHours: number
  annualHours: number
  weeklyHours: number
  courseYear: number
  requiredSubjectsToEnroll: number[]
  requiredSubjectsToPass: number[]
}
