"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Bot, CalendarCheck, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "I",
    title: "Patient Reaches Out",
    description: "Via WhatsApp, website, or any channel — VisioHealth Ops captures every enquiry instantly.",
  },
  {
    icon: Bot,
    number: "II",
    title: "AI Handles the Conversation",
    description: "Answers FAQs, collects details, qualifies urgency, and routes complex queries to your team.",
  },
  {
    icon: CalendarCheck,
    number: "III",
    title: "Booking Confirmed & Paid",
    description: "Slot reserved, deposit collected, prep instructions sent, reminders scheduled automatically.",
  },
  {
    icon: TrendingUp,
    number: "IV",
    title: "Retain & Grow",
    description: "Post-visit reviews, recall reminders, and reactivation campaigns keep patients coming back.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section className="py-28 relative bg-[var(--charcoal)]/30" ref={containerRef}>
      <motion.div style={{ opacity }} className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] text-[var(--gold)] font-semibold mb-4 uppercase tracking-[0.3em]"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[var(--ivory)]"
          >
            Four Steps to Automation
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative group"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-[var(--gold)]/20 to-transparent" />
              )}

              <div className="p-6 rounded-xl glass-panel hover:border-[var(--gold)]/20 transition-all duration-500 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[var(--gold)]/10">
                    <step.icon className="w-5 h-5 text-[var(--gold)]" />
                  </div>
                  <span className="text-xl font-serif font-bold text-[var(--gold)]/30">{step.number}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-[var(--ivory)] mb-2">{step.title}</h3>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
