"use client";

import { motion } from "framer-motion";

type Integration = {
  name: string;
  category: string;
  description: string;
  status: "connected" | "coming_soon";
  color: string;
  letter: string;
};

const integrations: Integration[] = [
  {
    name: "WhatsApp Business",
    category: "Messaging",
    description:
      "Two-way patient messaging, appointment reminders, AI chatbot responses, and broadcast campaigns.",
    status: "connected",
    color: "bg-green-100 text-green-700",
    letter: "W",
  },
  {
    name: "Gmail",
    category: "Email",
    description:
      "Sync your inbox, send appointment confirmations, and manage patient communications directly.",
    status: "connected",
    color: "bg-blue-100 text-blue-700",
    letter: "G",
  },
  {
    name: "Sage Business Cloud",
    category: "Accounting",
    description:
      "Automatic invoice sync, payment tracking, and ICD-10 medical aid claims.",
    status: "connected",
    color: "bg-purple-100 text-purple-700",
    letter: "S",
  },
  {
    name: "QuickBooks Online",
    category: "Accounting",
    description:
      "Revenue tracking, expense management, and seamless billing integration.",
    status: "connected",
    color: "bg-purple-100 text-purple-700",
    letter: "Q",
  },
  {
    name: "Xero",
    category: "Accounting",
    description:
      "Cloud accounting sync with invoice generation and payment reconciliation.",
    status: "connected",
    color: "bg-purple-100 text-purple-700",
    letter: "X",
  },
  {
    name: "Google Calendar",
    category: "Scheduling",
    description:
      "Two-way calendar sync. Appointments created in VisioHealth appear in Google Calendar instantly.",
    status: "connected",
    color: "bg-amber-100 text-amber-700",
    letter: "C",
  },
  {
    name: "Google Maps & Reviews",
    category: "Visibility",
    description:
      "Display your practice location, pull Google reviews, and boost your online presence.",
    status: "connected",
    color: "bg-orange-100 text-orange-700",
    letter: "M",
  },
  {
    name: "Healthbridge",
    category: "Medical Claims",
    description:
      "South Africa\u2019s leading medical aid claims switch. Submit and track claims electronically.",
    status: "coming_soon",
    color: "bg-rose-100 text-rose-700",
    letter: "H",
  },
  {
    name: "Discovery Health",
    category: "Medical Aid",
    description:
      "Direct integration with Discovery Health for real-time benefit checks and pre-authorizations.",
    status: "coming_soon",
    color: "bg-cyan-100 text-cyan-700",
    letter: "D",
  },
  {
    name: "Snapscan / Zapper",
    category: "Payments",
    description:
      "Let patients pay at the counter with QR code payments. Instant settlement.",
    status: "coming_soon",
    color: "bg-indigo-100 text-indigo-700",
    letter: "S",
  },
  {
    name: "Zoom / Google Meet",
    category: "Telehealth",
    description:
      "Virtual consultations with one-click video calls. Integrated into the booking flow.",
    status: "coming_soon",
    color: "bg-sky-100 text-sky-700",
    letter: "Z",
  },
  {
    name: "Yoco",
    category: "Card Payments",
    description:
      "Accept card payments in-practice with Yoco POS integration. Auto-reconcile with invoices.",
    status: "coming_soon",
    color: "bg-teal-100 text-teal-700",
    letter: "Y",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Integrations() {
  return (
    <section className="relative w-full bg-gray-50 py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div variants={fadeUp}>
            <span className="uppercase tracking-[0.3em] text-xs text-green-600 font-mono">
              Integrations
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-gray-900 mt-8 leading-[1.2]"
          >
            Works with the tools you{" "}
            <span className="text-green-600">already use</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-600 text-base md:text-lg font-light leading-relaxed mt-6 max-w-2xl mx-auto"
          >
            VisioHealth connects seamlessly with the software your practice
            depends on. One platform, every tool.
          </motion.p>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-green-200 to-transparent mb-16 md:mb-20" />

        {/* Integration cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {integrations.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
            >
              {/* Icon + badge row */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-medium text-lg ${item.color}`}
                >
                  {item.letter}
                </div>
                {item.status === "connected" ? (
                  <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full">
                    Connected
                  </span>
                ) : (
                  <span className="bg-gray-50 text-gray-500 border border-gray-200 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="text-gray-900 font-medium text-sm mb-1">
                {item.name}
              </h3>

              {/* Category tag */}
              <span className="text-gray-400 text-[11px] font-mono tracking-wide">
                {item.category}
              </span>

              {/* Description */}
              <p className="text-gray-500 text-xs leading-relaxed font-light mt-3">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
