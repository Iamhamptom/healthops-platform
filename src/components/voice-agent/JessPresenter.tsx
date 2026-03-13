"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const VoiceAgent = dynamic(() => import("./VoiceAgent"), { ssr: false });

interface SectionNarration {
  /** CSS selector or data-jess attribute value */
  id: string;
  /** Short label */
  label: string;
  /** What Jess says when this section is in view */
  narration: string;
  /** Accent color */
  color: string;
}

interface JessPresenterProps {
  sections: SectionNarration[];
}

export default function JessPresenter({ sections }: JessPresenterProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track which section is most visible
  useEffect(() => {
    const entries = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((entry) => {
          const id = entry.target.getAttribute("data-jess");
          if (id) {
            entries.set(id, entry.intersectionRatio);
          }
        });

        // Find the most visible section
        let maxRatio = 0;
        let maxId: string | null = null;
        entries.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        });

        if (maxId && maxRatio > 0.15) {
          setActiveSection(maxId);
          if (!hasScrolled) setHasScrolled(true);
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 1.0], rootMargin: "-10% 0px -10% 0px" }
    );

    // Observe all sections
    sections.forEach((s) => {
      const el = document.querySelector(`[data-jess="${s.id}"]`);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sections, hasScrolled]);

  const currentSection = sections.find((s) => s.id === activeSection);
  const currentIndex = sections.findIndex((s) => s.id === activeSection);

  if (dismissed) {
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={() => setDismissed(false)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 shadow-lg shadow-blue-500/30 flex items-center justify-center hover:bg-blue-500 transition-all"
        title="Bring Jess back"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      </motion.button>
    );
  }

  return (
    <>
      {/* Sticky Jess Panel — bottom right */}
      <AnimatePresence mode="wait">
        {hasScrolled && currentSection && (
          <motion.div
            key="jess-panel"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[340px] max-w-[calc(100vw-3rem)]"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-[#0a1f12]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <motion.div
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-blue-400 border border-[#0a1f12]"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <span className="text-[13px] font-medium text-white/80">Jess</span>
                    <span className="text-[10px] text-white/30 ml-1.5 font-mono">presenting</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* Voice toggle */}
                  <button
                    onClick={() => setShowVoice(!showVoice)}
                    className={`p-1.5 rounded-lg transition-all ${
                      showVoice ? "bg-blue-500/20 text-blue-400" : "text-white/20 hover:text-white/40"
                    }`}
                    title={showVoice ? "Hide voice agent" : "Talk to Jess"}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                  </button>
                  {/* Dismiss */}
                  <button
                    onClick={() => setDismissed(true)}
                    className="p-1.5 rounded-lg text-white/20 hover:text-white/40 transition-all"
                    title="Minimize Jess"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1 px-4 py-2 border-b border-white/[0.04]">
                {sections.map((s, i) => (
                  <div
                    key={s.id}
                    className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                      i <= currentIndex ? "bg-blue-400/60" : "bg-white/[0.06]"
                    }`}
                  />
                ))}
              </div>

              {/* Narration bubble */}
              <div className="px-4 py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSection.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: currentSection.color }}
                      />
                      <span
                        className="text-[10px] font-mono tracking-[0.15em] uppercase"
                        style={{ color: `${currentSection.color}99` }}
                      >
                        {currentSection.label}
                      </span>
                    </div>
                    <p className="text-[13px] text-white/60 font-light leading-relaxed">
                      {currentSection.narration}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Voice agent — expandable */}
              <AnimatePresence>
                {showVoice && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-white/[0.06]"
                  >
                    <div className="p-3">
                      <VoiceAgent inline />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
