"use client";

import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-light)] flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[var(--text-tertiary)]" />
      </div>
      <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-[13px] text-[var(--text-secondary)] max-w-xs">{description}</p>
    </div>
  );
}
