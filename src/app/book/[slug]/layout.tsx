import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment — VisioHealth OS",
  description: "Book your healthcare appointment online. Select a service, pick a date and time, and receive instant WhatsApp confirmation. Powered by VisioHealth OS practice management.",
  openGraph: {
    title: "Book an Appointment — VisioHealth OS",
    description: "Book your healthcare appointment online with instant WhatsApp confirmation. Powered by VisioHealth OS.",
    type: "website",
    locale: "en_ZA",
  },
  robots: { index: true, follow: true },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
