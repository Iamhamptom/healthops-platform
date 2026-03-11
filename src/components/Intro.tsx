"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface IntroProps {
  onEnter: () => void;
}

/* Floating particle component */
function Particle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle, rgba(110,231,183,${0.3 + Math.random() * 0.4}) 0%, transparent 70%)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0.4, 0.8, 0],
        scale: [0, 1, 0.8, 1.1, 0],
        y: [0, -30, -15, -40, -60],
        x: [0, Math.random() * 20 - 10, Math.random() * 10 - 5],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* Glowing ring animation */
function GlowRing({ radius, delay, duration }: { radius: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full border"
      style={{
        width: radius,
        height: radius,
        marginLeft: -radius / 2,
        marginTop: -radius / 2,
        borderColor: "rgba(110,231,183,0.08)",
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [0.8, 1.05, 0.95, 1],
        opacity: [0, 0.4, 0.2, 0.35],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Intro({ onEnter }: IntroProps) {
  const [ready, setReady] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: i * 0.3 + Math.random() * 2,
    x: Math.random() * 100,
    y: 30 + Math.random() * 60,
    size: 4 + Math.random() * 12,
  }));

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[1000] bg-[#030F07] flex items-center justify-center cursor-default overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic gradient that follows mouse */}
      <div
        className="absolute inset-0 transition-all duration-[2000ms] ease-out"
        style={{
          background: `radial-gradient(800px ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(110,231,183,0.08) 0%, transparent 60%)`,
        }}
      />

      {/* Background image with parallax-like opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/intro-bg.png"
          alt=""
          fill
          className="object-cover opacity-[0.12] mix-blend-screen"
          priority
          onError={() => {}} // Graceful fallback if image doesn't exist yet
        />
      </div>

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#6EE7B7] rounded-full blur-[250px]"
        animate={{
          opacity: [0.04, 0.08, 0.05, 0.07],
          scale: [1, 1.1, 0.95, 1.05],
          x: [0, 30, -20, 10],
          y: [0, -20, 15, -10],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#5EEAD4] rounded-full blur-[200px]"
        animate={{
          opacity: [0.03, 0.06, 0.04, 0.05],
          scale: [1, 0.9, 1.1, 1],
          x: [0, -25, 20, -15],
          y: [0, 20, -10, 15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-[#10B981] rounded-full blur-[200px]"
        animate={{
          opacity: [0.02, 0.05, 0.03],
          x: [0, 40, -30],
          y: [0, -30, 20],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
      ))}

      {/* Concentric glow rings */}
      <GlowRing radius={200} delay={0.5} duration={8} />
      <GlowRing radius={350} delay={1} duration={10} />
      <GlowRing radius={500} delay={1.5} duration={12} />
      <GlowRing radius={700} delay={2} duration={14} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(110,231,183,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glossy glass reflection sweep */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Animated medical cross icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-16 h-16">
            {/* Pulsing glow behind icon */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-[#6EE7B7]"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(110,231,183,0.2), 0 0 60px rgba(110,231,183,0.1)",
                  "0 0 50px rgba(110,231,183,0.4), 0 0 100px rgba(110,231,183,0.15)",
                  "0 0 30px rgba(110,231,183,0.2), 0 0 60px rgba(110,231,183,0.1)",
                ],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Glass icon container */}
            <div className="relative w-full h-full rounded-2xl bg-[#6EE7B7]/10 backdrop-blur-sm border border-[#6EE7B7]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Title with staggered letter animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-3"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[-0.03em] text-white font-bold">
            {"VisioHealth".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
                style={letter === "H" ? {
                  background: "linear-gradient(135deg, #A7F3D0, #6EE7B7, #5EEAD4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                } : undefined}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle with typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-3"
        >
          <p className="text-[15px] md:text-[17px] text-white/40 font-light tracking-wide">
            AI-Powered Patient Operations
          </p>
        </motion.div>

        {/* Animated divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-px mx-auto mb-10 origin-center"
          style={{
            background: "linear-gradient(90deg, transparent, #6EE7B7, transparent)",
          }}
        />

        {/* Enter button — glossy glass */}
        <AnimatePresence>
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                onClick={onEnter}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="group relative px-10 py-4 rounded-full text-[15px] font-semibold overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Button glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: hovering
                      ? "0 0 40px rgba(110,231,183,0.4), 0 0 80px rgba(110,231,183,0.15), inset 0 0 30px rgba(110,231,183,0.1)"
                      : "0 0 20px rgba(110,231,183,0.2), 0 0 40px rgba(110,231,183,0.08)",
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Glass background */}
                <div className="absolute inset-0 rounded-full bg-[#6EE7B7]/10 backdrop-blur-md border border-[#6EE7B7]/30" />

                {/* Glossy sweep on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                  }}
                  initial={{ x: "-100%" }}
                  animate={hovering ? { x: "100%" } : { x: "-100%" }}
                  transition={{ duration: 0.6 }}
                />

                {/* Button text */}
                <span className="relative z-10 text-[#6EE7B7] flex items-center gap-3">
                  Enter Portal
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    animate={{ x: hovering ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
              </motion.button>

              {/* Hint text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="mt-6 text-[12px] text-white/15 font-mono tracking-wider"
              >
                CLICK TO ACCESS DASHBOARD
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030F07] to-transparent z-[3]" />

      {/* Corner decorative elements */}
      <motion.div
        className="absolute top-8 left-8 text-[11px] text-white/10 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        V2.0
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 text-[11px] text-white/10 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        VISIO RESEARCH LABS
      </motion.div>
    </motion.div>
  );
}
