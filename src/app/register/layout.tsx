import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Create your VisioHealth account and start growing your practice with AI.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
