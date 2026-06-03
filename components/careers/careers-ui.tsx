import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Briefcase, ChevronRight, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import {
  storyBodyProseClass,
  storySectionH2Class,
  storySurfaceCardClass,
} from "@/components/layout/story-page-shell";
import { getSlugForRole, type CareerRole } from "@/lib/careers-roles";
import { cn } from "@/lib/utils";

export const careersSurfaceClass = storySurfaceCardClass;

export const careersCoralRuleClass =
  "h-[3px] w-full bg-gradient-to-r from-[#ff3b1f]/90 via-[#ff3b1f]/40 to-transparent";

type CareerSectionCardProps = {
  id: string;
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
};

export function CareerSectionCard({
  id,
  title,
  icon: Icon,
  children,
  className,
}: CareerSectionCardProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(careersSurfaceClass, "overflow-hidden", className)}
    >
      <div className="border-b border-foreground/[0.08] bg-gradient-to-r from-[#fafaf9] via-white to-[#fafaf9] px-5 py-4 md:px-8 md:py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ff3b1f]/20 bg-[#ff3b1f]/[0.06] text-[#ff3b1f]">
            <Icon
              className="h-[18px] w-[18px]"
              strokeWidth={1.65}
              aria-hidden
            />
          </span>
          <h2
            id={headingId}
            className={cn(storySectionH2Class, "text-lg md:text-xl")}
          >
            {title}
          </h2>
        </div>
      </div>
      <div className={careersCoralRuleClass} aria-hidden />
      <div className="px-5 py-6 md:px-8 md:py-8">{children}</div>
    </section>
  );
}

export function RoleListCard({ role }: { role: CareerRole }) {
  return (
    <Link
      href={`/careers/${getSlugForRole(role)}`}
      className={cn(
        careersSurfaceClass,
        "group relative block overflow-hidden p-5 transition-all duration-300 md:p-6",
        "hover:-translate-y-0.5 hover:border-[#ff3b1f]/20 hover:shadow-[0_28px_56px_-32px_rgba(255,59,31,0.12)]",
      )}
    >
      <span
        className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#ff3b1f]/80 to-[#ff3b1f]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div className="flex items-start justify-between gap-4 pl-1">
        <div className="min-w-0">
          <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/38">
            {role.team}
          </p>
          <h3 className="font-poppins text-[1.0625rem] font-semibold tracking-[-0.02em] text-foreground md:text-lg">
            {role.title}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-foreground/[0.08] bg-[#fafaf9] px-2.5 py-1 text-[12px] font-medium text-foreground/65">
              <Briefcase
                className="h-3.5 w-3.5 text-[#ff3b1f]/70"
                aria-hidden
              />
              {role.employmentType}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-foreground/[0.08] bg-[#fafaf9] px-2.5 py-1 text-[12px] font-medium text-foreground/65">
              <MapPin className="h-3.5 w-3.5 text-[#ff3b1f]/70" aria-hidden />
              {role.location}
            </span>
          </div>
        </div>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/[0.08] bg-white text-foreground/30 transition-all duration-300 group-hover:border-[#ff3b1f]/25 group-hover:text-[#ff3b1f]"
          aria-hidden
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </div>
    </Link>
  );
}

export function CareersBackLink() {
  return (
    <Link
      href="/careers"
      className="inline-flex items-center gap-2 rounded-xl border border-foreground/[0.1] bg-white px-5 py-2.5 text-[13px] font-semibold text-foreground/70 transition-colors hover:border-[#ff3b1f]/30 hover:text-[#ff3b1f]"
    >
      All open roles
      <ArrowLeft className="h-4 w-4" aria-hidden />
    </Link>
  );
}

export { storyBodyProseClass };
