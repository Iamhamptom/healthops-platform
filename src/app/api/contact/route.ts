import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, practice, message } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // In demo mode, just acknowledge
    if (process.env.DEMO_MODE === "true") {
      return NextResponse.json({ success: true, demo: true });
    }

    // Store as audit log entry for now (works with existing schema)
    await prisma.auditLog.create({
      data: {
        action: "CONTACT_FORM_SUBMISSION",
        entity: "contact",
        entityId: email,
        details: JSON.stringify({ name, email, practice, message }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
