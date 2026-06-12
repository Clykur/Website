import Link from "next/link";
import { DiscoveryCta } from "@/components/marketing/discovery-cta";
import { storySurfaceCardClass } from "@/components/layout/story-page-shell";

type BlogPostCtaProps = {
  relatedServiceHref?: string;
  relatedServiceLabel?: string;
};

export function BlogPostCta({
  relatedServiceHref = "/services/startup-mvp-development",
  relatedServiceLabel = "Startup MVP development",
}: BlogPostCtaProps) {
  return (
    <aside
      className={storySurfaceCardClass + " p-6 md:p-8"}
      aria-labelledby="blog-post-cta-heading"
    >
      <h2
        id="blog-post-cta-heading"
        className="font-poppins text-lg font-medium tracking-[-0.02em] text-foreground md:text-xl"
      >
        Ready to apply this on your product?
      </h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/58">
        Send a brief with timeline and budget band on our contact form. We
        respond with a clear next step, not a generic deck.
      </p>
      <div className="mt-6">
        <DiscoveryCta fullWidthMobile={false} />
      </div>
      <p className="mt-6 text-[14px] text-foreground/50">
        Related:{" "}
        <Link
          href={relatedServiceHref}
          className="font-semibold text-[#ff3b1f] hover:underline"
        >
          {relatedServiceLabel}
        </Link>
        {" · "}
        <Link
          href="/blog/mvp-development-cost-2026"
          className="font-semibold text-[#ff3b1f] hover:underline"
        >
          MVP cost guide
        </Link>
      </p>
    </aside>
  );
}
