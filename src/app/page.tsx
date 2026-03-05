"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!entered && <Intro onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <>
          <Navbar />
          <Hero />
          <Features />
          <Verticals />
          <HowItWorks />
          <Testimonials />
          <Pricing />
          <CTA />
          <Footer />
        </>
      )}
    </>
  );
}
