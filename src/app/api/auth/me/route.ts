import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { demoUser } from "@/lib/demo-data";

export async function GET() {
  if (isDemoMode) {
    return NextResponse.json({ user: demoUser });
  }

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");

  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { practice: true },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, practice: user.practice },
  });
}
