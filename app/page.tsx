import type { Metadata } from "next";
import { HomeBelowFold } from "@/components/home/home-below-fold";
import { Hero } from "@/components/sections/hero";
import { HeroHeading } from "@/components/sections/hero-heading";
import { Products } from "@/components/sections/products";
import { Services } from "@/components/sections/services";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { DEFAULT_META } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: DEFAULT_META.title,
  description: DEFAULT_META.description,
  path: "/",
  keywords: DEFAULT_META.keywords.split(", "),
});

export default function Home() {
  return (
    <>
      <Hero heading={<HeroHeading />} />
      <Services variant="home" />
      <Products />
      <HomeBelowFold />
    </>
  );
}
