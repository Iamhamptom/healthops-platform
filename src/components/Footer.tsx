"use client";

import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Verticals: [
    { label: "Dentists", href: "/how-it-works/dental" },
    { label: "Radiology", href: "/how-it-works/radiology" },
    { label: "Wellness", href: "/how-it-works/wellness" },
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
    <footer className="border-t border-white/[0.04] py-16 bg-[#030F07]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-[16px] font-semibold text-white">
                VisioHealth
              </span>
            </Link>
            <p className="text-[13px] text-white/30 leading-relaxed">
              AI-powered patient operations for healthcare practices in South Africa.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[12px] font-semibold text-white/30 mb-4 uppercase tracking-wider font-mono">{category}</h4>
              <div className="space-y-2.5">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-[13px] text-white/40 hover:text-[#34D399] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-white/[0.04] mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/20 font-mono">
            &copy; {new Date().getFullYear()} VisioHealth Ops by Visio Research Labs
          </p>
          <p className="text-[12px] text-white/20 font-mono">
            Powered by Visio Research Labs
          </p>
        </div>
      </div>
    </footer>
  );
}
