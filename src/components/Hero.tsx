"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, MessageSquare, Calendar, Star, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[var(--primary)] rounded-full blur-[200px] opacity-[0.07]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-[200px] opacity-[0.05]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--primary)]/15 bg-[var(--primary)]/5 text-sm mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="text-[var(--text-secondary)]">Now serving <span className="text-white font-medium">200+ practices</span> across South Africa</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-7"
          >
            Your practice runs on
            <br />
            <span className="text-gradient">autopilot</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            AI-powered WhatsApp front desk, booking automation, and patient ops
            — built for dentists, radiology, and wellness practices.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link
              href="/register"
              className="group flex items-center gap-2 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-dark)] rounded-xl font-medium text-white shadow-xl shadow-[var(--primary)]/25 hover:shadow-[var(--primary)]/40 transition-all duration-300 hover:scale-[1.02]"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-[var(--text-secondary)] hover:text-white border border-[var(--border-light)] hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300">
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-8 mb-16 text-sm text-[var(--text-secondary)]"
          >
            {[
              { icon: Shield, text: "POPIA Compliant" },
              { icon: MessageSquare, text: "1M+ Messages Handled" },
              { icon: Star, text: "4.9/5 Rating" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-[var(--primary-light)]" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-5xl rounded-2xl border border-white/[0.08] bg-[var(--bg-card)] overflow-hidden glow-primary">
              {/* Top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-lg bg-white/[0.04] text-xs text-[var(--text-secondary)] font-mono">
                    app.visiohealth.co.za/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                      <span className="text-xs font-medium text-[var(--accent)]">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Activity feed */}
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <div className="rounded-xl bg-white/[0.015] border border-white/[0.06] p-4">
                  <div className="text-sm font-medium mb-3 text-[var(--text-secondary)]">Live Activity</div>
                  {[
                    { text: "New booking request from WhatsApp", time: "2m ago", color: "bg-[var(--primary)]" },
                    { text: "Recall reminder sent to 12 patients", time: "15m ago", color: "bg-[var(--accent)]" },
                    { text: "Review request completed — 5 stars", time: "1h ago", color: "bg-amber-400" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.15 }}
                      className="flex items-center gap-3 py-2.5 text-sm"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                      <span className="text-[var(--text-secondary)] flex-1">{item.text}</span>
                      <span className="text-xs text-[var(--text-secondary)]/50 font-mono">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center animate-float">
              <MessageSquare className="w-5 h-5 text-[var(--primary-light)]" />
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
