import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { demoStore } from "@/lib/demo-data";

export async function GET() {
  if (isDemoMode) return NextResponse.json({ bookings: demoStore.getBookings() });

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return NextResponse.json({ bookings: [] });
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.practiceId) return NextResponse.json({ bookings: [] });

  const bookings = await prisma.booking.findMany({ where: { practiceId: user.practiceId }, orderBy: { scheduledAt: "asc" } });
  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (isDemoMode) {
    const booking = demoStore.addBooking(body);
    return NextResponse.json({ booking });
  }

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.practiceId) return NextResponse.json({ error: "No practice" }, { status: 400 });

  const booking = await prisma.booking.create({
    data: { patientName: body.patientName, service: body.service, scheduledAt: new Date(body.scheduledAt), notes: body.notes || "", practiceId: user.practiceId },
  });
  return NextResponse.json({ booking });
}
