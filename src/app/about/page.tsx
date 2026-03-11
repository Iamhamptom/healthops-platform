"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

const values = [
  {
    title: "Built for SA Healthcare",
    description:
      "We understand the South African private healthcare market — from Gauteng practices to rural clinics.",
  },
  {
    title: "Practice-First Design",
    description:
      "Every feature solves a real ops problem. No bloat, no gimmicks — just what moves your bottom line.",
  },
  {
    title: "AI That Actually Works",
    description:
      "Our WhatsApp AI handles real conversations, not scripted decision trees. Patients can't tell the difference.",
  },
  {
    title: "Relationships First",
    description:
      "We embed in your practice, learn your workflows, and optimize continuously.",
  },
];

const aiCapabilities = [
  {
    title: "AI Triage Agent",
    description:
      "Instantly assesses patient urgency — EMERGENCY, URGENT, SEMI-URGENT, or ROUTINE.",
  },
  {
    title: "Voice AI",
    description:
      "Natural voice responses powered by ElevenLabs. Your practice sounds professional 24/7.",
  },
  {
    title: "WhatsApp Front Desk",
    description:
      "AI handles patient messages like a human receptionist — booking, pricing, reminders, triage.",
  },
  {
    title: "Intake Agent",
    description:
      "Pre-appointment data collection via conversational AI. Symptoms, medications, allergies.",
  },
  {
    title: "Follow-up Agent",
    description:
      "Post-procedure check-ins at 24hr and 72hr. Recall reminders. Birthday wellness messages.",
  },
  {
    title: "Smart Scheduling",
    description:
      "Visual calendar with slot availability, conflict prevention, and AI-recommended times.",
  },
];

const clinicalFeatures = [
  {
    title: "Patient Records",
    description:
      "Full medical history — consultations, procedures, lab results, imaging, referrals.",
  },
  {
    title: "Vitals Tracking",
    description:
      "Blood pressure, heart rate, SpO2, glucose, pain scale — all charted over time.",
  },
  {
    title: "Allergy Alerts",
    description:
      "Critical allergy banners on every patient view. Severity tracking.",
  },
  {
    title: "Medical Records",
    description: "Structured records with diagnosis, treatment, and provider.",
  },
  {
    title: "Medication Management",
    description:
      "Active/stopped medications, dosages, frequencies. Full prescriber history.",
  },
  {
    title: "Multi-Role Access",
    description:
      "Admin, doctor, receptionist, nurse — each role sees what they need.",
  },
];

const timeline = [
  {
    phase: "Research",
    title: "Deep market research across Gauteng healthcare verticals.",
  },
  {
    phase: "Build",
    title: "Core platform: WhatsApp AI, booking automation, patient records.",
  },
  {
    phase: "AI Agents",
    title:
      "Deployed triage, intake, follow-up agents. ElevenLabs voice integration.",
  },
  {
    phase: "Launch",
    title: "First 50 practices onboarded with the Full Suite.",
  },
  {
    phase: "Scale",
    title: "Multi-location support, hospital features, radiology ops.",
  },
];

