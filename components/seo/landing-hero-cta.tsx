import Link from "next/link";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

type LandingHeroCtaProps = {
  className?: string;
};

export function LandingHeroCta({ className }: LandingHeroCtaProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        <Link href="/contact" className={primaryGradientCtaClassName}>
          Start a project
        </Link>
        {calendlyUrl ? (
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-foreground/15 px-6 text-[13px] font-semibold tracking-[-0.01em] text-foreground/75 transition-colors hover:border-[#ff3b1f]/35 hover:text-[#ff3b1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25"
          >
            Book discovery call
          </a>
        ) : (
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-foreground/15 px-6 text-[13px] font-semibold tracking-[-0.01em] text-foreground/75 transition-colors hover:border-foreground/25 hover:text-foreground"
          >
            Contact us
          </Link>
        )}
      </div>
    </div>
  );
}
