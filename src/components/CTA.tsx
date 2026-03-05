"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative p-12 md:p-16 rounded-3xl overflow-hidden text-center"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 via-[var(--accent)]/10 to-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--primary)] rounded-full blur-[150px] opacity-10" />

          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to put your practice
              <br />
              on autopilot?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
              Join 200+ healthcare practices in South Africa already using HealthOps
              to reduce no-shows, automate bookings, and grow revenue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-xl font-medium shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 transition-all duration-300 hover:scale-[1.02]"
              >
                Start 14-Day Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 rounded-xl font-medium text-[var(--text-secondary)] hover:text-white border border-[var(--border)] hover:border-white/20 transition-all duration-300"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
