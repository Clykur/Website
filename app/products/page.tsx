import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PRODUCTS } from "@/lib/products";
import { HubPageView } from "@/components/seo/hub-page";
import { storySurfaceCardClass } from "@/components/layout/story-page-shell";
import { cn } from "@/lib/utils";

const HUB = {
  path: "/products",
  title: "Products",
  description:
    "Clykur products: Cusown appointment booking and FreeTrust freelancer trust infrastructure.",
  h1: "Our products",
  lede: "Software we own, ship, and scale, built with the same engineering rigor we bring to client work.",
  sections: [
    {
      title: "What products does Clykur build?",
      paragraphs: [
        "Clykur builds Cusown for appointment and slot booking, and FreeTrust as a trust layer for freelancers and clients.",
        "Explore each product page for features, FAQs, and partnership options.",
      ],
    },
  ],
};

export const metadata: Metadata = buildPageMetadata({
  title: HUB.title,
  description: HUB.description,
  path: HUB.path,
});

export default function ProductsHubPage() {
  return (
    <HubPageView page={HUB}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {PRODUCTS.map((product) => {
          const slug = product.name === "FreeTrust" ? "freetrust" : "cusown";
          return (
            <li key={product.name}>
              <Link
                href={`/products/${slug}`}
                className={cn(
                  storySurfaceCardClass,
                  "block p-5 transition-colors hover:border-[#ff3b1f]/25",
                )}
              >
                <h2 className="text-lg font-semibold text-foreground">
                  {product.name}
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-foreground/60">
                  {product.tagline}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </HubPageView>
  );
}
