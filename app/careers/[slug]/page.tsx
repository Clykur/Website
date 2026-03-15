import Link from "next/link";
import dynamic from "next/dynamic";
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

const ApplicationForm = dynamic(
  () =>
    import("@/components/careers/ApplicationForm").then((m) => ({
      default: m.ApplicationForm,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden animate-pulse">
        <div className="border-b border-border bg-muted/30 px-6 py-5 md:px-8 md:py-6">
          <div className="h-5 w-40 bg-muted rounded" />
          <div className="mt-2 h-4 w-72 bg-muted rounded" />
        </div>
        <div className="p-6 md:p-8 space-y-5">
          <div className="h-10 w-full max-w-xs bg-muted rounded-lg" />
          <div className="h-10 w-full max-w-xs bg-muted rounded-lg" />
          <div className="h-10 w-48 bg-muted rounded-lg" />
        </div>
      </div>
    ),
  },
);

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getRolePaths().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps) {
  const role = getRoleBySlug(params.slug);
  if (!role) return { title: "Role not found - Clykur Careers" };
  return {
    title: `${role.title} - Careers | Clykur`,
    description: `Apply for ${role.title} at Clykur. ${role.employmentType}, ${role.location}. ${role.industry}.`,
  };
}

export default function JobPage({ params }: PageProps) {
  const role = getRoleBySlug(params.slug);
  if (!role) notFound();

  const roleSlug = params.slug;

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All open roles
        </Link>

        <header className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            {role.industry}
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
            {role.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 text-sm font-medium text-foreground">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              {role.employmentType}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 text-sm font-medium text-foreground">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {role.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 text-sm font-medium text-foreground">
              {role.team}
            </span>
          </div>
        </header>

        <div className="space-y-12">
          <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4" aria-hidden />
              Job description
            </h2>
            <div className="space-y-4 text-foreground">
              {role.description.map((p, i) => (
                <p key={i} className="leading-relaxed text-[15px]">
                  {p}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <ListChecks className="h-4 w-4" aria-hidden />
              Requirements
            </h2>
            <ul className="space-y-3">
              {role.requirements.map((r, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start text-sm text-foreground"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 mt-0.5 text-primary"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4" aria-hidden />
              Qualifications we look for
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {role.qualifications.map((q, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="text-foreground">·</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Apply
            </h2>
            <ApplicationForm roleSlug={roleSlug} roleTitle={role.title} />
          </section>
        </div>
      </div>
    </div>
  );
}
