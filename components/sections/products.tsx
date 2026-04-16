import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

/** One crisp sentence for the card body—no walls of copy. */
function leadSentence(text: string) {
  const dot = text.indexOf(". ");
  if (dot === -1) return text;
  return text.slice(0, dot + 1);
}

function ProductCard({
  index,
  name,
  tagline,
  description,
  url,
  image,
}: {
  index: number;
  name: string;
  tagline: string;
  description: string;
  url: string;
  image: string;
}) {
  const summary = leadSentence(description);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_22px_50px_-34px_rgba(10,10,10,0.1)] transition-shadow duration-300 hover:border-foreground/[0.11] hover:shadow-[0_28px_60px_-32px_rgba(255,59,31,0.1)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#faf6f3]">
        <Image
          src={image}
          alt={`${name} — ${tagline}`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Light warm wash — brand orange, not heavy */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(255,59,31,0.14)_0%,rgba(255,120,90,0.05)_38%,transparent_62%),linear-gradient(to_bottom,rgba(255,90,60,0.07)_0%,transparent_42%)]"
          aria-hidden
        />
        <span className="absolute left-4 top-4 font-mono text-[10px] tabular-nums text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
          {(index + 1).toString().padStart(2, "0")}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/92 text-foreground/50 shadow-lg backdrop-blur-sm transition-colors hover:border-[#ff3b1f]/45 hover:text-[#ff3b1f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff3b1f]"
          aria-label={`Open ${name} in a new tab`}
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.85} aria-hidden />
        </a>
      </div>

      <div className="flex flex-1 flex-col border-t border-foreground/[0.06] px-5 py-6 md:px-6 md:py-7">
        <h3 className="font-poppins text-lg font-medium leading-snug tracking-[-0.02em] text-foreground md:text-xl">
          {name}
        </h3>
        <p className="mt-2 text-[13px] leading-snug text-foreground/48 md:text-[14px]">
          {tagline}
        </p>
        <p className="mt-4 text-[13px] leading-[1.75] text-foreground/52 md:text-[14px]">
          {summary}
        </p>

        <div className="mt-6 border-t border-foreground/[0.06] pt-5">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45 transition-colors hover:text-[#ff3b1f]"
          >
            Visit live product
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.85} aria-hidden />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <section
      id="products"
      className="clykur-story-section relative overflow-hidden border-t border-foreground/[0.05]"
      aria-labelledby="products-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-white" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-18%,rgba(255,59,31,0.05),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fafaf9]/80 via-transparent to-[#f5f5f4]/40"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <header data-reveal-item className="mb-10 md:mb-12">
          <div className="mb-4 flex items-center gap-4">
            <span
              className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent"
              aria-hidden
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
              Flagship products
            </p>
          </div>
          <h2
            id="products-heading"
            className="font-poppins text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.03em] text-foreground"
          >
            Our Products
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/48 md:text-base">
            Live products we own and ship preview here, explore on-site.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2 lg:gap-7">
          {PRODUCTS.map((product, index) => (
            <div key={product.name} data-reveal-item>
              <ProductCard
                index={index}
                name={product.name}
                tagline={product.tagline}
                description={product.description}
                url={product.url}
                image={product.image}
              />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
