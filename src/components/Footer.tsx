"use client";

import Link from "next/link";
import { HeartPulse } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "API", href: "#" },
  ],
  Verticals: [
    { label: "Dentists", href: "/features" },
    { label: "Radiology", href: "/features" },
    { label: "Wellness & Spas", href: "/features" },
    { label: "Hospitals", href: "/features" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/about" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "POPIA", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-light)] py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <HeartPulse className="w-5 h-5 text-[var(--primary)]" />
              <span className="text-[14px] font-semibold tracking-tight text-[var(--text-primary)]">
                VisioHealth <span className="font-normal text-[var(--text-secondary)]">Ops</span>
              </span>
            </Link>
            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
              AI-powered patient operations for healthcare practices in South Africa.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[12px] font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wider">{category}</h4>
              <div className="space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="divider-shine mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[var(--text-tertiary)]">
            &copy; {new Date().getFullYear()} VisioHealth Ops by Visio Research Labs. All rights reserved.
          </p>
          <p className="text-[11px] text-[var(--text-tertiary)]">
            Powered by Afrika World &times; Visio Research Labs
          </p>
        </div>
      </div>
    </footer>
  );
}
