import { DiscoveryCta } from "@/components/marketing/discovery-cta";
import { cn } from "@/lib/utils";

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
        a clear next step, usually a short call and written scope after we
        review your brief.
      </p>
      <DiscoveryCta
        fullWidthMobile={false}
        secondaryHref="/services"
        secondaryLabel="View all services"
      />
    </section>
  );
}
