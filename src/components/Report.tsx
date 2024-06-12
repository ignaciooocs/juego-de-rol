import Link from "next/link";
import { FormEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
export default function Report({ report }: any) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient()

    async function deleteReport(e: FormEvent): Promise<void> {
        e.preventDefault()
        try {
            await fetch(`/api/report/${report.id}`, {
                method: 'DELETE'
            })
            setOpen(false)
        } catch (error) {
            console.log(error)
        } finally {
            queryClient.invalidateQueries({ queryKey: ['reports']})            
        }
    }
    return (
        <div>
            <li onClick={() => setOpen(!open)} className="border border-gray-300 p-3 rounded-t-md cursor-pointer hover:opacity-80" key={report.id}>
                <h2 className="font-bold underline">{report.title}</h2>
                <p className="">{report.report}</p>
            </li>
            {open && 
            <section className="border border-gray-300 rounded-b-md p-3 flex justify-between items-center">
                <Link href={`/profile/${report.playerReportedId}`} className="hover:opacity-80 text-cyan-600">ver perfil del jugador</Link>
                <form onSubmit={deleteReport}>
                    <button className="border-none bg-red-500 text-white p-2 rounded-md">Eliminar reporte</button>
                </form>
            </section>}
        </div>
    );
}