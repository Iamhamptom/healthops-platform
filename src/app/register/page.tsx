"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeartPulse, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      router.push("/dashboard/settings");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-[var(--gold)] rounded-full blur-[250px] opacity-[0.03]" />
      </div>

      {/* Roman corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[var(--gold)]/20 hidden md:block" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-[var(--gold)]/20 hidden md:block" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-[var(--gold)]/20 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[var(--gold)]/20 hidden md:block" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
            <HeartPulse className="w-7 h-7 text-[var(--gold)]" />
            <span className="font-serif text-lg font-semibold tracking-wide text-[var(--ivory)]">
              VISIOHEALTH
            </span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[var(--ivory)] mb-2">Create Your Account</h1>
          <p className="text-[13px] text-[var(--text-secondary)]">Get started in under 2 minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel-strong rounded-xl p-8 space-y-6 roman-border">
          {error && (
            <div className="p-3 rounded-lg bg-[var(--crimson)]/10 border border-[var(--crimson)]/20 text-[var(--crimson)] text-[13px]">
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-underline"
              placeholder="Your Name"
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-underline"
              placeholder="Email Address"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="input-underline"
              placeholder="Password (min 6 characters)"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3.5 bg-[var(--gold)] text-[var(--obsidian)] font-serif font-semibold text-[13px] uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Create Account
          </motion.button>

          <p className="text-center text-[13px] text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--gold)] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
