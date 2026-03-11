"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Verticals from "@/components/Verticals";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="bg-[#050505] text-[#FDFCF0] min-h-screen selection:bg-[#D4AF37] selection:text-[#050505]">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <Intro key="intro" onEnter={() => setHasEntered(true)} />
        ) : (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Navbar />
            <Hero />
            <Features />
            <Verticals />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <CTA />
            <Footer />
            <ChatbotWidget />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
