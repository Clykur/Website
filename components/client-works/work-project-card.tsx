import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ClientWork } from "@/lib/client-works";
import { cn } from "@/lib/utils";

function hostnameFromHref(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

type WorkProjectCardProps = {
  work: ClientWork;
  sizes: string;
  priority?: boolean;
};

export function WorkProjectCard({
  work,
  sizes,
  priority,
}: WorkProjectCardProps) {
  const host = hostnameFromHref(work.href);

  return (
    <a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${work.name}: ${work.tagline}. Open live site`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white",
        "shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_20px_44px_-32px_rgba(10,10,10,0.1)]",
        "transition-[border-color,box-shadow,transform] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-foreground/[0.12] hover:shadow-[0_24px_56px_-28px_rgba(10,10,10,0.12)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/40 focus-visible:ring-offset-2",
      )}
    >
      <div className="flex items-center gap-3 border-b border-foreground/[0.06] bg-[#fafaf9] px-4 py-2.5">
        <span className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-foreground/[0.08]" />
          <span className="h-2 w-2 rounded-full bg-foreground/[0.08]" />
          <span className="h-2 w-2 rounded-full bg-foreground/[0.08]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md border border-foreground/[0.06] bg-white px-3 py-1 font-mono text-[10px] text-foreground/45">
          {host}
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-white">
        <div className="absolute inset-0 origin-top transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.03] group-hover:blur-[3px] motion-reduce:transition-none motion-reduce:group-hover:blur-0 motion-reduce:group-hover:scale-100">
          <Image
            src={work.image}
            alt=""
            fill
            sizes={sizes}
            className="object-cover object-top"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            quality={90}
          />
        </div>
        <div
          className={cn(
            "absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/50 via-black/15 to-transparent p-4 opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100 group-focus-visible:opacity-100",
            "max-sm:opacity-0",
          )}
          aria-hidden
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-foreground shadow-sm">
            Open live site
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-foreground/[0.06] px-4 py-4 sm:px-5 sm:py-5">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ff3b1f]/90">
          {work.category}
        </p>
        <h3 className="mt-2 font-poppins text-[17px] font-medium leading-snug tracking-[-0.02em] text-foreground sm:text-lg">
          {work.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-foreground/55">
          {work.tagline}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground/70 transition-colors group-hover:text-[#ff3b1f]">
          Visit site
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.85}
            aria-hidden
          />
        </span>
      </div>
    </a>
  );
}
