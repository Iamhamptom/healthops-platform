"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageSquare,
  CalendarCheck,
  CreditCard,
  Star,
  RotateCcw,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";

const features = [
  { icon: MessageSquare, title: "WhatsApp AI Front Desk", description: "24/7 intelligent receptionist that answers questions, captures patient details, and routes to your team." },
  { icon: CalendarCheck, title: "Booking & No-Show Killer", description: "Smart confirmation flows, cancellation recovery, and waitlist auto-fill for maximum capacity." },
  { icon: CreditCard, title: "Deposits & Pay-by-Link", description: "Enforce deposits for high-value bookings with automated receipts and instant payment collection." },
  { icon: Star, title: "Reviews Engine", description: "Automated post-visit review requests, negative feedback capture, and AI-suggested replies." },
  { icon: RotateCcw, title: "Recall & Reactivation", description: "6-month dental recalls, treatment follow-ups, spa rebooking reminders on autopilot." },
  { icon: Shield, title: "Referral Intake Router", description: "Capture referrals from any channel, create structured job cards, and route with urgency." },
  { icon: Zap, title: "Prep & Reschedule Prevention", description: "Automated prep instructions and smart reminders that eliminate no-shows and reschedules." },
  { icon: BarChart3, title: "Analytics Dashboard", description: "Real-time KPIs: bookings, no-show rates, review scores, and patient reactivation metrics." },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacityTitle = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ opacity: opacityTitle }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[#D4AF37]/40 text-xs tracking-[0.5em] md:tracking-[0.8em] uppercase mb-4 block">
            The Arsenal
          </span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-8xl tracking-[0.05em] md:tracking-[0.1em] uppercase text-[#FDFCF0]">
            Platform <span className="text-[#D4AF37]">Features</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="glass-panel p-5 md:p-6 lg:p-8 border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-[#D4AF37]/10">
                <feature.icon className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-serif text-base md:text-lg text-[#FDFCF0] group-hover:text-[#D4AF37] transition-colors uppercase tracking-wider mb-2">
                {feature.title}
              </h3>
              <p className="text-[#FDFCF0]/50 text-xs md:text-sm uppercase tracking-widest leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
