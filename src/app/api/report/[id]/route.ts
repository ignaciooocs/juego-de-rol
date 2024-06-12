import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaClient";

export async function DELETE(request: Request, { params }: { params: { id: string }}) {
    const { id } = params;
    try {
        const report = await prisma.reports.delete({
            where: {
                id,
            },
        });
        return NextResponse.json(report);
    } catch (error) {
        return NextResponse.json({ message: "Error de servidor", error: error });
    }
}