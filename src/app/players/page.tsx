import PlayerList from "@/components/PlayerList";

export default function Player () {
    return (
        <section className="flex flex-col items-center w-1/2">
            <PlayerList endpoint="online" title="Jugadores en linea" />
        </section>
    )
}