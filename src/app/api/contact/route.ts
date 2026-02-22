import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body;
    if (!email || !message) {
      return NextResponse.json({ error: "Email and message required" }, { status: 400 });
    }

    if (process.env.DATABASE_URL) {
      await prisma.lead.create({
        data: {
          email,
          name: name || null,
          company: company || null,
          message,
          service: service || null,
          source: "contact",
        },
      });
    }

    // Optional: send email via Resend if RESEND_API_KEY is set
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM || "onboarding@resend.dev",
        to: process.env.CONTACT_EMAIL || "hello@sptsolutions.com",
        subject: `Contact form: ${name || email}`,
        text: `Name: ${name || "-"}\nEmail: ${email}\nCompany: ${company || "-"}\nService: ${service || "-"}\n\nMessage:\n${message}`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
