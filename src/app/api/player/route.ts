import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";

export async function GET() {
    try {
        const players = await prisma.player.findMany();
    
        return NextResponse.json(players);
    } catch (error) {
        return NextResponse.json({ message: "Error de servidor", error: error });
    }
}


export async function POST(request: Request) {
    try {
        const { name, email, password, role } = await request.json();

        const player = await prisma.player.create({
            data: {
                name, email, password, role
            }
        })

        return NextResponse.json(player);
    } catch (error) {
        return NextResponse.json({ message: "Error de servidor", error: error });
    }
}