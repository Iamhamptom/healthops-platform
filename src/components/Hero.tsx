"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageSquare, Calendar, Star, Shield, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-secondary)]">
      {/* Soft gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[200px] opacity-[0.04]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[var(--primary-light)] rounded-full blur-[180px] opacity-[0.03]" />

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-light)] bg-white text-[13px] mb-8 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="text-[var(--text-secondary)]">Now serving <span className="text-[var(--text-primary)] font-medium">200+ practices</span> across South Africa</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-[var(--text-primary)]"
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
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AI-powered WhatsApp front desk, booking automation, and patient ops
            — built for dentists, radiology, and wellness practices.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          >
            <Link
              href="/register"
              className="group flex items-center gap-2 px-7 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] rounded-full font-medium text-white text-[15px] transition-all duration-200"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-7 py-3 rounded-full font-medium text-[15px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--border)] hover:bg-white transition-all duration-200"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-8 mb-16 text-[13px] text-[var(--text-secondary)]"
          >
            {[
              { icon: Shield, text: "POPIA Compliant" },
              { icon: MessageSquare, text: "1M+ Messages Handled" },
              { icon: Star, text: "4.9/5 Rating" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-[var(--primary)]" />
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
            <div className="relative mx-auto max-w-5xl rounded-2xl border border-[var(--border-light)] bg-white overflow-hidden shadow-[0_2px_40px_rgba(0,0,0,0.06)]">
              {/* Top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-light)]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-lg bg-[var(--bg-secondary)] text-[11px] text-[var(--text-secondary)] font-mono">
                    app.visiohealth.co.za/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: MessageSquare, label: "WhatsApp Conversations", value: "1,247", change: "+23%", color: "var(--primary)" },
                  { icon: Calendar, label: "Bookings This Week", value: "89", change: "+12%", color: "var(--accent)" },
                  { icon: Star, label: "Review Score", value: "4.9", change: "+0.3", color: "#FF9500" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)] hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                      <span className="text-xs font-medium text-[var(--accent)]">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Activity feed */}
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <div className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)] p-4">
                  <div className="text-[13px] font-medium mb-3 text-[var(--text-secondary)]">Live Activity</div>
                  {[
                    { text: "New booking request from WhatsApp", time: "2m ago", color: "bg-[var(--primary)]" },
                    { text: "Recall reminder sent to 12 patients", time: "15m ago", color: "bg-[var(--accent)]" },
                    { text: "Review request completed — 5 stars", time: "1h ago", color: "bg-[#FF9500]" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.15 }}
                      className="flex items-center gap-3 py-2 text-[13px]"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                      <span className="text-[var(--text-secondary)] flex-1">{item.text}</span>
                      <span className="text-xs text-[var(--text-tertiary)] font-mono">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-xl bg-white border border-[var(--border-light)] flex items-center justify-center shadow-md animate-float">
              <CheckCircle2 className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-white border border-[var(--border-light)] flex items-center justify-center shadow-md animate-float" style={{ animationDelay: "2s" }}>
              <Calendar className="w-5 h-5 text-[var(--primary)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
