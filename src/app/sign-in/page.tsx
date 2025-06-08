"use client";
import { API_URL } from "@/const";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState, FormEvent } from "react";
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
    console;
    try {
      // Check if email and password are provided
      const res = await fetch(`${API_URL}/api/auth/sign-in`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log(res);
      // Check if the response is ok
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error ?? "Error desconocido");
      }

      // If the response is ok, parse the response data
      if (res.ok) {
        const data = await res.json();
        console.log("User signed up successfully:", data);
        return data;
      }
    } catch (err: any) {
      setError(err.message);
      console.log("Error response:", err.message);
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
        <button
          type="submit"
          disabled={loading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? "Iniciando" : "Iniciar sesion"}
        </button>
      </form>
    </main>
  );
}
