"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Patient Reaches Out",
    description:
      "Via WhatsApp, website, or any channel — VisioHealth captures every enquiry instantly.",
  },
  {
    number: "02",
    title: "AI Handles the Conversation",
    description:
      "Answers FAQs, collects details, qualifies urgency, and routes complex queries to your team.",
  },
  {
    number: "03",
    title: "Booking Confirmed & Paid",
    description:
      "Slot reserved, deposit collected, prep instructions sent, reminders scheduled automatically.",
  },
  {
    number: "04",
    title: "Retain & Grow",
    description:
      "Post-visit reviews, recall reminders, and reactivation campaigns keep patients coming back.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative w-full bg-[#030710] py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#6EE7B7] rounded-full blur-[350px] opacity-[0.03] pointer-events-none" />

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
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-white max-w-lg mb-6">
            From enquiry to loyalty.
          </h2>
          <p className="text-white/40 text-sm font-light leading-relaxed max-w-md">
            Four steps that transform how your practice handles patients — from
            first message to long-term retention.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-20" />

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-0"
        >
          {steps.map((step, i) => (
            <motion.div key={step.number} variants={stepVariants}>
              {/* Step row */}
              <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-12 md:py-16">
                {/* Large number */}
                <div className="md:col-span-2 relative">
                  <span className="text-white/10 text-7xl md:text-8xl font-extralight leading-none">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="md:col-span-4">
                  <h3 className="text-white font-medium text-xl mb-2 group-hover:text-white transition-colors duration-500">
                    {step.title}
                  </h3>
                </div>

                <div className="md:col-span-6">
                  <p className="text-white/40 text-sm font-light leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting line between steps */}
              {i < steps.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 flex items-center gap-4"
        >
          <a
            href="/register"
            className="group px-7 py-3.5 bg-white/[0.05] border border-white/[0.08] text-white text-sm font-mono tracking-wide rounded-lg hover:border-white/[0.15] hover:bg-white/[0.08] transition-all duration-500 inline-flex items-center gap-3"
          >
            Start Free Trial
            <svg
              className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
          <a
            href="/how-it-works"
            className="px-7 py-3.5 text-white/30 text-sm font-mono tracking-wide hover:text-white/50 transition-colors duration-300"
          >
            Learn more
          </a>
        </motion.div>
      </div>
    </section>
  );
}
