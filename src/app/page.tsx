'use client'

import PlayerList from "@/components/PlayerList";

import { redirect } from 'next/navigation'
import { useStore } from "@/store/zustand"; 

export default function Home() {

  const { player } = useStore();
  
  if (!player) {
    redirect('/signin')
  }

  return (
    <section className="flex flex-col items-center w-1/2">
      <h1 className="m-5 text-2xl font-bold text-purple-500">
        bienvenido a juego de rol
      </h1>
      <PlayerList endpoint="" title="Todos los usuarios del juego" />
    </section>
  );
}
