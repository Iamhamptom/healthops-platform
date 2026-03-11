import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Built by Visio Research Labs — a South African AI research company making healthcare accessible across Africa.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
