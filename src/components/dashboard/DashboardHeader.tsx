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
    <header className="h-14 flex items-center justify-between px-6 border-b border-gray-200 shrink-0 bg-white">
      <div className="flex items-center gap-3">
        <h1 className="text-[15px] font-semibold text-gray-900">Dashboard</h1>
        {practiceName && (
          <span className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            {practiceName}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-900 placeholder:text-gray-400 w-48 transition-all focus:w-64 focus:border-gray-300 focus:outline-none"
          />
        </div>
        <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
        </button>
      </div>
    </header>
  );
}
