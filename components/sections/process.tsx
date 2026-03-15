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
      "We review your design files, identify technical considerations, and provide feedback on implementation feasibility.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "We convert your designs into clean, responsive, and performant frontend code following best practices and your specifications.",
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
    <section
      id="process"
      className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-muted/20"
      aria-labelledby="process-heading"
    >
      <div className="max-w-6xl mx-auto w-full">
        <header className="mb-16 md:mb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Engineering partnerships
          </p>
          <h2
            id="process-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 text-foreground"
          >
            How we work
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            A clear, structured process that ensures quality and alignment, from
            kickoff to delivery and support.
          </p>
        </header>

        <ul className="space-y-0" aria-label="Process steps">
          {processSteps.map((item) => (
            <li
              key={item.step}
              className="flex flex-col md:flex-row gap-4 md:gap-12 py-8 md:py-12 border-b border-border last:border-b-0 first:pt-0"
            >
              <div className="flex shrink-0 flex-col items-start md:items-center">
                <span className="text-5xl md:text-6xl font-semibold tabular-nums text-foreground/15">
                  {item.step}
                </span>
              </div>
              <div className="min-w-0 flex-1 md:pt-1">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-muted-foreground w-full">
          Each phase is defined with clear outcomes and checkpoints so you
          always know where we stand.
        </p>
      </div>
    </section>
  );
}
