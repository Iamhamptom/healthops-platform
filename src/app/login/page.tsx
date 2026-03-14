"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Bot, CalendarCheck, HeartPulse } from "lucide-react";

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

      // Route based on role
      if (data.user?.role === "investor") {
        router.push("/investor");
      } else if (data.user?.role === "platform_admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — emerald brand panel */}
      <div className="hidden lg:flex lg:w-[480px] bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 relative overflow-hidden flex-col justify-between p-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <HeartPulse className="w-5 h-5 text-emerald-300" />
            <span className="text-lg font-semibold text-white tracking-tight">
              VisioHealth
            </span>
          </div>
          <span className="text-emerald-300/50 text-[11px] font-mono uppercase tracking-widest">Operations Platform</span>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-2xl font-semibold text-white leading-snug">
            Your practice,<br />running itself.
          </h2>
          <p className="text-emerald-100/60 text-sm leading-relaxed max-w-xs">
            AI agents handle triage, bookings, follow-ups, and billing — so you can focus on patients.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { icon: Bot, text: "AI triage & patient intake" },
              { icon: CalendarCheck, text: "Smart booking & reminders" },
              { icon: Shield, text: "POPIA-compliant from day one" },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-emerald-300" />
                </div>
                <span className="text-emerald-100/80 text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-200/40 text-xs font-mono uppercase tracking-widest">System Online</span>
        </div>
      </div>

      {/* Right panel — white form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="text-center mb-10 lg:hidden">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HeartPulse className="w-5 h-5 text-emerald-600" />
              <span className="text-base font-semibold text-gray-900 tracking-tight">VisioHealth</span>
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-2">Welcome back</h1>
            <p className="text-sm text-gray-500">Sign in to your practice dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs text-gray-500 font-medium uppercase tracking-[0.1em] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all"
                placeholder="you@practice.co.za"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 font-medium uppercase tracking-[0.1em] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all"
                placeholder="Enter password"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 mt-2 bg-emerald-600 text-white font-medium text-sm rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              Sign In
            </motion.button>

            <p className="text-center text-xs text-gray-400 pt-2">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-emerald-600 hover:text-emerald-700 transition-colors">
                Get started free
              </Link>
            </p>
          </form>

          {/* Trust bar */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center gap-6 text-gray-300">
              <div className="flex items-center gap-1.5 text-[11px]">
                <Shield className="w-3.5 h-3.5" />
                <span>POPIA Compliant</span>
              </div>
              <div className="w-px h-3 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-[11px]">
                <Bot className="w-3.5 h-3.5" />
                <span>AI-Powered</span>
              </div>
              <div className="w-px h-3 bg-gray-200" />
              <span className="text-[11px]">256-bit SSL</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-300 mt-6 font-mono">
            Demo: demo@smiledental.co.za / demo1234
          </p>
        </motion.div>
      </div>
    </div>
  );
}
