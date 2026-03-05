"use client";

import Link from "next/link";
import { HeartPulse } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Verticals: [
    { label: "Dentists", href: "/features" },
    { label: "Radiology", href: "/features" },
    { label: "Wellness & Spas", href: "/features" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "#" },
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
    <footer className="border-t border-white/5 py-16 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <HeartPulse className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-serif text-sm tracking-[0.2em] text-[#FDFCF0] uppercase">
                VisioHealth
              </span>
            </Link>
            <p className="text-[#FDFCF0]/30 text-xs tracking-wide leading-relaxed">
              AI-powered patient operations for healthcare practices in South Africa.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[#D4AF37]/40 text-[10px] font-bold mb-4 uppercase tracking-[0.3em]">{category}</h4>
              <div className="space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-xs text-[#FDFCF0]/40 hover:text-[#D4AF37] transition-colors duration-300 tracking-wide"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#FDFCF0]/20 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} VisioHealth Ops by Visio Research Labs
          </p>
          <p className="text-[10px] text-[#FDFCF0]/20 uppercase tracking-widest">
            Powered by Afrika World &times; Visio Research Labs
          </p>
        </div>
      </div>
    </footer>
  );
}
