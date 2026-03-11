"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import Mission from "@/components/Mission";
import Intro from "@/components/Intro";
import PeopleFirst from "@/components/PeopleFirst";
import Integrations from "@/components/Integrations";
import GetInTouch from "@/components/GetInTouch";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <main className="bg-[#052E16] text-white min-h-screen selection:bg-[#86EFAC]/15 selection:text-white">
      {/* Welcome portal — click to enter */}
      <AnimatePresence mode="wait">
        {!entered && <Intro onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {/* Main site — revealed after entering */}
      <AnimatePresence>
        {entered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar />
            <Hero />
            <Mission />
            <Features />
            <PeopleFirst />
            <Integrations />
            <Verticals />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <GetInTouch />
            <CTA />
            <Footer />
            <ChatbotWidget />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
