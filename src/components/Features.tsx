"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  },
  {
    icon: CalendarCheck,
    title: "Booking & No-Show Killer",
    description: "Smart confirmation flows, cancellation recovery, and waitlist auto-fill for maximum capacity.",
  },
  {
    icon: CreditCard,
    title: "Deposits & Pay-by-Link",
    description: "Enforce deposits for high-value bookings with automated receipts and instant payment collection.",
  },
  {
    icon: Star,
    title: "Reviews Engine",
    description: "Automated post-visit review requests, negative feedback capture, and AI-suggested replies.",
  },
  {
    icon: RotateCcw,
    title: "Recall & Reactivation",
    description: "6-month dental recalls, treatment follow-ups, spa rebooking reminders on autopilot.",
  },
  {
    icon: Shield,
    title: "Referral Intake Router",
    description: "Capture referrals from any channel, create structured job cards, and route with urgency.",
  },
  {
    icon: Zap,
    title: "Prep & Reschedule Prevention",
    description: "Automated prep instructions and smart reminders that eliminate no-shows and reschedules.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time KPIs: bookings, no-show rates, review scores, and patient reactivation metrics.",
  },
];

export default function Features() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="features" className="py-28 relative" ref={containerRef}>
      <div className="divider-shine mb-28" />
      <motion.div style={{ opacity }} className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] text-[var(--gold)] font-semibold mb-4 uppercase tracking-[0.3em]"
          >
            Platform Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl font-bold mb-5 tracking-tight text-[var(--ivory)]"
          >
            Everything Your Practice Needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-xl mx-auto text-[15px]"
          >
            From the first WhatsApp message to the 5-star review — we automate the entire patient journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative p-6 rounded-xl glass-panel hover:border-[var(--gold)]/20 transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-[var(--gold)]/10">
                <feature.icon className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <h3 className="text-[15px] font-semibold text-[var(--ivory)] mb-2">{feature.title}</h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
