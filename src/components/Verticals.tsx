"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const verticals = [
  {
    id: "dentist", title: "Dentists", subtitle: "Private Practice Suite",
    features: ["WhatsApp AI receptionist with dental FAQ", "6-month recall automation", "Invisalign & whitening follow-ups", "Deposit enforcement for implants/cosmetic", "Post-treatment review requests", "Waitlist fill for cancellations"],
    stat: "35%", statLabel: "fewer no-shows on average",
    gradient: "from-[#6EE7B7] to-[#34D399]",
  },
  {
    id: "radiology", title: "Radiology", subtitle: "Imaging Ops Suite",
    features: ["Referral intake router (email/WhatsApp/web)", "Structured job card creation", "Automated prep instructions (contrast/fasting)", "Missing info requests to referring docs", "Report delivery confirmation", "Urgent findings escalation workflow"],
    stat: "60%", statLabel: "faster referral processing",
    gradient: "from-[#34D399] to-[#10B981]",
  },
  {
    id: "wellness", title: "Spas & Wellness", subtitle: "Wellness Edition",
    features: ["Treatment rebooking reminders", "Package expiry nudges", "Membership renewal automation", "Seasonal promo campaign blasts", "WhatsApp booking + gift vouchers", "Client retention scoring"],
    stat: "28%", statLabel: "increase in rebookings",
    gradient: "from-[#5EEAD4] to-[#6EE7B7]",
  },
  {
    id: "hospital", title: "Hospitals", subtitle: "Enterprise Suite",
    features: ["Multi-department triage bots", "Patient queue & flow updates", "Complaint routing & resolution", "Staff SOP assistant", "Bulk patient communications", "Executive KPI dashboards"],
    stat: "40%", statLabel: "reduction in call volume",
    gradient: "from-[#10B981] to-[#059669]",
  },
];

export default function Verticals() {
  const [active, setActive] = useState("dentist");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacityTitle = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const current = verticals.find((v) => v.id === active)!;

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAFAF8] py-28 md:py-36 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div style={{ opacity: opacityTitle }} className="mb-12 md:mb-16 text-center">
          <span className="text-[13px] text-[#6EE7B7] mb-4 block font-mono tracking-wider uppercase">Verticals</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-[#1A1A1A] font-bold">
            Built for
            <br />
            <span className="text-gradient-green">healthcare.</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {verticals.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className={`px-5 py-2.5 text-[13px] font-medium rounded-full transition-all duration-300 ${
                active === v.id
                  ? "bg-[#030F07] text-[#6EE7B7] shadow-[0_0_20px_rgba(110,231,183,0.1)]"
                  : "bg-white text-[#6B6B6B] border border-[#E8E8E4] hover:border-[#6EE7B7]/20 hover:text-[#10B981]"
              }`}
            >
              {v.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5"
          >
            {/* Feature list */}
            <div className="bg-white rounded-2xl border border-[#F0F0EC] p-8 md:p-10">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">{current.title}</h3>
                <p className="text-[13px] text-[#9B9B9B] font-mono">{current.subtitle}</p>
              </div>

              <div className="space-y-4">
                {current.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#6EE7B7]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[14px] text-[#6B6B6B] leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stat + Chat preview */}
            <div className="flex flex-col gap-5">
              {/* Stat card — dark with glow */}
              <div className="relative bg-[#030F07] rounded-2xl p-8 md:p-10 overflow-hidden">
                {/* Glow orb */}
                <div className={`absolute -top-20 -right-20 w-[200px] h-[200px] bg-gradient-to-br ${current.gradient} rounded-full blur-[100px] opacity-20`} />
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(110,231,183,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.4) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="relative z-[3]">
                  <div className="text-6xl md:text-7xl font-bold text-glow-strong text-gradient-green tracking-tight mb-2">
                    {current.stat}
                  </div>
                  <p className="text-[15px] text-white/40">{current.statLabel}</p>
                </div>
              </div>

              {/* Chat preview */}
              <div className="bg-white rounded-2xl border border-[#F0F0EC] p-6 md:p-8 flex-1">
                <span className="text-[12px] text-[#9B9B9B] mb-4 block font-mono">Live conversation preview</span>
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="max-w-[75%] px-4 py-2.5 bg-[#030F07] text-white text-[13px] rounded-2xl rounded-br-md">
                      Hi, I&apos;d like to book an appointment
                    </div>
                  </div>
                  <div className="flex">
                    <div className="max-w-[75%] px-4 py-2.5 bg-[#6EE7B7]/10 text-[#1A1A1A] text-[13px] rounded-2xl rounded-bl-md">
                      Welcome! I&apos;d be happy to help. What type of appointment?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[75%] px-4 py-2.5 bg-[#030F07] text-white text-[13px] rounded-2xl rounded-br-md">
                      Teeth cleaning please
                    </div>
                  </div>
                  <div className="flex">
                    <div className="max-w-[75%] px-4 py-2.5 bg-[#6EE7B7]/10 text-[#1A1A1A] text-[13px] rounded-2xl rounded-bl-md">
                      I have Tue at 10am or Thu at 2pm. Which works?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
