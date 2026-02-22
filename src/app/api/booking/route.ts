import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, id: "demo" });
    }
    const body = await req.json();
    const { name, email, company, date, service, notes } = body;
    if (!email || !name || !date) {
      return NextResponse.json(
        { error: "Name, email, and date required" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        company: company || null,
        date: new Date(date),
        service: service || null,
        notes: notes || null,
      },
    });

    return NextResponse.json({ success: true, id: appointment.id });
  } catch (e) {
    console.error("Booking API error:", e);
    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 }
    );
  }
}
