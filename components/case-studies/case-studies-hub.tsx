"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import {
  getCaseStudyIndustries,
  getCaseStudyServiceFilters,
  getFeaturedCaseStudies,
} from "@/lib/case-studies";
import { cn } from "@/lib/utils";

type CaseStudiesHubProps = {
  studies: CaseStudy[];
};

export function CaseStudiesHub({ studies }: CaseStudiesHubProps) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string>("All");
  const [service, setService] = useState<string>("All");

  const industries = useMemo(() => ["All", ...getCaseStudyIndustries()], []);
  const services = useMemo(
    () => [
      { slug: "All", label: "All services" },
      ...getCaseStudyServiceFilters(),
    ],
    [],
  );
  const featured = useMemo(() => getFeaturedCaseStudies(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return studies.filter((s) => {
      if (industry !== "All" && s.industry !== industry) return false;
      if (service !== "All" && !s.serviceSlugs.includes(service)) return false;
      if (!q) return true;
      const haystack = [
        s.title,
        s.client,
        s.industry,
        s.challenge,
        s.results,
        ...s.services,
        ...s.technologies,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [studies, query, industry, service]);

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-foreground/[0.08] bg-[#fafaf9]/80 p-5 md:p-6">
        <label htmlFor="case-study-search" className="sr-only">
          Search case studies
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40"
            aria-hidden
          />
          <input
            id="case-study-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, industry, technology…"
            className="w-full rounded-xl border border-foreground/[0.1] bg-white py-3 pl-10 pr-4 text-[15px] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25"
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <fieldset className="min-w-0">
            <legend className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
              Industry
            </legend>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setIndustry(ind)}
                  aria-pressed={industry === ind}
                  className={cn(
                    "min-h-[40px] rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25",
                    industry === ind
                      ? "border-[#ff3b1f]/35 bg-[#ff3b1f]/[0.08] text-[#ff3b1f]"
                      : "border-foreground/[0.1] bg-white text-foreground/65 hover:border-foreground/20",
                  )}
                >
                  {ind}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="min-w-0">
            <legend className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
              Service
            </legend>
            <div className="flex flex-wrap gap-2">
              {services.map((svc) => (
                <button
                  key={svc.slug}
                  type="button"
                  onClick={() => setService(svc.slug)}
                  aria-pressed={service === svc.slug}
                  className={cn(
                    "min-h-[40px] rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25",
                    service === svc.slug
                      ? "border-[#ff3b1f]/35 bg-[#ff3b1f]/[0.08] text-[#ff3b1f]"
                      : "border-foreground/[0.1] bg-white text-foreground/65 hover:border-foreground/20",
                  )}
                >
                  {svc.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      {featured.length > 0 &&
      query === "" &&
      industry === "All" &&
      service === "All" ? (
        <section aria-labelledby="featured-case-studies">
          <h2
            id="featured-case-studies"
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45"
          >
            Featured
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {featured.map((study) => (
              <li key={study.slug}>
                <CaseStudyCard study={study} large />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="all-case-studies-heading">
        <h2 id="all-case-studies-heading" className="sr-only">
          All case studies
        </h2>
        <p className="mb-4 text-[13px] text-foreground/50">
          {filtered.length} {filtered.length === 1 ? "study" : "studies"}
        </p>
        <ul className="grid gap-5 md:grid-cols-2">
          {filtered.map((study) => (
            <li key={study.slug}>
              <CaseStudyCard study={study} />
            </li>
          ))}
        </ul>
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-foreground/15 py-12 text-center text-[15px] text-foreground/50">
            No case studies match your filters.
          </p>
        ) : null}
      </section>
    </div>
  );
}

function CaseStudyCard({
  study,
  large,
}: {
  study: CaseStudy;
  large?: boolean;
}) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_16px_40px_-32px_rgba(10,10,10,0.1)] transition-[border-color,transform] hover:-translate-y-0.5 hover:border-[#ff3b1f]/25",
        large && "md:flex-row",
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] w-full shrink-0 bg-[#fafaf9]",
          large && "md:aspect-auto md:w-[42%] md:min-h-[200px]",
        )}
      >
        <Image
          src={study.featuredImage}
          alt={study.featuredImageAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 400px"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/42">
          {study.industry}
        </p>
        <h3 className="mt-2 font-semibold leading-snug text-foreground group-hover:text-[#ff3b1f]">
          {study.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[14px] leading-relaxed text-foreground/55">
          {study.challenge}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#ff3b1f]">
          Read case study
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
