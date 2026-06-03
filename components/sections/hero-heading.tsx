/** Server-rendered H1 for homepage SEO and accessibility (included in initial HTML). */
export function HeroHeading() {
  return (
    <h1
      id="hero-heading"
      className="min-w-0 max-w-[min(100%,28rem)] font-poppins text-foreground"
    >
      <span className="block text-balance text-[clamp(1.9375rem,5.5vw+0.5rem,3.35rem)] font-medium leading-[1.04] tracking-[-0.042em] sm:leading-[1.06] sm:tracking-[-0.04em]">
        Product engineering for teams that need{" "}
        <span className="bg-gradient-to-br from-[#ff6a4d] via-[#ff3b1f] to-[#e62e18] bg-clip-text font-semibold text-transparent">
          software shipped right
        </span>
        <span className="text-foreground/90">.</span>
      </span>
      <span
        className="mt-5 block h-px max-w-[3.5rem] bg-gradient-to-r from-[#ff3b1f]/80 via-[#ff3b1f]/25 to-transparent sm:mt-6"
        aria-hidden
      />
      <span className="mt-5 block text-balance text-[clamp(1.0625rem,2.6vw+0.45rem,1.4375rem)] font-normal leading-[1.35] tracking-[-0.028em] text-foreground/58 sm:mt-6">
        We help startups, product leaders, and business owners ship web and
        mobile products with clear scope, steady delivery, and outcomes you can
        plan around.
      </span>
    </h1>
  );
}
