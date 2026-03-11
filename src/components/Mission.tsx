"use client";

import { motion } from "framer-motion";

const stats = [
  { number: "72%", label: "of adults skip routine checkups" },
  { number: "1 in 3", label: "avoid the dentist entirely" },
  { number: "We're", label: "changing that" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function Mission() {
  return (
    <section className="relative w-full bg-[#030710] py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Very subtle background atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#6EE7B7] rounded-full blur-[350px] opacity-[0.02] pointer-events-none" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Section label */}
        <motion.div variants={fadeUp}>
          <span className="uppercase tracking-[0.3em] text-xs text-white/25 font-mono">
            Our Mission
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl font-light tracking-[-0.03em] text-white mt-8 leading-[1.2]"
        >
          Getting{" "}
          <span
            style={{
              textShadow:
                "0 0 40px rgba(110,231,183,0.3), 0 0 80px rgba(110,231,183,0.15)",
            }}
          >
            Africa healthy
          </span>
          ,
          <br />
          one person at a time.
        </motion.h2>

        {/* Body text */}
        <motion.p
          variants={fadeUp}
          className="text-white/50 text-base md:text-lg font-light leading-relaxed mt-10 max-w-2xl mx-auto"
        >
          Studies show most people find it hard to walk through that door
          — whether it&apos;s blood tests, dental checkups, or routine
          screenings. Healthcare should be accessible to everyone, everywhere.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-white/40 text-base md:text-lg font-light leading-relaxed mt-6 max-w-2xl mx-auto"
        >
          VisioHealth exists to bridge that gap. We help practices and health
          centres reach the right people, fill their bookings, and make
          healthcare less intimidating. From Johannesburg to Lagos, we&apos;re
          on a mission to get people through that door.
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mt-16 mb-16"
        />

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-white/15 text-5xl md:text-6xl font-extralight tracking-tight leading-none mb-3">
                {stat.number}
              </div>
              <div className="text-white/25 text-xs font-mono tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
