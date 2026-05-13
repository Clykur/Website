import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  FileText,
  ListChecks,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { getRoleBySlug, getRolePaths } from "@/lib/careers-roles";
import { cn } from "@/lib/utils";
import { CareerApplicationClient } from "@/components/careers/CareerApplicationClient";

const sectionShell =
  "overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white/90 p-6 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_20px_48px_-36px_rgba(10,10,10,0.07)] md:p-8";

const sectionTitleClass =
  "mb-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/38";

interface PageProps {
  params: Promise<{ slug: string }>;
}


export function generateStaticParams() {
  return getRolePaths().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) return { title: "Role not found - Clykur Careers" };
  return {
    title: `${role.title} - Careers | Clykur`,
    description: `Apply for ${role.title} at Clykur. ${role.employmentType}, ${role.location}. ${role.industry}.`,
  };
}


const metaChipClass =
  "inline-flex items-center gap-1.5 rounded-xl border border-foreground/[0.1] bg-white/85 px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-foreground/90 shadow-[0_1px_0_rgba(255,255,255,0.95)_inset]";

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  const roleSlug = slug;


  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(255,59,31,0.06),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,90,60,0.045),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_100%,transparent_35%,rgba(250,250,249,0.88)_100%)]"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-[1] mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8",
          "pt-[max(5.25rem,env(safe-area-inset-top))] md:pt-28",
          "pb-[max(4rem,env(safe-area-inset-bottom))] md:pb-24",
        )}
      >
        <Link
          href="/careers"
          className="mb-10 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40 transition-colors hover:text-[#ff3b1f] md:mb-12"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          All open roles
        </Link>

        <header className="mb-12 md:mb-14">
          <div className="mb-4 flex items-center gap-4">
            <span
              className="h-px w-10 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent sm:w-12"
              aria-hidden
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
              {role.industry}
            </p>
          </div>
          <h1 className="font-poppins text-[clamp(1.75rem,4.5vw+0.5rem,2.5rem)] font-medium leading-[1.1] tracking-[-0.035em] text-foreground">
            {role.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className={metaChipClass}>
              <Briefcase className="h-4 w-4 text-foreground/45" aria-hidden />
              {role.employmentType}
            </span>
            <span className={metaChipClass}>
              <MapPin className="h-4 w-4 text-foreground/45" aria-hidden />
              {role.location}
            </span>
            <span className={metaChipClass}>{role.team}</span>
          </div>
        </header>

        <div className="space-y-10 md:space-y-12">
          <section className={sectionShell} aria-labelledby="jd-heading">
            <h2 id="jd-heading" className={sectionTitleClass}>
              <FileText className="h-4 w-4 text-[#ff3b1f]/80" aria-hidden />
              Job description
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-foreground/85">
              {role.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className={sectionShell} aria-labelledby="req-heading">
            <h2 id="req-heading" className={sectionTitleClass}>
              <ListChecks className="h-4 w-4 text-[#ff3b1f]/80" aria-hidden />
              Requirements
            </h2>
            <ul className="space-y-3.5">
              {role.requirements.map((r, i) => (
                <li key={i} className="flex gap-3 text-[15px] text-foreground/85">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#ff3b1f]"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={sectionShell} aria-labelledby="qual-heading">
            <h2 id="qual-heading" className={sectionTitleClass}>
              <Sparkles className="h-4 w-4 text-[#ff3b1f]/80" aria-hidden />
              Qualifications we look for
            </h2>
            <ul className="space-y-3 text-[15px] leading-relaxed text-foreground/65">
              {role.qualifications.map((q, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-[#ff3b1f]/70"
                    aria-hidden
                  />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="apply-form-title">
            <CareerApplicationClient roleSlug={roleSlug} />
          </section>
        </div>
      </div>
    </div>
  );
}