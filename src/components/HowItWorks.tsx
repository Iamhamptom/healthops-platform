"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Patient Reaches Out",
    description: "Via WhatsApp, website, or any channel — VisioHealth captures every enquiry instantly.",
  },
  {
    number: "02",
    title: "AI Handles the Conversation",
    description: "Answers FAQs, collects details, qualifies urgency, and routes complex queries to your team.",
  },
  {
    number: "03",
    title: "Booking Confirmed & Paid",
    description: "Slot reserved, deposit collected, prep instructions sent, reminders scheduled automatically.",
  },
  {
    number: "04",
    title: "Retain & Grow",
    description: "Post-visit reviews, recall reminders, and reactivation campaigns keep patients coming back.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#030F07] py-28 md:py-36 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6EE7B7] rounded-full blur-[300px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — heading */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[13px] text-[#6EE7B7] mb-4 block font-mono tracking-wider uppercase">How It Works</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-white font-bold mb-6">
                From enquiry
                <br />
                to <span className="text-gradient-green text-glow">loyalty.</span>
              </h2>
              <p className="text-[16px] text-white/40 leading-relaxed max-w-md mb-10">
                Four steps that transform how your practice handles patients — from first message to long-term retention.
              </p>

              {/* CTA buttons */}
              <div className="flex items-center gap-4">
                <a
                  href="/register"
                  className="group px-6 py-3 bg-[#6EE7B7] text-[#030F07] text-[14px] font-semibold rounded-full hover:bg-[#A7F3D0] transition-all duration-300 shadow-[0_0_20px_rgba(110,231,183,0.2)] hover:shadow-[0_0_30px_rgba(110,231,183,0.3)] inline-flex items-center gap-2"
                >
                  Start Free Trial
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="/how-it-works"
                  className="group px-6 py-3 text-[14px] text-white/40 rounded-full border border-white/10 hover:border-[#6EE7B7]/30 hover:text-white/70 transition-all duration-300 inline-flex items-center gap-2"
                >
                  More Info
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — steps with vertical progress line */}
          <div className="relative">
            {/* Vertical progress line */}
            <div className="absolute left-4 top-8 bottom-8 w-px bg-white/[0.06]">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-[#6EE7B7] via-[#34D399] to-[#5EEAD4] origin-top"
              />
            </div>

            <div className="space-y-0">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex items-start gap-6 py-8"
                >
                  {/* Circle on the line */}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-[#030F07] border-2 border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#6EE7B7]/50 transition-all duration-300">
                    <span className="text-[11px] font-mono font-semibold text-white/40 group-hover:text-[#6EE7B7] transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>

                  <div className="group-hover:translate-x-1 transition-transform duration-300">
                    <h3 className="text-[16px] font-semibold text-white mb-1 group-hover:text-[#6EE7B7] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-white/30 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
