import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";

export async function GET(request: Request) {
    try {
        const players = await prisma.player.findMany({
            where: {
                status: "ONLINE",
                role: "PLAYER"
            }
        });
        return NextResponse.json(players);  
    } catch (error) {
        return NextResponse.json({ message: "Error de servidor", error: error });
    }
}