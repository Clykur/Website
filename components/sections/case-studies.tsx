const caseStudies = [
  {
    title: "Enterprise SaaS Platform",
    challenge:
      "Complex design system with multiple components needed to be converted into a scalable React application.",
    approach:
      "Analyzed the design system, created a component library, and implemented a responsive interface with optimized performance.",
    result:
      "Delivered a fully responsive, production-ready frontend that matched the design specifications with 100% accuracy. The codebase was maintainable and scalable for future updates.",
    category: "Web App Frontend",
  },
  {
    title: "E-Commerce Marketplace",
    challenge:
      "Large-scale e-commerce design with complex product listings, filters, and checkout flows required pixel-perfect implementation.",
    approach:
      "Built responsive components with smooth animations, optimized for performance, and ensured accessibility standards were met throughout.",
    result:
      "Successfully launched with seamless user experience across all devices. The frontend handled high traffic efficiently and received positive user feedback.",
    category: "Website Frontend",
  },
  {
    title: "Mobile-First Dashboard",
    challenge:
      "Data-heavy dashboard design needed to be converted into an interactive, mobile-responsive interface with real-time updates.",
    approach:
      "Implemented a mobile-first approach, created reusable chart components, and optimized data visualization for various screen sizes.",
    result:
      "Delivered a highly responsive dashboard that works flawlessly on mobile, tablet, and desktop. Users reported improved usability and faster load times.",
    category: "Web App Frontend",
  },
];

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Case Studies
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Real projects showcasing my approach to solving frontend challenges and delivering results.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-md">
            <span>
              Client names and specific details are confidential per NDAs
            </span>
          </div>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-12 md:space-y-16">
            {caseStudies.map((study, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-6 top-6 w-4 h-4 rounded-full bg-foreground border-4 border-background" />

                <div className="md:ml-20">
                  <div className="flex flex-col md:flex-row md:items-start md:gap-12">
                    {/* Step number - larger and more prominent */}
                    <div className="flex-shrink-0 mb-4 md:mb-0">
                      <div className="text-5xl md:text-6xl font-semibold text-muted-foreground/30 leading-none">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Category badge */}
                      <div className="mb-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {study.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tight">
                        {study.title}
                      </h3>

                      {/* Content grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Challenge */}
                        <div className="border-l-2 border-border pl-4 md:pl-6">
                          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                            Challenge
                          </h4>
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {study.challenge}
                          </p>
                        </div>

                        {/* Approach */}
                        <div className="border-l-2 border-border pl-4 md:pl-6">
                          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                            Approach
                          </h4>
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {study.approach}
                          </p>
                        </div>

                        {/* Result */}
                        <div className="border-l-2 border-border pl-4 md:pl-6">
                          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                            Result
                          </h4>
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {study.result}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider between studies */}
                  {index < caseStudies.length - 1 && (
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

