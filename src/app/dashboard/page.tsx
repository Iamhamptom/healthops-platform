"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  CalendarCheck,
  Star,
  RotateCcw,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import Link from "next/link";

interface DashboardStats {
  conversations: number;
  bookingsToday: number;
  avgRating: string;
  recallDue: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentConversations, setRecentConversations] = useState<
    { id: string; patient: { name: string }; messages: { content: string; createdAt: string }[]; updatedAt: string }[]
  >([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/conversations").then((r) => r.json()),
      fetch("/api/bookings").then((r) => r.json()),
      fetch("/api/reviews").then((r) => r.json()),
      fetch("/api/recall").then((r) => r.json()),
    ]).then(([convos, bookings, reviews, recall]) => {
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
      });

      setRecentConversations((convos.conversations || []).slice(0, 5));
    }).catch(() => {});
  }, []);

  return (
    <div className="p-6 space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Conversations" value={stats?.conversations ?? "—"} icon={MessageSquare} color="#D4AF37" delay={0} />
        <StatCard label="Bookings Today" value={stats?.bookingsToday ?? "—"} icon={CalendarCheck} color="#2DD4BF" delay={0.1} />
        <StatCard label="Avg Rating" value={stats?.avgRating ?? "—"} icon={Star} color="#E8C84A" delay={0.2} />
        <StatCard label="Recall Due" value={stats?.recallDue ?? "—"} icon={RotateCcw} color="#D4AF37" delay={0.3} />
      </div>

      {/* Recent conversations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Conversations", icon: MessageSquare, color: "#D4AF37", href: "/dashboard/conversations" },
          { label: "Bookings", icon: CalendarCheck, color: "#2DD4BF", href: "/dashboard/bookings" },
          { label: "Reviews", icon: Star, color: "#E8C84A", href: "/dashboard/reviews" },
          { label: "Recall", icon: RotateCcw, color: "#D4AF37", href: "/dashboard/recall" },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="p-4 rounded-xl glass-panel hover:border-[var(--gold)]/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${action.color}15` }}
            >
              <action.icon className="w-4 h-4" style={{ color: action.color }} />
            </div>
            <span className="text-[13px] font-medium text-[var(--text-secondary)]">
              {action.label}
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
