"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Building2, Palette, Users, CalendarCheck, MessageSquare, UserPlus, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface Steps {
  practice_setup: boolean;
  branding: boolean;
  first_patient: boolean;
  first_booking: boolean;
  whatsapp_config: boolean;
  team_invite: boolean;
}

const STEP_INFO = [
  {
    key: "practice_setup",
    icon: Building2,
    title: "Set Up Your Practice",
    description: "Add your practice name, address, hours, and type. This is what your patients will see.",
    action: "/dashboard/settings",
    actionLabel: "Go to Settings",
  },
  {
    key: "branding",
    icon: Palette,
    title: "Customise Your Branding",
    description: "Upload your logo, pick your colours, set your tagline. Make the platform yours.",
    action: "/dashboard/settings?tab=branding",
    actionLabel: "Set Up Branding",
  },
  {
    key: "first_patient",
    icon: Users,
    title: "Add Your First Patient",
    description: "Add a patient manually, or they'll be created automatically when they book via WhatsApp.",
    action: "/dashboard/patients",
    actionLabel: "Add a Patient",
  },
  {
    key: "first_booking",
    icon: CalendarCheck,
    title: "Create Your First Booking",
    description: "Book an appointment from the calendar or let a patient book via WhatsApp. Try it now.",
    action: "/dashboard/calendar",
    actionLabel: "Open Calendar",
  },
  {
    key: "whatsapp_config",
    icon: MessageSquare,
    title: "Connect WhatsApp",
    description: "Link your Twilio WhatsApp number so patients can message your AI assistant directly.",
    action: "/dashboard/settings?tab=notifications",
    actionLabel: "Configure WhatsApp",
  },
  {
    key: "team_invite",
    icon: UserPlus,
    title: "Invite Your Team",
    description: "Add your receptionist, nurses, and doctors. Each role gets their own dashboard view.",
    action: "/dashboard/settings",
    actionLabel: "Manage Team",
  },
];

export default function OnboardingPage() {
  const [steps, setSteps] = useState<Steps | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(6);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetch("/api/onboarding").then(r => r.json()).then(d => {
      setSteps(d.steps || null);
      setCurrentStep(d.currentStep || 0);
      setTotalSteps(d.totalSteps || 6);
      setCompleted(d.completed || false);
    });
  }, []);

  if (!steps) return null;

  const completedCount = Object.values(steps).filter(Boolean).length;
  const progress = Math.round((completedCount / totalSteps) * 100);

  if (completed) {
    return (
      <div className="p-6 max-w-2xl mx-auto mt-20 text-center space-y-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          <Sparkles className="w-16 h-16 mx-auto text-[var(--gold)]" />
        </motion.div>
        <h1 className="text-2xl font-bold text-[var(--ivory)]">You&apos;re All Set!</h1>
        <p className="text-[var(--text-secondary)]">Your practice is fully configured and ready to go.</p>
        <Link href="/dashboard" className="inline-block px-8 py-3 bg-[var(--gold)] rounded-lg text-sm font-semibold hover:opacity-90">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-[var(--ivory)]">
          Welcome to VisioHealth Ops
        </motion.h1>
        <p className="text-[var(--text-secondary)] text-sm">Let&apos;s get your practice set up. Follow these steps and you&apos;ll be running in minutes.</p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-[12px]">
          <span className="text-[var(--text-tertiary)]">{completedCount} of {totalSteps} completed</span>
          <span className="text-[var(--gold)] font-medium">{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--teal)]"
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {STEP_INFO.map((step, i) => {
          const isDone = steps[step.key as keyof Steps];
          const isNext = !isDone && Object.values(steps).filter(Boolean).length === i;

          return (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-xl glass-panel p-5 transition-all ${
                isNext ? "ring-1 ring-[var(--gold)]/30 shadow-[0_0_20px_rgba(212,175,55,0.05)]" : ""
              } ${isDone ? "opacity-60" : ""}`}
            >
              <div className="flex items-start gap-4">
                {/* Step indicator */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isDone ? "bg-[var(--teal)]/10" : isNext ? "bg-[var(--gold)]/10" : "bg-white/5"
                }`}>
                  {isDone ? (
                    <Check className="w-5 h-5 text-[var(--teal)]" />
                  ) : (
                    <step.icon className={`w-5 h-5 ${isNext ? "text-[var(--gold)]" : "text-[var(--text-tertiary)]"}`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`text-[14px] font-semibold ${isDone ? "text-[var(--text-secondary)] line-through" : "text-[var(--ivory)]"}`}>
                      {step.title}
                    </h3>
                    {isDone && <span className="text-[10px] text-[var(--teal)] font-medium">Done</span>}
                    {isNext && <span className="text-[10px] text-[var(--gold)] font-medium animate-pulse">Next</span>}
                  </div>
                  <p className="text-[12px] text-[var(--text-tertiary)] leading-relaxed">{step.description}</p>
                </div>

                {/* Action button */}
                {!isDone && (
                  <Link
                    href={step.action}
                    className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-medium transition-all ${
                      isNext
                        ? "bg-[var(--gold)] text-[#050505] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                        : "border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--ivory)]"
                    }`}
                  >
                    {step.actionLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Skip */}
      <div className="text-center">
        <Link href="/dashboard" className="text-[12px] text-[var(--text-tertiary)] hover:text-[var(--ivory)] transition-colors">
          Skip for now — I&apos;ll set up later
        </Link>
      </div>
    </div>
  );
}
