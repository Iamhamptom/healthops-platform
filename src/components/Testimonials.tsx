"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah M.",
    role: "Dental Practice Owner, Sandton",
    text: "VisioHealth Ops cut our no-show rate by 40% in the first month. The WhatsApp bot handles 80% of enquiries before my team even sees them.",
    rating: 5,
  },
  {
    name: "Dr. Thabo K.",
    role: "Radiologist, Centurion",
    text: "The referral intake router alone saved us 3 hours a day. We process referrals in minutes instead of chasing emails.",
    rating: 5,
  },
  {
    name: "Lisa V.",
    role: "Wellness Spa Manager, Rosebank",
    text: "Rebooking reminders brought back clients we hadn't seen in months. Our revenue is up 25% without spending more on ads.",
    rating: 5,
  },
];

export default function Testimonials() {
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
            Trusted by Practices
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[var(--ivory)]"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="p-6 rounded-xl glass-panel hover:border-[var(--gold)]/20 transition-all duration-500 roman-border"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                ))}
              </div>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-[14px] text-[var(--ivory)]">{t.name}</div>
                <div className="text-[12px] text-[var(--text-tertiary)]">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
