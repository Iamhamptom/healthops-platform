"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative w-full bg-[#080808] py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="roman-border glass-panel p-8 md:p-12 lg:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-4 right-6 text-[#D4AF37]/20 font-serif text-sm tracking-widest hidden md:block">MMXXVI</div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#FDFCF0] uppercase tracking-wider mb-4">
            Ready to Put Your Practice
            <br />
            <span className="text-[#D4AF37] text-shadow-gold">on Autopilot?</span>
          </h2>
          <p className="text-[#FDFCF0]/50 uppercase tracking-[0.2em] text-xs mb-8 md:mb-12 max-w-lg mx-auto">
            Join 200+ healthcare practices in South Africa already using VisioHealth Ops
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-8 md:px-12 py-4 bg-[#D4AF37] text-[#050505] uppercase tracking-[0.3em] text-xs font-bold hover:bg-[#FDFCF0] transition-all duration-500 shadow-[0_0_40px_rgba(212,175,55,0.1)]"
            >
              Start 14-Day Free Trial
            </Link>
            <Link
              href="/about"
              className="px-8 md:px-12 py-4 border border-[#D4AF37]/30 text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-bold hover:bg-[#D4AF37] hover:text-[#050505] transition-all duration-700 relative overflow-hidden group"
            >
              <span className="relative z-10">Book a Demo</span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
