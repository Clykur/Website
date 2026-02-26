import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Mail,
  ArrowLeft,
  Briefcase,
  MapPin,
  FileText,
  ListChecks,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  getRoleBySlug,
  getRolePaths,
  getMailtoUrl,
} from "@/lib/careers-roles";

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

  const mailtoUrl = getMailtoUrl(role);

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All open roles
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            {role.title}
          </h1>
          <p className="text-muted-foreground mb-4">{role.industry}</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-sm font-medium">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              {role.employmentType}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-sm font-medium">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {role.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-sm font-medium">
              {role.team}
            </span>
          </div>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Job description
            </h2>
            <div className="space-y-2 text-foreground">
              {role.description.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-muted-foreground" />
              Requirements
            </h2>
            <ul className="space-y-2">
              {role.requirements.map((r, i) => (
                <li key={i} className="flex gap-2 items-start text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-foreground" aria-hidden />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              Qualifications we look for
            </h2>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {role.qualifications.map((q, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-foreground">·</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-muted/20 p-6 md:p-8">
            <h2 className="text-lg font-semibold tracking-tight mb-2">Apply for this role</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Send your resume and how you meet the requirements to the email below. We&apos;ll respond to every application.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href={mailtoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Apply via email
              </a>
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
