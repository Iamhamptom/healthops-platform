"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const swapWords = ["lead generation", "patient acquisition", "booking automation", "practice growth"];

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse-following glow
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

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
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center bg-[#052E16]"
    >
      {/* Hero background image — very low opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.06]"
          priority
        />
      </div>

      {/* Floating gradient orbs — lava lamp effect */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-green-500/[0.06] rounded-full blur-[200px] pointer-events-none"
        animate={{
          x: [0, 50, -30, 20, 0],
          y: [0, -40, 20, -20, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-green-400/[0.05] rounded-full blur-[180px] pointer-events-none"
        animate={{
          x: [0, -40, 30, -10, 0],
          y: [0, 30, -20, 40, 0],
          scale: [1, 0.9, 1.15, 0.95, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-green-500/[0.025] rounded-full blur-[160px] pointer-events-none"
        animate={{
          x: [0, 60, -20, 40, 0],
          y: [0, -30, 50, -10, 0],
          scale: [1, 1.1, 0.85, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mouse-following radial glow */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]: number[]) =>
              `radial-gradient(600px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(74,222,128,0.06), transparent 60%)`
          ),
        }}
      />

      {/* Subtle animated grid overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(74,222,128,0.03) 45%, rgba(74,222,128,0.05) 50%, rgba(74,222,128,0.03) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      />

      {/* Radial gradient glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(22,163,74,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Edge fades */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#052E16] via-transparent to-transparent pointer-events-none" />

      {/* Bottom gradient transition to white */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white z-[3]" />

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto py-40 md:py-52"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Top label */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="uppercase tracking-[0.3em] text-xs text-white/25 font-mono">
            Autonomous AI practice operations
          </span>
        </motion.div>

        {/* Main heading with word swap */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-light tracking-[-0.04em] text-white mb-8"
        >
          {"Your practice,".split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <span className="relative inline-block">
            on{" "}
            <span className="relative inline-block overflow-hidden align-bottom min-w-[200px] md:min-w-[320px]">
              <span
                className={`inline-block ${
                  isAnimating ? "word-exit" : "word-enter"
                }`}
                style={{
                  textShadow: "0 0 40px rgba(74,222,128,0.3), 0 0 80px rgba(74,222,128,0.15)",
                  color: "white",
                }}
              >
                {swapWords[wordIndex]}
              </span>
            </span>
            <span style={{ textShadow: "0 0 30px rgba(74,222,128,0.3)" }}>.</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-lg text-white/40 font-light max-w-2xl mx-auto mt-8 leading-relaxed"
        >
          VisioHealth is a fully autonomous AI system that finds new patients,
          fills your calendar, and manages your entire practice — from first
          contact to follow-up.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/15 text-white text-sm font-mono hover:border-white/25 hover:shadow-[0_0_40px_rgba(74,222,128,0.08)] transition-all duration-300"
          >
            Start Growing
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 text-white/60 text-sm font-mono hover:border-white/20 hover:text-white transition-all duration-300"
          >
            See How It Works
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          variants={fadeUp}
          className="mt-20 flex flex-wrap items-center justify-center gap-6 text-[13px] text-white/30 font-mono"
        >
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            POPIA Compliant
          </span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span>14-day free trial</span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span>No credit card required</span>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex items-center justify-center gap-8 md:gap-12 mt-16 pt-16 border-t border-white/[0.06]"
        >
          {[
            { value: "500+", label: "Practices Evaluated" },
            { value: "10,000+", label: "Leads Generated" },
            { value: "60%", label: "No-Show Reduction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-extralight text-white mb-1">{stat.value}</div>
              <div className="text-[11px] text-white/25 font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Demo link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-8 text-center"
        >
          <a href="/login" className="text-[12px] text-white/20 font-mono hover:text-white/40 transition-colors underline underline-offset-4 decoration-white/10">
            Try the demo dashboard →
          </a>
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
          <svg
            className="w-5 h-5 text-white/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

