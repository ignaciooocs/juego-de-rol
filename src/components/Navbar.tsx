'use client'
import Link from 'next/link'
import { useStore } from '@/store/zustand'
import { useQueryClient } from '@tanstack/react-query'

export default function Navbar () {
    const { player, setPlayer } = useStore()
    const queryClient = useQueryClient()

    return (
        <nav className='flex flex-col border border-gray-300 col-start-1 col-end-2 row-start-2 row-end-13'>
            {player 
            ? 
            <>
                    <Link className='p-3 border-y border-gray-300 hover:opacity-80' href="/">Home</Link>
                    <Link className='p-3 border-y border-gray-300 hover:opacity-80' href="/players">Players</Link>
                    {player.role === 'GAME_MASTER' && <Link className='p-3 border-y border-gray-300 hover:opacity-80' href="/reports">Report</Link>}
                </>
            : 
                <>
                    <Link className='p-3 border-y border-gray-300 hover:opacity-80' href="/signin">Iniciar sesión</Link>
                    <Link className='p-3 border-y border-gray-300 hover:opacity-80' href="/signup">Registrarse</Link>
                </>
            }
            {player && 
            <div
                className='cursor-pointer p-3 border-y text-red-500 mt-2 border-red-500 hover:text-red-400' 
                onClick={() => {
                    setPlayer(false)
                    // limpiar data
                    queryClient.removeQueries()
                }
            }>
                cerrar sesión
            </div>}

            {player &&<p className='p-3 absolute bottom-3 text-cyan-500 flex gap-2'><span className='text-purple-500'>usuario:</span> {player?.name}</p>}
        </nav>
    )
}