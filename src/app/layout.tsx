import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VisioHealth — Autonomous AI Practice Operations",
    template: "%s | VisioHealth",
  },
  description: "VisioHealth is a fully autonomous AI system that finds new patients, fills your calendar, and manages your entire practice. Signal lead gen, automated outreach, smart booking, and more.",
  keywords: ["healthcare AI", "practice management", "patient acquisition", "booking automation", "South Africa healthcare", "medical practice software", "AI lead generation", "healthcare operations"],
  authors: [{ name: "Visio Research Labs" }],
  creator: "Visio Research Labs",
  metadataBase: new URL("https://healthops-platform.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://healthops-platform.vercel.app",
    siteName: "VisioHealth",
    title: "VisioHealth — Autonomous AI Practice Operations",
    description: "Find patients. Fill calendars. Run your practice on autopilot. Built for African healthcare by Visio Research Labs.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "VisioHealth — AI Healthcare OS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VisioHealth — Autonomous AI Practice Operations",
    description: "Find patients. Fill calendars. Run your practice on autopilot.",
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
