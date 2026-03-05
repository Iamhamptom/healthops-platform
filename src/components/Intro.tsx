"use client";

import { motion } from "framer-motion";

interface IntroProps {
  onEnter: () => void;
}

export default function Intro({ onEnter }: IntroProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[1000] bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/80" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mb-10 md:mb-12"
        >
          <span className="text-[#D4AF37]/40 text-[10px] md:text-xs tracking-[0.5em] md:tracking-[1em] uppercase mb-4 block">
            Visio Research Labs
          </span>
          <h1 className="font-serif text-4xl md:text-7xl tracking-[0.15em] md:tracking-[0.3em] uppercase text-[#FDFCF0] text-shadow-gold">
            VISIOHEALTH
          </h1>
          <p className="text-[#D4AF37]/30 text-[10px] tracking-[0.3em] uppercase mt-4">
            AI-Powered Patient Operations
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          whileHover={{ scale: 1.05, letterSpacing: "0.5em" }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="px-8 md:px-12 py-4 md:py-5 border border-[#D4AF37]/30 text-[#D4AF37] uppercase tracking-[0.3em] text-xs md:text-sm font-bold hover:bg-[#D4AF37] hover:text-[#050505] transition-all duration-700 group relative overflow-hidden"
        >
          <span className="relative z-10">Enter</span>
          <motion.div
            className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          />
        </motion.button>
      </div>

      {/* Decorative Roman Elements — exactly like Ciza */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 border-t border-l border-[#D4AF37]/20 w-12 h-12 md:w-20 md:h-20" />
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 border-b border-r border-[#D4AF37]/20 w-12 h-12 md:w-20 md:h-20" />
    </motion.div>
  );
}
