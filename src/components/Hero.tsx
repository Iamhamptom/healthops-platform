"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const swapWords = ["autopilot", "AI power", "efficiency", "growth"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Word swap state
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const cycleWord = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setWordIndex((prev) => (prev + 1) % swapWords.length);
      setIsAnimating(false);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(cycleWord, 3000);
    return () => clearInterval(interval);
  }, [cycleWord]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center bg-[#030F07] pt-20"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 z-0">
        {/* Large green glow — top center */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[900px] h-[600px] bg-[#34D399] rounded-full blur-[300px] opacity-[0.07]" />
        {/* Cyan accent glow — bottom right */}
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#2DD4BF] rounded-full blur-[250px] opacity-[0.05]" />
        {/* Dark green glow — left */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[600px] bg-[#059669] rounded-full blur-[200px] opacity-[0.04]" />
      </div>

      {/* Hero background image — glossy green at low opacity */}
      <div className="absolute inset-0 z-0 grain-overlay">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.15]"
          priority
        />
        {/* Edge fades to dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030F07] via-transparent to-[#030F07] z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030F07] via-transparent to-[#030F07] z-[2]" />
        <div className="absolute inset-0 z-[2]" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #030F07 70%)" }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(52,211,153,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#34D399]/20 bg-[#34D399]/5 backdrop-blur-sm text-[13px] text-[#34D399] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-soft-pulse" />
            AI-powered patient operations
          </span>
        </motion.div>

        {/* Main heading with word swap */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.03em] text-white mb-8 font-bold"
        >
          Your practice,
          <br />
          <span className="relative inline-block">
            on{" "}
            <span className="relative inline-block overflow-hidden align-bottom min-w-[200px] md:min-w-[320px]">
              <span
                className={`inline-block text-glow-strong text-gradient-green ${
                  isAnimating ? "word-exit" : "word-enter"
                }`}
              >
                {swapWords[wordIndex]}
              </span>
            </span>
            <span className="text-gradient-green">.</span>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[clamp(1rem,2vw,1.25rem)] text-white/50 max-w-xl mx-auto mb-12 leading-relaxed font-light"
        >
          WhatsApp AI front desk that handles bookings, reminders, and patient
          communication — so your team can focus on care.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className="group relative px-8 py-3.5 bg-[#34D399] text-[#030F07] text-[15px] font-semibold rounded-full hover:bg-[#6EE7B7] transition-all duration-300 shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:shadow-[0_0_50px_rgba(52,211,153,0.4)] inline-flex items-center gap-2"
          >
            Start building
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/about"
            className="group px-8 py-3.5 text-[15px] text-white/60 rounded-full border border-white/10 hover:border-[#34D399]/30 hover:text-white hover:bg-white/[0.03] transition-all duration-300 inline-flex items-center gap-2"
          >
            Book a demo
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-[13px] text-white/30 font-mono"
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#34D399]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            POPIA Compliant
          </span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span>14-day free trial</span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span>No credit card required</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
