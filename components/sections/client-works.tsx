import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CinematicWorkTile } from "@/components/client-works/cinematic-work-tile";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { CLIENT_WORKS } from "@/lib/client-works";
import { cn } from "@/lib/utils";

const [featured, ...rest] = CLIENT_WORKS;

export function ClientWorks() {
  return (
    <section
      id="client-works"
      className="clykur-story-section relative border-t border-foreground/[0.05]"
      aria-labelledby="client-works-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,rgba(255,59,31,0.07),transparent_52%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#fafaf9] to-white"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3] [background-image:linear-gradient(to_right,rgba(10,10,10,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.028)_1px,transparent_1px)] [background-size:80px_80px]"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <header data-reveal-item className="mb-12 md:mb-16 lg:mb-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-4">
                <span
                  className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-[#ff3b1f]/0"
                  aria-hidden
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
                  Live sites
                </p>
              </div>
              <h2
                id="client-works-heading"
                className="font-poppins text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground"
              >
                Client Works
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-[1.75] text-foreground/48 md:text-base">
                A selection of digital experiences crafted with precision and
                intent.
              </p>
            </div>
            <div className="w-full shrink-0 border border-foreground/[0.08] bg-white/75 px-5 py-4 shadow-[0_24px_48px_-32px_rgba(10,10,10,0.1)] backdrop-blur-md sm:max-w-md lg:max-w-sm">
              <p className="text-[12.5px] leading-relaxed text-foreground/45">
                Full-bleed launches with the same polish we bring to product and
                motion, type, and performance tuned for the brand.
              </p>
            </div>
          </div>
        </header>

        <ul className="grid list-none grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          <li data-reveal-item className="min-w-0 lg:col-span-2">
            <CinematicWorkTile
              work={featured}
              index={0}
              featured
              sizes="(max-width: 1024px) 100vw, min(1152px, 100vw)"
              priority
            />
          </li>
          {rest.map((work, i) => (
            <li key={work.href} data-reveal-item className="min-w-0">
              <CinematicWorkTile
                work={work}
                index={i + 1}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </li>
          ))}
        </ul>

        <div
          data-reveal-item
          className="mt-14 flex justify-center border-t border-foreground/[0.06] pt-12 md:mt-[4.5rem] md:pt-16"
        >
          <Link
            href="/work"
            className={cn(
              "inline-flex items-center gap-2.5 rounded-full border border-foreground/[0.1] bg-white/95 px-7 py-3.5",
              "font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/55",
              "shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_16px_40px_-28px_rgba(10,10,10,0.12)]",
              "transition-[color,transform,border-color,box-shadow] duration-300",
              "hover:-translate-y-0.5 hover:border-[#ff3b1f]/28 hover:text-[#ff3b1f]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/35 focus-visible:ring-offset-2",
            )}
          >
            View all work
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.85} aria-hidden />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
