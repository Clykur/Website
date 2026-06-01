export const COMPANY_INFO = {
  name: "Clykur",
  url: "clykur.com",
  mission: "Bridging the gap between design and code. We transform design files from tools like Figma, Sketch, or Adobe XD into pixel-perfect, production-ready frontend code.",
  approach: "We work as long-term frontend partners, not short-term executors. We align with design systems, ensure consistency, and make informed decisions for long-term UX.",
  differentiators: [
    "Pixel-perfect accuracy",
    "Strong engineering fundamentals combined with UI/UX understanding",
    "Clean and maintainable code",
    "Clear communication",
    "Strategic use of AI tools for speed and quality"
  ],
  locationAndHours: "We work remotely across all time zones, delivering to clients worldwide."
};

export const SERVICES = [
  {
    name: "Website Frontend",
    description: "Converting design files into responsive, pixel-perfect websites."
  },
  {
    name: "Mobile App Frontend",
    description: "Building native and cross-platform mobile interfaces."
  },
  {
    name: "Web App Frontend",
    description: "Developing interactive web application interfaces with modern frameworks."
  },
  {
    name: "Design-to-Code",
    description: "Transforming mockups into production-ready frontend code."
  },
  {
    name: "Component Development",
    description: "Creating reusable, maintainable UI components."
  },
  {
    name: "Performance Optimization",
    description: "Optimizing frontend code for speed and responsiveness."
  }
];

export const TECHNICAL_EXPERTISE = {
  frameworks: ["Next.js (App Router)", "React"],
  languages: ["TypeScript", "JavaScript"],
  styling: ["Tailwind CSS"],
  uiComponents: ["shadcn/ui", "Radix UI"],
  designSystems: "Building scalable, accessible (WCAG 2.1 AA) systems."
};

export function buildKnowledgeContext(): string {
  return `
# About Clykur
- **Mission:** ${COMPANY_INFO.mission}
- **Approach:** ${COMPANY_INFO.approach}
- **Key Differentiators:** ${COMPANY_INFO.differentiators.join(', ')}
- **Location & Working Hours:** ${COMPANY_INFO.locationAndHours}

# Services Offered
${SERVICES.map(s => `- **${s.name}:** ${s.description}`).join('\n')}

# Technical Expertise
- **Frameworks:** ${TECHNICAL_EXPERTISE.frameworks.join(', ')}
- **Languages:** ${TECHNICAL_EXPERTISE.languages.join(', ')}
- **Styling:** ${TECHNICAL_EXPERTISE.styling.join(', ')}
- **UI Components:** ${TECHNICAL_EXPERTISE.uiComponents.join(', ')}
- **Design Systems:** ${TECHNICAL_EXPERTISE.designSystems}
`;
}
