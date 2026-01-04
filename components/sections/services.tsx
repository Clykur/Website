import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Website Frontend",
    description:
      "Converting design files into responsive, pixel-perfect websites with clean, semantic code and optimal performance.",
  },
  {
    title: "Mobile App Frontend",
    description:
      "Building native and cross-platform mobile app interfaces from design mockups, ensuring smooth animations and interactions.",
  },
  {
    title: "Web App Frontend",
    description:
      "Developing interactive web application interfaces with modern frameworks, translating designs into functional components.",
  },
  {
    title: "Design-to-Code",
    description:
      "Transforming Figma, Sketch, or Adobe XD designs into production-ready frontend code with attention to detail.",
  },
  {
    title: "Component Development",
    description:
      "Creating reusable, maintainable UI components that match your design system and follow best practices.",
  },
  {
    title: "Performance Optimization",
    description:
      "Optimizing frontend code for speed, responsiveness, and smooth user experiences across all devices.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Frontend development services for design-ready projects across websites, mobile apps, and web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="border-border hover:border-foreground/20 transition-colors"
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

