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
    color: "#0ea5e9",
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
    color: "#10b981",
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
    color: "#8b5cf6",
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
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-sm text-[var(--accent)] font-medium mb-3 uppercase tracking-wider">
            Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            14-day free trial on all plans. No credit card required. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "bg-gradient-to-b from-[var(--bg-card)] to-[var(--accent)]/5 border-[var(--accent)]/30 shadow-lg shadow-[var(--accent)]/5"
                  : "bg-[var(--bg-card)] border-[var(--border)] hover:border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--accent)] text-xs font-medium text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <plan.icon className="w-5 h-5" style={{ color: plan.color }} />
                  <span className="font-semibold">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-[var(--text-secondary)]">{plan.period}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">Setup from {plan.setup}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: plan.color }} />
                    <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/dashboard"
                className={`block text-center py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:opacity-90"
                    : "bg-white/[0.05] text-white hover:bg-white/[0.1] border border-[var(--border)]"
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
          className="mt-8 max-w-5xl mx-auto p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="font-semibold mb-1">Radiology Ops Add-on</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Referral intake, prep automation, report delivery — from R10,000/month
            </p>
          </div>
          <Link
            href="/dashboard"
            className="shrink-0 px-6 py-2.5 rounded-xl text-sm font-medium border border-[var(--border)] hover:border-white/20 transition-colors"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
