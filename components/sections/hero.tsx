import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm md:text-base font-medium text-muted-foreground mb-4 tracking-wide uppercase">
          A Click Away
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight mb-6 text-balance">
          Professional Freelance Services
          <br />
          <span className="text-muted-foreground">for Clients Worldwide</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 text-balance">
          Delivering quality, reliability, and expertise. Your vision, executed
          with precision and care.
        </p>
        <p className="text-base md:text-lg font-medium text-foreground max-w-2xl mx-auto mb-6">
          Transforming design files into production-ready frontend code with pixel perfect accuracy and optimal performance.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full mb-10">
          <span className="text-sm font-medium text-foreground">
            Remote Work Only • All Time Zones
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="group">
            <Link href="#contact">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#services">View Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

