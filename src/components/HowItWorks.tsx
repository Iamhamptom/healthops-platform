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

const stepVariants = (i: number) => ({
  hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
});

const numberVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative w-full bg-white py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[350px] opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:mb-24"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-emerald-600 font-mono mb-5 block">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-gray-900 max-w-lg mb-6">
            From enquiry to loyalty.
          </h2>
          <p className="text-gray-500 text-sm font-light leading-relaxed max-w-md">
            Four steps that transform how your practice handles patients — from
            first message to long-term retention.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-20" />

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-0"
        >
          {steps.map((step, i) => (
            <motion.div key={step.number} variants={stepVariants(i)}>
              {/* Step row */}
              <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-12 md:py-16">
                {/* Large number */}
                <motion.div
                  className="md:col-span-2 relative"
                  variants={numberVariants}
                >
                  <span className="text-emerald-100 text-7xl md:text-8xl font-extralight leading-none select-none">
                    {step.number}
                  </span>
                </motion.div>

                {/* Content */}
                <div className="md:col-span-4">
                  <h3 className="text-gray-900 font-medium text-xl mb-2 group-hover:text-emerald-700 transition-colors duration-500">
                    {step.title}
                  </h3>
                </div>

                <div className="md:col-span-6">
                  <p className="text-gray-500 text-sm font-light leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting line between steps */}
              {i < steps.length - 1 && (
                <div className="relative h-px">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
                  {/* Dot accent */}
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-200" />
                </div>
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
            className="group px-7 py-3.5 border border-gray-200 text-gray-700 text-sm font-mono tracking-wide rounded-full hover:border-emerald-200 hover:text-emerald-700 hover:shadow-md hover:shadow-emerald-100/50 transition-all duration-500 inline-flex items-center gap-3"
          >
            Start Free Trial
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all duration-300"
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
            className="px-7 py-3.5 text-gray-400 text-sm font-mono tracking-wide hover:text-emerald-600 transition-colors duration-300"
          >
            Learn more
          </a>
        </motion.div>
      </div>
    </section>
  );
}
