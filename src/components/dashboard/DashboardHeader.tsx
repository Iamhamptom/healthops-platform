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
    <header className="h-14 flex items-center justify-between px-6 border-b border-[var(--border)] shrink-0 bg-[var(--obsidian)]/80 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <h1 className="text-[15px] font-semibold text-[var(--ivory)]">Dashboard</h1>
        {practiceName && (
          <span className="text-[11px] text-[var(--gold)]/60 glass-panel px-2.5 py-1 rounded-full">
            {practiceName}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-1.5 bg-[var(--charcoal)]/50 border border-[var(--border)] rounded-lg text-[13px] text-[var(--ivory)] placeholder:text-[var(--text-tertiary)] w-48 transition-all focus:w-64"
          />
        </div>
        <button className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--gold)]" />
        </button>
      </div>
    </header>
  );
}
