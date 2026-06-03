import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sentry example",
  description: "Internal Sentry test page for Clykur Next.js monitoring.",
  robots: { index: false, follow: false },
};

export default function SentryExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
