import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (process.env.DEMO_MODE === "true") {
      return NextResponse.json({ success: true, demo: true });
    }

    await prisma.auditLog.create({
      data: {
        action: "NEWSLETTER_SIGNUP",
        entity: "newsletter",
        entityId: email,
        details: JSON.stringify({ email, source: "coming-soon" }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
