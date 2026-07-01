/** Server-rendered H1 for homepage SEO and accessibility (included in initial HTML). */
export function HeroHeading() {
  return (
    <div className="min-w-0 max-w-[min(100%,32rem)]">
      <p className="mb-5 sm:mb-6">
        <span className="inline-flex items-center rounded-lg border border-foreground/[0.09] bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/55 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_8px_20px_-12px_rgba(10,10,10,0.12)]">
          AI-Native Engineering
        </span>
      </p>
      <h1 id="hero-heading" className="font-poppins text-foreground">
        <span className="block text-balance text-[clamp(1.9375rem,5.5vw+0.5rem,3.35rem)] font-medium leading-[1.04] tracking-[-0.042em] sm:leading-[1.06] sm:tracking-[-0.04em]">
          <span className="bg-gradient-to-br from-[#ff6a4d] via-[#ff3b1f] to-[#e62e18] bg-clip-text font-semibold text-transparent">
            AI-Native
          </span>{" "}
          Product Engineering
        </span>
        <span
          className="mt-5 block h-px max-w-[3.5rem] bg-gradient-to-r from-[#ff3b1f]/80 via-[#ff3b1f]/25 to-transparent sm:mt-6"
          aria-hidden
        />
        <span className="mt-5 block text-balance text-[clamp(1.0625rem,2.6vw+0.45rem,1.4375rem)] font-normal leading-[1.35] tracking-[-0.028em] text-foreground/58 sm:mt-6">
          We build production-ready software faster using AI-assisted
          engineering, while experienced developers ensure every solution meets
          production standards.
        </span>
      </h1>
    </div>
  );
}
