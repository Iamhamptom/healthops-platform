import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VisioHealth Ops — AI-Powered Healthcare Operations",
  description: "WhatsApp AI front desk, booking automation, and patient ops for dentists, radiology, and wellness practices.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#050505] text-[#FDFCF0]">
        {children}
      </body>
    </html>
  );
}
