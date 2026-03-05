import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { demoStore } from "@/lib/demo-data";

export async function GET() {
  if (isDemoMode) return NextResponse.json({ reviews: demoStore.getReviews() });

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return NextResponse.json({ reviews: [] });
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.practiceId) return NextResponse.json({ reviews: [] });

  const reviews = await prisma.review.findMany({ where: { practiceId: user.practiceId }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ reviews });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (isDemoMode) {
    const review = demoStore.addReview(body);
    return NextResponse.json({ review });
  }

  const { prisma } = await import("@/lib/prisma");
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user?.practiceId) return NextResponse.json({ error: "No practice" }, { status: 400 });

  const review = await prisma.review.create({
    data: { rating: body.rating, comment: body.comment || "", source: body.source || "google", authorName: body.authorName || "", practiceId: user.practiceId },
  });
  return NextResponse.json({ review });
}
