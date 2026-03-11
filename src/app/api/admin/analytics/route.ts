import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/is-demo";
import { guardPlatformAdmin, isErrorResponse } from "@/lib/api-helpers";
import { demoPractices } from "@/lib/demo-data";

export async function GET(request: Request) {
  const guard = await guardPlatformAdmin(request, "admin-analytics");
  if (isErrorResponse(guard)) return guard;

  if (isDemoMode) {
    const practices = demoPractices;
    const totalPractices = practices.length;
    const activePractices = practices.filter(p => p.planStatus === "active").length;
    const trialPractices = practices.filter(p => p.planStatus === "trial").length;

    // Aggregate stats from _stats
    const stats = practices.reduce((acc, p) => {
      const s = (p as Record<string, unknown>)._stats as Record<string, number> | undefined;
      if (s) {
        acc.totalPatients += s.patients || 0;
        acc.totalBookings += s.bookingsThisMonth || 0;
        acc.totalRevenue += s.revenue || 0;
        acc.totalMRR += s.mrr || 0;
      }
      return acc;
    }, { totalPatients: 0, totalBookings: 0, totalRevenue: 0, totalMRR: 0 });

    const byPlan = {
      starter: practices.filter(p => p.plan === "starter").length,
      professional: practices.filter(p => p.plan === "professional").length,
      enterprise: practices.filter(p => p.plan === "enterprise").length,
    };

    const byType: Record<string, number> = {};
    for (const p of practices) {
      byType[p.type] = (byType[p.type] || 0) + 1;
    }

    const recentSignups = practices
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map(p => ({ id: p.id, name: p.name, type: p.type, plan: p.plan, planStatus: p.planStatus, createdAt: p.createdAt }));

    return NextResponse.json({
      overview: {
        totalPractices,
        activePractices,
        trialPractices,
        ...stats,
      },
      byPlan,
      byType,
      recentSignups,
    });
  }

  const { prisma } = await import("@/lib/prisma");
  const practices = await prisma.practice.findMany({
    include: { _count: { select: { patients: true, bookings: true, users: true } } },
  });

  const totalPractices = practices.length;
  const activePractices = practices.filter(p => p.planStatus === "active").length;
  const trialPractices = practices.filter(p => p.planStatus === "trial").length;
  const totalPatients = practices.reduce((s, p) => s + p._count.patients, 0);
  const totalBookings = practices.reduce((s, p) => s + p._count.bookings, 0);

  const payments = await prisma.payment.findMany();
  const totalRevenue = payments.reduce((s, p) => s + p.amount, 0);

  const byPlan = {
    starter: practices.filter(p => p.plan === "starter").length,
    professional: practices.filter(p => p.plan === "professional").length,
    enterprise: practices.filter(p => p.plan === "enterprise").length,
  };

  const byType: Record<string, number> = {};
  for (const p of practices) {
    byType[p.type] = (byType[p.type] || 0) + 1;
  }

  return NextResponse.json({
    overview: { totalPractices, activePractices, trialPractices, totalPatients, totalBookings, totalRevenue, totalMRR: 0 },
    byPlan,
    byType,
    recentSignups: practices.slice(0, 5).map(p => ({ id: p.id, name: p.name, type: p.type, plan: p.plan, planStatus: p.planStatus, createdAt: p.createdAt })),
  });
}
