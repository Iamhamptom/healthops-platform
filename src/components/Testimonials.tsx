"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 relative bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-[13px] text-[var(--primary)] font-semibold mb-3 uppercase tracking-wider">
            Trusted by Practices
          </p>
          <h2 className="text-3xl md:text-[44px] font-bold mb-4 tracking-tight text-[var(--text-primary)]">
            What our clients say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              className="p-6 rounded-2xl bg-white border border-[var(--border-light)] hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#FF9500] text-[#FF9500]" />
                ))}
              </div>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-[14px] text-[var(--text-primary)]">{t.name}</div>
                <div className="text-[12px] text-[var(--text-tertiary)]">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
