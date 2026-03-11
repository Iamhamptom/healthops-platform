"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative w-full bg-[#030710] py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#6EE7B7] rounded-full blur-[350px] opacity-[0.04] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-[1.1]">
          Ready to put your
          <br />
          practice on{" "}
          <span
            style={{ textShadow: "0 0 40px rgba(110,231,183,0.3), 0 0 80px rgba(110,231,183,0.15)" }}
          >
            autopilot?
          </span>
        </h2>
        <p className="text-white/40 text-lg font-light mt-6 max-w-lg mx-auto leading-relaxed">
          Join 200+ healthcare practices in South Africa already using VisioHealth Ops.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link
            href="/register"
            className="px-10 py-4 text-base font-mono text-white rounded-full border border-white/15 hover:border-white/25 hover:shadow-[0_0_40px_rgba(110,231,183,0.08)] transition-all duration-300 inline-flex items-center gap-2"
          >
            Start 14-Day Free Trial
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/about"
            className="px-10 py-4 text-base font-mono text-white/40 rounded-full border border-white/10 hover:border-white/20 hover:text-white/60 transition-all duration-300"
          >
            Book a Demo
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
