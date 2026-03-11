"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#030710] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6EE7B7] rounded-full blur-[350px] opacity-[0.03] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md z-10"
      >
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-10">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-8">
              <span className="text-base font-light text-white tracking-tight">
                Visio<span className="text-[#6EE7B7]">.</span>Health
              </span>
            </Link>
            <h1 className="text-2xl font-light text-white tracking-tight mb-2">Welcome back</h1>
            <p className="text-sm text-white/30 font-light">Sign in to your practice dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/[0.06] border border-red-500/20 text-red-400 text-xs font-mono">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs text-white/30 font-mono uppercase tracking-[0.15em] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm font-mono placeholder:text-white/20 focus:border-white/20 focus:outline-none transition-colors duration-300"
                placeholder="you@practice.co.za"
              />
            </div>

            <div>
              <label className="block text-xs text-white/30 font-mono uppercase tracking-[0.15em] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm font-mono placeholder:text-white/20 focus:border-white/20 focus:outline-none transition-colors duration-300"
                placeholder="Enter password"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 mt-2 border border-white/15 text-white font-mono text-sm rounded-full hover:border-white/25 hover:shadow-[0_0_40px_rgba(110,231,183,0.08)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              Sign In
            </motion.button>

            <p className="text-center text-xs text-white/30 pt-2">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-white/50 hover:text-white transition-colors duration-300">
                Get started
              </Link>
            </p>
          </form>
        </div>

        <p className="text-center text-[11px] text-white/20 mt-6 font-mono">
          Demo: demo@smiledental.co.za / demo1234
        </p>
      </motion.div>
    </div>
  );
}
