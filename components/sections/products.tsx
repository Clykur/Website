import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/products";

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
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-foreground/15 hover:shadow-md">
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
            className="w-full border-foreground/20 font-medium sm:w-auto group/btn text-sm sm:text-base"
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
  );
}

export function Products() {
  return (
    <section
      id="products"
      className="relative py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12"
      aria-labelledby="products-heading"
    >
      <div className="absolute inset-0 -z-10 bg-muted/25" aria-hidden />

      <div className="mx-auto max-w-6xl w-full">
        <header className="mb-10 sm:mb-16 text-center md:mb-20">
          <p className="mb-2 sm:mb-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Flagship products
          </p>
          <h2
            id="products-heading"
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            Our Products
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground md:text-xl px-0 sm:px-2 leading-relaxed">
            Category-defining software for modern businesses. We build products
            that solve real problems, then we ship them.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
