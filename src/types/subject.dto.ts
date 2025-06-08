export interface SubjectDTO {
  id: number;
  name: string;
  code: number;
  termType: string;
  totalHours: number;
  annualHours: number;
  weeklyHours: number;
  courseYear: number;
  requiredSubjectsToEnroll: number[];
  requiredSubjectsToPass: number[];
}
