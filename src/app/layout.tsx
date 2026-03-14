import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VisioHealth OS — AI-Powered Healthcare Practice Management | South Africa",
    template: "%s | VisioHealth",
  },
  description: "Practice management software for South African doctors. AI triage, ICD-10 billing, POPIA compliance, WhatsApp reminders. Built for ENT, dental, GP, and specialist practices.",
  keywords: ["visiohealth", "practice management", "south africa", "healthcare software", "AI healthcare", "ICD-10", "POPIA", "medical billing", "ENT", "doctor software", "dental software", "GP practice management", "WhatsApp healthcare", "patient booking"],
  authors: [{ name: "Visio Research Labs" }],
  creator: "Visio Research Labs",
  metadataBase: new URL("https://healthops-platform.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://healthops-platform.vercel.app",
    siteName: "VisioHealth OS",
    title: "VisioHealth OS — AI-Powered Healthcare Practice Management | South Africa",
    description: "Practice management software for South African doctors. AI triage, ICD-10 billing, POPIA compliance, WhatsApp reminders. Built for ENT, dental, GP, and specialist practices.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "VisioHealth OS — AI Healthcare Practice Management" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VisioHealth OS — AI-Powered Healthcare Practice Management",
    description: "Practice management software for South African doctors. AI triage, ICD-10 billing, POPIA compliance, WhatsApp reminders.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FAFAF8] text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