const vrlProducts = [
  {
    name: "VisioHealth",
    description: "AI Healthcare OS",
    status: "Live" as const,
  },
  {
    name: "VisioCorp",
    description: "Chairman Operating System",
    status: "Live" as const,
  },
  {
    name: "Hampton Music Group",
    description: "AI-powered music management",
    status: "Live" as const,
  },
  {
    name: "Ciza\u2019s Palace",
    description: "Artist platform & e-commerce",
    status: "Building" as const,
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-white">
      <Navbar />

      {/* ── 1. Hero (dark) ── */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 relative"
        style={{ backgroundColor: "#052E16" }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-400 rounded-full blur-[300px] opacity-[0.06] pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.3em] text-xs text-green-400 font-mono mb-6"
          >
            About VisioHealth
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light tracking-[-0.03em] text-white mb-6 leading-tight"
          >
            The AI-Powered Healthcare OS
            <br />
            for Africa
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            VisioHealth combines AI agents, voice tech, and clinical
            intelligence to transform how healthcare practices operate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-12"
          >
            {["Claude AI", "ElevenLabs", "Next.js", "WhatsApp"].map((tech) => (
              <span
                key={tech}
                className="text-[11px] text-white/25 font-mono tracking-wider uppercase"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. Team Image Banner (dark → white transition) ── */}
      <section className="relative pb-0" style={{ backgroundColor: "#052E16" }}>
        <div className="max-w-6xl mx-auto px-6 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            <Image
              src="/images/about-team.png"
              alt="Our diverse healthcare team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            <div className="absolute bottom-6 left-8">
              <p className="text-white/70 text-sm font-mono">
                Our team — built across cultures, united by care.
              </p>
            </div>
          </motion.div>
        </div>
        {/* Gradient fade to white */}
        <div className="h-24 bg-gradient-to-b from-[#052E16] to-white" />
      </section>

      {/* ── 3. Our Story (white) ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="uppercase tracking-[0.3em] text-xs text-green-600 font-mono block mb-4">
              Our Story
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-gray-900 mb-8">
                Healthcare deserves
                <br />
                better technology
              </h2>
              <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
                Founded in South Africa, VisioHealth was born from a simple
                observation: healthcare practices spend more time on admin than
                on patients. We built an AI-powered operating system that handles
                the ops — so practitioners can focus on care.
              </p>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                Studies show most people find it hard to walk through that door —
                whether it&apos;s blood tests, dental checkups, or routine
                screenings. We exist to change that. From Johannesburg to Lagos,
                we&apos;re getting Africa healthy, one person at a time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/about-clinic.png"
                alt="Modern African healthcare clinic"
                fill
                className="object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. AI Capabilities (off-white) ── */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="uppercase tracking-[0.3em] text-xs text-green-600 font-mono block mb-4">
              Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-gray-900 mb-4">
              AI Agent Suite
            </h2>
            <p className="text-[15px] text-gray-500 max-w-xl mx-auto leading-relaxed">
              Five specialized AI agents work around the clock — triaging
              emergencies, booking appointments, and collecting intake data.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiCapabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 group-hover:bg-green-500 transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-[15px] group-hover:text-green-600 transition-colors">
                  {cap.title}
                </h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Clinical Features (dark) ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "#052E16" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="uppercase tracking-[0.3em] text-xs text-green-400 font-mono block mb-4">
              Clinical
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-white mb-4">
              Clinical Intelligence
            </h2>
            <p className="text-[15px] text-white/40 max-w-xl mx-auto leading-relaxed">
              Complete patient management with medical records, vitals tracking,
              allergy alerts, and medication management.
            </p>
          </motion.div>

          {/* Clinic image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden mb-12 border border-white/[0.06]"
          >
            <Image
              src="/images/about-clinic.png"
              alt="Modern African dental clinic"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#052E16]/40 via-transparent to-[#052E16]/40" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinicalFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-green-500/20 transition-all duration-300"
              >
                <h3 className="font-semibold text-white text-[14px] mb-1">
                  {feat.title}
                </h3>
                <p className="text-[13px] text-white/30 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Values (white) ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="uppercase tracking-[0.3em] text-xs text-green-600 font-mono block mb-4">
              Values
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-gray-900">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">
                  {value.title}
                </h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Journey Timeline (off-white) ── */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="uppercase tracking-[0.3em] text-xs text-green-600 font-mono block mb-4">
              Timeline
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-gray-900">
              Our Journey
            </h2>
          </motion.div>

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 py-6 border-b border-gray-200 last:border-0"
              >
                <div className="shrink-0 w-20 text-right">
                  <span className="text-[12px] font-semibold text-green-600 font-mono uppercase tracking-wider">
                    {item.phase}
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-green-500/30" />
                  <p className="text-[14px] text-gray-500 pl-6">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Visio Research Labs (dark) ── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "#052E16" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="uppercase tracking-[0.3em] text-xs text-green-400 font-mono block mb-4">
              Parent Company
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-white mb-5">
              Built by Visio Research Labs
            </h2>
            <p className="text-[15px] text-white/40 max-w-2xl mx-auto leading-relaxed">
              Visio Research Labs (VRL) is a South African AI research and
              product company building the operating systems of tomorrow. From
              healthcare to music, we&apos;re creating AI-powered platforms that
              transform industries across Africa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {vrlProducts.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-green-500/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-[15px]">
                    {product.name}
                  </h3>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      product.status === "Live"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                <p className="text-[13px] text-white/30 leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[13px] text-white/30 font-mono">
                Visio Research Labs — Johannesburg, South Africa
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatbotWidget />
    </div>
  );
}
