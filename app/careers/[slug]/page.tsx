import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  FileText,
  ListChecks,
  Sparkles,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { getRoleBySlug, getRolePaths } from "@/lib/careers-roles";
import {
  StoryPageBackdrop,
  StoryPageHero,
  StoryPageMain,
} from "@/components/layout/story-page-shell";
import {
  CareerSectionCard,
  CareersBackLink,
  storyBodyProseClass,
} from "@/components/careers/careers-ui";
import { CareerApplicationClient } from "@/components/careers/CareerApplicationClient";
import { JobPostingJsonLd } from "@/components/careers/job-posting-json-ld";
import { SeoCta } from "@/components/seo/seo-cta";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getRolePaths().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) {
    return {
      title: "Role not found",
      description: "This career role could not be found at Clykur.",
    };
  }
  return buildPageMetadata({
    title: `${role.title} | Careers`,
    description: `Apply for ${role.title} at Clykur. ${role.employmentType}, ${role.location}. ${role.industry}.`,
    path: `/careers/${slug}`,
  });
}

const metaChipClass =
  "inline-flex items-center gap-1.5 rounded-xl border border-foreground/[0.1] bg-white px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-foreground/85 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset]";

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  const roleSlug = slug;
  const path = `/careers/${roleSlug}`;

  return (
    <>
      <JobPostingJsonLd role={role} />
      <StoryPageBackdrop>
        <StoryPageHero
          titleId="job-page-heading"
          title={role.title}
          eyebrow={role.industry}
          contentWidth="wide"
          showSectionDivider={false}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Careers", href: "/careers" },
            { label: role.title, href: path },
          ]}
          actions={
            <>
              <Link href="#apply-form" className={primaryGradientCtaClassName}>
                Apply now
              </Link>
              <CareersBackLink />
            </>
          }
          headerExtra={
            <div className="mt-6 flex flex-wrap gap-2">
              <span className={metaChipClass}>
                <Briefcase className="h-4 w-4 text-[#ff3b1f]/75" aria-hidden />
                {role.employmentType}
              </span>
              <span className={metaChipClass}>
                <MapPin className="h-4 w-4 text-[#ff3b1f]/75" aria-hidden />
                {role.location}
              </span>
              <span className={cn(metaChipClass, "text-foreground/70")}>
                {role.team}
              </span>
            </div>
          }
        />

        <StoryPageMain as="article" width="default" className="!pt-0">
          <div className="flex w-full min-w-0 flex-col gap-12 md:gap-14 lg:gap-16">
            <CareerSectionCard
              id="job-description"
              title="Job description"
              icon={FileText}
            >
              <div className={cn("space-y-4", storyBodyProseClass)}>
                {role.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </CareerSectionCard>

            <CareerSectionCard
              id="requirements"
              title="Requirements"
              icon={ListChecks}
            >
              <ul className="space-y-3.5">
                {role.requirements.map((r, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[15px] text-foreground/72"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#ff3b1f]"
                      aria-hidden
                    />
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </CareerSectionCard>

            <CareerSectionCard
              id="qualifications"
              title="Qualifications we look for"
              icon={Sparkles}
            >
              <ul className="space-y-3">
                {role.qualifications.map((q, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[15px] leading-relaxed text-foreground/62"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ff3b1f]/70"
                      aria-hidden
                    />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </CareerSectionCard>

            <section
              id="apply-form"
              aria-labelledby="apply-form-title"
              className="scroll-mt-28"
            >
              <CareerApplicationClient
                roleSlug={roleSlug}
                roleTitle={role.title}
              />
            </section>

            <div className="rounded-2xl border border-foreground/[0.08] bg-[#fafaf9]/80 px-5 py-5 md:px-6">
              <p className="flex flex-wrap items-center gap-2 text-[14px] text-foreground/55">
                <Mail className="h-4 w-4 text-[#ff3b1f]/80" aria-hidden />
                Questions about this role? Email{" "}
                <a
                  href="mailto:info@clykur.com"
                  className="font-semibold text-[#ff3b1f] hover:underline"
                >
                  info@clykur.com
                </a>
              </p>
            </div>

            <SeoCta headingId="careers-job-cta" />
          </div>
        </StoryPageMain>
      </StoryPageBackdrop>
    </>
  );
}
