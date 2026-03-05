"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Dr. Sarah M.", role: "Dental Practice Owner, Sandton", text: "VisioHealth Ops cut our no-show rate by 40% in the first month. The WhatsApp bot handles 80% of enquiries before my team even sees them.", rating: 5 },
  { name: "Dr. Thabo K.", role: "Radiologist, Centurion", text: "The referral intake router alone saved us 3 hours a day. We process referrals in minutes instead of chasing emails.", rating: 5 },
  { name: "Lisa V.", role: "Wellness Spa Manager, Rosebank", text: "Rebooking reminders brought back clients we hadn't seen in months. Our revenue is up 25% without spending more on ads.", rating: 5 },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacityTitle = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#080808] py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div style={{ opacity: opacityTitle }} className="mb-16 md:mb-24">
          <span className="text-[#D4AF37]/40 text-xs tracking-[0.5em] md:tracking-[0.8em] uppercase mb-4 block">Testimonials</span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-8xl tracking-[0.05em] md:tracking-[0.1em] uppercase text-[#FDFCF0]">
            What They <span className="text-[#D4AF37]">Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="roman-border glass-panel p-6 md:p-8 hover:border-[#D4AF37]/30 transition-colors"
            >
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <p className="text-[#FDFCF0]/60 text-sm leading-relaxed font-light tracking-wide italic mb-8">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div className="font-serif text-sm text-[#FDFCF0] uppercase tracking-wider">{t.name}</div>
                <div className="text-[#FDFCF0]/30 uppercase tracking-widest text-[10px] mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
