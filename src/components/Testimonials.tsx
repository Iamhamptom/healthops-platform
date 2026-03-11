"use client";

import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function Testimonials() {
  return (
    <section className="relative w-full bg-[#030710] py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#6EE7B7] rounded-full blur-[350px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:mb-24"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/25 font-mono mb-5 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-white max-w-lg">
            What our clients say.
          </h2>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-16" />

        {/* Testimonial cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl p-8 hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-500"
            >
              {/* Decorative quote mark */}
              <span className="absolute top-6 right-8 text-white/[0.04] text-8xl font-serif leading-none pointer-events-none select-none">
                &ldquo;
              </span>

              {/* Stat */}
              <div className="mb-8">
                <span className="text-white/15 text-6xl font-extralight tracking-tight">
                  {t.stat}
                </span>
                <span className="block text-white/30 text-xs font-mono tracking-wide mt-1">
                  {t.statLabel}
                </span>
              </div>

              {/* Quote */}
              <p className="relative z-10 text-white/60 text-base font-light leading-relaxed italic mb-10">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Attribution */}
              <div className="relative z-10 pt-6 border-t border-white/[0.06]">
                <div className="text-white font-medium text-sm">{t.name}</div>
                <div className="text-white/30 text-xs font-mono tracking-wide mt-1">
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
