"use client";

import { useState } from "react";
import { useStore } from "@/store/zustand";
import { IPlayer } from "@/types/user.t";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();
    
  const { setPlayer, player } = useStore();

  if (player) {
    router.push("/");
  } 
  const [input, setInput] = useState({
    email: "",
    password: "123456",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {

      if (!input.email.trim() || !input.password.trim()) {
        console.log(input)
        return alert('Por favor complete todos los campos')
      }
        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        })
        const data: IPlayer = await response.json()
        setPlayer(data)

        console.log(data)
    } catch (error) {
        console.log('ocurrio un error en el login ' + error)
    } finally {
        setInput({
            email: '',
            password: '123456',
        })
    }
  }

  const verify = !input.email.trim() || !input.password.trim();

  return (
    <section className="flex flex-col items-center h-screen w-full form">
      <h2 className="m-6 font-bold text-3xl text-purple-500">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:w-1/3 w-4/5 ">
        <label className="flex flex-col">
          <span>Email</span>
          <input
            name="email"
            className="border-2 border-gray-300 p-3 rounded-md focus:outline-purple-500 hover:border-gray-400 bg-transparent"
            type="email"
            placeholder="email"
            value={input.email}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          <span>Contraseña</span>
          <input
            name="password"
            className="border-2 border-gray-300 p-3 rounded-md focus:outline-purple-500 hover:border-gray-400 bg-transparent"
            placeholder="Contraseña"
            type="password"
            value={input.password}
            onChange={handleChange}
          />
        </label>
        <button disabled={verify} className={`${!verify ? '' : 'opacity-50'} border-none bg-purple-500 text-white p-3 rounded-md`} >
          Iniciar sesión
        </button>
      </form>
    </section>
  );
}
