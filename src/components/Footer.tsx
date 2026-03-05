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
    <footer className="border-t border-[var(--border)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <HeartPulse className="w-6 h-6 text-[var(--primary-light)]" />
              <span className="font-semibold tracking-tight">
                <span className="text-[var(--primary-light)]">Visio</span><span className="text-[var(--accent)]">Health</span> <span className="font-normal text-[var(--text-secondary)]">Ops</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              AI-powered patient operations for healthcare practices in South Africa.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-medium mb-3">{category}</h4>
              <div className="space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-secondary)]">
            &copy; {new Date().getFullYear()} VisioHealth Ops by Visio Research Labs. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            Powered by Afrika World &times; Visio Research Labs
          </p>
        </div>
      </div>
    </footer>
  );
}
