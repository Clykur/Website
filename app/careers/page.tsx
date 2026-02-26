"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mail,
  ArrowLeft,
  Briefcase,
  MapPin,
  Building2,
  CheckCircle2,
  FileText,
  ListChecks,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";
import {
  ROLES,
  TEAMS,
  EMPLOYMENT_TYPES,
  LOCATIONS,
  getMailtoUrl,
  type CareerRole,
} from "@/lib/careers-roles";

const CAREERS_INTRO = {
  eyebrow: "Careers at Clykur",
  headline: "Build what matters, with us",
  supporting:
    "We're a small team building software that helps businesses grow. Join us to work on real products, with real impact — remote-first and outcome-focused.",
  aboutTitle: "Why Clykur",
  aboutBody:
    "Clykur delivers smart, scalable software — from web and mobile apps to cloud and AI. We focus on reliability and clear communication so our clients can move fast. Recognized as an MSME under the Government of India, we turn ambitious ideas into shipped products. If you like ownership, clarity, and a no-drama culture, you'll fit right in.",
};

function RoleCard({
  role,
  isExpanded,
  onToggle,
}: {
  role: CareerRole;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const mailtoUrl = getMailtoUrl(role);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-5 md:p-6 text-left hover:bg-muted/30 transition-colors flex items-center justify-between gap-4"
        aria-expanded={isExpanded}
      >
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight truncate">
            {role.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
            <span>{role.team}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" />
              {role.employmentType}
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {role.location}
            </span>
          </div>
        </div>
        <span className="shrink-0 text-muted-foreground" aria-hidden>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>
      {isExpanded && (
        <div className="border-t border-border bg-muted/10">
          <div className="p-5 md:p-6 space-y-6">
            <p className="text-sm text-muted-foreground">{role.industry}</p>
            <div>
              <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Job description
              </h3>
              <div className="space-y-2 text-foreground">
                {role.description.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-muted-foreground" />
                Requirements
              </h3>
              <ul className="space-y-2">
                {role.requirements.map((r, i) => (
                  <li key={i} className="flex gap-2 items-start text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-foreground" aria-hidden />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                Qualifications we look for
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {role.qualifications.map((q, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-foreground">·</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2">
              <Button asChild size="default" className="w-full sm:w-auto">
                <a
                  href={mailtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Apply for this role
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState<string>("All");
  const [employmentType, setEmploymentType] = useState<string>("All");
  const [location, setLocation] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(ROLES[0]?.id ?? null);

  const filteredRoles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ROLES.filter((role) => {
      const matchSearch = !q || role.title.toLowerCase().includes(q);
      const matchTeam = team === "All" || role.team === team;
      const matchEmployment = employmentType === "All" || role.employmentType === employmentType;
      const matchLocation = location === "All" || role.location === location;
      return matchSearch && matchTeam && matchEmployment && matchLocation;
    });
  }, [search, team, employmentType, location]);

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 md:mb-10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mb-10 md:mb-12">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
            {CAREERS_INTRO.eyebrow}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance leading-tight">
            {CAREERS_INTRO.headline}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {CAREERS_INTRO.supporting}
          </p>
        </header>

        <section className="mb-10 rounded-xl border border-border bg-muted/20 p-6 md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4" aria-hidden />
            {CAREERS_INTRO.aboutTitle}
          </h2>
          <p className="text-foreground leading-relaxed max-w-3xl">
            {CAREERS_INTRO.aboutBody}
          </p>
        </section>

        <h2 className="text-xl font-semibold tracking-tight mb-4">Open roles</h2>
        <div className="rounded-xl border border-border bg-muted/20 p-4 md:p-5 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                placeholder="Search by role title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30"
                aria-label="Search roles"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                aria-label="Filter by team"
              >
                <option value="All">All teams</option>
                {TEAMS.filter((t) => t !== "All").map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                aria-label="Filter by employment type"
              >
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                aria-label="Filter by location"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Users className="h-4 w-4" aria-hidden />
          <span>
            {filteredRoles.length} open role{filteredRoles.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="space-y-3">
          {filteredRoles.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">
              No roles match your filters. Try adjusting the search or filters.
            </p>
          ) : (
            filteredRoles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                isExpanded={expandedId === role.id}
                onToggle={() =>
                  setExpandedId((prev) => (prev === role.id ? null : role.id))
                }
              />
            ))
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Don&apos;t see a fit? We still want to hear from you. Reach out at{" "}
            <a
              href={`mailto:info@clykur.com?subject=General%20careers%20inquiry%20-%20Clykur`}
              className="text-foreground underline underline-offset-2 hover:no-underline"
            >
              info@clykur.com
            </a>{" "}
            with your resume and a short note.
          </p>
        </div>
      </div>
    </div>
  );
}
