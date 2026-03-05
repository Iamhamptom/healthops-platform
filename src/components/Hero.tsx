"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[100svh] md:h-[120vh] w-full overflow-hidden flex items-center justify-center bg-[#050505]"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-[#050505]/50 to-[#050505] z-10" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[300px] opacity-[0.06]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#D4AF37] rounded-full blur-[200px] opacity-[0.03]" />
      </div>

      {/* Floating decorative columns — hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden md:block">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute -left-20 top-0 h-full w-40 border-r border-[#D4AF37]/10 bg-gradient-to-r from-[#D4AF37]/5 to-transparent"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
          className="absolute -right-20 top-0 h-full w-40 border-l border-[#D4AF37]/10 bg-gradient-to-l from-[#D4AF37]/5 to-transparent"
        />
      </div>

      {/* Main content */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            style={{ y: yText, opacity: opacityText }}
            className="relative z-20 text-center px-4 max-w-7xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-block"
            >
              {/* Decorative arc */}
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 0.3, rotate: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 w-32 md:w-40 h-32 md:h-40 border-t-2 border-[#D4AF37]/40 rounded-full"
              />

              <h1 className="font-serif text-[12vw] md:text-[8vw] leading-none tracking-[0.15em] md:tracking-[0.3em] uppercase text-[#FDFCF0] text-shadow-gold">
                YOUR<br />
                <span className="text-[#D4AF37]">PRACTICE</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
              className="mt-8 md:mt-12 flex flex-col items-center gap-4 md:gap-6"
            >
              <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <p className="text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase text-[#D4AF37]/60 font-medium px-4">
                AI-Powered WhatsApp Front Desk &mdash; Runs on Autopilot
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <Link
                  href="/register"
                  className="px-8 md:px-12 py-4 bg-[#D4AF37] text-[#050505] uppercase tracking-[0.3em] text-xs font-bold hover:bg-[#FDFCF0] transition-all duration-500 shadow-[0_0_40px_rgba(212,175,55,0.1)]"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/about"
                  className="px-8 md:px-12 py-4 border border-[#D4AF37]/30 text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-bold hover:bg-[#D4AF37] hover:text-[#050505] transition-all duration-700 relative overflow-hidden group"
                >
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
              </div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-6 md:mt-8"
              >
                <a href="#features" className="group flex flex-col items-center gap-3 md:gap-4">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#FDFCF0]/40 group-hover:text-[#D4AF37] transition-colors">Explore</span>
                  <div className="w-px h-12 md:h-16 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/20 to-transparent" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
