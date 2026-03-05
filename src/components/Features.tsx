"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare,
  CalendarCheck,
  CreditCard,
  Star,
  RotateCcw,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "WhatsApp AI Front Desk",
    description: "24/7 intelligent receptionist that answers questions, captures patient details, and routes to your team — all on WhatsApp.",
    color: "var(--primary)",
    tag: "Core",
  },
  {
    icon: CalendarCheck,
    title: "Booking & No-Show Killer",
    description: "Smart confirmation flows, cancellation recovery, and waitlist auto-fill that keeps your schedule at maximum capacity.",
    color: "var(--accent)",
    tag: "Revenue",
  },
  {
    icon: CreditCard,
    title: "Deposits & Pay-by-Link",
    description: "Enforce deposits for high-value bookings with automated receipts, cancellation rules, and instant payment collection.",
    color: "#a78bfa",
    tag: "Revenue",
  },
  {
    icon: Star,
    title: "Reviews Engine",
    description: "Automated post-visit review requests, private negative feedback capture, and AI-suggested replies for approval.",
    color: "#f59e0b",
    tag: "Growth",
  },
  {
    icon: RotateCcw,
    title: "Recall & Reactivation",
    description: "6-month dental recalls, treatment follow-ups, spa rebooking reminders, and membership renewal nudges on autopilot.",
    color: "#ec4899",
    tag: "Retention",
  },
  {
    icon: Shield,
    title: "Referral Intake Router",
    description: "Capture referrals from any channel, create structured job cards, and route with urgency — built for radiology.",
    color: "var(--primary-light)",
    tag: "Radiology",
  },
  {
    icon: Zap,
    title: "Prep & Reschedule Prevention",
    description: "Automated prep instructions, missing info requests, and smart reminders that eliminate no-shows and reschedules.",
    color: "#f97316",
    tag: "Ops",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time KPIs: bookings, no-show rates, review scores, revenue recovered, and patient reactivation metrics.",
    color: "var(--accent-dark)",
    tag: "Insights",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `0 0 60px ${feature.color}10, 0 0 120px ${feature.color}05` }}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${feature.color}15` }}
          >
            <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
          </div>
          <span
            className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ color: feature.color, backgroundColor: `${feature.color}10` }}
          >
            {feature.tag}
          </span>
        </div>

        <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 gradient-bg opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="text-sm text-[var(--primary)] font-medium mb-3 uppercase tracking-wider"
          >
            Platform Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Everything your practice needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-xl mx-auto"
          >
            From the first WhatsApp message to the 5-star review — we automate the entire patient journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
