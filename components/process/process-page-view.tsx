import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { SeoCta } from "@/components/seo/seo-cta";
import {
  StoryPageBackdrop,
  StoryPageHero,
} from "@/components/layout/story-page-shell";
import { ProcessPageReveal } from "@/components/process/process-page-reveal";
import {
  PROCESS_AI_ANSWERS,
  PROCESS_PRINCIPLES,
  PROCESS_STEPS,
} from "@/lib/process";
import { PROCESS_HUB } from "@/lib/seo/hubs";
import { webPageSchema } from "@/lib/seo/schemas";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Process", href: "/process" },
];

const principleIcons = [ClipboardCheck, Layers, ShieldCheck] as const;

export function ProcessPageView() {
  const schema = webPageSchema({
    kind: "hub",
    slug: "process",
    path: PROCESS_HUB.path,
    title: PROCESS_HUB.title,
    description: PROCESS_HUB.description,
    h1: PROCESS_HUB.h1,
    eyebrow: "Clykur",
    lede: PROCESS_HUB.lede,
    keywords: [],
    breadcrumbs,
    sections: [],
    faqs: PROCESS_HUB.faqs ?? [],
    relatedLinks: [],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <StoryPageBackdrop>
        <StoryPageHero
          titleId="process-page-heading"
          title={PROCESS_HUB.h1}
          lede={PROCESS_HUB.lede}
          eyebrow="Delivery"
          breadcrumbs={breadcrumbs}
          actions={
            <>
              <Link href="/contact" className={primaryGradientCtaClassName}>
                Start a project
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-foreground/15 px-6 text-[13px] font-semibold tracking-[-0.01em] text-foreground/75 transition-colors hover:border-[#ff3b1f]/35 hover:text-[#ff3b1f]"
              >
                See case studies
              </Link>
            </>
          }
        />

        <ProcessPageReveal>
          <section
            className="clykur-story-section border-t border-foreground/[0.04] py-12 md:py-16"
            aria-labelledby="pipeline-heading"
          >
            <div className="clykur-story-shell max-w-6xl">
              <header data-reveal-item className="mb-8 md:mb-10">
                <h2
                  id="pipeline-heading"
                  className="font-poppins text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.02em] text-foreground"
                >
                  Delivery pipeline
                </h2>
                <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-foreground/48 md:text-[15px]">
                  Five sequential stages. Each closes with an explicit
                  checkpoint before the next begins.
                </p>
              </header>

              <div
                data-reveal-item
                className="overflow-hidden rounded-2xl border border-foreground/[0.09] bg-white shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_48px_-32px_rgba(10,10,10,0.08)]"
              >
                <div className="flex flex-col gap-1 border-b border-foreground/[0.08] bg-[#fafaf9] px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/50">
                    At a glance
                  </p>
                  <p className="font-mono text-[10px] tabular-nums text-foreground/38">
                    01 → 05 · sequential gates
                  </p>
                </div>
                <div
                  className="h-[3px] w-full bg-gradient-to-r from-[#ff3b1f]/85 via-[#ff3b1f]/35 to-foreground/[0.12]"
                  aria-hidden
                />
                <ol
                  className="grid grid-cols-1 divide-y divide-foreground/[0.08] md:grid-cols-5 md:divide-x md:divide-y-0"
                  aria-label="Process steps from consultation through delivery"
                >
                  {PROCESS_STEPS.map((item) => (
                    <li
                      key={item.step}
                      className="flex flex-col bg-white px-5 py-7 md:min-h-[240px] md:px-4 md:py-8 lg:px-5"
                    >
                      <span className="mb-4 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#ff3b1f]/40 bg-[#ff3b1f]/[0.06] font-mono text-[11px] font-semibold tabular-nums text-[#ff3b1f] md:h-10 md:w-10">
                        {item.step}
                      </span>
                      <h3 className="font-poppins text-base font-medium leading-snug tracking-[-0.02em] text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[13px] leading-[1.7] text-foreground/52">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section
            className="clykur-story-section border-t border-foreground/[0.05] bg-[#fafaf9]/60 py-12 md:py-16"
            aria-labelledby="checkpoints-heading"
          >
            <div className="clykur-story-shell max-w-6xl">
              <header data-reveal-item className="mb-10 md:mb-12">
                <h2
                  id="checkpoints-heading"
                  className="font-poppins text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.02em] text-foreground"
                >
                  Checkpoints and deliverables
                </h2>
                <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-foreground/48 md:text-[15px]">
                  What you receive at each gate, and what must be signed off
                  before we move forward.
                </p>
              </header>

              <ol className="space-y-6 md:space-y-8">
                {PROCESS_STEPS.map((item, index) => (
                  <li
                    key={item.step}
                    data-reveal-item
                    className="overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white shadow-[0_12px_40px_-28px_rgba(10,10,10,0.12)]"
                  >
                    <div className="grid gap-0 lg:grid-cols-12">
                      <div className="border-b border-foreground/[0.06] bg-gradient-to-br from-[#ff3b1f]/[0.04] to-transparent px-6 py-6 lg:col-span-4 lg:border-b-0 lg:border-r lg:py-8">
                        <span className="font-mono text-[11px] tabular-nums text-foreground/35">
                          Stage {item.step}
                        </span>
                        <h3 className="mt-2 font-poppins text-xl font-medium tracking-[-0.02em] text-foreground md:text-[1.35rem]">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-[14px] leading-[1.75] text-foreground/55">
                          {item.description}
                        </p>
                      </div>
                      <div className="px-6 py-6 lg:col-span-8 lg:py-8">
                        <div className="mb-6 flex gap-3 rounded-xl border border-[#ff3b1f]/15 bg-[#ff3b1f]/[0.04] px-4 py-3.5">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#ff3b1f]"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                              Checkpoint
                            </p>
                            <p className="mt-1 text-[14px] font-medium leading-relaxed text-foreground/72">
                              {item.checkpoint}
                            </p>
                          </div>
                        </div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/38">
                          Deliverables
                        </p>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {item.deliverables.map((d) => (
                            <li
                              key={d}
                              className="flex gap-2 text-[13px] leading-relaxed text-foreground/58"
                            >
                              <span
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ff3b1f]/70"
                                aria-hidden
                              />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {index < PROCESS_STEPS.length - 1 ? (
                      <div
                        className="hidden h-px bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent lg:block"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            className="clykur-story-section border-t border-foreground/[0.05] py-12 md:py-16"
            aria-labelledby="principles-heading"
          >
            <div className="clykur-story-shell max-w-6xl">
              <h2
                id="principles-heading"
                className="mb-8 font-poppins text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium tracking-[-0.02em] text-foreground md:mb-10"
              >
                How we keep projects predictable
              </h2>
              <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
                {PROCESS_PRINCIPLES.map((item, i) => {
                  const Icon = principleIcons[i] ?? ClipboardCheck;
                  return (
                    <li
                      key={item.title}
                      data-reveal-item
                      className="rounded-2xl border border-foreground/[0.08] bg-white p-6 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_20px_40px_-32px_rgba(10,10,10,0.08)]"
                    >
                      <Icon
                        className="mb-4 h-5 w-5 text-[#ff3b1f]/80"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <h3 className="font-poppins text-base font-medium text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.75] text-foreground/52">
                        {item.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section
            className="clykur-story-section border-t border-foreground/[0.05] pb-8 pt-12 md:pb-10 md:pt-16"
            aria-labelledby="process-quick-answers"
          >
            <div className="clykur-story-shell max-w-6xl">
              <h2
                id="process-quick-answers"
                className="mb-6 font-poppins text-[clamp(1.25rem,2.5vw,1.5rem)] font-medium text-foreground"
              >
                Quick answers
              </h2>
              <dl
                data-reveal-item
                className="divide-y divide-foreground/[0.08] rounded-2xl border border-foreground/[0.08] bg-white px-5 py-2 md:px-8"
              >
                {PROCESS_AI_ANSWERS.map((row) => (
                  <div key={row.term} className="py-5 md:py-6">
                    <dt className="text-[13px] font-semibold text-foreground">
                      {row.term}
                    </dt>
                    <dd className="mt-2 text-[14px] leading-[1.8] text-foreground/55">
                      {row.detail}
                    </dd>
                  </div>
                ))}
              </dl>

              <div
                data-reveal-item
                className="mt-12 flex flex-col items-start gap-4 border-t border-foreground/[0.06] pt-10 md:flex-row md:items-center md:justify-between"
              >
                <p className="max-w-md text-[14px] leading-relaxed text-foreground/48">
                  Explore services by discipline or read outcomes from recent
                  engagements.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-xl border border-foreground/[0.1] bg-white px-5 py-2.5 text-[13px] font-semibold text-foreground/70 transition-colors hover:border-[#ff3b1f]/30 hover:text-[#ff3b1f]"
                  >
                    All services
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-foreground/[0.1] bg-white px-5 py-2.5 text-[13px] font-semibold text-foreground/70 transition-colors hover:border-[#ff3b1f]/30 hover:text-[#ff3b1f]"
                  >
                    Contact us
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>

              <SeoCta className="mb-[max(4rem,env(safe-area-inset-bottom))]" />
            </div>
          </section>
        </ProcessPageReveal>
      </StoryPageBackdrop>
    </>
  );
}
