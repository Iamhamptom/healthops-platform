"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
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
import WhatsAppFloat from "@/components/WhatsAppFloat";
import VoiceAgentSection from "@/components/voice-agent/VoiceAgentSection";
import NextLevel from "@/components/NextLevel";

const JessPresenter = dynamic(() => import("@/components/voice-agent/JessPresenter"), { ssr: false });

const jessSections = [
  {
    id: "home-hero",
    label: "Welcome",
    color: "#10b981",
    narration: "Welcome to VisioHealth! I'm Jess, and I'm so happy you're here. VisioHealth is South Africa's first fully autonomous AI healthcare practice management platform. We built this because we believe every healthcare practice deserves to run beautifully — with patients booked, calendars full, and admin handled by AI instead of overwhelmed staff. Whether you're a dentist in Sandton, a GP in Soweto, or a specialist in Cape Town, this platform was designed for you. Everything runs through WhatsApp — because that's what your patients already use every single day. Let me walk you through what we've built.",
  },
  {
    id: "home-mission",
    label: "Our Mission",
    color: "#10b981",
    narration: "Here's something that drives everything we do. Seventy-two percent of adults skip routine checkups. One in three people avoid the dentist entirely. These aren't just statistics — these are real people who aren't getting the care they need. And it's not because they don't want to — it's because booking is confusing, reminders don't happen, and the whole experience feels like a chore. We're changing that. VisioHealth makes it effortless for patients to connect with their healthcare providers. A simple WhatsApp message is all it takes to book, get reminders, and stay on track with their health. When access gets easier, more people show up. And that's good for everyone.",
  },
  {
    id: "home-features",
    label: "Features",
    color: "#3b82f6",
    narration: "Let me walk you through the features, because this is where you'll really see the power of what we've built. Signal Lead Gen uses AI to find people in your area who need healthcare but haven't booked — and brings them to your door. Automated Outreach reaches patients via WhatsApp, SMS, and calls with personalised messages at scale. The Smart Booking Engine manages your entire calendar — patients book instantly, conflicts are prevented, and every slot is optimised for maximum revenue. Our WhatsApp AI front desk handles conversations twenty-four seven — booking, rescheduling, answering questions, all automatically. We have built-in review collection, recall automation that brings patients back when they're due, no-show recovery, and complete practice analytics. Every feature is designed to grow your revenue and reduce your workload. This isn't just software — it's like having an entire team of brilliant staff working around the clock.",
  },
  {
    id: "home-people",
    label: "How We Help",
    color: "#10b981",
    narration: "Let me break down exactly how VisioHealth transforms your practice, step by step. First, we find your patients. Our Signal Lead Gen system identifies people in your area who need healthcare but haven't booked, and we bring them to your door through targeted outreach across WhatsApp, SMS, and calls. Second, we fill your calendar. From first contact to confirmed booking, our AI handles the entire journey — smart scheduling, automated reminders, and no-show prevention keep your calendar full and your revenue growing. Third, we run your practice operations. Billing with ICD-10 codes, medical records, consent tracking, recall automation — all the admin that used to take hours happens automatically. You focus on patients. We handle everything else.",
  },
  {
    id: "home-integrations",
    label: "Integrations",
    color: "#8b5cf6",
    narration: "VisioHealth connects seamlessly with the tools and systems you already use. WhatsApp Business API for patient communication. Google Calendar for scheduling. Medical aid systems for claims processing. Payment gateways for billing. SMS providers for reminders. Email systems for follow-ups. And we're continuously adding more integrations. The goal is simple — VisioHealth becomes the central hub that connects every part of your practice. No more switching between five different apps. No more manual data entry. Everything flows through one beautiful, intelligent platform.",
  },
  {
    id: "home-verticals",
    label: "Who It's For",
    color: "#10b981",
    narration: "VisioHealth isn't one-size-fits-all — we've designed specific solutions for different types of healthcare practices. Dental practices get appointment management, treatment plan tracking, and recall automation for cleanings and check-ups. General practitioners get patient flow optimisation, prescription management, and chronic care follow-ups. Radiologists get referral management and report delivery. Wellness centres get booking for multiple practitioners and service types. Medical spas and aesthetic clinics get treatment package management. Whatever your specialty, we've thought about your specific needs and built features that make sense for how you work.",
  },
  {
    id: "home-howitworks",
    label: "How It Works",
    color: "#3b82f6",
    narration: "Getting started with VisioHealth is incredibly simple, and I love telling people this because they're always surprised. Step one — register your practice. It takes under five minutes. Step two — import your existing patients from a CSV file. We support imports from GoodX, Healthbridge, Elixir, and pretty much any system with South African ID auto-parsing built in. Step three — you're live. Your WhatsApp AI front desk starts handling patient conversations immediately. Booking confirmations, reminders, rescheduling — it all happens automatically from day one. No lengthy setup. No training period. No technical skills required. Just register, import, and go.",
  },
  {
    id: "home-nextlevel",
    label: "The Ecosystem",
    color: "#a855f7",
    narration: "But VisioHealth Ops is just the beginning! We're building an entire ecosystem of five additional products that transform healthcare delivery across Africa. Placeo Health — a patient marketplace. Visio Integrator — enterprise middleware connecting every healthcare system. Visio Waiting Room — digital check-in via WhatsApp. VisioMed AI — the doctor's clinical co-pilot. And Payer Connect — the live coordination layer between providers and funders. Six products, one patient journey, revenue per practice stacking to over fifty thousand Rand per month. Check out our ecosystem page to see the full vision — it's absolutely incredible what we're building.",
  },
  {
    id: "home-pricing",
    label: "Pricing",
    color: "#10b981",
    narration: "Our pricing is designed to be accessible for practices of every size. Starter is seven thousand five hundred Rand per month — you get your WhatsApp AI front desk, booking capture, confirmations, reminders, rescheduling, basic analytics, and email support. It's perfect for getting your front desk automated fast. Professional is fifteen thousand Rand per month — everything in Starter plus waitlist auto-fill, deposits and pay-by-link, the reviews engine, recall automation, priority support, and custom branding. This is the full ops suite for growing practices. Enterprise is thirty thousand Rand per month for multi-location groups — API access, dedicated account management, custom integrations, and white-label options. And every plan comes with a fourteen-day free trial, no credit card required. You can try it completely risk-free.",
  },
  {
    id: "home-cta",
    label: "Get Started",
    color: "#10b981",
    narration: "Thank you so much for taking the time to explore VisioHealth! I hope you can feel the passion we've put into building this platform. Whether you're ready to start your free trial, want to book a demo, or just have questions — we'd absolutely love to hear from you. Your practice deserves to run beautifully, and we're here to make that happen. Welcome to the future of healthcare in South Africa. Welcome to VisioHealth.",
  },
];

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
            <div data-jess="home-hero"><Hero /></div>
            <div data-jess="home-mission"><Mission /></div>
            <div data-jess="home-features"><Features /></div>
            <div data-jess="home-people"><PeopleFirst /></div>
            <div data-jess="home-integrations"><Integrations /></div>
            <div data-jess="home-verticals"><Verticals /></div>
            <div data-jess="home-howitworks"><HowItWorks /></div>
            <VoiceAgentSection />
            <div data-jess="home-nextlevel"><NextLevel /></div>
            <Testimonials />
            <div data-jess="home-pricing"><Pricing /></div>
            <GetInTouch />
            <div data-jess="home-cta"><CTA /></div>
            <JessPresenter sections={jessSections} />
            <Footer />
            <ChatbotWidget />
            <WhatsAppFloat />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
