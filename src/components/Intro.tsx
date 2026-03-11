"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroProps {
  onEnter: () => void;
}

/* Floating particle — reduced count, subtler */
function Particle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle, rgba(110,231,183,${0.15 + Math.random() * 0.25}) 0%, transparent 70%)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0.6, 0],
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

/* Glowing ring — more subtle opacity */
function GlowRing({ radius, delay, duration }: { radius: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full border"
      style={{
        width: radius,
        height: radius,
        marginLeft: -radius / 2,
        marginTop: -radius / 2,
        borderColor: "rgba(110,231,183,0.04)",
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [0.8, 1.05, 0.95, 1],
        opacity: [0, 0.2, 0.1, 0.15],
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

  // 15 particles (reduced from 30)
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: i * 0.5 + Math.random() * 2,
    x: Math.random() * 100,
    y: 30 + Math.random() * 60,
    size: 3 + Math.random() * 8,
  }));

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[1000] bg-[#030710] flex items-center justify-center cursor-default overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic gradient that follows mouse */}
      <div
        className="absolute inset-0 transition-all duration-[2000ms] ease-out"
        style={{
          background: `radial-gradient(800px ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(110,231,183,0.05) 0%, transparent 60%)`,
        }}
      />

      {/* Ambient glow orbs — very subtle */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#6EE7B7] rounded-full blur-[280px]"
        animate={{
          opacity: [0.02, 0.05, 0.03, 0.04],
          scale: [1, 1.1, 0.95, 1.05],
          x: [0, 30, -20, 10],
          y: [0, -20, 15, -10],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#5EEAD4] rounded-full blur-[240px]"
        animate={{
          opacity: [0.02, 0.04, 0.02, 0.03],
          scale: [1, 0.9, 1.1, 1],
          x: [0, -25, 20, -15],
          y: [0, 20, -10, 15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
      ))}

      {/* Concentric glow rings — subtle */}
      <GlowRing radius={200} delay={0.5} duration={8} />
      <GlowRing radius={350} delay={1} duration={10} />
      <GlowRing radius={500} delay={1.5} duration={12} />
      <GlowRing radius={700} delay={2} duration={14} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(110,231,183,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Title — JetBrains Mono light, massive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4"
        >
          <h1 className="text-7xl md:text-8xl lg:text-[120px] tracking-[-0.05em] text-white font-light leading-none">
            {"VisioHealth".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
                style={letter === "H" && i === 5 ? {
                  textShadow: "0 0 30px rgba(110,231,183,0.6), 0 0 80px rgba(110,231,183,0.25), 0 0 120px rgba(110,231,183,0.1)",
                  color: "#6EE7B7",
                } : undefined}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle — JetBrains Mono, uppercase, wide tracking */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-4"
        >
          <p className="text-sm text-white/40 font-light tracking-[0.3em] uppercase">
            AI-Powered Patient Operations
          </p>
        </motion.div>

        {/* Animated divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-px mx-auto mb-12 origin-center"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(110,231,183,0.4), transparent)",
          }}
        />

        {/* Enter button — minimal, LangChain style */}
        <AnimatePresence>
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                onClick={onEnter}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="group relative px-10 py-4 rounded-full text-sm font-light border border-white/10 bg-transparent transition-all duration-300 hover:border-white/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={undefined}
              >
                <span className="relative z-10 text-white/60 group-hover:text-white flex items-center gap-3 transition-colors duration-300">
                  Enter Platform
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
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
                transition={{ delay: 2.3 }}
                className="mt-8 text-[11px] text-white/15 tracking-[0.4em] uppercase"
              >
                Click to access dashboard
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030710] to-transparent z-[3]" />

      {/* Corner decorative elements */}
      <motion.div
        className="absolute top-8 left-8 text-[11px] text-white/10 tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        V2.0
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 text-[11px] text-white/10 tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        VISIO RESEARCH LABS
      </motion.div>
    </motion.div>
  );
}
