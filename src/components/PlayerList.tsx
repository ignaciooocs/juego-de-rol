'use client'
import { IPlayer } from '@/types/user.t'
import { useQuery } from '@tanstack/react-query'
import Player from './Player'
import { useStore } from '@/store/zustand'
import { useRouter } from 'next/navigation'

export default function PlayerList({ endpoint, title }: { endpoint: string, title: string }) {
    const { player } = useStore()
    const { push } = useRouter() 

    const { data, isLoading, error } = useQuery({
        queryKey: [endpoint ? endpoint : 'users'],
        queryFn: async () => {
            const res = await fetch('/api/player/' + endpoint)
            return res.json()
        }
    })

    if (!player) push('/')
    if (isLoading) return <p>cargando...</p>
    if (error) return <p>Error</p>

           
    // if (!data) return  <h2 className='text-center pb-4'>{title}</h2>
    console.log(data)

    return (
        <section className='border border-gray-300 w-full p-6 rounded-md'>
            <h2 className='text-center pb-4'>{title}</h2>
            <ul className='flex flex-col gap-4'>
                {data.error ? null : data?.map((user: IPlayer) => (
                    <Player key={user.id} {...user} />
                ))}
            </ul>
        </section>
    )
}
