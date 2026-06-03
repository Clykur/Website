import Link from "next/link";
import type { SeoRelatedLink } from "@/lib/seo/types";

type RelatedLinksProps = {
  links: SeoRelatedLink[];
};

export function RelatedLinks({ links }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <aside
      className="mt-14 scroll-mt-24 rounded-2xl border border-foreground/[0.08] bg-white/80 p-6 md:mt-16 md:p-8"
      aria-labelledby="related-links-heading"
    >
      <h2
        id="related-links-heading"
        className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45"
      >
        Related pages
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group block rounded-lg border border-transparent px-1 py-1 transition-colors hover:border-foreground/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25"
            >
              <span className="text-[15px] font-semibold text-foreground group-hover:text-[#ff3b1f]">
                {link.label}
              </span>
              {link.description ? (
                <p className="mt-1 text-[14px] leading-relaxed text-foreground/55">
                  {link.description}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
