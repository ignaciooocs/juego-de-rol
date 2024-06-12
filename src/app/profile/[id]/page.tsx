'use client'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useStore } from "@/store/zustand"

export default function Profile() {
    const { id } = useParams()

    const { player } = useStore()
    const queryClient = useQueryClient()

    const { data, isLoading, error } = useQuery({
        queryKey: ['profile', id],
        queryFn: async () => {
            const res = await fetch(`/api/player/${id}`)
            return res.json()
        }
    })

    if (!player) return null

    if (isLoading) return <p>cargando...</p>
    if (error) return <p>Error</p>

    return (
        <div  className="w-1/2">
            <h1 className="text-xl text-purple-500">Perfil de usuario</h1>

            <div className="flex gap-2">
                <span>Nombre:</span>
                <p className="space-x-3">  {data?.name}</p>
            </div>
            <div className="flex gap-2">
                <span>email:</span>
                <p className="space-x-3"> {data?.email}</p>
            </div>
            <div className="flex gap-2">
                <span>role:</span>
                <p className="space-x-3"> {data?.role}</p>
            </div>
            <div className="flex gap-2">
                <span>id:</span>
                <p className="space-x-3">{data?.id}</p>
            </div>
            <div className="flex gap-2">
                <span>estado:</span>
                <p className={`space-x-3 ${data?.status === 'ONLINE' ? 'text-green-500' : 'text-red-500'} `}>  {data?.status}</p>
            </div>

            {player?.role === 'GAME_MASTER' && <button
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-400"
                type="button"
                onClick={async () => {
                    try {
                        await fetch(`/api/player/${id}`, {
                            method: 'PUT',
                            body: JSON.stringify({ status: 'OFFLINE' })
                        })
                        
                    } catch (error) {
                        console.log(error)
                    } finally {
                        queryClient.invalidateQueries({ queryKey: ['profile', id] })
                    }
                }}
            >Expulsar</button>}
        </div>
    )
}