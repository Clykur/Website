import Link from "next/link";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

type SeoCtaProps = {
  className?: string;
  /** Unique id when multiple CTAs exist on one page (e.g. mid-page vs footer). */
  headingId?: string;
};

export function SeoCta({
  className,
  headingId = "seo-cta-heading",
}: SeoCtaProps) {
  return (
    <section
      className={cn(
        "mt-16 scroll-mt-24 rounded-2xl border border-[#ff3b1f]/15 bg-gradient-to-br from-[#ff3b1f]/[0.06] via-white to-white p-8 md:mt-20 md:p-10",
        className,
      )}
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="mb-3 font-semibold tracking-tight text-[clamp(1.35rem,3vw,2rem)] text-foreground"
      >
        Ready to build with Clykur?
      </h2>
      <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-foreground/60 md:text-base">
        Tell us about your product, timeline, and team. We respond quickly with
        a clear next step, usually a short discovery call and written scope.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/contact" className={primaryGradientCtaClassName}>
          Start a project
        </Link>
        {calendlyUrl ? (
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-foreground/15 px-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground/75 transition-colors hover:border-[#ff3b1f]/35 hover:text-[#ff3b1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25"
          >
            Book discovery call
          </a>
        ) : (
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-foreground/15 px-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground/75 transition-colors hover:border-foreground/25 hover:text-foreground"
          >
            Request consultation
          </Link>
        )}
        <Link
          href="/services"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 text-[13px] font-medium text-foreground/55 underline-offset-2 hover:text-[#ff3b1f] hover:underline"
        >
          View all services
        </Link>
      </div>
    </section>
  );
}
