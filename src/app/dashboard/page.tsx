"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  CalendarCheck,
  Star,
  RotateCcw,
  Activity,
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
    // Fetch stats
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
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Conversations"
          value={stats?.conversations ?? "—"}
          icon={MessageSquare}
          color="#0ea5e9"
          delay={0}
        />
        <StatCard
          label="Bookings Today"
          value={stats?.bookingsToday ?? "—"}
          icon={CalendarCheck}
          color="#10b981"
          delay={0.1}
        />
        <StatCard
          label="Avg Rating"
          value={stats?.avgRating ?? "—"}
          icon={Star}
          color="#f59e0b"
          delay={0.2}
        />
        <StatCard
          label="Recall Due"
          value={stats?.recallDue ?? "—"}
          icon={RotateCcw}
          color="#8b5cf6"
          delay={0.3}
        />
      </div>

      {/* Recent conversations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-medium">Recent Conversations</span>
          </div>
          <Link href="/dashboard/conversations" className="text-xs text-[var(--primary)] hover:underline">
            View all
          </Link>
        </div>

        {recentConversations.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--text-secondary)]">
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
                  className="flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center text-xs font-medium shrink-0">
                    {convo.patient.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{convo.patient.name}</div>
                    <p className="text-xs text-[var(--text-secondary)] truncate">
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
          { label: "Conversations", icon: MessageSquare, color: "#0ea5e9", href: "/dashboard/conversations" },
          { label: "Bookings", icon: CalendarCheck, color: "#10b981", href: "/dashboard/bookings" },
          { label: "Reviews", icon: Star, color: "#f59e0b", href: "/dashboard/reviews" },
          { label: "Recall", icon: RotateCcw, color: "#8b5cf6", href: "/dashboard/recall" },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${action.color}15` }}
            >
              <action.icon className="w-4 h-4" style={{ color: action.color }} />
            </div>
            <span className="text-sm text-[var(--text-secondary)] group-hover:text-white transition-colors">
              {action.label}
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
