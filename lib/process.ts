export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  checkpoint: string;
  deliverables: string[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Consultation",
    description:
      "We align on goals, constraints, and what success looks like before any design or code work begins.",
    checkpoint: "Written scope, timeline, and success criteria signed off.",
    deliverables: [
      "Discovery notes and open questions list",
      "Milestone plan with dates",
      "Communication and review cadence",
    ],
  },
  {
    step: "02",
    title: "Design review",
    description:
      "Figma or reference designs are checked for feasibility, responsive behavior, and edge cases.",
    checkpoint: "Design approved for build with documented exceptions.",
    deliverables: [
      "Feasibility notes and component inventory",
      "Breakpoint and interaction assumptions",
      "Asset and token checklist",
    ],
  },
  {
    step: "03",
    title: "Development",
    description:
      "UI and product logic implemented to spec: accessible patterns, performance budgets, and maintainable structure.",
    checkpoint: "Feature-complete build ready for structured QA.",
    deliverables: [
      "Production-oriented codebase",
      "Component and page implementation",
      "Integration hooks for your APIs or CMS",
    ],
  },
  {
    step: "04",
    title: "Quality assurance",
    description:
      "Cross-browser and cross-device verification against the approved source, including accessibility checks.",
    checkpoint: "Issue log cleared or accepted with explicit sign-off.",
    deliverables: [
      "QA report with device and browser matrix",
      "Accessibility pass notes (WCAG-oriented)",
      "Performance snapshot where applicable",
    ],
  },
  {
    step: "05",
    title: "Delivery",
    description:
      "Handoff with documentation, deployment support, and a clear path for updates or phase two.",
    checkpoint:
      "Launch or handoff complete with your team enabled to own the stack.",
    deliverables: [
      "README and environment setup notes",
      "Recorded walkthrough or live handoff session",
      "Optional retainer or phase-two proposal",
    ],
  },
];

export const PROCESS_PRINCIPLES = [
  {
    title: "Written scope",
    body: "Every engagement starts with agreed milestones so scope, cost, and dates stay visible.",
  },
  {
    title: "Sequential gates",
    body: "The next stage does not start until the current checkpoint is closed or explicitly waived.",
  },
  {
    title: "Same pipeline",
    body: "Client work and internal tooling follow the same five stages for predictable delivery.",
  },
] as const;

export const PROCESS_AI_ANSWERS = [
  {
    term: "What happens first?",
    detail:
      "Consultation: we document goals, constraints, timeline, and success criteria in writing before design or development.",
  },
  {
    term: "When does development start?",
    detail:
      "After design review closes with an approved source and a signed checkpoint. Build runs against that baseline.",
  },
  {
    term: "How is quality verified?",
    detail:
      "Structured QA across devices and browsers, with accessibility checks and a cleared or accepted issue log before delivery.",
  },
] as const;
