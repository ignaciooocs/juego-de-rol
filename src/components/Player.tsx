'use client'

import { IPlayer } from "@/types/user.t";
import Link from "next/link";
import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5"
import { useStore } from "@/store/zustand";

export default function Player({ name, id, role, status }: IPlayer) {
    const [open, setOpen] = useState(false)

    const { player } = useStore()
    if (!player) return null

    return (
        <div>
            <li onClick={() => setOpen(!open)} className="p-3 z-20 bg-black border-2 border-gray-300 flex justify-between cursor-pointer rounded-t-md">
                <section className="flex gap-2 items-center">
                    <IoPersonOutline color="rgb(168, 85, 247)" />
                    <b className={`space-x-2 flex gap-2 ${id === player.id ? 'text-cyan-500' : ''}`}>{name} {id === player.id && <span className="text-purple-500">{'( Tú )'}</span>}</b>
                </section>
                <div className="flex gap-1 items-center">
                    <b className="flex gap-1 text-sm">{status === 'ONLINE' ? 'online' : 'offline' }</b>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: status === 'ONLINE' ? '#27ab67' : '#f55' }} />
                </div>
            </li>
            {open && <section className="flex flex-col z-10 border-t-transparent p-3 border-2 border-gray-300 rounded-b-md">
                {(role === 'PLAYER' && player.role === 'PLAYER') && (id !== player.id) &&
                 <Link className="hover:opacity-80 text-red-400" href={`/players/${id}`}>reportar jugador</Link>}
                <Link href={`/profile/${id}`} className="hover:opacity-80 text-cyan-600">ver jugador</Link>
            </section>}
        </div>
    )
}