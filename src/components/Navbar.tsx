"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse } from "lucide-react";

const links = [
  { href: "/", label: "Home", numeral: "I" },
  { href: "/how-it-works", label: "How It Works", numeral: "II" },
  { href: "/#features", label: "Features", numeral: "III" },
  { href: "/#pricing", label: "Pricing", numeral: "IV" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 glass-panel-strong"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <HeartPulse className="w-6 h-6 text-[var(--gold)] transition-transform group-hover:scale-110" />
            <span className="font-serif text-[15px] font-semibold tracking-wide text-[var(--ivory)]">
              VISIOHEALTH
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[12px] uppercase tracking-[0.15em] font-medium text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-[12px] uppercase tracking-[0.15em] font-medium text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 text-[12px] uppercase tracking-[0.15em] font-semibold bg-[var(--gold)] text-[var(--obsidian)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[var(--ivory)] origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-[var(--ivory)]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-[var(--ivory)] origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center"
          >
            <div className="text-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="mb-6"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group inline-flex items-center gap-4"
                  >
                    <span className="text-[11px] text-[var(--gold)]/50 tracking-[0.2em] font-serif">
                      {link.numeral}
                    </span>
                    <span className="font-serif text-4xl md:text-5xl text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors duration-300">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-12 flex flex-col items-center gap-4"
              >
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-[12px] uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-8 py-3 bg-[var(--gold)] text-[var(--obsidian)] font-serif font-semibold text-[13px] uppercase tracking-[0.15em] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
