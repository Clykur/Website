import Link from "next/link";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

type DiscoveryCtaProps = {
  className?: string;
  /** Primary button width on mobile */
  fullWidthMobile?: boolean;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function DiscoveryCta({
  className,
  fullWidthMobile = true,
  secondaryHref = "#services",
  secondaryLabel = "View services",
}: DiscoveryCtaProps) {
  const width = fullWidthMobile
    ? "w-full justify-center sm:w-fit"
    : "w-fit justify-center";

  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4",
        className,
      )}
    >
      <Link
        href="/contact#inquiry-form"
        className={cn(primaryGradientCtaClassName, width)}
      >
        Start a project
      </Link>
      <Link
        href={secondaryHref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl border border-foreground/[0.11] bg-white/70 px-6 py-2.5 text-[13px] font-semibold tracking-[-0.01em] text-foreground/88 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset] backdrop-blur-sm transition-[border-color,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-foreground/[0.18] hover:bg-white hover:text-foreground active:translate-y-0",
          fullWidthMobile ? "w-full sm:w-fit" : "w-fit",
        )}
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}
