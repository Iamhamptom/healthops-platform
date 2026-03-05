import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { demoPractice } from "@/lib/demo-data";

export async function GET() {
  if (isDemoMode) return NextResponse.json({ practice: demoPractice });

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.userId }, include: { practice: true } });
  return NextResponse.json({ practice: user?.practice || null });
}

export async function POST(request: Request) {
  if (isDemoMode) return NextResponse.json({ practice: demoPractice });

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user || user.practiceId) return NextResponse.json({ error: "Not allowed" }, { status: 400 });

  const body = await request.json();
  const practice = await prisma.practice.create({ data: { name: body.name || "My Practice", type: body.type || "dental", address: body.address || "", phone: body.phone || "", hours: body.hours || "", aiPersonality: body.aiPersonality || "professional" } });
  await prisma.user.update({ where: { id: user.id }, data: { practiceId: practice.id } });
  return NextResponse.json({ practice });
}

export async function PUT(request: Request) {
  if (isDemoMode) return NextResponse.json({ practice: demoPractice });

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.practiceId) return NextResponse.json({ error: "No practice" }, { status: 400 });

  const body = await request.json();
  const practice = await prisma.practice.update({ where: { id: user.practiceId }, data: body });
  return NextResponse.json({ practice });
}
