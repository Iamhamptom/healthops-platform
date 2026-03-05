"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, MessageSquare, Calendar, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--primary)] rounded-full blur-[128px] opacity-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--accent)] rounded-full blur-[128px] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 text-[var(--primary)] text-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]" />
            </span>
            Now serving 200+ practices across Gauteng
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Your practice runs on
            <br />
            <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent bg-[length:200%] animate-[gradient-shift_5s_ease_infinite]">
              autopilot
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AI-powered WhatsApp front desk, booking automation, and patient ops
            — built for dentists, radiology, and wellness practices in South Africa.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-xl font-medium text-white shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 transition-all duration-300 hover:scale-[1.02]"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium text-[var(--text-secondary)] hover:text-white border border-[var(--border)] hover:border-white/20 transition-all duration-300">
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </motion.div>

          {/* Floating feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Mock dashboard preview */}
            <div className="relative mx-auto max-w-5xl rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden glow-primary">
              {/* Top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-[var(--text-secondary)]">
                    app.healthops.co.za/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stat cards */}
                {[
                  { icon: MessageSquare, label: "WhatsApp Conversations", value: "1,247", change: "+23%", color: "var(--primary)" },
                  { icon: Calendar, label: "Bookings This Week", value: "89", change: "+12%", color: "var(--accent)" },
                  { icon: Star, label: "Review Score", value: "4.9", change: "+0.3", color: "#f59e0b" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="p-5 rounded-xl bg-white/[0.03] border border-[var(--border)] hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                      <span className="text-xs text-[var(--accent)]">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Activity feed mock */}
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <div className="rounded-xl bg-white/[0.02] border border-[var(--border)] p-4">
                  <div className="text-sm font-medium mb-3">Live Activity</div>
                  {[
                    { text: "New booking request from WhatsApp", time: "2m ago", dot: "bg-[var(--primary)]" },
                    { text: "Recall reminder sent to 12 patients", time: "15m ago", dot: "bg-[var(--accent)]" },
                    { text: "Review request completed — 5 stars", time: "1h ago", dot: "bg-yellow-500" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.15 }}
                      className="flex items-center gap-3 py-2 text-sm"
                    >
                      <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                      <span className="text-[var(--text-secondary)] flex-1">{item.text}</span>
                      <span className="text-xs text-[var(--text-secondary)]/60">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center animate-float">
              <MessageSquare className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center animate-float" style={{ animationDelay: "2s" }}>
              <Calendar className="w-5 h-5 text-[var(--accent)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
