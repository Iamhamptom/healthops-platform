"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Stethoscope, Scan, Sparkles, Building2, Check } from "lucide-react";

const verticals = [
  {
    id: "dentist",
    icon: Stethoscope,
    title: "Dentists",
    subtitle: "Private Practice Suite",
    color: "#0071E3",
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
    color: "#AF52DE",
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
    color: "#34C759",
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
    color: "#FF9500",
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const current = verticals.find((v) => v.id === active)!;

  return (
    <section className="py-24 relative bg-white">
      <div className="divider-shine mb-24" />
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-[13px] text-[var(--primary)] font-semibold mb-3 uppercase tracking-wider">
            Built for Healthcare
          </p>
          <h2 className="text-3xl md:text-[44px] font-bold mb-4 tracking-tight text-[var(--text-primary)]">
            Tailored for your vertical
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-[15px]">
            Purpose-built workflows for each healthcare specialty — not generic SaaS bolted onto your practice.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {verticals.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                active === v.id
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--border-light)] hover:border-[var(--border)]"
              }`}
            >
              <v.icon className="w-4 h-4" />
              {v.title}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="p-8 rounded-2xl bg-white border border-[var(--border-light)] shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <current.icon className="w-6 h-6" style={{ color: current.color }} />
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{current.title}</h3>
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
                  <div
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${current.color}12` }}
                  >
                    <Check className="w-3 h-3" style={{ color: current.color }} />
                  </div>
                  <span className="text-[13px] text-[var(--text-secondary)]">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-[var(--border-light)] relative overflow-hidden bg-[var(--bg-secondary)]">
            <div className="relative">
              <div className="mb-8">
                <div className="text-6xl md:text-8xl font-bold mb-2" style={{ color: current.color }}>
                  {current.stat}
                </div>
                <p className="text-lg text-[var(--text-secondary)]">{current.statLabel}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-[13px] text-white" style={{ backgroundColor: current.color }}>
                    Hi, I&apos;d like to book an appointment
                  </div>
                </div>
                <div className="flex">
                  <div className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tl-sm bg-white border border-[var(--border-light)] text-[13px] text-[var(--text-primary)]">
                    Welcome! I&apos;d be happy to help you book. What type of appointment are you looking for?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-[13px] text-white" style={{ backgroundColor: current.color }}>
                    Teeth cleaning please
                  </div>
                </div>
                <div className="flex">
                  <div className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tl-sm bg-white border border-[var(--border-light)] text-[13px] text-[var(--text-primary)]">
                    I have availability on Tuesday at 10am or Thursday at 2pm. Which works best?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
