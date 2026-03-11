"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings, Loader2, Save, Palette, Shield, Bell, CreditCard, Check, Zap, Crown, Building2, ExternalLink, Mail, FileText, Link2, Unlink } from "lucide-react";

interface PracticeForm {
  name: string;
  type: string;
  address: string;
  phone: string;
  hours: string;
  aiPersonality: string;
}

interface BrandingForm {
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  subdomain: string;
  tagline: string;
}

interface Subscription {
  plan: string;
  status: string;
  trialEndsAt: string | null;
  paystackSubId: string | null;
  nextPaymentDate: string | null;
  amount: number;
}

const PLANS = [
  {
    key: "starter", name: "Starter", icon: Zap, price: 7500, priceLabel: "R7,500",
    features: ["WhatsApp AI front desk", "Booking capture & confirmations", "Reminders & rescheduling", "Basic analytics", "Email support"],
  },
  {
    key: "professional", name: "Pro", icon: Crown, price: 15000, priceLabel: "R15,000", popular: true,
    features: ["Everything in Starter", "Waitlist auto-fill", "Deposits & pay-by-link", "Reviews engine", "Recall automation", "Priority support", "Custom branding"],
  },
  {
    key: "enterprise", name: "Premium", icon: Building2, price: 30000, priceLabel: "R30,000",
    features: ["Everything in Pro", "Multi-location support", "Advanced recall & campaigns", "Intake & consent forms", "KPI dashboard", "Dedicated account manager", "API access"],
  },
];

