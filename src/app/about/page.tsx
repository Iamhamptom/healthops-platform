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
    description: "We understand the South African private healthcare market — from Gauteng practices to rural clinics.",
  },
  {
    title: "Practice-First Design",
    description: "Every feature solves a real ops problem. No bloat, no gimmicks — just what moves your bottom line.",
  },
  {
    title: "AI That Actually Works",
    description: "Our WhatsApp AI handles real conversations, not scripted decision trees. Patients can't tell the difference.",
  },
  {
    title: "Relationships First",
    description: "We embed in your practice, learn your workflows, and optimize continuously.",
  },
];

const aiCapabilities = [
  {
    title: "AI Triage Agent",
    description: "Instantly assesses patient urgency — EMERGENCY, URGENT, SEMI-URGENT, or ROUTINE.",
  },
  {
    title: "Voice AI",
    description: "Natural voice responses powered by ElevenLabs. Your practice sounds professional 24/7.",
  },
  {
    title: "WhatsApp Front Desk",
    description: "AI handles patient messages like a human receptionist — booking, pricing, reminders, triage.",
  },
  {
    title: "Intake Agent",
    description: "Pre-appointment data collection via conversational AI. Symptoms, medications, allergies.",
  },
  {
    title: "Follow-up Agent",
    description: "Post-procedure check-ins at 24hr and 72hr. Recall reminders. Birthday wellness messages.",
  },
  {
    title: "Smart Scheduling",
    description: "Visual calendar with slot availability, conflict prevention, and AI-recommended times.",
  },
];

const clinicalFeatures = [
  { title: "Patient Records", description: "Full medical history — consultations, procedures, lab results, imaging, referrals." },
  { title: "Vitals Tracking", description: "Blood pressure, heart rate, SpO2, glucose, pain scale — all charted over time." },
  { title: "Allergy Alerts", description: "Critical allergy banners on every patient view. Severity tracking." },
  { title: "Medical Records", description: "Structured records with diagnosis, treatment, and provider." },
  { title: "Medication Management", description: "Active/stopped medications, dosages, frequencies. Full prescriber history." },
  { title: "Multi-Role Access", description: "Admin, doctor, receptionist, nurse — each role sees what they need." },
];

