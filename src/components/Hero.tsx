"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Shield, MessageSquare, Star } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[var(--gold)] rounded-full blur-[250px] opacity-[0.04]" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[var(--teal)] rounded-full blur-[200px] opacity-[0.03]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]/60">
              <span className="w-8 h-px bg-[var(--gold)]/30" />
              Powered by Afrika World × Visio Research Labs
              <span className="w-8 h-px bg-[var(--gold)]/30" />
            </span>
          </motion.div>

          {/* Main heading — large serif */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight leading-[1.05] mb-6"
          >
            <span className="text-[var(--ivory)]">Your Practice</span>
            <br />
            <span className="text-gradient text-shadow-gold">Runs on Autopilot</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            AI-powered WhatsApp front desk, booking automation, and patient ops
            — built for dentists, radiology, and wellness practices across South Africa.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--gold)] text-[var(--obsidian)] font-serif font-semibold text-[14px] uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
              >
                Start Free Trial
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-10 py-4 border border-[var(--ivory)]/20 text-[var(--ivory)] font-serif text-[14px] uppercase tracking-[0.15em] hover:border-[var(--gold)]/40 hover:text-[var(--gold)] transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-10 text-[12px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]"
          >
            {[
              { icon: Shield, text: "POPIA Compliant" },
              { icon: MessageSquare, text: "1M+ Messages" },
              { icon: Star, text: "4.9/5 Rating" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4 text-[var(--gold)]/50" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  );
}
