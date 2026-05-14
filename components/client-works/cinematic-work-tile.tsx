import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ClientWork } from "@/lib/client-works";
import { cn } from "@/lib/utils";

type CinematicWorkTileProps = {
  work: ClientWork;
  index: number;
  featured?: boolean;
  sizes: string;
  priority?: boolean;
};

export function CinematicWorkTile({
  work,
  index,
  featured,
  sizes,
  priority,
}: CinematicWorkTileProps) {
  const n = (index + 1).toString().padStart(2, "0");

  return (
    <a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative isolate block overflow-hidden rounded-[1.5rem] ring-1 ring-black/[0.06] transition-[transform,box-shadow,ring-color] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] md:rounded-[2rem]",
        "shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_40px_80px_-48px_rgba(10,10,10,0.35)]",
        "hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_48px_90px_-40px_rgba(255,59,31,0.18)] hover:ring-[#ff3b1f]/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf9]",
      )}
      aria-label={`${work.name} — open live site in a new tab`}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-neutral-900",
          featured
            ? "min-h-[min(320px,78vw)] sm:min-h-[380px] lg:min-h-[420px]"
            : "min-h-[min(300px,72vw)] sm:min-h-[360px] lg:min-h-[400px]",
        )}
      >
        <Image
          src={work.image}
          alt=""
          fill
          sizes={sizes}
          className="object-cover object-center transition-transform [transition-duration:1.15s] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.06]"
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
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.85} aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
