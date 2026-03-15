import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Clykur in building the next generation of software products. Product engineering roles, startup culture, ownership, and remote-first positions.",
  openGraph: {
    title: "Careers | Clykur - Build products that power modern businesses",
    description:
      "Join us in building software products and engineering partnerships. Remote-first, product-focused roles.",
    url: `${SITE_URL}/careers`,
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
