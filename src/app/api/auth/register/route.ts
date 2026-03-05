import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";

export async function POST(request: Request) {
  if (isDemoMode) {
    const { name, email } = await request.json();
    return NextResponse.json({ user: { id: "demo", name, email } });
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const { createSession } = await import("@/lib/auth");
    const bcrypt = (await import("bcryptjs")).default;

    const { name, email, password } = await request.json();
    if (!name || !email || !password) return NextResponse.json({ error: "All fields required" }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, passwordHash } });
    await createSession(user.id);

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
