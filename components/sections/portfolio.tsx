import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { TiltCard } from "@/components/landing/tilt-card";

const portfolioItems = [
  {
    title: "Enterprise Website Frontend",
    description:
      "Converted complex design files into a fully responsive, pixel-perfect website with smooth animations and optimal performance across all devices.",
    category: "Website Frontend",
  },
  {
    title: "Mobile App Interface",
    description:
      "Built native mobile app frontend from design mockups, implementing custom animations, gestures, and seamless user interactions.",
    category: "Mobile App Frontend",
  },
  {
    title: "Web Application UI",
    description:
      "Developed interactive web application interface with modern React components, translating complex designs into functional, accessible UI.",
    category: "Web App Frontend",
  },
  {
    title: "Design System Implementation",
    description:
      "Transformed comprehensive design system into reusable component library, ensuring consistency and maintainability across the application.",
    category: "Component Development",
  },
  {
    title: "E-Commerce Frontend",
    description:
      "Converted e-commerce design files into responsive frontend with shopping cart, product listings, and checkout flows with pixel-perfect accuracy.",
    category: "Website Frontend",
  },
  {
    title: "Dashboard Interface",
    description:
      "Built interactive dashboard frontend from design specifications, implementing data visualizations and responsive layouts for optimal user experience.",
    category: "Web App Frontend",
  },
];

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="clykur-story-section bg-white"
      aria-labelledby="portfolio-heading"
    >
      <ScrollReveal className="clykur-story-shell">
        <header data-reveal-item className="mb-16 text-center md:mb-20">
          <h2 id="portfolio-heading" className="mb-4 text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Portfolio
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            A selection of frontend projects showcasing design-to-code
            transformations across websites, mobile apps, and web applications.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-md">
            <Lock className="h-4 w-4" />
            <span>
              Project details are restricted due to client confidentiality and
              NDAs
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <div key={item.title} data-reveal-item>
              <TiltCard>
                <Card className="clykur-card-shadow rounded-2xl border border-border bg-white transition-colors hover:border-border">
                  <CardHeader>
                    <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {item.category}
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </TiltCard>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
