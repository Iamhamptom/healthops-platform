"use client";

import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  const [practiceName, setPracticeName] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user?.practice?.name) setPracticeName(d.user.practice.name);
      })
      .catch(() => {});
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--border)] shrink-0 bg-[var(--bg-dark)]">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        {practiceName && (
          <span className="text-xs text-[var(--text-secondary)] bg-white/5 px-3 py-1 rounded-full">
            {practiceName}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--text-secondary)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 bg-white/5 border border-[var(--border)] rounded-lg text-sm text-white placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--primary)]/40 w-48 transition-all focus:w-64"
          />
        </div>
        <button className="relative p-2 text-[var(--text-secondary)] hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--primary)]" />
        </button>
      </div>
    </header>
  );
}
