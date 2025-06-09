export interface SignUpResponse {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  created: string;
  edited: string;
  regularizedSubjects: number[];
  approvedSubjects: number[];
  accessToken: string;
  refreshToken: string;
}
