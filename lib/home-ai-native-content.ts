import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  Code2,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Link2,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  ScanSearch,
  Wrench,
} from "lucide-react";

export const WHY_AI_NATIVE_CARDS = [
  {
    title: "Requirement Analysis",
    description: "AI organizes requirements into structured documentation.",
  },
  {
    title: "Product Design",
    description: "AI accelerates wireframes and UI exploration.",
  },
  {
    title: "Engineering",
    description:
      "AI speeds up implementation while developers own architecture and quality.",
  },
  {
    title: "Testing",
    description: "AI performs automated testing alongside human QA.",
  },
  {
    title: "Documentation",
    description: "AI generates technical documentation that engineers verify.",
  },
  {
    title: "Deployment",
    description: "Automated deployment pipelines with production monitoring.",
  },
] as const;

export const AI_NATIVE_METRICS = [
  "Faster Development Cycles",
  "AI-Assisted Engineering",
  "Human-Reviewed Deliverables",
  "Production-Ready Quality",
  "Scalable Architecture",
  "Enterprise Security Practices",
] as const;

export type AiCapability = {
  title: string;
  icon: LucideIcon;
};

export const AI_CAPABILITIES: AiCapability[] = [
  { title: "AI Product Development", icon: Sparkles },
  { title: "AI Chatbots", icon: MessageSquare },
  { title: "Internal AI Tools", icon: Wrench },
  { title: "AI Dashboards", icon: LayoutDashboard },
  { title: "API Integrations", icon: Link2 },
  { title: "AI-Assisted Engineering", icon: Code2 },
  { title: "AI Documentation", icon: FileText },
  { title: "AI Testing & QA", icon: FlaskConical },
  { title: "Knowledge Search & Q&A", icon: Search },
  { title: "Requirements Structuring", icon: ClipboardList },
  { title: "AI Auditing", icon: ScanSearch },
  { title: "AI Compliance & Risk Reviews", icon: ShieldCheck },
];

export const TRADITIONAL_DEV_ITEMS = [
  "Manual workflows",
  "Long delivery cycles",
  "Manual documentation",
  "Manual testing",
  "Higher iteration cost",
] as const;

export const AI_NATIVE_DEV_ITEMS = [
  "AI-assisted engineering",
  "Rapid iterations",
  "Automated documentation",
  "AI-assisted testing",
  "Faster delivery",
] as const;

export const HOME_AI_PROCESS_STEPS = [
  { step: "01", title: "Discovery" },
  { step: "02", title: "AI Requirement Structuring" },
  { step: "03", title: "Product Design" },
  { step: "04", title: "Engineering" },
  { step: "05", title: "AI Testing" },
  { step: "06", title: "Production Launch" },
] as const;

export const TECH_STACK_ITEMS = [
  "OpenAI",
  "Anthropic",
  "Gemini",
  "Supabase",
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "Git",
  "PostgreSQL",
  "AWS",
  "Vercel",
  "Docker",
  "Kubernetes",
] as const;

export const TECH_STACK_MORE_LABEL = "And more" as const;
