import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const player = await prisma.player.findUnique({
            where: {
                email
            }
        });

        if (!player) return NextResponse.json({ message: "Credenciales invalidas" });

        if (player.password !== password) return NextResponse.json({ message: "Credenciales invalidas" });

        await prisma.player.update({
            where: {
                id: player.id
            },
            data: {
                status: "ONLINE"
            }
        });
        
        return NextResponse.json(player);
        
    } catch (error) {
        return NextResponse.json({ message: "Error de servidor", error: error });
    }
}