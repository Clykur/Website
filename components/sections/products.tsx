import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/products";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { TiltCard } from "@/components/landing/tilt-card";

function ProductCard({
  name,
  tagline,
  description,
  problem,
  whyItMatters,
  url,
  image,
  benefits,
}: {
  name: string;
  tagline: string;
  description: string;
  problem: string;
  whyItMatters: string;
  url: string;
  image: string;
  benefits: string[];
}) {
  return (
    <TiltCard className="h-full perspective-[1000px]">
      <Card className="group clykur-card-shadow relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:border-border">
      <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-muted/30">
        <Image
          src={image}
          alt={`${name} - ${tagline}`}
          fill
          className={cn(
            "object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]",
            name === "FreeTrust" && "grayscale",
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
          priority={false}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60"
          aria-hidden
        />
      </div>

      <CardHeader className="space-y-1 sm:space-y-1.5 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-foreground">
          {name}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-snug">
          {tagline}
        </p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
        <p className="mb-4 sm:mb-5 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mb-4 sm:mb-5 space-y-2 sm:space-y-3 border-l-2 border-foreground/15 pl-3 sm:pl-4">
          <p className="text-xs sm:text-sm font-medium text-foreground">
            The problem
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {problem}
          </p>
          <p className="text-xs sm:text-sm font-medium text-foreground pt-0.5">
            Why it matters
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {whyItMatters}
          </p>
        </div>

        <p className="mb-2 sm:mb-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Key value
        </p>
        <ul className="mb-4 sm:mb-6 grid gap-1.5 sm:gap-2 sm:grid-cols-1">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-foreground"
            >
              <span className="mt-0.5 flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-foreground/10">
                <Check
                  className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-foreground"
                  strokeWidth={2.5}
                />
              </span>
              <span className="leading-snug">{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">
          <Button
  asChild
  variant="outline"
  size="default"
  className="w-full sm:w-auto rounded-2xl px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300 border-foreground/20 group/btn"
>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2"
            >
              Visit {name}
              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0" />
            </a>
          </Button>
        </div>
      </CardContent>
      </Card>
    </TiltCard>
  );
}

export function Products() {
  return (
    <section
      id="products"
      className="clykur-story-section clykur-section-soft"
      aria-labelledby="products-heading"
    >
      <div className="absolute inset-0 -z-10 clykur-section-soft" aria-hidden />

      <ScrollReveal className="clykur-story-shell">
        <header data-reveal-item className="mb-14 text-center md:mb-20">
          <p className="mb-2 sm:mb-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Flagship products
          </p>
          <h2 id="products-heading" className="text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Our Products
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground md:text-xl px-0 sm:px-2 leading-relaxed">
            Category-defining software for modern businesses. We build products
            that solve real problems, then we ship them.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          {PRODUCTS.map((product) => (
            <div key={product.name} data-reveal-item>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
