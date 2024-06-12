import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";

export async function GET(request: Request, { params }: { params: { id: string }}) {
    const { id } = params;
    try {
        const player = await prisma.player.findUnique({
            where: {
                id,
            },
        });
        return NextResponse.json(player);
    } catch (error) {
        return NextResponse.json({ message: "Error de servidor", error: error });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string }}) {
    const { id } = params;
    const body = await request.json();
    try {
        const player = await prisma.player.update({
            where: {
                id,
            },
            data: {
                ...body,
            },
        });
        return NextResponse.json(player);
    } catch (error) {
        return NextResponse.json({ message: "Error de servidor", error: error });
    }
}