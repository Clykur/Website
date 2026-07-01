import { ScrollReveal } from "@/components/landing/scroll-reveal";

function AiTrustIllustration() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="mx-auto h-auto w-full max-w-[18rem] text-foreground/25 md:max-w-[20rem]"
      role="img"
      aria-labelledby="ai-trust-illustration-title"
    >
      <title id="ai-trust-illustration-title">
        Engineers reviewing AI-assisted output before release
      </title>
      <rect
        x="24"
        y="32"
        width="272"
        height="176"
        rx="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/12"
      />
      <circle
        cx="88"
        cy="96"
        r="28"
        fill="none"
        stroke="#ff3b1f"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <path
        d="M88 78v12l8 8"
        fill="none"
        stroke="#ff3b1f"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <rect
        x="140"
        y="72"
        width="120"
        height="8"
        rx="2"
        fill="currentColor"
        opacity="0.15"
      />
      <rect
        x="140"
        y="92"
        width="96"
        height="6"
        rx="2"
        fill="currentColor"
        opacity="0.1"
      />
      <rect
        x="140"
        y="108"
        width="108"
        height="6"
        rx="2"
        fill="currentColor"
        opacity="0.1"
      />
      <circle cx="64" cy="168" r="6" fill="#ff3b1f" opacity="0.35" />
      <circle cx="96" cy="168" r="6" fill="#ff3b1f" opacity="0.2" />
      <circle cx="128" cy="168" r="6" fill="currentColor" opacity="0.12" />
      <path
        d="M152 168h120"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.2"
      />
      <rect
        x="200"
        y="148"
        width="56"
        height="40"
        rx="6"
        fill="none"
        stroke="#ff3b1f"
        strokeWidth="1.25"
        opacity="0.45"
      />
      <path
        d="M212 164l10 10 18-22"
        fill="none"
        stroke="#ff3b1f"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />
    </svg>
  );
}

export function AiTrustSection() {
  return (
    <section
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="ai-trust-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-white"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_50%,rgba(255,59,31,0.04),transparent_55%)]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_minmax(0,16rem)] lg:gap-16">
          <div>
            <header data-reveal-item className="mb-0">
              <div className="mb-4 flex items-center gap-4">
                <span
                  className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent"
                  aria-hidden
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
                  Trust
                </p>
              </div>
              <h2
                id="ai-trust-heading"
                className="font-poppins text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.03em] text-foreground"
              >
                AI Accelerates.
                <span className="block">Engineers Decide.</span>
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/48 md:text-base">
                We don&apos;t replace engineers with AI. We empower engineers
                with AI. Every line of code is reviewed. Every architecture
                decision is intentional. Every release is tested before
                production.
              </p>
            </header>
          </div>
          <div data-reveal-item className="flex justify-center lg:justify-end">
            <AiTrustIllustration />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
