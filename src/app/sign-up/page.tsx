"use client";
import { API_URL } from "@/const";
import { useState, FormEvent } from "react";
import { redirect, usePathname } from "next/navigation";
import { navigate } from "./actions";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Get values of form
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repeat = formData.get("repeat-password") as string;
    const terms = formData.get("terms") === "on";
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    if (password !== repeat) {
      setError("La contraseñas no coinciden");
      setLoading(false);
    }

    /*  if (!terms) {
      setError("Debes aceptar los terminos y condiciones");
      setLoading(false);
      return;
    } */
    console.log("probando");
    try {
      //
      const res = await fetch(`${API_URL}/api/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      console.log(res);
      //
      if (!res.ok) {
        const { error } = await res.json();
        console.log("Error response:", error);
        throw new Error(error ?? "Error desconocido");
      }

      //
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.refreshToken);
        console.log("User signed up successfully:", data);
        return navigate();
      }
    } catch (err: any) {
      console.log("Error response:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[var(--background)] h-full w-full  flex items-center justify-center">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit} noValidate>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium ">
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow-xs bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium ">
            Your password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            className="shadow-xs bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium  "
          >
            Repeat password
          </label>
          <input
            name="repeat-password"
            type="password"
            id="repeat-password"
            className="shadow-xs bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            required
          />
        </div>
        <div className="flex gap-5">
          <div className="mb-5">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium "
            >
              Nombre
            </label>
            <input
              name="firstName"
              id="firstName"
              className="shadow-xs bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium "
            >
              Apellido
            </label>
            <input
              name="lastName"
              id="lastName"
              className="shadow-xs bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              required
            />
          </div>
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label htmlFor="terms" className="ms-2 text-sm font-medium  300">
            I agree with the{" "}
            <a href="#" className="text-blue-600 hover:underline 500">
              terms and conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? "Registrando..." : "Registrase"}
        </button>
      </form>
    </main>
  );
}
