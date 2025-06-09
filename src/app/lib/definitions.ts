import { z } from "zod";

export const SigninFormSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .trim(),
});

export const SignupFormSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .trim(),
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
});

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        firstName?: string[];
        lastName?: string[];
      };
      message?: string;
    }
  | undefined;
