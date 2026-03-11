"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import {
  Target, Users, Lightbulb, Heart, Tv, Handshake,
  Bot, Shield, Mic, Calendar, MessageSquare, Brain,
  Stethoscope, Activity, FileText, Smartphone,
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Built for SA Healthcare",
    description: "We understand the South African private healthcare market — from Gauteng practices to rural clinics.",
  },
  {
    icon: Users,
    title: "Practice-First Design",
    description: "Every feature solves a real ops problem. No bloat, no gimmicks — just what moves your bottom line.",
  },
  {
    icon: Lightbulb,
    title: "AI That Actually Works",
    description: "Our WhatsApp AI handles real conversations, not scripted decision trees. Patients can't tell the difference.",
  },
  {
    icon: Heart,
    title: "Relationships First",
    description: "We don't just sell software. We embed in your practice, learn your workflows, and optimize continuously.",
  },
];

const aiCapabilities = [
  {
    icon: Bot,
    title: "AI Triage Agent",
    description: "Instantly assesses patient urgency — EMERGENCY, URGENT, SEMI-URGENT, or ROUTINE. Never miss a critical case.",
    color: "#ef4444",
  },
  {
    icon: Mic,
    title: "ElevenLabs Voice AI",
    description: "Natural voice responses for patients. Your practice sounds professional 24/7, powered by ElevenLabs multilingual voices.",
    color: "#8B5CF6",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Front Desk",
    description: "AI handles patient messages like a human receptionist — booking, pricing, reminders, and triage. Always on.",
    color: "#2DD4BF",
  },
  {
    icon: Brain,
    title: "Intake Agent",
    description: "Pre-appointment data collection via conversational AI. Symptoms, medications, allergies — all gathered before the patient arrives.",
    color: "#D4AF37",
  },
  {
    icon: Heart,
    title: "Follow-up Agent",
    description: "Automated post-procedure check-ins at 24hr and 72hr. Recall reminders. Birthday wellness messages. Never lose a patient.",
    color: "#10b981",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Visual calendar with slot availability, conflict prevention, and AI-recommended booking times based on service type.",
    color: "#0ea5e9",
  },
];

const clinicalFeatures = [
  { icon: Stethoscope, title: "Patient Records", description: "Full medical history — consultations, procedures, lab results, imaging, referrals." },
  { icon: Activity, title: "Vitals Tracking", description: "Blood pressure, heart rate, SpO2, glucose, pain scale — all charted over time." },
  { icon: Shield, title: "Allergy Alerts", description: "Critical allergy banners on every patient view. Severity tracking. Life-saving visibility." },
  { icon: FileText, title: "Medical Records", description: "Structured records with diagnosis, treatment, and provider. Audit-ready documentation." },
  { icon: Smartphone, title: "Medication Management", description: "Active/stopped medications, dosages, frequencies. Full prescriber history." },
  { icon: Users, title: "Multi-Role Access", description: "Admin, doctor, receptionist, nurse — each role sees what they need." },
];

