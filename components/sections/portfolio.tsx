import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

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
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Portfolio
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            A selection of frontend projects showcasing design-to-code transformations across websites, mobile apps, and web applications.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-md">
            <Lock className="h-4 w-4" />
            <span>
              Project details are restricted due to client confidentiality and
              NDAs
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {portfolioItems.map((item) => (
            <Card
              key={item.title}
              className="border-border hover:border-foreground/20 transition-colors"
            >
              <CardHeader>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
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
          ))}
        </div>
      </div>
    </section>
  );
}

