import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VisioHealth Ops — AI-Powered Healthcare Operations",
  description: "WhatsApp AI front desk, booking automation, and patient ops for dentists, radiology, and wellness practices.",
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
