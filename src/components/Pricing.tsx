"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "R7,500",
    setup: "R10,000",
    period: "/month",
    description: "Get your front desk automated fast.",
    features: ["WhatsApp AI front desk", "Booking capture & confirmations", "Reminders & rescheduling", "Basic analytics", "Email support"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "R15,000",
    setup: "R20,000",
    period: "/month",
    description: "The full ops suite for growing practices.",
    features: ["Everything in Starter", "Waitlist auto-fill", "Deposits & pay-by-link", "Reviews engine", "Recall automation", "Priority support", "Custom branding"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "R30,000",
    setup: "R45,000",
    period: "/month",
    description: "Multi-location practices & clinics.",
    features: ["Everything in Professional", "Multi-location support", "Advanced campaigns", "Intake & consent forms", "KPI dashboard", "Dedicated account manager", "API access"],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacityTitle = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section id="pricing" ref={containerRef} className="relative w-full bg-[#030710] py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div style={{ opacity: opacityTitle }} className="mb-20 md:mb-24 text-center">
          <span className="text-xs text-white/25 font-mono uppercase tracking-[0.3em] mb-6 block">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-white mb-5">
            Simple, transparent pricing
          </h2>
          <p className="text-white/40 text-sm font-light max-w-md mx-auto">
            14-day free trial on all plans. No credit card required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-2xl p-8 transition-all duration-400 ${
                plan.popular
                  ? "bg-white/[0.02] border border-white/[0.12] shadow-[0_0_60px_rgba(110,231,183,0.04)]"
                  : "bg-white/[0.02] border border-white/[0.06]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-8">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-mono text-white/60 border border-white/[0.12] rounded-full bg-white/[0.04]">
                    Recommended
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-mono text-white/50 mb-1 tracking-wide">{plan.name}</h3>
                <p className="text-xs text-white/30 mb-6 font-light">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extralight text-white tracking-tight">{plan.price}</span>
                  <span className="text-sm text-white/30 font-mono">{plan.period}</span>
                </div>
                <p className="text-[11px] text-white/20 mt-2 font-mono">Setup from {plan.setup}</p>
              </div>

              <div className="space-y-3 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <div className="flex items-center gap-1.5 mt-1.5 shrink-0">
                      <div className="w-1 h-1 rounded-full bg-[#6EE7B7]/40" />
                    </div>
                    <span className="text-sm text-white/40">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className={`block text-center py-3 text-sm font-mono rounded-full transition-all duration-300 ${
                  plan.popular
                    ? "border border-white/15 text-white hover:border-white/25 hover:shadow-[0_0_40px_rgba(110,231,183,0.08)]"
                    : "border border-white/10 text-white/60 hover:border-white/20 hover:text-white/80"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Radiology add-on */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 max-w-5xl mx-auto bg-white/[0.02] rounded-2xl border border-white/[0.06] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-sm font-mono text-white/60 mb-1">Radiology Ops Add-on</h3>
            <p className="text-sm text-white/30 font-light">
              Referral intake, prep automation, report delivery — from R10,000/month
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 group px-8 py-3 text-sm font-mono text-white/50 rounded-full border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
          >
            Learn More
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
