import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { demoStore } from "@/lib/demo-data";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (isDemoMode) { demoStore.deleteReview(id); return NextResponse.json({ ok: true }); }

  const { prisma } = await import("@/lib/prisma");
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
