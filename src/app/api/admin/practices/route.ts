import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { guardPlatformAdmin, isErrorResponse } from "@/lib/api-helpers";
import { demoPractices } from "@/lib/demo-data";

export async function GET(request: Request) {
  const guard = await guardPlatformAdmin(request, "admin-practices");
  if (isErrorResponse(guard)) return guard;

  if (isDemoMode) {
    return NextResponse.json({ practices: demoPractices });
  }

  const { prisma } = await import("@/lib/prisma");
  const practices = await prisma.practice.findMany({
    include: {
      _count: { select: { patients: true, bookings: true, invoices: true, users: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ practices });
}
