"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Bot, CalendarCheck, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Patient Reaches Out",
    description: "Via WhatsApp, website, or any channel — VisioHealth Ops captures every enquiry instantly.",
    color: "var(--primary)",
  },
  {
    icon: Bot,
    number: "02",
    title: "AI Handles the Conversation",
    description: "Answers FAQs, collects details, qualifies urgency, and routes complex queries to your team.",
    color: "#a78bfa",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Booking Confirmed & Paid",
    description: "Slot reserved, deposit collected, prep instructions sent, reminders scheduled automatically.",
    color: "var(--accent)",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Retain & Grow",
    description: "Post-visit reviews, recall reminders, and reactivation campaigns keep patients coming back.",
    color: "#f59e0b",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm text-[var(--primary)] font-medium mb-3 uppercase tracking-wider">
            How It Works
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Four steps to full automation
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
              )}

              <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-white/10 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <span className="text-2xl font-bold text-white/10">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
