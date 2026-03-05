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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#050505]"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Roman corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#D4AF37]/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#D4AF37]/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#D4AF37]/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#D4AF37]/30" />

      <div className="relative text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37]/60 mb-6">
            Visio Research Labs
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FDFCF0] mb-4 text-shadow-gold"
        >
          VisioHealth
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-[13px] uppercase tracking-[0.3em] text-[#D4AF37]/50 mb-12"
        >
          AI-Powered Patient Operations
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.02, letterSpacing: "0.35em" }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 bg-[#D4AF37] text-[#050505] font-serif font-semibold text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
          >
            Enter
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/40 to-transparent mx-auto" />
        </motion.div>
      </div>
    </motion.div>
  );
}
