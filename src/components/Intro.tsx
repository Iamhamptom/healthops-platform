"use client";

import { motion } from "framer-motion";

interface IntroProps {
  onEnter: () => void;
}

export default function Intro({ onEnter }: IntroProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[1000] bg-[#FAFAF8] flex items-center justify-center"
    >
      <div className="text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="font-display text-5xl md:text-7xl tracking-[-0.02em] text-[#1A1A1A] mb-3">
            VisioHealth
          </h1>
          <p className="text-[15px] text-[#9B9B9B]">AI-Powered Patient Operations</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onClick={onEnter}
          className="px-8 py-3.5 bg-[#1A1A1A] text-white rounded-full text-[15px] font-medium hover:bg-[#2A2A2A] transition-all duration-300"
        >
          Enter
        </motion.button>
      </div>
    </motion.div>
  );
}
