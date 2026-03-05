"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Users, Lightbulb, Heart, Tv, Handshake } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Built for SA Healthcare",
    description: "We understand the South African private healthcare market — from Gauteng practices to rural clinics.",
    color: "#0071E3",
  },
  {
    icon: Users,
    title: "Practice-First Design",
    description: "Every feature solves a real ops problem. No bloat, no gimmicks — just what moves your bottom line.",
    color: "#34C759",
  },
  {
    icon: Lightbulb,
    title: "AI That Actually Works",
    description: "Our WhatsApp AI handles real conversations, not scripted decision trees. Patients can't tell the difference.",
    color: "#AF52DE",
  },
  {
    icon: Heart,
    title: "Relationships First",
    description: "We don't just sell software. We embed in your practice, learn your workflows, and optimize continuously.",
    color: "#FF2D55",
  },
];

const timeline = [
  { year: "Research", title: "Deep market research across Gauteng healthcare verticals — dentists, radiology, spas, hospitals." },
  { year: "Build", title: "Core platform development: WhatsApp AI, booking automation, and ops dashboard." },
  { year: "Launch", title: "First 50 practices onboarded with the Front Desk Suite for dentists and wellness." },
  { year: "Scale", title: "Radiology Ops module, multi-location support, and enterprise hospital features." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative bg-[var(--bg-secondary)]">
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[13px] text-[var(--primary)] font-semibold mb-4 uppercase tracking-wider"
          >
            About VisioHealth Ops
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-[var(--text-primary)]"
          >
            We&apos;re plugging the
            <br />
            <span className="text-gradient">revenue leaks</span>{" "}
            in healthcare
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            VisioHealth Ops is the patient operations platform built by Visio Research Labs,
            powered by the Afrika World media ecosystem. We combine AI automation with
            deep healthcare expertise to transform how practices operate.
          </motion.p>
        </div>
      </section>

      {/* Afrika World Connection */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white border border-[var(--border-light)] shadow-sm"
            >
              <Tv className="w-8 h-8 text-[var(--primary)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Afrika World Media Access</h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-4">
                Our unique relationship strategy: we feature healthcare leaders on the Afrika World x Visio Research Labs show,
                build genuine relationships, and then offer a 15-minute practice audit. It&apos;s prestige + value, not cold outreach.
              </p>
              <div className="flex items-center gap-2 text-[13px] text-[var(--primary)] font-medium">
                <Handshake className="w-4 h-4" />
                Relationship-first sales
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-secondary)]"
            >
              <div className="text-5xl font-bold text-gradient mb-2">200+</div>
              <p className="text-lg text-[var(--text-secondary)] mb-6">practices across Gauteng</p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Dentists", value: "80+" },
                  { label: "Radiology", value: "35+" },
                  { label: "Wellness/Spas", value: "60+" },
                  { label: "Hospitals", value: "25+" },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-xl bg-white border border-[var(--border-light)]">
                    <div className="text-xl font-bold text-[var(--text-primary)]">{s.value}</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[44px] font-bold text-center mb-12 tracking-tight text-[var(--text-primary)]"
          >
            What drives us
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-[var(--border-light)] hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${value.color}12` }}
                >
                  <value.icon className="w-5 h-5" style={{ color: value.color }} />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{value.title}</h3>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[44px] font-bold text-center mb-12 tracking-tight text-[var(--text-primary)]"
          >
            Our journey
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
                  <span className="text-[13px] font-bold text-[var(--primary)]">{item.year}</span>
                </div>
                <div className="relative pb-6">
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[var(--primary)]" />
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[3px] top-4 w-px h-full bg-[var(--border)]" />
                  )}
                  <p className="text-[14px] text-[var(--text-secondary)] pl-6">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
