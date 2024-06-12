"use client";

import { useState } from "react";
import { useStore } from "@/store/zustand";
import { useRouter, useParams } from "next/navigation";

export default function Page() {

  const { back, push } = useRouter();
  const { id } = useParams();
  const { player } = useStore();

  if (!player) push('/signin')

  const [input, setInput] = useState({
    title: "",
    report: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {

        if (!input.title.trim() || !input.report.trim()) {
          console.log(input)
          return alert('Por favor complete todos los campos')
        }  
        const response = await fetch('/api/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...input, playerReportedId: id, playerReportId: player && player.id  }),
        })
        const data = await response.json()

        if (response.status === 200) {
            back()
        }
        console.log(data)
    } catch (error) {
        console.log('ocurrio un error en el reporte ' + error)
    } finally {
        setInput({
            title: '',
            report: '',
        })
    }
  }


  return (
    <section className="flex flex-col items-center h-screen w-screen form">
      <h2 className="m-6 font-bold text-3xl text-purple-500">Reportar jugador</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:w-1/3 w-4/5 ">
        <label className="flex flex-col">
          <span>Titulo</span>
          <input
            name="title"
            className="border-2 border-gray-300 p-3 rounded-md focus:outline-purple-500 hover:border-gray-400 bg-transparent"
            type="text"
            placeholder="titulo del reporte"
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          <span>reporte</span>
          <textarea
            name="report"
            className="min-h-16 border-2 border-gray-300 p-3 rounded-md focus:outline-purple-500 hover:border-gray-400 bg-transparent"
            placeholder="escribir reporte"
            onChange={handleChange}
          />
        </label>
        <button className={` border-none bg-purple-500 text-white p-3 rounded-md`} >
          enviar reporte
        </button>
      </form>
    </section>
  );
}
