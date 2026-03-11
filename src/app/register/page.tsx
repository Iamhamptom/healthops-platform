"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex">
      {/* Left panel — dark emerald gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-900 to-green-700 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-3xl font-light text-white tracking-tight">
              Visio<span className="text-green-300">.</span>Health
            </span>
            <p className="mt-4 text-green-100/70 text-sm font-light max-w-xs mx-auto leading-relaxed">
              AI-powered healthcare operations platform. Manage your practice with intelligence.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              <span className="text-green-200/50 text-xs font-mono uppercase tracking-widest">System Online</span>
            </div>
          </motion.div>
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
            <Link href="/" className="inline-block mb-4">
              <span className="text-base font-light text-gray-900 tracking-tight">
                Visio<span className="text-green-600">.</span>Health
              </span>
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-2">Create your account</h1>
            <p className="text-sm text-gray-500 font-light">Get started in under 2 minutes</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-mono">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs text-gray-500 font-medium uppercase tracking-[0.1em] mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/10 transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 font-medium uppercase tracking-[0.1em] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/10 transition-all duration-300"
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
                minLength={6}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/10 transition-all duration-300"
                placeholder="Min 6 characters"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 mt-2 bg-green-600 text-white font-medium text-sm rounded-full hover:bg-green-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              Create Account
            </motion.button>

            <p className="text-center text-xs text-gray-400 pt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:text-green-700 transition-colors duration-300">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
