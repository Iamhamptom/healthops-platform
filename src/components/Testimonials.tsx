"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const testimonials = [
  {
    name: "Dr. Sarah M.",
    role: "Dental Practice Owner, Sandton",
    text: "VisioHealth cut our no-show rate by 40% in the first month. The WhatsApp bot handles 80% of enquiries before my team even sees them.",
    stat: "40%",
    statLabel: "fewer no-shows",
  },
  {
    name: "Dr. Thabo K.",
    role: "Radiologist, Centurion",
    text: "The referral intake router alone saved us 3 hours a day. We process referrals in minutes instead of chasing emails.",
    stat: "3hrs",
    statLabel: "saved daily",
  },
  {
    name: "Lisa V.",
    role: "Wellness Spa Manager, Rosebank",
    text: "Rebooking reminders brought back clients we hadn't seen in months. Our revenue is up 25% without spending more on ads.",
    stat: "25%",
    statLabel: "revenue increase",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacityTitle = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#030F07] py-28 md:py-36 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Green glow top */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#34D399] rounded-full blur-[250px] opacity-[0.04] pointer-events-none" />
      {/* Cyan glow bottom-right */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#2DD4BF] rounded-full blur-[200px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div style={{ opacity: opacityTitle }} className="mb-16 md:mb-20 text-center">
          <span className="text-[13px] text-[#34D399] mb-4 block font-mono tracking-wider uppercase">Results</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-white font-bold">
            What our
            <br />
            clients <span className="text-gradient-green text-glow">say.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-[#071A0E] rounded-2xl border border-[#34D399]/[0.06] p-8 hover:border-[#34D399]/15 transition-all duration-400"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-[#34D399]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Stat highlight */}
              <div className="relative z-10 mb-6 pb-6 border-b border-white/[0.06]">
                <div className="text-4xl md:text-5xl font-bold text-gradient-green text-glow tracking-tight mb-1">
                  {t.stat}
                </div>
                <span className="text-[13px] text-white/30 font-mono">{t.statLabel}</span>
              </div>

              {/* Quote */}
              <p className="relative z-10 text-[15px] text-white/50 leading-relaxed mb-8">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Attribution */}
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#34D399]/10 flex items-center justify-center">
                  <span className="text-[13px] font-semibold text-[#34D399]">
                    {t.name.split(" ").map(w => w[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-white/80">{t.name}</div>
                  <div className="text-[12px] text-white/30">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
