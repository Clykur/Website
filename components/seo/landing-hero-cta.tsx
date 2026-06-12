import { DiscoveryCta } from "@/components/marketing/discovery-cta";

type LandingHeroCtaProps = {
  className?: string;
};

export function LandingHeroCta({ className }: LandingHeroCtaProps) {
  return <DiscoveryCta className={className} fullWidthMobile={false} />;
}
