"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope, User, Phone, Mail, FileText, AlertTriangle,
  ChevronRight, Check, Loader2, Building2, HeartPulse, Shield,
} from "lucide-react";

interface PracticeInfo {
  name: string;
  type: string;
  primaryColor: string;
  secondaryColor: string;
  tagline: string;
  logoUrl: string;
  services: string[];
}

type Step = "gp" | "patient" | "clinical" | "confirm" | "done";
const STEPS: Step[] = ["gp", "patient", "clinical", "confirm", "done"];

export default function GPReferralPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState("");
  const [practice, setPractice] = useState<PracticeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [step, setStep] = useState<Step>("gp");
  const [submitting, setSubmitting] = useState(false);
  const [referralId, setReferralId] = useState("");

  const [form, setForm] = useState({
    referringDoctor: "",
    referringPractice: "",
    referringEmail: "",
    referringPhone: "",
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    dateOfBirth: "",
    medicalAid: "",
    medicalAidNo: "",
    reason: "",
    urgency: "routine",
    clinicalNotes: "",
    icd10Code: "",
  });

  useEffect(() => { params.then(p => setSlug(p.slug)); }, [params]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/public/refer?slug=${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(data.error); setLoading(false); return; }
        setPractice(data.practice);
        setLoading(false);
      })
      .catch(() => { setError("Unable to load referral form"); setLoading(false); });
  }, [slug]);

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/public/refer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, ...form }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); setSubmitting(false); return; }
      setReferralId(data.referralId);
      setStep("done");
    } catch {
      setError("Submission failed. Please try again.");
    }
    setSubmitting(false);
  }

  const stepIndex = STEPS.indexOf(step);
  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (!practice) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white/60 text-sm">
        {error || "Practice not found"}
      </div>
    );
  }

  const pc = practice.primaryColor || "#D4AF37";

  const inputCls = "w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30";
  const labelCls = "flex items-center gap-2 text-xs text-white/50 mb-1.5";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: pc + "20" }}>
              <Stethoscope className="w-4 h-4" style={{ color: pc }} />
            </div>
            <div>
              <h1 className="text-sm font-semibold">{practice.name}</h1>
              <p className="text-[10px] text-white/40">GP Referral Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-medium">HPCSA Compliant</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress */}
        {step !== "done" && (
          <div className="flex items-center justify-center gap-1 mb-8">
            {STEPS.filter(s => s !== "done").map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full transition-all ${
                    STEPS.indexOf(s) < stepIndex ? "scale-100" : STEPS.indexOf(s) === stepIndex ? "scale-125" : "scale-75 opacity-30"
                  }`}
                  style={{ backgroundColor: STEPS.indexOf(s) <= stepIndex ? pc : "rgba(255,255,255,0.2)" }}
                />
                {i < 3 && <div className="w-8 h-px" style={{ backgroundColor: STEPS.indexOf(s) < stepIndex ? pc + "60" : "rgba(255,255,255,0.1)" }} />}
              </div>
            ))}
          </div>
        )}

        {/* Back */}
        {stepIndex > 0 && step !== "done" && (
          <button onClick={() => setStep(STEPS[stepIndex - 1])} className="text-xs text-white/40 hover:text-white/70 mb-6">
            &larr; Back
          </button>
        )}

        {/* Error */}
        {error && step !== "done" && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{error}</div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: GP Details */}
          {step === "gp" && (
            <motion.div key="gp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-semibold mb-1">Referring Doctor</h2>
              <p className="text-xs text-white/40 mb-6">Your details for the referral record and feedback loop</p>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}><User className="w-3 h-3" /> Your Name *</label>
                  <input value={form.referringDoctor} onChange={e => update("referringDoctor", e.target.value)} className={inputCls} placeholder="Dr. Sarah Nkosi" />
                </div>
                <div>
                  <label className={labelCls}><Building2 className="w-3 h-3" /> Practice Name</label>
                  <input value={form.referringPractice} onChange={e => update("referringPractice", e.target.value)} className={inputCls} placeholder="Sandton Family Practice" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}><Mail className="w-3 h-3" /> Email</label>
                    <input type="email" value={form.referringEmail} onChange={e => update("referringEmail", e.target.value)} className={inputCls} placeholder="dr.nkosi@example.com" />
                  </div>
                  <div>
                    <label className={labelCls}><Phone className="w-3 h-3" /> Phone</label>
                    <input type="tel" value={form.referringPhone} onChange={e => update("referringPhone", e.target.value)} className={inputCls} placeholder="+27 82 123 4567" />
                  </div>
                </div>
                <p className="text-[11px] text-white/30 flex items-center gap-1.5">
                  <Shield className="w-3 h-3" />
                  We&apos;ll send you a consultation report after the patient&apos;s visit
                </p>
                <button
                  onClick={() => {
                    if (!form.referringDoctor) { setError("Your name is required"); return; }
                    setError(""); setStep("patient");
                  }}
                  className="w-full py-3 rounded-lg text-sm font-semibold text-black hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: pc }}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Patient Details */}
          {step === "patient" && (
            <motion.div key="patient" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-semibold mb-1">Patient Information</h2>
              <p className="text-xs text-white/40 mb-6">Patient details for scheduling and medical aid</p>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}><User className="w-3 h-3" /> Patient Name *</label>
                  <input value={form.patientName} onChange={e => update("patientName", e.target.value)} className={inputCls} placeholder="John Mokoena" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}><Phone className="w-3 h-3" /> Patient Phone</label>
                    <input type="tel" value={form.patientPhone} onChange={e => update("patientPhone", e.target.value)} className={inputCls} placeholder="+27 82 987 6543" />
                  </div>
                  <div>
                    <label className={labelCls}><Mail className="w-3 h-3" /> Patient Email</label>
                    <input type="email" value={form.patientEmail} onChange={e => update("patientEmail", e.target.value)} className={inputCls} placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Date of Birth</label>
                  <input type="date" value={form.dateOfBirth} onChange={e => update("dateOfBirth", e.target.value)} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}><HeartPulse className="w-3 h-3" /> Medical Aid</label>
                    <select value={form.medicalAid} onChange={e => update("medicalAid", e.target.value)} className={inputCls}>
                      <option value="">Select...</option>
                      <option value="Discovery Health">Discovery Health</option>
                      <option value="GEMS">GEMS</option>
                      <option value="Bonitas">Bonitas</option>
                      <option value="Momentum Health">Momentum Health</option>
                      <option value="Medihelp">Medihelp</option>
                      <option value="Bestmed">Bestmed</option>
                      <option value="Fedhealth">Fedhealth</option>
                      <option value="CompCare">CompCare</option>
                      <option value="Sizwe Medical">Sizwe Medical</option>
                      <option value="Self-pay">Self-pay (No medical aid)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Member Number</label>
                    <input value={form.medicalAidNo} onChange={e => update("medicalAidNo", e.target.value)} className={inputCls} placeholder="e.g. 123456789" />
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (!form.patientName) { setError("Patient name is required"); return; }
                    setError(""); setStep("clinical");
                  }}
                  className="w-full py-3 rounded-lg text-sm font-semibold text-black hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: pc }}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Clinical Details */}
          {step === "clinical" && (
            <motion.div key="clinical" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-semibold mb-1">Clinical Information</h2>
              <p className="text-xs text-white/40 mb-6">Reason for referral and clinical context</p>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}><FileText className="w-3 h-3" /> Reason for Referral *</label>
                  <textarea
                    value={form.reason}
                    onChange={e => update("reason", e.target.value)}
                    rows={3}
                    className={inputCls + " resize-none"}
                    placeholder="e.g. Chronic bilateral sinusitis, 6 months duration, failed 2 courses of antibiotics + nasal steroids. CT sinuses shows bilateral maxillary and ethmoid opacification."
                  />
                </div>
                <div>
                  <label className={labelCls}><AlertTriangle className="w-3 h-3" /> Urgency</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "routine", label: "Routine", desc: "Standard referral" },
                      { value: "urgent", label: "Urgent", desc: "Within 1-2 days" },
                      { value: "emergency", label: "Emergency", desc: "Immediate" },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => update("urgency", opt.value)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          form.urgency === opt.value
                            ? "border-transparent text-black"
                            : "border-white/10 hover:border-white/20"
                        }`}
                        style={form.urgency === opt.value ? { backgroundColor: opt.value === "emergency" ? "#EF4444" : opt.value === "urgent" ? "#F59E0B" : pc } : undefined}
                      >
                        <div className={`text-xs font-medium ${form.urgency === opt.value ? "" : "text-white/70"}`}>{opt.label}</div>
                        <div className={`text-[10px] mt-0.5 ${form.urgency === opt.value ? "opacity-80" : "text-white/30"}`}>{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>ICD-10 Code (optional)</label>
                  <input value={form.icd10Code} onChange={e => update("icd10Code", e.target.value)} className={inputCls} placeholder="e.g. J32.9 — Chronic sinusitis, unspecified" />
                </div>
                <div>
                  <label className={labelCls}>Clinical Notes (medications, imaging, history)</label>
                  <textarea
                    value={form.clinicalNotes}
                    onChange={e => update("clinicalNotes", e.target.value)}
                    rows={3}
                    className={inputCls + " resize-none"}
                    placeholder="Current medications, relevant history, imaging results, allergies..."
                  />
                </div>
                <button
                  onClick={() => {
                    if (!form.reason) { setError("Reason for referral is required"); return; }
                    setError(""); setStep("confirm");
                  }}
                  className="w-full py-3 rounded-lg text-sm font-semibold text-black hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: pc }}
                >
                  Review Referral <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirm */}
          {step === "confirm" && (
            <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-semibold mb-4">Review & Submit</h2>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-4 text-sm">
                <div className="pb-3 border-b border-white/10">
                  <div className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Referring Doctor</div>
                  <p className="font-medium">Dr. {form.referringDoctor}</p>
                  {form.referringPractice && <p className="text-white/50 text-xs">{form.referringPractice}</p>}
                </div>
                <div className="pb-3 border-b border-white/10">
                  <div className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Patient</div>
                  <p className="font-medium">{form.patientName}</p>
                  {form.medicalAid && <p className="text-white/50 text-xs">{form.medicalAid} — {form.medicalAidNo}</p>}
                </div>
                <div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Referral</div>
                  <p className="text-white/70">{form.reason}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{
                      backgroundColor: form.urgency === "emergency" ? "#EF444420" : form.urgency === "urgent" ? "#F59E0B20" : pc + "20",
                      color: form.urgency === "emergency" ? "#EF4444" : form.urgency === "urgent" ? "#F59E0B" : pc,
                    }}
                  >
                    {form.urgency.charAt(0).toUpperCase() + form.urgency.slice(1)}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full mt-4 py-3 rounded-lg text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: pc }}
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {submitting ? "Submitting..." : "Submit Referral"}
              </button>
            </motion.div>
          )}

          {/* Step 5: Done */}
          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: pc + "20" }}
              >
                <Check className="w-7 h-7" style={{ color: pc }} />
              </motion.div>
              <h2 className="text-xl font-semibold mb-2">Referral Submitted</h2>
              <p className="text-sm text-white/50 max-w-sm mx-auto mb-6">
                Thank you, Dr. {form.referringDoctor}. We&apos;ve received your referral for {form.patientName} and will contact them to schedule an appointment.
              </p>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 max-w-xs mx-auto space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Reference</span>
                  <span className="font-mono text-white/70">{referralId?.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Status</span>
                  <span className="text-amber-400 font-medium">Under Review</span>
                </div>
              </div>
              {form.referringEmail && (
                <p className="text-xs text-white/30 mt-6">
                  A confirmation has been sent to {form.referringEmail}.<br />
                  We&apos;ll send you a consultation report after the patient&apos;s visit.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/5 py-6 text-center">
        <p className="text-[10px] text-white/20">Powered by VisioHealth Ops &middot; POPIA Compliant</p>
      </footer>
    </div>
  );
}
