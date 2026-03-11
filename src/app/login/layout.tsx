import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your VisioHealth dashboard.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
