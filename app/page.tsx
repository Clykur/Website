import type { Metadata } from "next";
import { AiCapabilitiesSection } from "@/components/home/ai-capabilities-section";
import { AiNativeMetricsSection } from "@/components/home/ai-native-metrics-section";
import { AiTrustSection } from "@/components/home/ai-trust-section";
import { DevComparisonSection } from "@/components/home/dev-comparison-section";
import { HomeAiProcessSection } from "@/components/home/home-ai-process-section";
import { HomeBelowFold } from "@/components/home/home-below-fold";
import { TechStackSection } from "@/components/home/tech-stack-section";
import { WhyAiNativeSection } from "@/components/home/why-ai-native-section";
import { Hero } from "@/components/sections/hero";
import { HeroHeading } from "@/components/sections/hero-heading";
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
      <WhyAiNativeSection />
      <AiNativeMetricsSection />
      <AiCapabilitiesSection />
      <DevComparisonSection />
      <AiTrustSection />
      <Services variant="home" />
      <TechStackSection />
      <HomeAiProcessSection />
      <HomeBelowFold />
    </>
  );
}
