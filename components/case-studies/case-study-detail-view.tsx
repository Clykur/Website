import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  StoryPageBackdrop,
  StoryPageHero,
  StoryPageMain,
  storySectionH2Class,
} from "@/components/layout/story-page-shell";
import { LandingHeroCta } from "@/components/seo/landing-hero-cta";
import { SeoCta } from "@/components/seo/seo-cta";
import { CaseStudyStructuredData } from "@/components/case-studies/case-study-structured-data";
import {
  getRelatedCaseStudies,
  getServiceHref,
  type CaseStudy,
} from "@/lib/case-studies";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

type CaseStudyDetailViewProps = {
  study: CaseStudy;
};

function MidConversionBlock() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/contact" className={primaryGradientCtaClassName}>
        Start a project
      </Link>
      {calendlyUrl ? (
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-foreground/15 px-6 text-[13px] font-semibold tracking-[-0.01em] text-foreground/75 transition-colors hover:border-[#ff3b1f]/35 hover:text-[#ff3b1f]"
        >
          Book discovery call
        </a>
      ) : (
        <Link
          href="/contact"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-foreground/15 px-6 text-[13px] font-semibold text-foreground/75"
        >
          Contact us
        </Link>
      )}
    </div>
  );
}

export function CaseStudyDetailView({ study }: CaseStudyDetailViewProps) {
  const related = getRelatedCaseStudies(study.slug, 3);
  const path = `/case-studies/${study.slug}`;

  return (
    <>
      <CaseStudyStructuredData study={study} />
      <StoryPageBackdrop>
        <StoryPageHero
          titleId="case-study-heading"
          title={study.title}
          lede={study.seoDescription}
          eyebrow={`${study.industry} · ${study.client}`}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Case studies", href: "/case-studies" },
            { label: study.title, href: path },
          ]}
          actions={<LandingHeroCta />}
        />
        <StoryPageMain
          as="article"
          width="narrow"
          className="overflow-x-hidden"
        >
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl border border-foreground/[0.08] bg-[#fafaf9]">
            <Image
              src={study.featuredImage}
              alt={study.featuredImageAlt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          <section
            className="mb-12 scroll-mt-24 md:mb-14"
            aria-labelledby="cs-ai-answers"
          >
            <h2 id="cs-ai-answers" className="sr-only">
              Case study summary
            </h2>
            <div className="space-y-6 rounded-2xl border border-foreground/[0.08] bg-[#fafaf9]/80 p-6 md:p-8">
              <article>
                <h3 className="text-[15px] font-semibold text-foreground">
                  What was the challenge?
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground/62">
                  {study.challenge}
                </p>
              </article>
              <article>
                <h3 className="text-[15px] font-semibold text-foreground">
                  What solution was delivered?
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground/62">
                  {study.solution}
                </p>
              </article>
              <article>
                <h3 className="text-[15px] font-semibold text-foreground">
                  What results were achieved?
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground/62">
                  {study.results}
                </p>
              </article>
            </div>
          </section>

          <section
            className="mb-12 scroll-mt-24"
            aria-labelledby="cs-challenge"
          >
            <h2
              id="cs-challenge"
              className="mb-4 font-semibold tracking-tight text-[clamp(1.35rem,2.8vw,1.875rem)] text-foreground"
            >
              Challenge
            </h2>
            <p className="text-[15px] leading-[1.85] text-foreground/62 md:text-[16px]">
              {study.challenge}
            </p>
          </section>

          <section className="mb-12 scroll-mt-24" aria-labelledby="cs-solution">
            <h2
              id="cs-solution"
              className="mb-4 font-semibold tracking-tight text-[clamp(1.35rem,2.8vw,1.875rem)] text-foreground"
            >
              Solution
            </h2>
            <p className="text-[15px] leading-[1.85] text-foreground/62 md:text-[16px]">
              {study.solution}
            </p>
          </section>

          <section
            className="mb-12 scroll-mt-24"
            aria-labelledby="cs-implementation"
          >
            <h2
              id="cs-implementation"
              className="mb-4 font-semibold tracking-tight text-[clamp(1.35rem,2.8vw,1.875rem)] text-foreground"
            >
              Implementation process
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-[15px] leading-relaxed text-foreground/62">
              {study.implementation.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="mb-12 scroll-mt-24" aria-labelledby="cs-tech">
            <h2
              id="cs-tech"
              className="mb-4 font-semibold tracking-tight text-[clamp(1.35rem,2.8vw,1.875rem)] text-foreground"
            >
              Technology stack
            </h2>
            <ul className="flex flex-wrap gap-2">
              {study.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-foreground/[0.1] bg-white px-3 py-1.5 text-[13px] font-medium text-foreground/70"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10 scroll-mt-24" aria-labelledby="cs-results">
            <h2
              id="cs-results"
              className="mb-4 font-semibold tracking-tight text-[clamp(1.35rem,2.8vw,1.875rem)] text-foreground"
            >
              Results
            </h2>
            <p className="text-[15px] leading-[1.85] text-foreground/62 md:text-[16px]">
              {study.results}
            </p>
            <div className="mt-8">
              <MidConversionBlock />
            </div>
          </section>

          <section className="mb-12 scroll-mt-24" aria-labelledby="cs-metrics">
            <h2
              id="cs-metrics"
              className="mb-6 font-semibold tracking-tight text-[clamp(1.35rem,2.8vw,1.875rem)] text-foreground"
            >
              Key metrics
            </h2>
            <dl className="grid gap-4 sm:grid-cols-3">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-[#ff3b1f]/15 bg-[#ff3b1f]/[0.04] px-5 py-4"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
                    {m.label}
                  </dt>
                  <dd className="mt-2 text-[15px] font-semibold text-foreground">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {study.testimonial ? (
            <blockquote className="mb-12 border-l-2 border-[#ff3b1f]/40 pl-6">
              <p className="text-[16px] leading-relaxed text-foreground/70 md:text-lg">
                &ldquo;{study.testimonial.quote}&rdquo;
              </p>
              <footer className="mt-3 text-[13px] font-medium text-foreground/45">
                {study.testimonial.attribution}
              </footer>
            </blockquote>
          ) : null}

          {study.projectUrl ? (
            <p className="mb-12">
              <a
                href={study.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#ff3b1f] hover:underline"
              >
                View live project
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </p>
          ) : null}

          <aside
            className="mb-12 rounded-2xl border border-foreground/[0.08] bg-white/80 p-6 md:p-8"
            aria-labelledby="cs-related-services"
          >
            <h2
              id="cs-related-services"
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45"
            >
              Related services
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {study.serviceSlugs.map((slug, index) => (
                <li key={slug}>
                  <Link
                    href={getServiceHref(slug)}
                    className="block rounded-lg px-1 py-1 text-[15px] font-semibold text-foreground hover:text-[#ff3b1f]"
                  >
                    {study.services[index] ?? slug}
                  </Link>
                </li>
              ))}
            </ul>
            {study.productSlugs?.length ? (
              <div className="mt-6 border-t border-foreground/[0.06] pt-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                  Related products
                </p>
                <ul className="flex flex-wrap gap-3">
                  {study.productSlugs.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/products/${slug}`}
                        className="text-[14px] font-semibold text-[#ff3b1f] hover:underline"
                      >
                        {slug === "freetrust" ? "FreeTrust" : "Cusown"}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>

          <aside className="mb-14" aria-labelledby="cs-related-studies">
            <h2
              id="cs-related-studies"
              className="mb-5 font-semibold tracking-tight text-xl text-foreground"
            >
              Related case studies
            </h2>
            <ul className="space-y-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/case-studies/${r.slug}`}
                    className="group flex items-start justify-between gap-4 rounded-xl border border-foreground/[0.08] p-4 transition-colors hover:border-[#ff3b1f]/25"
                  >
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                        {r.industry}
                      </span>
                      <span className="mt-1 block font-medium text-foreground group-hover:text-[#ff3b1f]">
                        {r.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-foreground/35"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <SeoCta />
        </StoryPageMain>
      </StoryPageBackdrop>
    </>
  );
}
