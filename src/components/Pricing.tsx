"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter", icon: Zap, price: "R7,500", setup: "R10,000", period: "/month",
    description: "Get your front desk automated fast.",
    features: ["WhatsApp AI front desk", "Booking capture & confirmations", "Reminders & rescheduling", "Basic analytics", "Email support"],
    cta: "Start Free Trial", popular: false,
  },
  {
    name: "Pro", icon: Crown, price: "R15,000", setup: "R20,000", period: "/month",
    description: "The full ops suite for growing practices.",
    features: ["Everything in Starter", "Waitlist auto-fill", "Deposits & pay-by-link", "Reviews engine", "Basic recall automation", "Priority support", "Custom branding"],
    cta: "Start Free Trial", popular: true,
  },
  {
    name: "Premium", icon: Building2, price: "R30,000", setup: "R45,000", period: "/month",
    description: "Multi-location practices & clinics.",
    features: ["Everything in Pro", "Multi-location support", "Advanced recall & campaigns", "Intake & consent forms", "KPI dashboard", "Dedicated account manager", "API access", "Custom integrations"],
    cta: "Contact Sales", popular: false,
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacityTitle = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="pricing" ref={containerRef} className="relative w-full bg-[#050505] py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div style={{ opacity: opacityTitle }} className="mb-16 md:mb-24">
          <span className="text-[#D4AF37]/40 text-xs tracking-[0.5em] md:tracking-[0.8em] uppercase mb-4 block">Treasury</span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-8xl tracking-[0.05em] md:tracking-[0.1em] uppercase text-[#FDFCF0]">
            The <span className="text-[#D4AF37]">Pricing</span>
          </h2>
          <p className="text-[#FDFCF0]/40 uppercase tracking-[0.2em] text-xs mt-4">
            14-day free trial on all plans. No credit card required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative glass-panel p-6 md:p-8 ${
                plan.popular ? "border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.08)]" : "border-white/5 hover:border-[#D4AF37]/20"
              } transition-colors`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D4AF37] text-[#050505] text-[10px] font-bold uppercase tracking-[0.2em]">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <plan.icon className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-serif text-lg text-[#FDFCF0] uppercase tracking-wider">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-serif text-4xl md:text-5xl text-[#FDFCF0]">{plan.price}</span>
                  <span className="text-[#FDFCF0]/40 text-xs uppercase tracking-widest">{plan.period}</span>
                </div>
                <p className="text-[#FDFCF0]/30 text-[10px] uppercase tracking-widest">Setup from {plan.setup}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#D4AF37]" />
                    <span className="text-[#FDFCF0]/50 text-xs tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className={`block text-center py-4 uppercase tracking-[0.3em] text-xs font-bold transition-all duration-500 ${
                  plan.popular
                    ? "bg-[#D4AF37] text-[#050505] hover:bg-[#FDFCF0] shadow-[0_0_40px_rgba(212,175,55,0.1)]"
                    : "border border-white/10 text-[#FDFCF0]/40 hover:border-[#D4AF37]/30 hover:text-[#D4AF37]"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Radiology add-on */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-8 max-w-6xl mx-auto roman-border glass-panel p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="font-serif text-lg text-[#FDFCF0] uppercase tracking-wider mb-1">Radiology Ops Add-on</h3>
            <p className="text-[#FDFCF0]/50 text-xs uppercase tracking-widest">
              Referral intake, prep automation, report delivery — from R10,000/month
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 px-6 py-3 border border-[#D4AF37]/30 text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-bold hover:bg-[#D4AF37] hover:text-[#050505] transition-all duration-700 relative overflow-hidden group"
          >
            <span className="relative z-10">Learn More</span>
            <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
