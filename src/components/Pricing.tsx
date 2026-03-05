"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
    color: "#0071E3",
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
    color: "#0071E3",
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
    color: "#0071E3",
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="pricing" className="py-24 relative bg-white">
      <div className="divider-shine mb-24" />
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-[13px] text-[var(--primary)] font-semibold mb-3 uppercase tracking-wider">
            Pricing
          </p>
          <h2 className="text-3xl md:text-[44px] font-bold mb-4 tracking-tight text-[var(--text-primary)]">
            Simple, transparent pricing
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-[15px]">
            14-day free trial on all plans. No credit card required. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "bg-white border-[var(--primary)]/30 shadow-lg shadow-[var(--primary)]/[0.06] ring-1 ring-[var(--primary)]/10"
                  : "bg-white border-[var(--border-light)] hover:shadow-lg hover:shadow-black/[0.04]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--primary)] text-[11px] font-medium text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <plan.icon className="w-5 h-5 text-[var(--primary)]" />
                  <span className="font-semibold text-[var(--text-primary)]">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-[var(--text-primary)]">{plan.price}</span>
                  <span className="text-[13px] text-[var(--text-secondary)]">{plan.period}</span>
                </div>
                <p className="text-[12px] text-[var(--text-tertiary)]">Setup from {plan.setup}</p>
                <p className="text-[13px] text-[var(--text-secondary)] mt-2">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--primary)]" />
                    <span className="text-[13px] text-[var(--text-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className={`block text-center py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  plan.popular
                    ? "bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
                    : "bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--border-light)] border border-[var(--border-light)]"
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
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-5xl mx-auto p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-light)] flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">Radiology Ops Add-on</h3>
            <p className="text-[13px] text-[var(--text-secondary)]">
              Referral intake, prep automation, report delivery — from R10,000/month
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 px-6 py-2 rounded-full text-[13px] font-medium border border-[var(--border)] text-[var(--text-primary)] hover:bg-white transition-colors"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
