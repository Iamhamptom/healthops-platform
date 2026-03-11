"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

type Status = "Beta" | "In Development" | "Planned" | "Research";

interface RoadmapItem {
  title: string;
  status: Status;
  description: string;
  timeline: string;
}

const statusStyles: Record<Status, string> = {
  Beta: "bg-green-50 text-green-700 border border-green-200",
  "In Development": "bg-blue-50 text-blue-700 border border-blue-200",
  Planned: "bg-amber-50 text-amber-700 border border-amber-200",
  Research: "bg-purple-50 text-purple-700 border border-purple-200",
};

const roadmapItems: RoadmapItem[] = [
  {
    title: "AI Voice Receptionist",
    status: "In Development",
    description:
      "Full phone call handling with natural voice AI. Patients call, the AI answers, books appointments, and triages emergencies. Powered by ElevenLabs.",
    timeline: "Q2 2026",
  },
  {
    title: "Smart Recall Engine",
    status: "In Development",
    description:
      "Automated patient recall based on treatment history, overdue checkups, and predictive health analytics. WhatsApp + SMS + Email.",
    timeline: "Q2 2026",
  },
  {
    title: "Practice Analytics Dashboard",
    status: "Beta",
    description:
      "Real-time revenue analytics, patient flow optimization, no-show prediction, and staff utilization metrics.",
    timeline: "Live Q1 2026",
  },
  {
    title: "Multi-Location Support",
    status: "Planned",
    description:
      "Manage multiple practice locations from a single dashboard. Cross-location patient records, unified billing, and staff scheduling.",
    timeline: "Q3 2026",
  },
  {
    title: "Patient Portal",
    status: "Planned",
    description:
      "Self-service portal for patients to view appointments, pay invoices, access medical records, and communicate with their practice.",
    timeline: "Q3 2026",
  },
  {
    title: "AI Medical Coding",
    status: "Research",
    description:
      "Automated ICD-10 coding suggestions from consultation notes. Medical aid claim optimization and pre-authorization.",
    timeline: "Q4 2026",
  },
  {
    title: "Hospital Integration",
    status: "Research",
    description:
      "HL7/FHIR interoperability for hospital systems. Lab result imports, radiology report integration, referral management.",
    timeline: "2027",
  },
  {
    title: "African Language Support",
    status: "Research",
    description:
      "AI chatbot and voice support in Zulu, Xhosa, Sotho, Afrikaans, Swahili, and Yoruba. Making healthcare truly accessible.",
    timeline: "2027",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-[#052E16] pt-32 pb-16 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-green-500/[0.04] blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="inline-block text-[11px] font-mono tracking-[0.3em] text-green-400/80 uppercase mb-6">
              Coming Soon
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.1] mb-6">
              The future of
              <br />
              healthcare AI
            </h1>
            <p className="text-base md:text-lg text-white/40 font-light leading-relaxed max-w-2xl">
              We&apos;re building the next generation of tools to transform
              healthcare operations across Africa. Here&apos;s what&apos;s on
              our roadmap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Roadmap Grid ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="inline-block text-[11px] font-mono tracking-[0.3em] text-green-600 uppercase mb-4">
              Roadmap
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
              What we&apos;re building
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {roadmapItems.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Status badge */}
                <span
                  className={`absolute top-6 right-6 text-[11px] font-mono tracking-wide px-3 py-1 rounded-full ${statusStyles[item.status]}`}
                >
                  {item.status}
                </span>

                <h3 className="text-lg font-medium text-gray-900 pr-24 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 text-[12px] font-mono text-gray-400 tracking-wide">
                  <svg
                    className="w-3.5 h-3.5 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                  {item.timeline}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter / Stay Updated ── */}
      <section className="bg-[#052E16] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-lg mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-4">
              Stay in the loop
            </h2>
            <p className="text-sm text-white/40 font-light leading-relaxed mb-10">
              Get notified when new features launch.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-2 text-green-400 font-mono text-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Thanks! We&apos;ll keep you posted.
              </motion.div>
            ) : (
              <form
                onSubmit={handleNotify}
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@practice.co.za"
                  required
                  className="flex-1 w-full sm:w-auto px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-green-500/40 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-green-600 text-white text-sm font-mono tracking-wide hover:bg-green-500 transition-colors duration-300"
                >
                  Notify Me
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatbotWidget />
    </main>
  );
}
