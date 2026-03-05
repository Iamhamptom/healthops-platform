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
    description: "24/7 intelligent receptionist that answers questions, captures patient details, and routes to your team.",
    color: "#0071E3",
  },
  {
    icon: CalendarCheck,
    title: "Booking & No-Show Killer",
    description: "Smart confirmation flows, cancellation recovery, and waitlist auto-fill for maximum capacity.",
    color: "#34C759",
  },
  {
    icon: CreditCard,
    title: "Deposits & Pay-by-Link",
    description: "Enforce deposits for high-value bookings with automated receipts and instant payment collection.",
    color: "#AF52DE",
  },
  {
    icon: Star,
    title: "Reviews Engine",
    description: "Automated post-visit review requests, negative feedback capture, and AI-suggested replies.",
    color: "#FF9500",
  },
  {
    icon: RotateCcw,
    title: "Recall & Reactivation",
    description: "6-month dental recalls, treatment follow-ups, spa rebooking reminders on autopilot.",
    color: "#FF2D55",
  },
  {
    icon: Shield,
    title: "Referral Intake Router",
    description: "Capture referrals from any channel, create structured job cards, and route with urgency.",
    color: "#5AC8FA",
  },
  {
    icon: Zap,
    title: "Prep & Reschedule Prevention",
    description: "Automated prep instructions and smart reminders that eliminate no-shows and reschedules.",
    color: "#FF9500",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time KPIs: bookings, no-show rates, review scores, and patient reactivation metrics.",
    color: "#30B0C7",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative p-6 rounded-2xl bg-white border border-[var(--border-light)] hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${feature.color}12` }}
      >
        <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
      </div>
      <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export default function Features() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="features" className="py-24 relative bg-white">
      <div className="divider-shine mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="text-[13px] text-[var(--primary)] font-semibold mb-3 uppercase tracking-wider"
          >
            Platform Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-[44px] font-bold mb-4 tracking-tight text-[var(--text-primary)]"
          >
            Everything your practice needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-xl mx-auto text-[15px]"
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
