import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10 bg-muted/20" aria-hidden />

      <div className="w-full px-4 pt-24 pb-20 sm:px-6 md:px-8 md:pt-32 lg:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <p
              className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-sm"
              id="hero-eyebrow"
            >
              Product innovation company & engineering partner
            </p>
            <h1
              id="hero-heading"
              className="mb-6 max-w-5xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4rem] xl:leading-[1.05]"
            >
              Building software products that{" "}
              <span className="text-foreground/40 font-bold">
                power modern businesses
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-base text-muted-foreground sm:text-lg md:text-xl md:leading-relaxed">
              We build scalable products and partner with companies to create
              exceptional software, from category-defining SaaS to high-impact
              engineering partnerships.
            </p>
            <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-5 py-2.5 backdrop-blur-sm">
              <span className="text-sm font-medium text-foreground">
                Remote-first · Global · Ship fast
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="group w-full sm:w-auto">
                <Link href="#products">
                  Explore Our Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group w-full sm:w-auto"
              >
                <Link
                  href="#services"
                  className="inline-flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  Work With Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