export default function SettingsPage() {
  const [form, setForm] = useState<PracticeForm>({
    name: "", type: "dental", address: "", phone: "", hours: "", aiPersonality: "professional",
  });
  const [branding, setBranding] = useState<BrandingForm>({
    logoUrl: "", primaryColor: "#D4AF37", secondaryColor: "#2DD4BF", subdomain: "", tagline: "",
  });
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [hasPractice, setHasPractice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brandingLoading, setBrandingLoading] = useState(false);
  const [subLoading, setSubLoading] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [saved, setSaved] = useState("");
  const [userName, setUserName] = useState("");
  const [plan, setPlan] = useState("starter");
  const [tab, setTab] = useState<"practice" | "branding" | "subscription" | "compliance" | "notifications" | "integrations">("practice");
  const [gmailConnected, setGmailConnected] = useState(false);
  const [accountingProvider, setAccountingProvider] = useState<string | null>(null);
  const [connectingGmail, setConnectingGmail] = useState(false);
  const [connectingAccounting, setConnectingAccounting] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);

  // Check URL params for tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTab = params.get("tab");
    if (urlTab === "subscription") setTab("subscription");
    if (urlTab === "integrations") setTab("integrations");
    const status = params.get("status");
    if (status === "success") setSaved("subscription");
    const connected = params.get("connected");
    if (connected === "gmail") { setGmailConnected(true); setSaved("gmail"); setTab("integrations"); }
    if (["sage", "quickbooks", "xero"].includes(connected || "")) { setAccountingProvider(connected); setSaved("accounting"); setTab("integrations"); }
  }, []);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(data => {
      if (data.user) {
        setUserName(data.user.name);
        if (data.user.practice) {
          setHasPractice(true);
          setForm({
            name: data.user.practice.name, type: data.user.practice.type,
            address: data.user.practice.address, phone: data.user.practice.phone,
            hours: data.user.practice.hours, aiPersonality: data.user.practice.aiPersonality,
          });
        }
      }
    });
    fetch("/api/tenant").then(r => r.json()).then(data => {
      if (data.tenant) {
        setBranding({
          logoUrl: data.tenant.logoUrl || "",
          primaryColor: data.tenant.primaryColor || "#D4AF37",
          secondaryColor: data.tenant.secondaryColor || "#2DD4BF",
          subdomain: data.tenant.subdomain || "",
          tagline: data.tenant.tagline || "",
        });
        setPlan(data.tenant.plan || "starter");
      }
    });
    fetch("/api/subscription").then(r => r.json()).then(data => {
      if (data.subscription) setSubscription(data.subscription);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/practice", {
      method: hasPractice ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setHasPractice(true);
    setSaved("practice");
    setLoading(false);
    setTimeout(() => setSaved(""), 3000);
  }

  async function handleBrandingSave(e: React.FormEvent) {
    e.preventDefault();
    setBrandingLoading(true);
    await fetch("/api/tenant", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(branding),
    });
    setSaved("branding");
    setBrandingLoading(false);
    setTimeout(() => setSaved(""), 3000);
  }

  async function handleSubscribe(selectedPlan: string) {
    setSubLoading(selectedPlan);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan }),
      });
      const data = await res.json();
      if (data.checkout_url && data.checkout_url !== "#demo-checkout") {
        window.location.href = data.checkout_url;
      } else {
        // Demo mode — show success
        setPlan(selectedPlan);
        setSubscription(prev => prev ? { ...prev, plan: selectedPlan, status: "active" } : null);
        setSaved("subscription");
        setTimeout(() => setSaved(""), 3000);
      }
    } catch {
      alert("Failed to initialize checkout. Please try again.");
    }
    setSubLoading(null);
  }

  async function handleCancel() {
    if (!confirm("Are you sure you want to cancel your subscription? Your access will continue until the end of the billing period.")) return;
    setCancelLoading(true);
    await fetch("/api/subscription", { method: "PATCH" });
    setSubscription(prev => prev ? { ...prev, status: "cancelled" } : null);
    setCancelLoading(false);
  }

  const inputClass = "w-full px-3 py-2 bg-[var(--charcoal)]/20 border border-[var(--border)] rounded-lg text-sm text-[var(--ivory)] focus:outline-none focus:border-[var(--primary)]/40";

  const statusColors: Record<string, { color: string; bg: string; label: string }> = {
    active: { color: "#10b981", bg: "rgba(16,185,129,0.1)", label: "Active" },
    trial: { color: "#E8C84A", bg: "rgba(232,200,74,0.1)", label: "Free Trial" },
    past_due: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "Past Due" },
    cancelled: { color: "#8A0303", bg: "rgba(138,3,3,0.1)", label: "Cancelled" },
  };

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-5 h-5 text-[var(--text-secondary)]" />
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[var(--border)] overflow-x-auto">
        {[
          { key: "practice", label: "Practice", icon: Settings },
          { key: "branding", label: "White-Label", icon: Palette },
          { key: "subscription", label: "Subscription", icon: CreditCard },
          { key: "compliance", label: "POPIA", icon: Shield },
          { key: "notifications", label: "Notifications", icon: Bell },
          { key: "integrations", label: "Integrations", icon: Link2 },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`flex items-center gap-2 pb-2 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${tab === t.key ? "border-[var(--gold)] text-[var(--gold)]" : "border-transparent text-[var(--text-secondary)]"}`}
          >
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Practice tab */}
      {tab === "practice" && (
        <form onSubmit={handleSubmit} className="rounded-xl glass-panel p-6 space-y-5">
          <h3 className="text-sm font-medium">Practice Profile</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Practice Name</label>
              <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Smile Dental" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Practice Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inputClass}>
                <option value="dental">Dental</option>
                <option value="radiology">Radiology</option>
                <option value="wellness">Wellness / Spa</option>
                <option value="physiotherapy">Physiotherapy</option>
                <option value="optometry">Optometry</option>
                <option value="general">General Practice</option>
                <option value="hospital">Hospital</option>
                <option value="specialist">Specialist</option>
                <option value="salon">Salon</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Address</label>
            <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="123 Main St, Sandton" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Phone</label>
              <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+27 11 000 0000" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Hours</label>
              <input type="text" value={form.hours} onChange={e => setForm({ ...form, hours: e.target.value })} placeholder="Mon-Fri 8:00-17:00" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">AI Personality</label>
            <select value={form.aiPersonality} onChange={e => setForm({ ...form, aiPersonality: e.target.value })} className={inputClass}>
              <option value="professional">Professional</option>
              <option value="friendly">Friendly & Warm</option>
              <option value="concise">Concise & Direct</option>
              <option value="empathetic">Empathetic & Caring</option>
            </select>
            <p className="text-xs text-[var(--text-secondary)]/50 mt-1">Controls the tone of AI-generated responses to patients</p>
          </div>
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2.5 bg-[var(--gold)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {hasPractice ? "Save Changes" : "Create Practice"}
          </button>
          {saved === "practice" && <p className="text-sm text-[var(--teal)]">Settings saved!</p>}
        </form>
      )}

      {/* White-Label Branding tab */}
      {tab === "branding" && (
        <form onSubmit={handleBrandingSave} className="rounded-xl glass-panel p-6 space-y-5">
          <div>
            <h3 className="text-sm font-medium">White-Label Branding</h3>
            <p className="text-xs text-[var(--text-tertiary)] mt-1">Customise how your practice appears to patients. Your branding is applied across all patient-facing communications.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Logo URL</label>
              <input type="url" value={branding.logoUrl} onChange={e => setBranding({ ...branding, logoUrl: e.target.value })} placeholder="https://yourpractice.co.za/logo.png" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Tagline</label>
              <input type="text" value={branding.tagline} onChange={e => setBranding({ ...branding, tagline: e.target.value })} placeholder="Your smile, our passion" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Primary Colour</label>
              <div className="flex items-center gap-3">
                <input type="color" value={branding.primaryColor} onChange={e => setBranding({ ...branding, primaryColor: e.target.value })} className="w-10 h-10 rounded-lg border border-[var(--border)] cursor-pointer" />
                <input type="text" value={branding.primaryColor} onChange={e => setBranding({ ...branding, primaryColor: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Secondary Colour</label>
              <div className="flex items-center gap-3">
                <input type="color" value={branding.secondaryColor} onChange={e => setBranding({ ...branding, secondaryColor: e.target.value })} className="w-10 h-10 rounded-lg border border-[var(--border)] cursor-pointer" />
                <input type="text" value={branding.secondaryColor} onChange={e => setBranding({ ...branding, secondaryColor: e.target.value })} className={inputClass} />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Subdomain</label>
            <div className="flex items-center gap-2">
              <input type="text" value={branding.subdomain} onChange={e => setBranding({ ...branding, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })} placeholder="smiledental" className={inputClass} />
              <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap">.healthops.co.za</span>
            </div>
          </div>
          {/* Preview */}
          <div className="rounded-lg p-4 border border-[var(--border)]" style={{ backgroundColor: `${branding.primaryColor}08` }}>
            <p className="text-[11px] text-[var(--text-tertiary)] mb-2 uppercase tracking-wider">Preview</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: branding.primaryColor }}>
                {branding.subdomain ? branding.subdomain[0]?.toUpperCase() : "S"}
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: branding.primaryColor }}>{form.name || "Practice Name"}</div>
                <div className="text-[11px] text-[var(--text-secondary)]">{branding.tagline || "Your tagline here"}</div>
              </div>
            </div>
          </div>
          <button type="submit" disabled={brandingLoading} className="flex items-center gap-2 px-6 py-2.5 bg-[var(--gold)] rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
            {brandingLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Palette className="w-4 h-4" />}
            Save Branding
          </button>
          {saved === "branding" && <p className="text-sm text-[var(--teal)]">Branding saved!</p>}
        </form>
      )}

      {/* Subscription tab */}
      {tab === "subscription" && (
        <div className="space-y-5">
          {saved === "subscription" && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20">
              <p className="text-[13px] text-[#10b981] font-medium">Subscription updated successfully!</p>
            </motion.div>
          )}

          {/* Current plan status */}
          {subscription && (
            <div className="rounded-xl glass-panel p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[var(--gold)]" />
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--ivory)]">Current Plan</h3>
                    <p className="text-[11px] text-[var(--text-tertiary)]">Manage your VisioHealth Ops subscription</p>
                  </div>
                </div>
                <span
                  className="text-[11px] font-medium px-3 py-1 rounded-full capitalize"
                  style={{
                    color: statusColors[subscription.status]?.color || "#999",
                    backgroundColor: statusColors[subscription.status]?.bg || "rgba(153,153,153,0.1)",
                  }}
                >
                  {statusColors[subscription.status]?.label || subscription.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-lg glass-panel text-center">
                  <div className="text-lg font-bold text-[var(--gold)] capitalize">{subscription.plan}</div>
                  <div className="text-[10px] text-[var(--text-tertiary)]">Current Plan</div>
                </div>
                <div className="p-3 rounded-lg glass-panel text-center">
                  <div className="text-lg font-bold text-[var(--ivory)]">R{subscription.amount.toLocaleString()}</div>
                  <div className="text-[10px] text-[var(--text-tertiary)]">Monthly</div>
                </div>
                <div className="p-3 rounded-lg glass-panel text-center">
                  <div className="text-lg font-bold text-[var(--ivory)]">
                    {subscription.nextPaymentDate
                      ? new Date(subscription.nextPaymentDate).toLocaleDateString("en-ZA", { month: "short", day: "numeric" })
                      : subscription.trialEndsAt
                        ? new Date(subscription.trialEndsAt).toLocaleDateString("en-ZA", { month: "short", day: "numeric" })
                        : "—"}
                  </div>
                  <div className="text-[10px] text-[var(--text-tertiary)]">
                    {subscription.nextPaymentDate ? "Next Payment" : subscription.trialEndsAt ? "Trial Ends" : "No Date"}
                  </div>
                </div>
              </div>
              {subscription.status === "active" && (
                <div className="mt-4 pt-3 border-t border-[var(--border)] flex justify-end">
                  <button
                    onClick={handleCancel}
                    disabled={cancelLoading}
                    className="text-[11px] text-[var(--text-tertiary)] hover:text-[#ef4444] transition-colors"
                  >
                    {cancelLoading ? "Cancelling..." : "Cancel subscription"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Plan selection */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--ivory)] mb-4">
              {subscription?.status === "active" ? "Change Plan" : "Choose a Plan"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PLANS.map((p, i) => {
                const isCurrent = plan === p.key && subscription?.status === "active";
                return (
                  <motion.div
                    key={p.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`relative rounded-xl glass-panel p-5 transition-all ${
                      p.popular ? "border-[var(--gold)]/30 shadow-[0_0_30px_rgba(212,175,55,0.05)]" : ""
                    } ${isCurrent ? "ring-1 ring-[#10b981]/40" : ""}`}
                  >
                    {p.popular && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[var(--gold)] text-[#050505] text-[9px] font-bold uppercase tracking-wider rounded-full">
                        Most Popular
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      <p.icon className="w-4 h-4 text-[var(--gold)]" />
                      <span className="text-[13px] font-semibold text-[var(--ivory)]">{p.name}</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-2xl font-bold text-[var(--ivory)]">{p.priceLabel}</span>
                      <span className="text-[11px] text-[var(--text-tertiary)]">/month</span>
                    </div>
                    <div className="space-y-2 mb-5">
                      {p.features.map(f => (
                        <div key={f} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--gold)]" />
                          <span className="text-[11px] text-[var(--text-secondary)]">{f}</span>
                        </div>
                      ))}
                    </div>
                    {isCurrent ? (
                      <div className="w-full py-2.5 text-center text-[12px] font-medium text-[#10b981] bg-[#10b981]/10 rounded-lg">
                        Current Plan
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSubscribe(p.key)}
                        disabled={!!subLoading}
                        className={`w-full py-2.5 rounded-lg text-[12px] font-medium transition-all ${
                          p.popular
                            ? "bg-[var(--gold)] text-[#050505] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                            : "border border-[var(--border)] text-[var(--ivory)] hover:border-[var(--gold)]/30 hover:text-[var(--gold)]"
                        } disabled:opacity-50`}
                      >
                        {subLoading === p.key ? (
                          <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                        ) : plan === p.key ? (
                          "Reactivate"
                        ) : (
                          <>
                            {subscription?.status === "active" ? "Switch to " : "Subscribe to "}{p.name}
                          </>
                        )}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Payment info */}
          <div className="rounded-xl glass-panel p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-[var(--text-tertiary)]" />
              <h3 className="text-[13px] font-medium text-[var(--ivory)]">Secure Payments</h3>
            </div>
            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
              All payments are processed securely through Paystack, South Africa&apos;s leading payment gateway.
              We never store your card details. You can pay via credit/debit card, EFT, or mobile money.
              All subscriptions include a 14-day free trial.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Powered by</span>
              <span className="text-[12px] font-semibold text-[var(--teal)]">Paystack</span>
              <a href="https://paystack.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[var(--text-tertiary)] hover:text-[var(--ivory)] flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Learn more
              </a>
            </div>
          </div>
        </div>
      )}

      {/* POPIA Compliance tab */}
      {tab === "compliance" && (
        <div className="space-y-5">
          <div className="rounded-xl glass-panel p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--gold)]" />
              <h3 className="text-sm font-medium">POPIA Compliance Status</h3>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
              VisioHealth Ops is designed to comply with the Protection of Personal Information Act (POPIA).
              Health data is classified as &quot;Special Personal Information&quot; under POPIA — the strictest category.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Audit logging", status: true, desc: "Every patient data access is logged" },
                { label: "Role-based access", status: true, desc: "Admin, doctor, nurse, receptionist roles" },
                { label: "Consent tracking", status: true, desc: "Digital consent records per patient" },
                { label: "Data encryption (transit)", status: true, desc: "TLS 1.2+ on all connections" },
                { label: "Breach notification", status: false, desc: "Coming: auto-notify Information Regulator" },
                { label: "Data export/deletion", status: false, desc: "Coming: patient data request workflow" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-2 p-3 rounded-lg glass-panel">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.status ? "bg-[var(--teal)]" : "bg-[var(--text-tertiary)]"}`} />
                  <div>
                    <div className="text-[12px] font-medium text-[var(--ivory)]">{item.label}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-[var(--gold)]/5 border border-[var(--gold)]/10">
              <p className="text-[11px] text-[var(--text-secondary)]">
                <strong className="text-[var(--gold)]">Data retention:</strong> Medical records are retained for a minimum of 5 years after the patient&apos;s last visit, per HPCSA guidelines. Patient data is stored in South Africa.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notifications tab */}
      {tab === "notifications" && (
        <div className="space-y-5">
          <div className="rounded-xl glass-panel p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[var(--gold)]" />
              <h3 className="text-sm font-medium">Notification Settings</h3>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)]">
              Configure automated reminders and patient communications.
            </p>
            <div className="space-y-3">
              {[
                { label: "Appointment reminders (48h before)", enabled: true, channel: "WhatsApp" },
                { label: "Appointment reminders (24h before)", enabled: true, channel: "WhatsApp" },
                { label: "Post-procedure follow-up (24h after)", enabled: true, channel: "WhatsApp" },
                { label: "Post-procedure follow-up (72h after)", enabled: false, channel: "WhatsApp" },
                { label: "Recall reminders (7 days before due)", enabled: true, channel: "WhatsApp + SMS" },
                { label: "Birthday wellness messages", enabled: false, channel: "WhatsApp" },
                { label: "Outstanding balance reminders", enabled: false, channel: "SMS" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg glass-panel">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-5 rounded-full relative cursor-pointer transition-colors ${item.enabled ? "bg-[var(--teal)]" : "bg-[var(--charcoal)]"}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${item.enabled ? "left-3.5" : "left-0.5"}`} />
                    </div>
                    <span className="text-[13px] text-[var(--ivory)]">{item.label}</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-tertiary)]">{item.channel}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[var(--text-tertiary)]">
              WhatsApp messages require WhatsApp Business API. SMS requires a configured SMS provider. These settings are saved per practice.
            </p>
          </div>
        </div>
      )}

      {/* Integrations tab */}
      {tab === "integrations" && (
        <div className="space-y-5">
          {(saved === "gmail" || saved === "accounting") && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20">
              <p className="text-[13px] text-[#10b981] font-medium">
                {saved === "gmail" ? "Gmail connected successfully!" : `${accountingProvider} connected successfully!`}
              </p>
            </motion.div>
          )}

          {/* Gmail */}
          <div className="rounded-xl glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--ivory)]">Gmail</h3>
                  <p className="text-[11px] text-[var(--text-tertiary)]">Sync patient emails into your dashboard</p>
                </div>
              </div>
              {gmailConnected ? (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full">Connected</span>
                  <button
                    onClick={async () => {
                      setDisconnecting("gmail");
                      // In real mode, call disconnect endpoint
                      setTimeout(() => { setGmailConnected(false); setDisconnecting(null); }, 1000);
                    }}
                    disabled={disconnecting === "gmail"}
                    className="text-[11px] text-[var(--text-tertiary)] hover:text-red-400 flex items-center gap-1"
                  >
                    {disconnecting === "gmail" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Unlink className="w-3 h-3" />}
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    setConnectingGmail(true);
                    try {
                      const res = await fetch("/api/gmail/connect");
                      const data = await res.json();
                      if (data.url && !data.url.includes("demo")) {
                        window.location.href = data.url;
                      } else {
                        setGmailConnected(true);
                        setSaved("gmail");
                        setTimeout(() => setSaved(""), 3000);
                      }
                    } catch { /* ignore */ }
                    setConnectingGmail(false);
                  }}
                  disabled={connectingGmail}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-[12px] font-medium text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                >
                  {connectingGmail ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                  Connect Gmail
                </button>
              )}
            </div>
            <div className="text-[11px] text-[var(--text-tertiary)] space-y-1">
              <p>• Read incoming patient emails and match to patient records</p>
              <p>• Send emails directly from the dashboard via your Gmail account</p>
              <p>• Track email conversations alongside WhatsApp messages</p>
            </div>
          </div>

          {/* Accounting Software */}
          <div className="rounded-xl glass-panel p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--ivory)]">Accounting Software</h3>
                <p className="text-[11px] text-[var(--text-tertiary)]">Sync invoices and payments to your accounting system</p>
              </div>
            </div>

            {accountingProvider ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full">Connected</span>
                  <span className="text-[13px] font-medium text-[var(--ivory)] capitalize">{accountingProvider}</span>
                </div>
                <button
                  onClick={() => {
                    setDisconnecting("accounting");
                    setTimeout(() => { setAccountingProvider(null); setDisconnecting(null); }, 1000);
                  }}
                  disabled={disconnecting === "accounting"}
                  className="text-[11px] text-[var(--text-tertiary)] hover:text-red-400 flex items-center gap-1"
                >
                  {disconnecting === "accounting" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Unlink className="w-3 h-3" />}
                  Disconnect
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "sage", name: "Sage", desc: "Sage Business Cloud", color: "#00DC82" },
                  { key: "quickbooks", name: "QuickBooks", desc: "Intuit QuickBooks Online", color: "#2CA01C" },
                  { key: "xero", name: "Xero", desc: "Xero Accounting", color: "#13B5EA" },
                ].map(provider => (
                  <button
                    key={provider.key}
                    onClick={async () => {
                      setConnectingAccounting(provider.key);
                      try {
                        const res = await fetch(`/api/accounting/connect?provider=${provider.key}`);
                        const data = await res.json();
                        if (data.url && !data.url.includes("demo")) {
                          window.location.href = data.url;
                        } else {
                          setAccountingProvider(provider.key);
                          setSaved("accounting");
                          setTimeout(() => setSaved(""), 3000);
                        }
                      } catch { /* ignore */ }
                      setConnectingAccounting(null);
                    }}
                    disabled={!!connectingAccounting}
                    className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all text-left"
                  >
                    <div className="text-[13px] font-semibold mb-1" style={{ color: provider.color }}>{provider.name}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">{provider.desc}</div>
                    <div className="mt-3">
                      {connectingAccounting === provider.key ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--text-tertiary)]" />
                      ) : (
                        <span className="text-[10px] text-[var(--gold)]">Connect →</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="text-[11px] text-[var(--text-tertiary)] space-y-1">
              <p>• Invoices and payments sync automatically to your accounting software</p>
              <p>• ICD-10 codes and medical aid claims included in sync</p>
              <p>• One-way sync — VisioHealth is the source of truth for clinical billing</p>
            </div>
          </div>

          {/* Invoice Export */}
          <div className="rounded-xl glass-panel p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--ivory)]">Invoice Export</h3>
                <p className="text-[11px] text-[var(--text-tertiary)]">Download invoices as PDF or export in bulk</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="/api/invoices/export?format=csv"
                className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-lg text-[12px] font-medium text-[var(--ivory)] hover:border-[var(--gold)]/30 hover:text-[var(--gold)] transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Export All (CSV)
              </a>
              <span className="text-[11px] text-[var(--text-tertiary)] self-center">Individual PDFs available on the Billing page</span>
            </div>
          </div>
        </div>
      )}

      {/* Account & Plan info */}
      <div className="rounded-xl glass-panel p-6 space-y-4">
        <h3 className="text-sm font-medium">Account</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Signed in as</p>
            <p className="text-sm text-[var(--ivory)] font-medium">{userName}</p>
          </div>
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Current Plan</p>
            <p className="text-sm text-[var(--gold)] font-medium capitalize">{plan}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
