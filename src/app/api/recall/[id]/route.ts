import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { demoStore } from "@/lib/demo-data";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  if (isDemoMode) {
    const item = demoStore.updateRecallItem(id, body);
    return NextResponse.json({ recallItem: item });
  }

  const { prisma } = await import("@/lib/prisma");
  const item = await prisma.recallItem.update({ where: { id }, data: { ...(body.contacted !== undefined && { contacted: body.contacted }) } });
  return NextResponse.json({ recallItem: item });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (isDemoMode) { demoStore.deleteRecallItem(id); return NextResponse.json({ ok: true }); }

  const { prisma } = await import("@/lib/prisma");
  await prisma.recallItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
