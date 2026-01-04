const processSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    description:
      "We discuss your project requirements, timeline, and expectations to ensure we're aligned from the start.",
  },
  {
    step: "02",
    title: "Design Review",
    description:
      "I review your design files, identify any technical considerations, and provide feedback on implementation feasibility.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "I convert your designs into clean, responsive, and performant frontend code following best practices and your specifications.",
  },
  {
    step: "04",
    title: "Quality Assurance",
    description:
      "Thorough testing across devices and browsers to ensure pixel-perfect accuracy and optimal performance.",
  },
  {
    step: "05",
    title: "Delivery & Support",
    description:
      "Clean, documented code delivered on time, with ongoing support for any adjustments or questions.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            How I Work
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A clear, structured process that ensures quality results and smooth collaboration.
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-12 md:space-y-16">
            {processSteps.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-6 top-6 w-4 h-4 rounded-full bg-foreground border-4 border-background" />

                <div className="md:ml-20">
                  <div className="flex flex-col md:flex-row md:items-start md:gap-12">
                    {/* Step number - larger and more prominent */}
                    <div className="flex-shrink-0 mb-4 md:mb-0">
                      <div className="text-5xl md:text-6xl font-semibold text-muted-foreground/30 leading-none">
                        {item.step}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Divider between steps */}
                  {index < processSteps.length - 1 && (
                    <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-border" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

