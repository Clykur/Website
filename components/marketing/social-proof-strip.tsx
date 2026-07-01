import Link from "next/link";
import { CLYKUR_SOCIAL_LINKS } from "@/lib/social-links";

const clutch = CLYKUR_SOCIAL_LINKS.find((s) => s.id === "clutch");

export function SocialProofStrip() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-foreground/[0.08] bg-white/80 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-6">
      <p className="text-[13px] leading-relaxed text-foreground/55 md:max-w-xl">
        <span className="font-semibold text-foreground/80">Verified MSME</span>{" "}
        (Government of India) · Remote-first · Bengaluru · AI-native product
        engineering · Case studies updated through 2025-2026
      </p>
      <div className="flex flex-wrap gap-3">
        {clutch ? (
          <a
            href={clutch.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-foreground/15 px-4 text-[13px] font-semibold text-foreground/75 transition-colors hover:border-[#ff3b1f]/35 hover:text-[#ff3b1f]"
          >
            Reviews on Clutch
          </a>
        ) : null}
        <Link
          href="/case-studies"
          className="inline-flex min-h-[44px] items-center rounded-xl border border-foreground/15 px-4 text-[13px] font-semibold text-foreground/75 transition-colors hover:border-[#ff3b1f]/35 hover:text-[#ff3b1f]"
        >
          Case studies
        </Link>
      </div>
    </div>
  );
}
