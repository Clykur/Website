import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Careers",
  description:
    "Join Clykur in building the next generation of software products. Product engineering roles, startup culture, ownership, and remote-first positions.",
  path: "/careers",
});

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
