"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 bg-[var(--bg-secondary)]" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative p-12 md:p-16 rounded-3xl overflow-hidden text-center bg-white border border-[var(--border-light)] shadow-lg shadow-black/[0.03]"
        >
          <div className="relative">
            <h2 className="text-3xl md:text-[44px] font-bold mb-4 tracking-tight text-[var(--text-primary)]">
              Ready to put your practice
              <br />
              <span className="text-gradient">on autopilot?</span>
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto text-[15px]">
              Join 200+ healthcare practices in South Africa already using VisioHealth Ops
              to reduce no-shows, automate bookings, and grow revenue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="group flex items-center gap-2 px-7 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] rounded-full font-medium text-white text-[15px] transition-all duration-200"
              >
                Start 14-Day Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-7 py-3 rounded-full font-medium text-[15px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-all duration-200"
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
