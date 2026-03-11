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
    <section id="pricing" ref={containerRef} className="relative w-full bg-[#FAFAF8] py-28 md:py-36 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div style={{ opacity: opacityTitle }} className="mb-16 md:mb-20 text-center">
          <span className="text-[13px] text-[#6EE7B7] mb-4 block font-mono tracking-wider uppercase">Pricing</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-[#1A1A1A] font-bold mb-4">
            Simple, transparent
            <br />
            <span className="text-gradient-green">pricing.</span>
          </h2>
          <p className="text-[15px] text-[#9B9B9B]">
            14-day free trial on all plans. No credit card required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative glow-card bg-white rounded-2xl border p-8 transition-all duration-400 ${
                plan.popular
                  ? "border-[#6EE7B7]/20 shadow-glow"
                  : "border-[#F0F0EC] hover:border-[#6EE7B7]/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-[#6EE7B7] text-[#030F07] text-[11px] font-semibold rounded-full shadow-[0_0_15px_rgba(110,231,183,0.3)]">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">{plan.name}</h3>
                <p className="text-[13px] text-[#9B9B9B] mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#1A1A1A] tracking-tight">{plan.price}</span>
                  <span className="text-[14px] text-[#9B9B9B]">{plan.period}</span>
                </div>
                <p className="text-[12px] text-[#9B9B9B] mt-1 font-mono">Setup from {plan.setup}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13px] text-[#6B6B6B]">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className={`block text-center py-3.5 text-[14px] font-semibold rounded-full transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#6EE7B7] text-[#030F07] hover:bg-[#A7F3D0] shadow-[0_0_20px_rgba(110,231,183,0.15)]"
                    : "bg-[#030F07] text-white hover:bg-[#071A0E]"
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
          className="mt-8 max-w-5xl mx-auto bg-white rounded-2xl border border-[#F0F0EC] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">Radiology Ops Add-on</h3>
            <p className="text-[14px] text-[#9B9B9B]">
              Referral intake, prep automation, report delivery — from R10,000/month
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 group px-6 py-3 text-[14px] font-medium text-[#1A1A1A] rounded-full border border-[#E8E8E4] hover:border-[#6EE7B7]/30 hover:bg-[#6EE7B7]/5 transition-all duration-300 inline-flex items-center gap-2"
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
