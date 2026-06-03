/** Official Clykur profiles (single source for site, chat, schema, footer). */

export type ClykurSocialLink = {
  id: string;
  label: string;
  href: string;
};

export const CLYKUR_SOCIAL_LINKS: ClykurSocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/clykur",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/clykur",
  },
  {
    id: "clutch",
    label: "Clutch",
    href: "https://clutch.co/profile/clykur",
  },
  {
    id: "producthunt",
    label: "Product Hunt",
    href: "https://www.producthunt.com/products/clykur",
  },
  {
    id: "devto",
    label: "Dev.to",
    href: "https://dev.to/clykur",
  },
  {
    id: "hashnode",
    label: "Hashnode",
    href: "https://hashnode.com/@clykur",
  },
];

export function getSocialUrlsForSchema(): string[] {
  return CLYKUR_SOCIAL_LINKS.map((s) => s.href);
}

export function formatSocialLinksMarkdown(): string {
  return CLYKUR_SOCIAL_LINKS.map((s) => `• [${s.label}](${s.href})`).join("\n");
}

/** Footer / inline: text links, no underline. */
export const footerSocialLinkClassName =
  "inline-block min-h-[44px] py-1 text-[13px] leading-relaxed text-foreground/65 no-underline decoration-transparent transition-colors duration-300 hover:text-[#ff3b1f] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f6] rounded-sm";
