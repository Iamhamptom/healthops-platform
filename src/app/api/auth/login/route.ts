import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";

export async function POST(request: Request) {
  if (isDemoMode) {
    const { email } = await request.json();
    if (email === "demo@smiledental.co.za") {
      return NextResponse.json({ user: { id: "demo", name: "Dr. Sarah Mitchell", email } });
    }
    // In demo mode, accept any login
    return NextResponse.json({ user: { id: "demo", name: "Demo User", email } });
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const { createSession } = await import("@/lib/auth");
    const bcrypt = (await import("bcryptjs")).default;

    const { email, password } = await request.json();
    if (!email || !password) return NextResponse.json({ error: "Email and password required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    await createSession(user.id);
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
