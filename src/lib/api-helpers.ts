import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { rateLimitByIp } from "@/lib/rate-limit";

/** Standard auth + rate limit guard for API routes. Returns { user, practiceId } or a Response. */
export async function guardRoute(
  request: Request,
  route: string,
  opts?: { limit?: number }
) {
  // Rate limit
  const rl = rateLimitByIp(request, route, { limit: opts?.limit ?? 30 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (isDemoMode) {
    return { user: { id: "demo-user", practiceId: "demo-practice" }, practiceId: "demo-practice" };
  }

  const { getSession } = await import("@/lib/auth");
  const { prisma } = await import("@/lib/prisma");
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.practiceId) {
    return NextResponse.json({ error: "No practice linked" }, { status: 400 });
  }

  return { user: { id: user.id, practiceId: user.practiceId, role: user.role, name: user.name }, practiceId: user.practiceId };
}

/** Guard for platform admin routes (VisioHealth team only). */
export async function guardPlatformAdmin(
  request: Request,
  route: string,
  opts?: { limit?: number }
) {
  const rl = rateLimitByIp(request, route, { limit: opts?.limit ?? 30 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (isDemoMode) {
    return { user: { id: "platform-admin", role: "platform_admin", name: "Dr. Hampton" } };
  }

  const { getSession } = await import("@/lib/auth");
  const { prisma } = await import("@/lib/prisma");
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user || user.role !== "platform_admin") {
    return NextResponse.json({ error: "Platform admin access required" }, { status: 403 });
  }

  return { user: { id: user.id, role: user.role, name: user.name } };
}

/** Check if guardRoute returned an error response */
export function isErrorResponse(result: unknown): result is NextResponse {
  return result instanceof NextResponse;
}
