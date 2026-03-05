import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { demoStore } from "@/lib/demo-data";

export async function GET() {
  if (isDemoMode) return NextResponse.json({ recallItems: demoStore.getRecallItems() });

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return NextResponse.json({ recallItems: [] });
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.practiceId) return NextResponse.json({ recallItems: [] });

  const recallItems = await prisma.recallItem.findMany({ where: { practiceId: user.practiceId }, orderBy: { dueDate: "asc" } });
  return NextResponse.json({ recallItems });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (isDemoMode) {
    const item = demoStore.addRecallItem(body);
    return NextResponse.json({ recallItem: item });
  }

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.practiceId) return NextResponse.json({ error: "No practice" }, { status: 400 });

  const item = await prisma.recallItem.create({
    data: { patientName: body.patientName, reason: body.reason, dueDate: new Date(body.dueDate), phone: body.phone || "", practiceId: user.practiceId },
  });
  return NextResponse.json({ recallItem: item });
}
