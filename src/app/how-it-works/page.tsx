"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MessageSquare, CalendarCheck, Users, BarChart3, Shield, Receipt,
  Stethoscope, ScanLine, Sparkles, Building2, Heart, Scissors,
  ArrowRight, Bot, Phone, Mail, CheckCircle2,
} from "lucide-react";

const industries = [
  { slug: "dental", name: "Dental Practice", icon: Stethoscope, color: "#2DD4BF", description: "Automate your front desk, manage patient recalls, and grow your practice with AI-powered booking." },
  { slug: "radiology", name: "Radiology Centre", icon: ScanLine, color: "#8B5CF6", description: "Streamline referral intake, prep automation, and report delivery across multiple modalities." },
  { slug: "wellness", name: "Wellness & Spa", icon: Sparkles, color: "#E8C84A", description: "Manage bookings, client preferences, treatment plans, and product sales in one platform." },
  { slug: "hospital", name: "Hospital & Clinic", icon: Building2, color: "#ef4444", description: "Multi-department scheduling, ward management, and cross-facility patient tracking." },
  { slug: "gp", name: "General Practice", icon: Heart, color: "#10b981", description: "Patient management, chronic care follow-ups, medical aid claims, and POPIA compliance." },
  { slug: "salon", name: "Salon & Beauty", icon: Scissors, color: "#D4AF37", description: "Client booking, stylist scheduling, product tracking, and automated reminders." },
];

const steps = [
  { icon: MessageSquare, title: "Patient Reaches Out", description: "Via WhatsApp, phone, email, or your website. Our AI handles the first contact automatically.", color: "#2DD4BF" },
  { icon: Bot, title: "AI Agent Takes Over", description: "Checks availability, answers FAQs, collects patient info, and creates a booking — all pending your approval.", color: "#8B5CF6" },
  { icon: CalendarCheck, title: "You Approve & Confirm", description: "Review the booking in your dashboard. One tap to confirm. Patient gets a WhatsApp confirmation automatically.", color: "#D4AF37" },
  { icon: Users, title: "Patient Arrives", description: "Check them in with one tap. Digital consent forms. Vitals captured. Doctor sees them in the queue.", color: "#10b981" },
  { icon: Receipt, title: "Bill & Get Paid", description: "Generate invoices with ICD-10 codes. Submit to medical aid. Accept card, EFT, or cash. All tracked.", color: "#E8C84A" },
  { icon: BarChart3, title: "Grow & Retain", description: "AI sends follow-ups, recall reminders, and review requests. Analytics show what's working.", color: "#0ea5e9" },
];

const channels = [
  { icon: MessageSquare, name: "WhatsApp", description: "AI booking agent chats with patients 24/7" },
  { icon: Phone, name: "Emergency Line", description: "After-hours IVR with on-call routing" },
  { icon: Mail, name: "Email", description: "Automated confirmations, reminders, invoices" },
  { icon: Bot, name: "Website Chat", description: "Embedded chatbot for your website" },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 bg-[#050505]">
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-24 py-20 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="text-[#D4AF37]/40 text-xs tracking-[0.5em] uppercase mb-4 block">How It Works</span>
            <h1 className="font-serif text-5xl md:text-7xl tracking-[0.05em] uppercase text-[#FDFCF0] mb-6">
              From <span className="text-[#D4AF37]">Message</span> to <span className="text-[#D4AF37]">Payment</span>
            </h1>
            <p className="text-[#FDFCF0]/50 text-sm md:text-base leading-relaxed">
              VisioHealth Ops automates every step of your practice — from the first WhatsApp message to the final payment.
              Here&apos;s exactly how it works, from start to finish.
            </p>
          </motion.div>
        </section>

        {/* 6-Step Flow */}
        <section className="px-6 md:px-12 lg:px-24 pb-20 max-w-6xl mx-auto">
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-6 glass-panel p-6 md:p-8"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${step.color}15` }}>
                  <step.icon className="w-7 h-7" style={{ color: step.color }} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Step {i + 1}</span>
                    <h3 className="font-serif text-lg text-[#FDFCF0] uppercase tracking-wider">{step.title}</h3>
                  </div>
                  <p className="text-[#FDFCF0]/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Communication Channels */}
        <section className="px-6 md:px-12 lg:px-24 py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-[#FDFCF0] uppercase tracking-wider text-center mb-12">
              Every <span className="text-[#D4AF37]">Channel</span> Connected
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {channels.map((ch, i) => (
                <motion.div
                  key={ch.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-6 text-center"
                >
                  <ch.icon className="w-8 h-8 mx-auto mb-3 text-[#D4AF37]" />
                  <h3 className="text-sm font-semibold text-[#FDFCF0] mb-1">{ch.name}</h3>
                  <p className="text-[11px] text-[#FDFCF0]/40">{ch.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="px-6 md:px-12 lg:px-24 py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-10 h-10 mx-auto text-[#D4AF37] mb-6" />
            <h2 className="font-serif text-3xl text-[#FDFCF0] uppercase tracking-wider mb-4">POPIA Compliant</h2>
            <p className="text-[#FDFCF0]/40 text-sm mb-8">Health data is classified as &quot;Special Personal Information&quot; — we treat it with the highest standard of care.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Audit Logging", "Role-Based Access", "Consent Tracking", "Data Encryption"].map(item => (
                <div key={item} className="flex items-center gap-2 justify-center glass-panel py-3 px-4">
                  <CheckCircle2 className="w-4 h-4 text-[#2DD4BF]" />
                  <span className="text-[12px] text-[#FDFCF0]/60">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Pages */}
        <section className="px-6 md:px-12 lg:px-24 py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[#D4AF37]/40 text-xs tracking-[0.5em] uppercase mb-4 block">Built For You</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#FDFCF0] uppercase tracking-wider">
                Your <span className="text-[#D4AF37]">Industry</span>, Your Way
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((ind, i) => (
                <motion.div
                  key={ind.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={`/how-it-works/${ind.slug}`}
                    className="block glass-panel p-6 hover:border-white/10 transition-all group h-full"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${ind.color}15` }}>
                      <ind.icon className="w-6 h-6" style={{ color: ind.color }} />
                    </div>
                    <h3 className="font-serif text-lg text-[#FDFCF0] uppercase tracking-wider mb-2">{ind.name}</h3>
                    <p className="text-[12px] text-[#FDFCF0]/40 leading-relaxed mb-4">{ind.description}</p>
                    <span className="text-[11px] text-[#D4AF37] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      See how it works <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-24 py-20 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-[#FDFCF0] uppercase tracking-wider mb-6">
              Ready to <span className="text-[#D4AF37]">Automate</span>?
            </h2>
            <p className="text-[#FDFCF0]/40 text-sm mb-8">14-day free trial. No credit card required. Set up in 10 minutes.</p>
            <Link
              href="/register"
              className="inline-block px-10 py-4 bg-[#D4AF37] text-[#050505] uppercase tracking-[0.3em] text-xs font-bold hover:bg-[#FDFCF0] transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
