import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers - Clykur",
  description:
    "Join Clykur. Open roles in engineering and more. Build smart, scalable software with us. Full-time remote positions.",
};

export default function CareersLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
