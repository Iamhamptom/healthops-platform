"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Stethoscope, Scan, Sparkles, Building2, Check } from "lucide-react";

const verticals = [
  {
    id: "dentist", icon: Stethoscope, title: "Dentists", subtitle: "Private Practice Suite",
    features: ["WhatsApp AI receptionist with dental FAQ", "6-month recall automation", "Invisalign & whitening follow-ups", "Deposit enforcement for implants/cosmetic", "Post-treatment review requests", "Waitlist fill for cancellations"],
    stat: "35%", statLabel: "fewer no-shows on average",
  },
  {
    id: "radiology", icon: Scan, title: "Radiology", subtitle: "Imaging Ops Suite",
    features: ["Referral intake router (email/WhatsApp/web)", "Structured job card creation", "Automated prep instructions (contrast/fasting)", "Missing info requests to referring docs", "Report delivery confirmation", "Urgent findings escalation workflow"],
    stat: "60%", statLabel: "faster referral processing",
  },
  {
    id: "wellness", icon: Sparkles, title: "Spas & Wellness", subtitle: "Wellness Edition",
    features: ["Treatment rebooking reminders", "Package expiry nudges", "Membership renewal automation", "Seasonal promo campaign blasts", "WhatsApp booking + gift vouchers", "Client retention scoring"],
    stat: "28%", statLabel: "increase in rebookings",
  },
  {
    id: "hospital", icon: Building2, title: "Hospitals", subtitle: "Enterprise Suite",
    features: ["Multi-department triage bots", "Patient queue & flow updates", "Complaint routing & resolution", "Staff SOP assistant", "Bulk patient communications", "Executive KPI dashboards"],
    stat: "40%", statLabel: "reduction in call volume",
  },
];

export default function Verticals() {
  const [active, setActive] = useState("dentist");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacityTitle = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const current = verticals.find((v) => v.id === active)!;

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-[#050505] py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div style={{ opacity: opacityTitle }} className="mb-16 md:mb-24">
          <span className="text-[#D4AF37]/40 text-xs tracking-[0.5em] md:tracking-[0.8em] uppercase mb-4 block">Verticals</span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-8xl tracking-[0.05em] md:tracking-[0.1em] uppercase text-[#FDFCF0]">
            Built for <span className="text-[#D4AF37]">Healthcare</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 md:gap-4 mb-12">
          {verticals.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className={`px-4 md:px-6 py-2 md:py-3 border uppercase tracking-[0.15em] md:tracking-[0.2em] text-[9px] md:text-[10px] transition-all duration-500 flex items-center gap-2 ${
                active === v.id
                  ? "bg-[#D4AF37] text-[#050505] border-[#D4AF37] font-bold"
                  : "border-white/10 text-[#FDFCF0]/40 hover:border-[#D4AF37]/30 hover:text-[#D4AF37]/60"
              }`}
            >
              <v.icon className="w-3.5 h-3.5" />
              {v.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-1"
        >
          <div className="roman-border glass-panel p-8 md:p-12">
            <div className="absolute top-4 right-6 text-[#D4AF37]/20 font-serif text-sm tracking-widest hidden md:block">
              {current.id.toUpperCase()}
            </div>
            <div className="flex items-center gap-3 mb-2">
              <current.icon className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="font-serif text-xl md:text-2xl text-[#FDFCF0] uppercase tracking-wider">{current.title}</h3>
            </div>
            <p className="text-[#FDFCF0]/40 uppercase tracking-[0.2em] text-[10px] mb-8">{current.subtitle}</p>

            <div className="space-y-4">
              {current.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-4 h-4 mt-0.5 text-[#D4AF37] shrink-0" />
                  <span className="text-[#FDFCF0]/60 text-sm tracking-wide">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="font-serif text-6xl md:text-8xl text-[#D4AF37] mb-2 text-shadow-gold">
                {current.stat}
              </div>
              <p className="text-[#FDFCF0]/50 uppercase tracking-[0.2em] text-sm mb-8">{current.statLabel}</p>
            </div>

            {/* Chat preview */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="max-w-[70%] px-4 py-3 bg-[#D4AF37] text-[#050505] text-xs tracking-wide uppercase">
                  Hi, I&apos;d like to book an appointment
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[70%] px-4 py-3 glass-panel text-[#FDFCF0]/80 text-xs tracking-wide">
                  Welcome! I&apos;d be happy to help you book. What type of appointment are you looking for?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[70%] px-4 py-3 bg-[#D4AF37] text-[#050505] text-xs tracking-wide uppercase">
                  Teeth cleaning please
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[70%] px-4 py-3 glass-panel text-[#FDFCF0]/80 text-xs tracking-wide">
                  I have availability on Tuesday at 10am or Thursday at 2pm. Which works best?
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
