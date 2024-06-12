'use client'

import Report from "@/components/Report"
import { useQuery } from "@tanstack/react-query"
import { useStore } from "@/store/zustand"
import { useRouter } from "next/navigation"

export default function Reports() {

    const { player } = useStore()

    const { push } = useRouter()

    const { data, isLoading, error } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await fetch('/api/report')
            return res.json()
        }
    })

    if (!player) push('/')

    if (isLoading) return <p>cargando...</p>
    if (error) return <p>Error</p>

    return (
        <section className="w-1/2">
            <h1 className="text-2xl text-red-500">Reports</h1>
            <ul className="flex flex-col gap-4 mt-3 mb-8">
                {data?.map((report: any) => (
                    <Report key={report.id} report={report} />
                ))}
            </ul>
        </section>
    )
}