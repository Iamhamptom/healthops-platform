"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Bot, CalendarCheck, TrendingUp } from "lucide-react";

const steps = [
  { icon: MessageSquare, number: "01", title: "Patient Reaches Out", description: "Via WhatsApp, website, or any channel — VisioHealth Ops captures every enquiry instantly." },
  { icon: Bot, number: "02", title: "AI Handles the Conversation", description: "Answers FAQs, collects details, qualifies urgency, and routes complex queries to your team." },
  { icon: CalendarCheck, number: "03", title: "Booking Confirmed & Paid", description: "Slot reserved, deposit collected, prep instructions sent, reminders scheduled automatically." },
  { icon: TrendingUp, number: "04", title: "Retain & Grow", description: "Post-visit reviews, recall reminders, and reactivation campaigns keep patients coming back." },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacityTitle = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#080808] py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div style={{ opacity: opacityTitle }} className="mb-16 md:mb-24">
          <span className="text-[#D4AF37]/40 text-xs tracking-[0.5em] md:tracking-[0.8em] uppercase mb-4 block">The Process</span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-8xl tracking-[0.05em] md:tracking-[0.1em] uppercase text-[#FDFCF0]">
            How It <span className="text-[#D4AF37]">Works</span>
          </h2>
        </motion.div>

        <div className="grid gap-1">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-5 md:p-6 lg:p-8 border-t border-white/5 hover:bg-white/[0.02] transition-all duration-500"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <span className="font-serif text-3xl md:text-4xl text-[#D4AF37]/20 group-hover:text-[#D4AF37]/50 transition-colors">
                  {step.number}
                </span>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#D4AF37]/10">
                  <step.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-base md:text-lg lg:text-xl text-[#FDFCF0] group-hover:text-[#D4AF37] transition-colors uppercase tracking-wider">
                  {step.title}
                </h3>
                <p className="text-[#FDFCF0]/50 text-xs md:text-sm uppercase tracking-widest mt-1">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
