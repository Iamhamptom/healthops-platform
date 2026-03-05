"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeartPulse, Loader2 } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-secondary)]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <HeartPulse className="w-7 h-7 text-[var(--primary)]" />
            <span className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
              VisioHealth <span className="font-normal text-[var(--text-secondary)]">Ops</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Welcome back</h1>
          <p className="text-[13px] text-[var(--text-secondary)]">Sign in to your practice dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[var(--border-light)] p-7 shadow-sm space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[13px]">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-xl text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all"
              placeholder="you@practice.com"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[var(--text-primary)] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-xl text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] rounded-xl text-[14px] font-medium text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign In
          </button>

          <p className="text-center text-[13px] text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[var(--primary)] font-medium hover:underline">
              Get started
            </Link>
          </p>
        </form>

        <p className="text-center text-[11px] text-[var(--text-tertiary)] mt-5">
          Demo: demo@smiledental.co.za / demo1234
        </p>
      </div>
    </div>
  );
}
