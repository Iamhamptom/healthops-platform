"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export default function StatCard({ label, value, change, trend, icon: Icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-5 rounded-2xl bg-white border border-[var(--border-light)] hover:shadow-md hover:shadow-black/[0.03] transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        {change && trend && (
          <div className={`flex items-center gap-1 text-[11px] font-semibold ${trend === "up" ? "text-[var(--accent)]" : "text-red-500"}`}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">{value}</div>
      <div className="text-[12px] text-[var(--text-secondary)]">{label}</div>
    </motion.div>
  );
}
