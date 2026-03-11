"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative w-full bg-[#FAFAF8] py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#030F07] rounded-3xl p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Green gradient orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[500px] h-[500px] bg-[#6EE7B7] rounded-full blur-[250px] opacity-[0.12] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#5EEAD4] rounded-full blur-[200px] opacity-[0.06] pointer-events-none" />

          {/* CTA orbs background image */}
          <img src="/images/cta-orbs.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.15] mix-blend-screen" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(110,231,183,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.4) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white tracking-[-0.03em] font-bold mb-4 leading-tight">
              Ready to put your
              <br />
              practice on <span className="text-gradient-green text-glow">autopilot?</span>
            </h2>
            <p className="text-[15px] text-white/40 mb-8 md:mb-10 max-w-md mx-auto leading-relaxed">
              Join 200+ healthcare practices in South Africa already using VisioHealth Ops.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group px-8 py-3.5 bg-[#6EE7B7] text-[#030F07] text-[15px] font-semibold rounded-full hover:bg-[#A7F3D0] transition-all duration-300 shadow-[0_0_30px_rgba(110,231,183,0.3)] hover:shadow-[0_0_50px_rgba(110,231,183,0.4)] inline-flex items-center gap-2"
              >
                Start 14-Day Free Trial
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 text-[15px] text-white/50 rounded-full border border-white/10 hover:border-[#6EE7B7]/30 hover:text-white/70 transition-all duration-300"
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
