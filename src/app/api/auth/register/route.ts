import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { rateLimitByIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  // Rate limit registration — 5 per minute per IP
  const rl = rateLimitByIp(request, "auth/register", { limit: 5 });
  if (!rl.allowed) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });

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
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    if (password.length < 6) return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    if (!email.includes("@") || !email.includes(".")) return NextResponse.json({ error: "Invalid email address" }, { status: 400 });

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
