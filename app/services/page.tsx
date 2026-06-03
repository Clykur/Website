import Link from "next/link";
import { HubPageView } from "@/components/seo/hub-page";
import {
  storySectionH2Class,
  storySurfaceCardClass,
} from "@/components/layout/story-page-shell";
import { SERVICES_HUB, SERVICE_INDEX_LINKS } from "@/lib/seo/hubs";
import { cn } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: SERVICES_HUB.title,
  description: SERVICES_HUB.description,
  path: SERVICES_HUB.path,
});

export default function ServicesHubPage() {
  return (
    <HubPageView page={SERVICES_HUB}>
      <nav aria-labelledby="services-index-heading" className="mb-10">
        <h2
          id="services-index-heading"
          className={cn(storySectionH2Class, "mb-4 text-lg md:text-xl")}
        >
          Service pages
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {SERVICE_INDEX_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  storySurfaceCardClass,
                  "block px-4 py-3 text-[15px] font-semibold text-foreground transition-colors hover:border-[#ff3b1f]/25 hover:text-[#ff3b1f]",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </HubPageView>
  );
}
