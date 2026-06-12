import Link from "next/link";
import { ArrowUpRight, Compass, Lock, Sparkles, Target } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { getAllCaseStudies } from "@/lib/case-studies";

const caseStudies = getAllCaseStudies().map((study) => ({
  slug: study.slug,
  category: study.industry,
  title: study.title,
  challenge: study.challenge,
  approach: study.implementation[0] ?? study.solution,
  result: study.results,
  headlineMetric: study.metrics[0],
  testimonial: study.testimonial,
  datePublished: study.datePublished,
}));

const bodyClass =
  "text-[13.5px] leading-[1.82] text-foreground/55 md:text-[14.5px] md:leading-[1.84]";

const labelClass =
  "mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/38";

type CaseStudiesProps = {
  /** Homepage teaser: show fewer stories + link to full index */
  limit?: number;
};

export function CaseStudies({ limit }: CaseStudiesProps) {
  const visible = limit ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <section
      id="case-studies"
      className="clykur-story-section relative border-t border-foreground/[0.05]"
      aria-labelledby="case-studies-heading"
    >
      {/* Layered backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#fafaf8]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-30%,rgba(255,59,31,0.07),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(10,10,10,0.03),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(10,10,10,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.03)_1px,transparent_1px)] [background-size:72px_72px]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <header data-reveal-item className="mb-16 md:mb-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-4">
                <span
                  className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-[#ff3b1f]/0"
                  aria-hidden
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
                  Selected work
                </p>
              </div>
              <h2
                id="case-studies-heading"
                className="font-poppins text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground"
              >
                <span className="block text-balance">Case studies</span>
              </h2>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-foreground/48 md:text-base">
                Outcomes from real engagements structured so you can scan the
                problem, the path, and the impact without the noise.
              </p>
            </div>

            <div className="shrink-0 lg:max-w-xs lg:text-right">
              <div className="inline-flex flex-col gap-4 rounded-none border border-foreground/[0.08] bg-white/55 px-6 py-5 text-left shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_48px_-24px_rgba(10,10,10,0.08)] backdrop-blur-sm lg:text-right">
                <Lock
                  className="h-4 w-4 text-foreground/35 lg:ml-auto"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="text-[12.5px] leading-relaxed text-foreground/48">
                  Identities and specifics stay under NDA narratives are
                  representative of the work.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div>
          {visible.map((study, index) => (
            <article
              key={study.slug}
              data-reveal-item
              className="group border-t border-foreground/[0.07] py-16 first:border-t-0 first:pt-0 md:py-[4.5rem] lg:py-24"
            >
              <div className="relative border-l-2 border-transparent pl-5 transition-[border-color] duration-500 group-hover:border-[#ff3b1f]/35 md:pl-8">
                {/* Watermark: scoped to title block so it aligns with index + headline (not body columns) */}
                <div className="relative mb-10 min-h-[4.5rem] md:mb-12 md:min-h-[5.25rem]">
                  <span
                    className="pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2 select-none font-calegar text-[clamp(3.25rem,11vw,7rem)] leading-[0.85] tracking-tight text-foreground/[0.055]"
                    aria-hidden
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="relative z-[1] md:flex md:items-end md:justify-between md:gap-8">
                    <div className="min-w-0">
                      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="font-mono text-[11px] tabular-nums tracking-tight text-foreground/28">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ff3b1f]">
                          {study.category}
                        </span>
                      </div>
                      <h3 className="max-w-2xl font-poppins text-[1.5rem] font-medium leading-[1.15] tracking-[-0.02em] text-foreground md:text-[1.75rem] lg:text-[2rem]">
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="transition-colors hover:text-[#ff3b1f]"
                        >
                          {study.title}
                        </Link>
                      </h3>
                      {study.headlineMetric ? (
                        <p className="mt-3 inline-flex rounded-lg border border-[#ff3b1f]/20 bg-[#ff3b1f]/[0.06] px-3 py-1.5 text-[12px] font-semibold text-foreground/75">
                          {study.headlineMetric.label}:{" "}
                          <span className="text-foreground">
                            {study.headlineMetric.value}
                          </span>
                        </p>
                      ) : null}
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/35">
                        Updated {study.datePublished}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
                  <div className="min-w-0 lg:col-span-4">
                    <p className={labelClass}>
                      <Target
                        className="h-3.5 w-3.5 text-foreground/30"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      Challenge
                    </p>
                    <p className={bodyClass}>{study.challenge}</p>
                  </div>
                  <div className="min-w-0 lg:col-span-4">
                    <p className={labelClass}>
                      <Compass
                        className="h-3.5 w-3.5 text-foreground/30"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      Approach
                    </p>
                    <p className={bodyClass}>{study.approach}</p>
                  </div>
                  <div className="relative min-w-0 lg:col-span-4">
                    <div
                      className="absolute -inset-x-4 -inset-y-3 rounded-sm bg-gradient-to-br from-[#ff3b1f]/[0.06] via-transparent to-transparent md:-inset-x-5 md:-inset-y-4"
                      aria-hidden
                    />
                    <div className="relative border-l-2 border-[#ff3b1f]/35 pl-5 md:pl-6">
                      <p className={labelClass}>
                        <Sparkles
                          className="h-3.5 w-3.5 text-[#ff3b1f]/70"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        Result
                      </p>
                      <p className="text-[14px] font-medium leading-[1.82] text-foreground/72 md:text-[15px] md:leading-[1.84]">
                        {study.result}
                      </p>
                      {study.testimonial ? (
                        <blockquote className="mt-5 border-t border-foreground/[0.08] pt-4 text-[13px] italic leading-relaxed text-foreground/55">
                          &ldquo;{study.testimonial.quote}&rdquo;
                          <footer className="mt-2 text-[11px] not-italic font-semibold uppercase tracking-[0.12em] text-foreground/40">
                            {study.testimonial.attribution}
                          </footer>
                        </blockquote>
                      ) : null}
                    </div>
                  </div>
                </div>
                <p className="mt-8">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#ff3b1f] hover:underline"
                  >
                    Read full case study
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </p>
              </div>
            </article>
          ))}
        </div>

        {limit ? (
          <div
            data-reveal-item
            className="mt-12 flex justify-center border-t border-foreground/[0.06] pt-12"
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-xl border border-foreground/[0.1] bg-white px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/55 transition-colors hover:border-[#ff3b1f]/28 hover:text-[#ff3b1f]"
            >
              View all case studies
              <ArrowUpRight
                className="h-4 w-4"
                strokeWidth={1.85}
                aria-hidden
              />
            </Link>
          </div>
        ) : null}
      </ScrollReveal>
    </section>
  );
}
