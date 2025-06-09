import { API_URL } from "@/const";
import {
  FormState,
  SignupFormSchema,
  SigninFormSchema,
} from "../lib/definitions";
import { redirect } from "next/navigation";
import { SignUpResponse } from "@/types/sign-up.response.dto";

export async function signin(state: FormState, formData: FormData) {
  // Validate the form data against the schema
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const res = await fetch(`${API_URL}/api/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      return { ok: false, message: error };
    }

    const data = await res.json();

    redirect("/");

    return {
      ok: true,
      message: "Usuario autenticado correctamente",
      data: data,
    };
  } catch (err: any) {
    return { ok: false, message: err.message };
  }
}

export async function signup(state: FormState, formData: FormData) {
  // Validate the form data against the schema
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, password, email } = validatedFields.data;

  try {
    const res = await fetch(`${API_URL}/api/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      return { ok: false, message: error };
    }

    const data: SignUpResponse = await res.json();

    redirect("/");

    return {
      ok: true,
      message: "Usuario registrado correctamente",
      data: data,
    };
  } catch (err: any) {
    return { ok: false, message: err.message };
  }
}
