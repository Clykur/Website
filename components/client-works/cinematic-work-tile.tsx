import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ClientWork } from "@/lib/client-works";
import { cn } from "@/lib/utils";

type WorkTilePresentation = "cinematic" | "gallery";

/** Desktop capture ratio (1440×900) so full-page shots fit uniformly. */
export const galleryTileAspectClass = "aspect-[16/10]";

type CinematicWorkTileProps = {
  work: ClientWork;
  index: number;
  featured?: boolean;
  sizes: string;
  priority?: boolean;
  /** Gallery: full screenshot, uniform tiles, hover blur + dark text on white panel. */
  presentation?: WorkTilePresentation;
};

export function CinematicWorkTile({
  work,
  index,
  featured,
  sizes,
  priority,
  presentation = "cinematic",
}: CinematicWorkTileProps) {
  const n = (index + 1).toString().padStart(2, "0");
  const isGallery = presentation === "gallery";

  const frameClass = cn(
    "group relative isolate block w-full overflow-hidden transition-[transform,box-shadow,ring-color] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
    isGallery
      ? "rounded-xl ring-1 ring-foreground/[0.08] shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_48px_-32px_rgba(10,10,10,0.1)] hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_32px_64px_-28px_rgba(255,59,31,0.1)] hover:ring-[#ff3b1f]/15 md:rounded-2xl"
      : "rounded-[1.5rem] ring-1 ring-black/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_40px_80px_-48px_rgba(10,10,10,0.35)] hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_48px_90px_-40px_rgba(255,59,31,0.18)] hover:ring-[#ff3b1f]/20 md:rounded-[2rem]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf9]",
  );

  const aspectClass = isGallery
    ? galleryTileAspectClass
    : featured
      ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] lg:min-h-[320px]"
      : "aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/10]";

  return (
    <a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      className={frameClass}
      aria-label={`${work.name}: ${work.tagline}. Open live site in a new tab`}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          isGallery ? "bg-[#eceae6]" : "bg-neutral-900",
          aspectClass,
        )}
      >
        {isGallery ? (
          <>
            <div className="absolute inset-0 sm:transition-[filter,transform] sm:duration-500 sm:ease-out motion-reduce:sm:transition-none sm:group-hover:blur-[4px] sm:group-hover:scale-[1.01] sm:group-focus-visible:blur-[4px] sm:group-focus-visible:scale-[1.01]">
              <Image
                src={work.image}
                alt=""
                fill
                sizes={sizes}
                className="object-contain object-top p-1 sm:p-1.5"
                loading={priority ? "eager" : "lazy"}
                priority={priority}
                quality={90}
              />
            </div>

            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 border-t border-foreground/[0.08] bg-white px-4 py-4 shadow-[0_-16px_40px_-12px_rgba(10,10,10,0.12)] transition-transform duration-500 ease-out sm:px-5 sm:py-5",
                "max-sm:translate-y-0",
                "sm:translate-y-full sm:group-hover:translate-y-0 sm:group-focus-visible:translate-y-0",
              )}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ff3b1f]">
                {work.category}
              </p>
              <h3 className="mt-1.5 font-poppins text-lg font-medium leading-snug tracking-[-0.02em] text-foreground">
                {work.name}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-foreground/62">
                {work.tagline}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#ff3b1f]">
                Visit live site
                <ArrowUpRight
                  className="h-4 w-4"
                  strokeWidth={1.85}
                  aria-hidden
                />
              </span>
            </div>

            <span
              className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-foreground/[0.12] bg-white/95 text-foreground opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:right-4 sm:top-4"
              aria-hidden
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.85} />
            </span>
          </>
        ) : (
          <>
            <Image
              src={work.image}
              alt={`${work.name}: ${work.category}`}
              fill
              sizes={sizes}
              className="object-cover object-center transition-[transform,filter] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.06]"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
              quality={90}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_70%_20%,rgba(255,90,60,0.08),transparent_55%)]"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/[0.88] via-black/35 to-black/10 transition-opacity duration-500 group-hover:from-black/[0.92]"
              aria-hidden
            />
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60"
              aria-hidden
            />

            <span className="absolute left-4 top-4 font-mono text-[11px] font-medium tabular-nums tracking-[0.35em] text-white/45 md:left-8 md:top-8">
              {n}
            </span>
            <span
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-[background-color,border-color,color,transform] duration-300 group-hover:scale-105 group-hover:border-white/35 group-hover:bg-white/18 md:right-8 md:top-8"
              aria-hidden
            >
              <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={1.85} />
            </span>

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
              <div className="max-w-xl">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ffb4a8]/95">
                  {work.category}
                </p>
                <h3
                  className={cn(
                    "mt-3 font-poppins font-medium tracking-[-0.03em] text-white",
                    featured
                      ? "text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08]"
                      : "text-[clamp(1.375rem,3vw,1.875rem)] leading-[1.12]",
                  )}
                >
                  {work.name}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/78 md:text-[15px]">
                  {work.tagline}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] text-white/95 opacity-90 transition-[gap,opacity] duration-300 group-hover:gap-3 group-hover:opacity-100">
                  Visit live site
                  <ArrowUpRight
                    className="h-4 w-4"
                    strokeWidth={1.85}
                    aria-hidden
                  />
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </a>
  );
}
