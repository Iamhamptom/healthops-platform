"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg grid-pattern">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
            <HeartPulse className="w-8 h-8 text-[var(--primary-light)]" />
            <span className="text-xl font-semibold tracking-tight">
              <span className="text-[var(--primary-light)]">Visio</span><span className="text-[var(--accent)]">Health</span> <span className="font-normal text-[var(--text-secondary)]">Ops</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Start your free trial</h1>
          <p className="text-sm text-[var(--text-secondary)]">Set up your practice in under 2 minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-[var(--border)] rounded-xl text-white placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
              placeholder="Dr. Smith"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-[var(--border)] rounded-xl text-white placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
              placeholder="you@practice.com"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white/5 border border-[var(--border)] rounded-xl text-white placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
              placeholder="Min 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] rounded-xl font-medium text-white shadow-lg shadow-[var(--primary)]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Create Account
          </button>

          <p className="text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--primary)] hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