const timeline = [
  { phase: "Research", title: "Deep market research across Gauteng healthcare verticals." },
  { phase: "Build", title: "Core platform: WhatsApp AI, booking automation, patient records." },
  { phase: "AI Agents", title: "Deployed triage, intake, follow-up agents. ElevenLabs voice integration." },
  { phase: "Launch", title: "First 50 practices onboarded with the Full Suite." },
  { phase: "Scale", title: "Multi-location support, hospital features, radiology ops." },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-[#030F07]">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-20 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4ADE80] rounded-full blur-[300px] opacity-[0.04] pointer-events-none" />
        <motion.div style={{ opacity: heroOpacity }} className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[13px] text-[#4ADE80] mb-4 font-mono tracking-wider uppercase"
          >
            About VisioHealth Ops
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-[-0.03em] text-white"
          >
            The AI-Powered
            <br />
            <span className="text-gradient-green text-glow">Healthcare OS</span> for Africa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[16px] text-white/40 max-w-2xl mx-auto leading-relaxed"
          >
            VisioHealth Ops combines AI agents, voice technology, and clinical intelligence
            to transform how healthcare practices operate. Built by Visio Research Labs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6 mt-10"
          >
            {["Claude AI", "ElevenLabs", "Next.js", "WhatsApp"].map(tech => (
              <span key={tech} className="text-[12px] text-white/20 font-mono">
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Team Image Banner */}
      <section className="relative bg-[#030F07] pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-[#4ADE80]/10"
          >
            <Image
              src="/images/about-team.png"
              alt="Our diverse healthcare team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030F07] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-8">
              <p className="text-white/60 text-sm font-mono">Our team — built across cultures, united by care.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[13px] text-[#4ADE80] mb-4 block font-mono tracking-wider uppercase">Capabilities</span>
            <h2 className="text-3xl md:text-5xl tracking-[-0.03em] text-[#1A1A1A] font-bold mb-3">AI Agent Suite</h2>
            <p className="text-[15px] text-[#6B6B6B] max-w-xl mx-auto">
              Five specialized AI agents work around the clock — triaging emergencies, booking appointments,
              and collecting intake data.
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
                className="group glow-card p-6 rounded-2xl bg-white border border-[#F0F0EC] hover:border-[#4ADE80]/20 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-[#4ADE80]/8 flex items-center justify-center mb-4 group-hover:bg-[#4ADE80]/15 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80]/50 group-hover:bg-[#4ADE80] transition-colors" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2 text-[15px] group-hover:text-[#16A34A] transition-colors">{cap.title}</h3>
                <p className="text-[13px] text-[#9B9B9B] leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Features */}
      <section className="py-20 bg-[#030F07]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[13px] text-[#4ADE80] mb-4 block font-mono tracking-wider uppercase">Clinical</span>
            <h2 className="text-3xl md:text-5xl tracking-[-0.03em] text-white font-bold mb-3">Clinical Intelligence</h2>
            <p className="text-[15px] text-white/40 max-w-xl mx-auto">
              Complete patient management with medical records, vitals tracking, allergy alerts,
              and medication management.
            </p>
          </motion.div>

          {/* Clinic image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden mb-12 border border-[#4ADE80]/10"
          >
            <Image
              src="/images/about-clinic.png"
              alt="Modern African dental clinic"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030F07]/40 via-transparent to-[#030F07]/40" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinicalFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-5 rounded-2xl bg-[#071A0E] border border-[#4ADE80]/[0.06] hover:border-[#4ADE80]/15 transition-all duration-300"
              >
                <h3 className="font-semibold text-white text-[14px] mb-1">{feat.title}</h3>
                <p className="text-[13px] text-white/30 leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + Afrika World */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white border border-[#F0F0EC]"
            >
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Afrika World Media Access</h3>
              <p className="text-[14px] text-[#6B6B6B] leading-relaxed mb-4">
                We feature healthcare leaders on the Afrika World x Visio Research Labs show,
                build genuine relationships, then offer practice audits. Prestige + value, not cold outreach.
              </p>
              <span className="inline-flex items-center gap-2 text-[13px] text-[#4ADE80] font-mono font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                Relationship-first sales
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white border border-[#F0F0EC]"
            >
              <div className="text-5xl font-bold text-gradient-green mb-2">200+</div>
              <p className="text-[16px] text-[#6B6B6B] mb-6">practices across Gauteng</p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Dentists", value: "80+" },
                  { label: "Radiology", value: "35+" },
                  { label: "Wellness", value: "60+" },
                  { label: "Hospitals", value: "25+" },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-xl bg-[#FAFAF8] border border-[#F0F0EC]">
                    <div className="text-lg font-bold text-[#1A1A1A]">{s.value}</div>
                    <div className="text-[12px] text-[#9B9B9B] font-mono">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#030F07]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl tracking-[-0.03em] text-white font-bold">What Drives Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-[#071A0E] border border-[#4ADE80]/[0.06] hover:border-[#4ADE80]/15 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-[#4ADE80]/10 flex items-center justify-center mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80]" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-[15px]">{value.title}</h3>
                <p className="text-[13px] text-white/30 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl tracking-[-0.03em] text-[#1A1A1A] font-bold">Our Journey</h2>
          </motion.div>

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 py-5 border-b border-[#F0F0EC] last:border-0"
              >
                <div className="shrink-0 w-20 text-right">
                  <span className="text-[13px] font-semibold text-[#4ADE80] font-mono">{item.phase}</span>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#4ADE80]/30" />
                  <p className="text-[14px] text-[#6B6B6B] pl-6">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotWidget />
    </div>
  );
}
