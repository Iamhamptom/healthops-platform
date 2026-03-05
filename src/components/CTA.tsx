"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section className="py-28 bg-[var(--charcoal)]/30" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          style={{ scale, opacity }}
          className="relative p-12 md:p-20 rounded-xl overflow-hidden text-center glass-panel-strong roman-border"
        >
          {/* Background glow */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--gold)] rounded-full blur-[200px] opacity-20" />
          </div>

          <div className="relative">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-5 tracking-tight text-[var(--ivory)]">
              Ready to Put Your Practice
              <br />
              <span className="text-gradient text-shadow-gold">on Autopilot?</span>
            </h2>
            <p className="text-[var(--text-secondary)] mb-10 max-w-lg mx-auto text-[15px]">
              Join 200+ healthcare practices in South Africa already using VisioHealth Ops
              to reduce no-shows, automate bookings, and grow revenue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--gold)] text-[var(--obsidian)] font-serif font-semibold text-[14px] uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                >
                  Start 14-Day Free Trial
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-10 py-4 border border-[var(--ivory)]/20 text-[var(--ivory)] font-serif text-[14px] uppercase tracking-[0.15em] hover:border-[var(--gold)]/40 hover:text-[var(--gold)] transition-all duration-300"
                >
                  Book a Demo
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