const timeline = [
  { year: "Research", title: "Deep market research across Gauteng healthcare verticals — dentists, radiology, spas, hospitals." },
  { year: "Build", title: "Core platform development: WhatsApp AI, booking automation, patient records, and ops dashboard." },
  { year: "AI Agents", title: "Deployed triage, intake, follow-up, and scheduling agents powered by Claude. ElevenLabs voice integration." },
  { year: "Launch", title: "First 50 practices onboarded with the Full Suite — AI front desk, clinical records, voice assistant." },
  { year: "Scale", title: "Multi-location support, hospital enterprise features, radiology ops, and payment processing." },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-20 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[var(--gold)] rounded-full blur-[250px] opacity-[0.04]" />
        </div>
        <motion.div style={{ opacity: heroOpacity }} className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] text-[var(--gold)] font-semibold mb-4 uppercase tracking-[0.3em]"
          >
            About VisioHealth Ops
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-[var(--ivory)]"
          >
            The AI-Powered
            <br />
            <span className="text-gradient text-shadow-gold">Healthcare OS</span>{" "}
            for Africa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            VisioHealth Ops combines AI agents, voice technology, and clinical intelligence
            to transform how healthcare practices operate. Built by Visio Research Labs,
            powered by Claude AI and ElevenLabs.
          </motion.p>

          {/* Tech logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            {["Claude AI", "ElevenLabs", "Next.js", "WhatsApp"].map(tech => (
              <span key={tech} className="text-[11px] text-[var(--text-tertiary)] font-medium uppercase tracking-wider">
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* AI Capabilities */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold text-center mb-4 tracking-tight text-[var(--ivory)]"
          >
            AI Agent Suite
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-[var(--text-secondary)] mb-12 max-w-xl mx-auto"
          >
            Five specialized AI agents work around the clock — triaging emergencies, booking appointments,
            following up post-procedure, and collecting intake data before patients even arrive.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiCapabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-xl glass-panel hover:border-[var(--gold)]/20 transition-all duration-500 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${cap.color}15` }}
                >
                  <cap.icon className="w-5 h-5" style={{ color: cap.color }} />
                </div>
                <h3 className="font-semibold text-[var(--ivory)] mb-2">{cap.title}</h3>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Features */}
      <section className="py-20">
        <div className="divider-shine mb-20" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold text-center mb-4 tracking-tight text-[var(--ivory)]"
          >
            Clinical Intelligence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-[var(--text-secondary)] mb-12 max-w-xl mx-auto"
          >
            Complete patient management with medical records, vitals tracking, allergy alerts,
            and medication management — designed for real clinical workflows.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinicalFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-xl glass-panel"
              >
                <div className="flex items-center gap-3 mb-2">
                  <feat.icon className="w-5 h-5 text-[var(--gold)]" />
                  <h3 className="font-semibold text-[var(--ivory)] text-sm">{feat.title}</h3>
                </div>
                <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Afrika World Connection */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl glass-panel roman-border"
            >
              <Tv className="w-8 h-8 text-[var(--gold)] mb-4" />
              <h3 className="font-serif text-xl font-bold text-[var(--ivory)] mb-3">Afrika World Media Access</h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-4">
                Our unique relationship strategy: we feature healthcare leaders on the Afrika World x Visio Research Labs show,
                build genuine relationships, and then offer a 15-minute practice audit. It&apos;s prestige + value, not cold outreach.
              </p>
              <div className="flex items-center gap-2 text-[13px] text-[var(--gold)] font-medium">
                <Handshake className="w-4 h-4" />
                Relationship-first sales
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl glass-panel"
            >
              <div className="text-5xl font-serif font-bold text-gradient text-shadow-gold mb-2">200+</div>
              <p className="text-lg text-[var(--text-secondary)] mb-6">practices across Gauteng</p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Dentists", value: "80+" },
                  { label: "Radiology", value: "35+" },
                  { label: "Wellness/Spas", value: "60+" },
                  { label: "Hospitals", value: "25+" },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-lg glass-panel">
                    <div className="text-xl font-bold text-[var(--ivory)]">{s.value}</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="divider-shine mb-20" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold text-center mb-12 tracking-tight text-[var(--ivory)]"
          >
            What Drives Us
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl glass-panel hover:border-[var(--gold)]/20 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-[var(--gold)]/10">
                  <value.icon className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <h3 className="font-semibold text-[var(--ivory)] mb-2">{value.title}</h3>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold text-center mb-12 tracking-tight text-[var(--ivory)]"
          >
            Our Journey
          </motion.h2>

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="shrink-0 w-20 text-right">
                  <span className="text-[13px] font-serif font-bold text-[var(--gold)]">{item.year}</span>
                </div>
                <div className="relative pb-6">
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[var(--gold)]" />
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[3px] top-4 w-px h-full bg-[var(--gold)]/20" />
                  )}
                  <p className="text-[14px] text-[var(--text-secondary)] pl-6">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotWidget />
    </>
  );
}
