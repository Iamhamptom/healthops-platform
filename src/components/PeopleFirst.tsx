"use client";

import { motion } from "framer-motion";

const values = [
  {
    number: "01",
    title: "We bring revenue",
    description:
      "Our AI fills your calendar with the right patients. Targeted outreach, smart scheduling, and automated follow-ups mean fewer empty slots and more revenue for your practice.",
  },
  {
    number: "02",
    title: "We bring clients",
    description:
      "From WhatsApp marketing to Google visibility, we drive real patients to your door. No cold leads \u2014 qualified, ready-to-book patients who need your services.",
  },
  {
    number: "03",
    title: "We manage the traffic",
    description:
      "AI handles the flood \u2014 triaging inquiries, booking appointments, sending reminders, and following up. Your receptionist can breathe. Your phone stops ringing off the hook.",
  },
];

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function PeopleFirst() {
  return (
    <section className="relative w-full bg-white py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto"
      >
        {/* Section label */}
        <motion.div variants={fadeUp} className="text-center">
          <span className="uppercase tracking-[0.3em] text-xs text-green-600 font-mono">
            People First
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-light tracking-[-0.03em] text-gray-900 mt-8 text-center leading-[1.2]"
        >
          We believe in <span className="text-green-600">people</span>
        </motion.h2>

        {/* Body */}
        <motion.p
          variants={fadeUp}
          className="text-gray-600 text-base md:text-lg font-light leading-relaxed mt-10 max-w-3xl mx-auto text-center"
        >
          VisioHealth is a people-first company. Behind every booking is a
          person who needs care. Behind every practice is a team that chose
          healthcare to make a difference. We build technology that serves both
          &mdash; making healthcare accessible, human, and effortless.
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-16 mb-16"
        />

        {/* Value cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-8"
            >
              <div className="text-green-600 text-4xl font-extralight tracking-tight mb-5 font-mono">
                {value.number}
              </div>
              <h3 className="text-gray-900 font-medium text-lg mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
