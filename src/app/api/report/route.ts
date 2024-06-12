import { prisma } from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export async function GET (): Promise<Response> {
    try {
        const reports = await prisma.reports.findMany({
            orderBy: { id : 'asc' }
        });
        return NextResponse.json(reports.toReversed());
    } catch (error) {
        return NextResponse.json({ message: "Error de servidor", error: error });
    }
}

export async function POST (request: Request) {
    const { title, report, playerReportedId, playerReportId  } = await request.json();
    try {
        const newreport = await prisma.reports.create({
            data: {
               title,
               report,
               playerReport: { connect: { id: playerReportId } },
               playerReported: { connect: { id: playerReportedId } }
            }
        })
        return NextResponse.json(newreport);
    } catch (error) {
        return NextResponse.json({ message: "Error de servidor", error: error });
    }
}