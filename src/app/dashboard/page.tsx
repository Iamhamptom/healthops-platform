"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare, CalendarCheck, Star, RotateCcw, Users, FileText,
  DollarSign, UserCheck, ClipboardList, Receipt,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import Link from "next/link";
import PracticeMap from "@/components/dashboard/PracticeMap";

interface DashboardStats {
  conversations: number;
  bookingsToday: number;
  avgRating: string;
  recallDue: number;
  totalPatients: number;
  totalRecords: number;
  todayRevenue: number;
  outstanding: number;
  waitingPatients: number;
  taskProgress: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentConversations, setRecentConversations] = useState<
    { id: string; patient: { name: string }; messages: { content: string; createdAt: string }[]; updatedAt: string }[]
  >([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/conversations").then(r => r.json()),
      fetch("/api/bookings").then(r => r.json()),
      fetch("/api/reviews").then(r => r.json()),
      fetch("/api/recall").then(r => r.json()),
      fetch("/api/patients").then(r => r.json()),
      fetch("/api/analytics").then(r => r.json()).catch(() => null),
      fetch("/api/payments").then(r => r.json()).catch(() => ({ todayRevenue: 0 })),
      fetch("/api/checkin").then(r => r.json()).catch(() => ({ checkIns: [] })),
      fetch("/api/daily-tasks").then(r => r.json()).catch(() => ({ progress: { percent: 0 } })),
    ]).then(([convos, bookings, reviews, recall, patients, analytics, payments, checkins, dailyTasks]) => {
      const today = new Date().toDateString();
      const todayBookings = (bookings.bookings || []).filter(
        (b: { scheduledAt: string }) => new Date(b.scheduledAt).toDateString() === today
      );
      const ratings = (reviews.reviews || []).map((r: { rating: number }) => r.rating);
      const avgRating = ratings.length ? (ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length).toFixed(1) : "—";
      const dueRecalls = (recall.recallItems || []).filter((r: { contacted: boolean }) => !r.contacted);

      setStats({
        conversations: (convos.conversations || []).length,
        bookingsToday: todayBookings.length,
        avgRating,
        recallDue: dueRecalls.length,
        totalPatients: (patients.patients || []).length,
        totalRecords: analytics?.records?.total ?? 0,
        todayRevenue: payments.todayRevenue || 0,
        outstanding: analytics?.billing?.outstanding ?? 0,
        waitingPatients: (checkins.checkIns || []).filter((c: { status: string }) => c.status === "waiting").length,
        taskProgress: dailyTasks.progress?.percent ?? 0,
      });

      setRecentConversations((convos.conversations || []).slice(0, 5));
    }).catch(() => {});
  }, []);

  return (
    <div className="p-6 space-y-5">
      {/* Stats — 2 rows of 5 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Patients" value={stats?.totalPatients ?? "—"} icon={Users} color="#2DD4BF" delay={0} />
        <StatCard label="Bookings Today" value={stats?.bookingsToday ?? "—"} icon={CalendarCheck} color="#D4AF37" delay={0.05} />
        <StatCard label="Waiting Room" value={stats?.waitingPatients ?? "—"} icon={UserCheck} color="#E8C84A" delay={0.1} />
        <StatCard label="Revenue Today" value={stats ? `R${stats.todayRevenue.toLocaleString()}` : "—"} icon={DollarSign} color="#10b981" delay={0.15} />
        <StatCard label="Daily Tasks" value={stats ? `${stats.taskProgress}%` : "—"} icon={ClipboardList} color="#8B5CF6" delay={0.2} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Conversations" value={stats?.conversations ?? "—"} icon={MessageSquare} color="#D4AF37" delay={0.25} />
        <StatCard label="Avg Rating" value={stats?.avgRating ?? "—"} icon={Star} color="#E8C84A" delay={0.3} />
        <StatCard label="Recall Due" value={stats?.recallDue ?? "—"} icon={RotateCcw} color="#D4AF37" delay={0.35} />
        <StatCard label="Outstanding" value={stats ? `R${stats.outstanding.toLocaleString()}` : "—"} icon={Receipt} color="#ef4444" delay={0.4} />
        <StatCard label="Records" value={stats?.totalRecords ?? "—"} icon={FileText} color="#8B5CF6" delay={0.45} />
      </div>

      {/* Recent conversations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl glass-panel overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-[13px] font-semibold text-[var(--ivory)]">Recent Conversations</span>
          </div>
          <Link href="/dashboard/conversations" className="text-[12px] text-[var(--gold)] hover:underline font-medium">
            View all
          </Link>
        </div>

        {recentConversations.length === 0 ? (
          <div className="p-8 text-center text-[13px] text-[var(--text-secondary)]">
            No conversations yet. Use the Conversations page to simulate patient messages.
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {recentConversations.map((convo) => {
              const lastMsg = convo.messages?.[convo.messages.length - 1];
              return (
                <Link
                  key={convo.id}
                  href="/dashboard/conversations"
                  className="flex items-center gap-3 p-4 hover:bg-[var(--charcoal)]/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[11px] font-semibold text-[var(--gold)] shrink-0">
                    {convo.patient.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-[var(--ivory)]">{convo.patient.name}</div>
                    <p className="text-[12px] text-[var(--text-secondary)] truncate">
                      {lastMsg?.content || "No messages yet"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
      >
        {[
          { label: "Daily Tasks", icon: ClipboardList, color: "#8B5CF6", href: "/dashboard/daily" },
          { label: "Check-In", icon: UserCheck, color: "#E8C84A", href: "/dashboard/checkin" },
          { label: "Patients", icon: Users, color: "#2DD4BF", href: "/dashboard/patients" },
          { label: "Billing", icon: Receipt, color: "#10b981", href: "/dashboard/billing" },
          { label: "Conversations", icon: MessageSquare, color: "#D4AF37", href: "/dashboard/conversations" },
          { label: "Bookings", icon: CalendarCheck, color: "#2DD4BF", href: "/dashboard/bookings" },
          { label: "Recall", icon: RotateCcw, color: "#D4AF37", href: "/dashboard/recall" },
        ].map(action => (
          <Link
            key={action.label}
            href={action.href}
            className="p-4 rounded-xl glass-panel hover:border-[var(--gold)]/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${action.color}15` }}>
              <action.icon className="w-4 h-4" style={{ color: action.color }} />
            </div>
            <span className="text-[13px] font-medium text-[var(--text-secondary)]">{action.label}</span>
          </Link>
        ))}
      </motion.div>

      {/* Practice Map */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <PracticeMap />
      </motion.div>
    </div>
  );
}
