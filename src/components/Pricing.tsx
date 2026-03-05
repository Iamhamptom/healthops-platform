"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "R7,500",
    setup: "R10,000",
    period: "/month",
    description: "Get your front desk automated fast.",
    features: [
      "WhatsApp AI front desk",
      "Booking capture & confirmations",
      "Reminders & rescheduling",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: "R15,000",
    setup: "R20,000",
    period: "/month",
    description: "The full ops suite for growing practices.",
    features: [
      "Everything in Starter",
      "Waitlist auto-fill",
      "Deposits & pay-by-link",
      "Reviews engine",
      "Basic recall automation",
      "Priority support",
      "Custom branding",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Premium",
    icon: Building2,
    price: "R30,000",
    setup: "R45,000",
    period: "/month",
    description: "Multi-location practices & clinics.",
    features: [
      "Everything in Pro",
      "Multi-location support",
      "Advanced recall & campaigns",
      "Intake & consent forms",
      "KPI dashboard",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="pricing" className="py-28 relative" ref={containerRef}>
      <div className="divider-shine mb-28" />
      <motion.div style={{ opacity }} className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] text-[var(--gold)] font-semibold mb-4 uppercase tracking-[0.3em]"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold mb-5 tracking-tight text-[var(--ivory)]"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--text-secondary)] max-w-xl mx-auto text-[15px]"
          >
            14-day free trial on all plans. No credit card required. Cancel anytime.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-6 rounded-xl transition-all duration-500 ${
                plan.popular
                  ? "glass-panel-strong border border-[var(--gold)]/30 shadow-[0_0_30px_rgba(212,175,55,0.08)]"
                  : "glass-panel hover:border-[var(--gold)]/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--gold)] text-[var(--obsidian)] text-[11px] font-semibold uppercase tracking-[0.15em]">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <plan.icon className="w-5 h-5 text-[var(--gold)]" />
                  <span className="font-serif font-semibold text-[var(--ivory)]">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[var(--ivory)]">{plan.price}</span>
                  <span className="text-[13px] text-[var(--text-secondary)]">{plan.period}</span>
                </div>
                <p className="text-[12px] text-[var(--text-tertiary)]">Setup from {plan.setup}</p>
                <p className="text-[13px] text-[var(--text-secondary)] mt-2">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--gold)]" />
                    <span className="text-[13px] text-[var(--text-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className={`block text-center py-3 text-[12px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                  plan.popular
                    ? "bg-[var(--gold)] text-[var(--obsidian)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    : "glass-panel text-[var(--ivory)] hover:border-[var(--gold)]/30 hover:text-[var(--gold)]"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Radiology add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-5xl mx-auto p-6 rounded-xl glass-panel flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="font-semibold text-[var(--ivory)] mb-1">Radiology Ops Add-on</h3>
            <p className="text-[13px] text-[var(--text-secondary)]">
              Referral intake, prep automation, report delivery — from R10,000/month
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.1em] border border-[var(--ivory)]/20 text-[var(--ivory)] hover:border-[var(--gold)]/40 hover:text-[var(--gold)] transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
