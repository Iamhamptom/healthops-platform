"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Users, CalendarCheck, DollarSign,
  TrendingUp, Activity, ArrowUpRight, Clock,
} from "lucide-react";
import Link from "next/link";

interface Overview {
  totalPractices: number;
  activePractices: number;
  trialPractices: number;
  totalPatients: number;
  totalBookings: number;
  totalRevenue: number;
  totalMRR: number;
}

interface RecentSignup {
  id: string;
  name: string;
  type: string;
  plan: string;
  planStatus: string;
  createdAt: string;
}

export default function AdminOverviewPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [byPlan, setByPlan] = useState<Record<string, number>>({});
  const [byType, setByType] = useState<Record<string, number>>({});
  const [recentSignups, setRecentSignups] = useState<RecentSignup[]>([]);

  useEffect(() => {
    fetch("/api/admin/analytics").then(r => r.json()).then(d => {
      setOverview(d.overview || null);
      setByPlan(d.byPlan || {});
      setByType(d.byType || {});
      setRecentSignups(d.recentSignups || []);
    });
  }, []);

  const planColors: Record<string, string> = {
    starter: "#E8C84A",
    professional: "#2DD4BF",
    enterprise: "#8B5CF6",
  };

  const statusColors: Record<string, string> = {
    active: "#10b981",
    trial: "#E8C84A",
    past_due: "#ef4444",
    cancelled: "#8A0303",
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--ivory)]">Platform Overview</h1>
        <p className="text-[13px] text-[var(--text-tertiary)] mt-1">All practices, revenue, and usage across VisioHealth Ops</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AdminKPI icon={Building2} label="Total Practices" value={overview?.totalPractices ?? 0} color="#D4AF37" />
        <AdminKPI icon={Users} label="Total Patients" value={overview?.totalPatients ?? 0} color="#2DD4BF" />
        <AdminKPI icon={DollarSign} label="Platform MRR" value={`R${(overview?.totalMRR ?? 0).toLocaleString()}`} color="#10b981" />
        <AdminKPI icon={TrendingUp} label="Total Revenue" value={`R${(overview?.totalRevenue ?? 0).toLocaleString()}`} color="#8B5CF6" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AdminKPI icon={Activity} label="Active Practices" value={overview?.activePractices ?? 0} color="#10b981" />
        <AdminKPI icon={Clock} label="On Trial" value={overview?.trialPractices ?? 0} color="#E8C84A" />
        <AdminKPI icon={CalendarCheck} label="Total Bookings" value={overview?.totalBookings ?? 0} color="#D4AF37" />
        <AdminKPI icon={ArrowUpRight} label="Avg Revenue/Practice" value={`R${overview && overview.totalPractices > 0 ? Math.round(overview.totalRevenue / overview.totalPractices).toLocaleString() : 0}`} color="#0ea5e9" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* By Plan */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl glass-panel p-5">
          <h3 className="text-[13px] font-semibold text-[var(--ivory)] mb-4">By Plan</h3>
          <div className="space-y-3">
            {Object.entries(byPlan).map(([plan, count]) => (
              <div key={plan} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: planColors[plan] || "#999" }} />
                  <span className="text-[13px] text-[var(--text-secondary)] capitalize">{plan}</span>
                </div>
                <span className="text-[14px] font-semibold text-[var(--ivory)]">{count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* By Type */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl glass-panel p-5">
          <h3 className="text-[13px] font-semibold text-[var(--ivory)] mb-4">By Practice Type</h3>
          <div className="space-y-3">
            {Object.entries(byType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-[13px] text-[var(--text-secondary)] capitalize">{type}</span>
                <span className="text-[14px] font-semibold text-[var(--ivory)]">{count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Signups */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-semibold text-[var(--ivory)]">Recent Signups</h3>
            <Link href="/admin/practices" className="text-[11px] text-[var(--gold)] hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentSignups.map(p => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center text-[10px] font-bold text-[var(--gold)]">
                  {p.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-[var(--ivory)] truncate">{p.name}</div>
                  <div className="text-[10px] text-[var(--text-tertiary)] capitalize">{p.type} · {p.plan}</div>
                </div>
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full" style={{ color: statusColors[p.planStatus] || "#999", backgroundColor: `${statusColors[p.planStatus] || "#999"}15` }}>
                  {p.planStatus}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AdminKPI({ icon: Icon, label, value, color }: { icon: typeof Building2; label: string; value: number | string; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl glass-panel p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <div className="text-xl font-bold text-[var(--ivory)]">{value}</div>
      <div className="text-[11px] text-[var(--text-tertiary)]">{label}</div>
    </motion.div>
  );
}
