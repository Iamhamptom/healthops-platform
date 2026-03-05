import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { demoStore } from "@/lib/demo-data";

export async function GET() {
  if (isDemoMode) {
    return NextResponse.json({ conversations: demoStore.getConversations() });
  }

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");

  const session = await getSession();
  if (!session) return NextResponse.json({ conversations: [] });
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.practiceId) return NextResponse.json({ conversations: [] });

  const conversations = await prisma.conversation.findMany({
    where: { practiceId: user.practiceId },
    include: { patient: true, messages: { orderBy: { createdAt: "asc" } } },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ conversations });
}

export async function POST(request: Request) {
  if (isDemoMode) {
    return NextResponse.json({ error: "Use simulate in demo mode" }, { status: 400 });
  }

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");

  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.practiceId) return NextResponse.json({ error: "No practice" }, { status: 400 });

  const { patientId } = await request.json();
  const conversation = await prisma.conversation.create({
    data: { patientId, practiceId: user.practiceId },
    include: { patient: true, messages: true },
  });

  return NextResponse.json({ conversation });
}
