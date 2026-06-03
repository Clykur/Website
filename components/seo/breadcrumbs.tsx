import Link from "next/link";
import type { SeoBreadcrumbItem } from "@/lib/seo/types";

type BreadcrumbsProps = {
  items: SeoBreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 md:mb-10">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-medium uppercase tracking-[0.16em] text-foreground/45">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden className="text-foreground/25">
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current="page" className="text-foreground/70">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#ff3b1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25 rounded-sm"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
