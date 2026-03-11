"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Search, Users, Calendar, DollarSign, ExternalLink } from "lucide-react";

interface Practice {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  primaryColor: string;
  subdomain: string;
  plan: string;
  planStatus: string;
  createdAt: string;
  _stats?: { patients: number; bookingsThisMonth: number; revenue: number; mrr: number };
  _count?: { patients: number; bookings: number; users: number };
}

const planBadge: Record<string, { color: string; bg: string }> = {
  starter: { color: "#E8C84A", bg: "rgba(232,200,74,0.1)" },
  professional: { color: "#2DD4BF", bg: "rgba(45,212,191,0.1)" },
  enterprise: { color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
};

const statusBadge: Record<string, { color: string; bg: string }> = {
  active: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  trial: { color: "#E8C84A", bg: "rgba(232,200,74,0.1)" },
  past_due: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  cancelled: { color: "#8A0303", bg: "rgba(138,3,3,0.1)" },
};

export default function AdminPracticesPage() {
  const [practices, setPractices] = useState<Practice[]>([]);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");

  useEffect(() => {
    fetch("/api/admin/practices").then(r => r.json()).then(d => setPractices(d.practices || []));
  }, []);

  const filtered = practices.filter(p => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = filterPlan === "all" || p.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-[#ef4444]" />
          <h2 className="text-lg font-semibold">All Practices</h2>
          <span className="text-[13px] text-[var(--text-tertiary)]">{practices.length} total</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search practices..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[var(--charcoal)]/20 border border-[var(--border)] rounded-lg text-[13px] text-[var(--ivory)] focus:outline-none focus:border-[#ef4444]/30"
          />
        </div>
        <select
          value={filterPlan}
          onChange={e => setFilterPlan(e.target.value)}
          className="px-3 py-2 bg-[var(--charcoal)]/20 border border-[var(--border)] rounded-lg text-[13px] text-[var(--ivory)] focus:outline-none"
        >
          <option value="all">All Plans</option>
          <option value="starter">Starter</option>
          <option value="professional">Professional</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>

      {/* Practice cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((p, i) => {
          const stats = p._stats || { patients: p._count?.patients ?? 0, bookingsThisMonth: p._count?.bookings ?? 0, revenue: 0, mrr: 0 };
          const pb = planBadge[p.plan] || planBadge.starter;
          const sb = statusBadge[p.planStatus] || statusBadge.active;

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl glass-panel p-5 hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[12px] font-bold"
                    style={{ backgroundColor: p.primaryColor || "#D4AF37" }}
                  >
                    {p.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[var(--ivory)]">{p.name}</div>
                    <div className="text-[11px] text-[var(--text-tertiary)] capitalize">{p.type} · {p.address}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] font-medium px-2 py-1 rounded-full capitalize" style={{ color: pb.color, backgroundColor: pb.bg }}>
                    {p.plan}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-1 rounded-full capitalize" style={{ color: sb.color, backgroundColor: sb.bg }}>
                    {p.planStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="p-2 rounded-lg glass-panel text-center">
                  <Users className="w-3.5 h-3.5 mx-auto text-[var(--text-tertiary)] mb-1" />
                  <div className="text-[14px] font-bold text-[var(--ivory)]">{stats.patients}</div>
                  <div className="text-[9px] text-[var(--text-tertiary)]">Patients</div>
                </div>
                <div className="p-2 rounded-lg glass-panel text-center">
                  <Calendar className="w-3.5 h-3.5 mx-auto text-[var(--text-tertiary)] mb-1" />
                  <div className="text-[14px] font-bold text-[var(--ivory)]">{stats.bookingsThisMonth}</div>
                  <div className="text-[9px] text-[var(--text-tertiary)]">Bookings/mo</div>
                </div>
                <div className="p-2 rounded-lg glass-panel text-center">
                  <DollarSign className="w-3.5 h-3.5 mx-auto text-[var(--text-tertiary)] mb-1" />
                  <div className="text-[14px] font-bold text-[var(--ivory)]">R{(stats.revenue / 1000).toFixed(0)}k</div>
                  <div className="text-[9px] text-[var(--text-tertiary)]">Revenue</div>
                </div>
                <div className="p-2 rounded-lg glass-panel text-center">
                  <DollarSign className="w-3.5 h-3.5 mx-auto text-[#10b981] mb-1" />
                  <div className="text-[14px] font-bold text-[#10b981]">R{stats.mrr}</div>
                  <div className="text-[9px] text-[var(--text-tertiary)]">MRR</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--border)]">
                <div className="text-[10px] text-[var(--text-tertiary)]">
                  Joined {new Date(p.createdAt).toLocaleDateString("en-ZA", { month: "short", day: "numeric", year: "numeric" })}
                  {p.subdomain && <> · <span className="text-[var(--text-secondary)]">{p.subdomain}.healthops.co.za</span></>}
                </div>
                <button className="text-[11px] text-[#ef4444] hover:underline flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" /> Manage
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
