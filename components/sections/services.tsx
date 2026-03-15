import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    title: "Frontend engineering",
    description:
      "Production-ready interfaces from design to deployment. Clean code, modern frameworks, and performance that scales.",
  },
  {
    title: "Design-to-code implementation",
    description:
      "Figma, Sketch, or Adobe XD turned into pixel-perfect, accessible frontend code. We match your design system and ship on time.",
  },
  {
    title: "Web applications",
    description:
      "Interactive web app interfaces built with the right stack. We translate complex product requirements into functional, maintainable UI.",
  },
  {
    title: "Mobile UI systems",
    description:
      "Native and cross-platform mobile interfaces from design mockups. Smooth animations, gestures, and consistent experiences across devices.",
  },
  {
    title: "Performance optimization",
    description:
      "Frontend code tuned for speed and responsiveness. We fix bottlenecks and set up the right metrics so your product stays fast.",
  },
  {
    title: "Component systems",
    description:
      "Reusable, documented component libraries that scale with your product. Built for design consistency and developer velocity.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="bg-muted/30 py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl w-full">
        <header className="mb-16 md:mb-20 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Engineering partnerships
          </p>
          <h2
            id="services-heading"
            className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
          >
            Engineering services
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            We also work with companies to build high-quality software.
            Engineering partnerships with product teams, not freelance gigs. We
            align with your roadmap and ship with you.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="border-border transition-colors hover:border-foreground/20"
            >
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
