"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Stethoscope, Scan, Sparkles, Building2, Check } from "lucide-react";

const verticals = [
  {
    id: "dentist",
    icon: Stethoscope,
    title: "Dentists",
    subtitle: "Private Practice Suite",
    features: [
      "WhatsApp AI receptionist with dental FAQ",
      "6-month recall automation",
      "Invisalign & whitening follow-ups",
      "Deposit enforcement for implants/cosmetic",
      "Post-treatment review requests",
      "Waitlist fill for cancellations",
    ],
    stat: "35%",
    statLabel: "fewer no-shows on average",
  },
  {
    id: "radiology",
    icon: Scan,
    title: "Radiology",
    subtitle: "Imaging Ops Suite",
    features: [
      "Referral intake router (email/WhatsApp/web)",
      "Structured job card creation",
      "Automated prep instructions (contrast/fasting)",
      "Missing info requests to referring docs",
      "Report delivery confirmation",
      "Urgent findings escalation workflow",
    ],
    stat: "60%",
    statLabel: "faster referral processing",
  },
  {
    id: "wellness",
    icon: Sparkles,
    title: "Spas & Wellness",
    subtitle: "Wellness Edition",
    features: [
      "Treatment rebooking reminders",
      "Package expiry nudges",
      "Membership renewal automation",
      "Seasonal promo campaign blasts",
      "WhatsApp booking + gift vouchers",
      "Client retention scoring",
    ],
    stat: "28%",
    statLabel: "increase in rebookings",
  },
  {
    id: "hospital",
    icon: Building2,
    title: "Hospitals",
    subtitle: "Enterprise Suite",
    features: [
      "Multi-department triage bots",
      "Patient queue & flow updates",
      "Complaint routing & resolution",
      "Staff SOP assistant",
      "Bulk patient communications",
      "Executive KPI dashboards",
    ],
    stat: "40%",
    statLabel: "reduction in call volume",
  },
];

export default function Verticals() {
  const [active, setActive] = useState("dentist");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const current = verticals.find((v) => v.id === active)!;

  return (
    <section className="py-28 relative" ref={containerRef}>
      <div className="divider-shine mb-28" />
      <motion.div style={{ opacity }} className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] text-[var(--gold)] font-semibold mb-4 uppercase tracking-[0.3em]"
          >
            Built for Healthcare
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold mb-5 tracking-tight text-[var(--ivory)]"
          >
            Tailored for Your Vertical
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--text-secondary)] max-w-xl mx-auto text-[15px]"
          >
            Purpose-built workflows for each healthcare specialty — not generic SaaS bolted onto your practice.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {verticals.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-[12px] uppercase tracking-[0.1em] font-medium transition-all duration-300 ${
                active === v.id
                  ? "bg-[var(--gold)] text-[var(--obsidian)]"
                  : "text-[var(--text-secondary)] glass-panel hover:text-[var(--gold)] hover:border-[var(--gold)]/20"
              }`}
            >
              <v.icon className="w-4 h-4" />
              {v.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="p-8 rounded-xl glass-panel roman-border">
            <div className="flex items-center gap-3 mb-2">
              <current.icon className="w-6 h-6 text-[var(--gold)]" />
              <h3 className="font-serif text-xl font-bold text-[var(--ivory)]">{current.title}</h3>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6">{current.subtitle}</p>

            <div className="space-y-3">
              {current.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[var(--gold)]/10">
                    <Check className="w-3 h-3 text-[var(--gold)]" />
                  </div>
                  <span className="text-[13px] text-[var(--text-secondary)]">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-xl glass-panel relative overflow-hidden">
            <div className="relative">
              <div className="mb-8">
                <div className="text-6xl md:text-8xl font-serif font-bold mb-2 text-gradient text-shadow-gold">
                  {current.stat}
                </div>
                <p className="text-lg text-[var(--text-secondary)]">{current.statLabel}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-[13px] bg-[var(--gold)] text-[var(--obsidian)]">
                    Hi, I&apos;d like to book an appointment
                  </div>
                </div>
                <div className="flex">
                  <div className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tl-sm glass-panel text-[13px] text-[var(--ivory)]">
                    Welcome! I&apos;d be happy to help you book. What type of appointment are you looking for?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-[13px] bg-[var(--gold)] text-[var(--obsidian)]">
                    Teeth cleaning please
                  </div>
                </div>
                <div className="flex">
                  <div className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tl-sm glass-panel text-[13px] text-[var(--ivory)]">
                    I have availability on Tuesday at 10am or Thursday at 2pm. Which works best?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
