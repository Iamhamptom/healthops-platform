"use client";

import { useEffect, useState } from "react";
import { Settings, Loader2, Save } from "lucide-react";

interface PracticeForm {
  name: string;
  type: string;
  address: string;
  phone: string;
  hours: string;
  aiPersonality: string;
}

export default function SettingsPage() {
  const [form, setForm] = useState<PracticeForm>({
    name: "",
    type: "dental",
    address: "",
    phone: "",
    hours: "",
    aiPersonality: "professional",
  });
  const [hasPractice, setHasPractice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUserName(data.user.name);
          if (data.user.practice) {
            setHasPractice(true);
            setForm({
              name: data.user.practice.name,
              type: data.user.practice.type,
              address: data.user.practice.address,
              phone: data.user.practice.phone,
              hours: data.user.practice.hours,
              aiPersonality: data.user.practice.aiPersonality,
            });
          }
        }
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    await fetch("/api/practice", {
      method: hasPractice ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setHasPractice(true);
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-5 h-5 text-[var(--text-secondary)]" />
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>

      {/* Practice profile */}
      <form onSubmit={handleSubmit} className="rounded-xl glass-panel p-6 space-y-5">
        <h3 className="text-sm font-medium">Practice Profile</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Practice Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Smile Dental"
              className="w-full px-3 py-2 bg-[var(--charcoal)]/20 border border-[var(--border)] rounded-lg text-sm text-[var(--ivory)] focus:outline-none focus:border-[var(--primary)]/40"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Practice Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-3 py-2 bg-[var(--charcoal)]/20 border border-[var(--border)] rounded-lg text-sm text-[var(--ivory)] focus:outline-none focus:border-[var(--primary)]/40"
            >
              <option value="dental">Dental</option>
              <option value="radiology">Radiology</option>
              <option value="wellness">Wellness</option>
              <option value="physiotherapy">Physiotherapy</option>
              <option value="optometry">Optometry</option>
              <option value="general">General Practice</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-1">Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="123 Main St, Sandton"
            className="w-full px-3 py-2 bg-[var(--charcoal)]/20 border border-[var(--border)] rounded-lg text-sm text-[var(--ivory)] focus:outline-none focus:border-[var(--primary)]/40"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+27 11 000 0000"
              className="w-full px-3 py-2 bg-[var(--charcoal)]/20 border border-[var(--border)] rounded-lg text-sm text-[var(--ivory)] focus:outline-none focus:border-[var(--primary)]/40"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Hours</label>
            <input
              type="text"
              value={form.hours}
              onChange={(e) => setForm({ ...form, hours: e.target.value })}
              placeholder="Mon-Fri 8:00-17:00"
              className="w-full px-3 py-2 bg-[var(--charcoal)]/20 border border-[var(--border)] rounded-lg text-sm text-[var(--ivory)] focus:outline-none focus:border-[var(--primary)]/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-1">AI Personality</label>
          <select
            value={form.aiPersonality}
            onChange={(e) => setForm({ ...form, aiPersonality: e.target.value })}
            className="w-full px-3 py-2 bg-[var(--charcoal)]/20 border border-[var(--border)] rounded-lg text-sm text-[var(--ivory)] focus:outline-none focus:border-[var(--primary)]/40"
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly & Warm</option>
            <option value="concise">Concise & Direct</option>
            <option value="empathetic">Empathetic & Caring</option>
          </select>
          <p className="text-xs text-[var(--text-secondary)]/50 mt-1">Controls the tone of AI-generated responses to patients</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-[var(--gold)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {hasPractice ? "Save Changes" : "Create Practice"}
        </button>

        {saved && <p className="text-sm text-[var(--teal)]">Settings saved successfully!</p>}
      </form>

      {/* Account info */}
      <div className="rounded-xl glass-panel p-6">
        <h3 className="text-sm font-medium mb-3">Account</h3>
        <p className="text-sm text-[var(--text-secondary)]">Signed in as <span className="text-[var(--ivory)]">{userName}</span></p>
      </div>
    </div>
  );
}
