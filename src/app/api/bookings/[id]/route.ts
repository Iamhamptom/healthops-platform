import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { demoStore } from "@/lib/demo-data";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (isDemoMode) {
    const b = demoStore.getBookings().find(x => x.id === id);
    return b ? NextResponse.json({ booking: b }) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const { prisma } = await import("@/lib/prisma");
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ booking });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  if (isDemoMode) {
    const booking = demoStore.updateBooking(id, body);
    return NextResponse.json({ booking });
  }

  const { prisma } = await import("@/lib/prisma");
  const booking = await prisma.booking.update({ where: { id }, data: { ...(body.status && { status: body.status }) } });
  return NextResponse.json({ booking });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (isDemoMode) { demoStore.deleteBooking(id); return NextResponse.json({ ok: true }); }

  const { prisma } = await import("@/lib/prisma");
  await prisma.booking.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
