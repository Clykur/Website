import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { CLYKUR_FOUNDING_TEAM } from "@/lib/site-founding-team";
import {
  storyBodyProseClass,
  storySectionH2Class,
  storySurfaceCardClass,
} from "@/components/layout/story-page-shell";
import { cn } from "@/lib/utils";

export function FoundingTeamSection() {
  return (
    <section className="mb-8 md:mb-10" aria-labelledby="founding-team-heading">
      <div
        className={cn(
          storySurfaceCardClass,
          "overflow-hidden p-6 md:p-8 lg:p-10",
        )}
      >
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/42">
          People
        </p>
        <h2
          id="founding-team-heading"
          className={cn(storySectionH2Class, "mb-3")}
        >
          Founding team
        </h2>
        <p className={cn("mb-8 max-w-2xl md:mb-10", storyBodyProseClass)}>
          Clykur is led by founders who build products and ship client systems
          with the same standards we hold for Cusown and FreeTrust.
        </p>

        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:gap-12">
          {CLYKUR_FOUNDING_TEAM.map((member, index) => (
            <li key={member.id} className="flex flex-col">
              <div className="group relative overflow-hidden rounded-2xl bg-[#f4f3f1] ring-1 ring-foreground/[0.06]">
                <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5]">
                  <Image
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    fill
                    priority={index === 0}
                    quality={90}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                    className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.015]"
                    style={{
                      objectPosition: member.imagePosition ?? "center 15%",
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between gap-3 sm:mt-6">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff3b1f]/85">
                    {member.role}
                  </p>
                  <h3 className="mt-1 font-poppins text-xl font-semibold tracking-[-0.02em] text-foreground md:text-[1.35rem]">
                    {member.name}
                  </h3>
                </div>
                <Link
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-foreground/[0.04] hover:text-[#0a66c2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25 focus-visible:ring-offset-2"
                >
                  <Linkedin className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  <span className="sr-only">{member.name} on LinkedIn</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
