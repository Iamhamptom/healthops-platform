"use client";

import { motion } from "framer-motion";
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
  return (
    <main className="bg-[#030F07] text-white min-h-screen selection:bg-[#34D399]/20 selection:text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
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
    </main>
  );
}
