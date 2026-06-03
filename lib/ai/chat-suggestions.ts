import type { ChatMessageExtras } from "@/lib/ai/chat-types";

export function getDefaultQuickPrompts(): string[] {
  return [
    "What services do you offer?",
    "Tell me about Cusown and FreeTrust",
    "How do I start a project?",
    "Where can I read case studies?",
  ];
}

export function getDefaultAssistantExtras(): ChatMessageExtras {
  return {
    actions: [
      { label: "View Services", href: "/services", variant: "primary" },
      { label: "Start a project", href: "/contact", variant: "secondary" },
    ],
    followUps: getDefaultQuickPrompts(),
    relatedPages: [
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  };
}

export function getWelcomeExtras(): ChatMessageExtras {
  return {
    actions: [
      { label: "View Services", href: "/services", variant: "primary" },
      { label: "Case studies", href: "/case-studies", variant: "secondary" },
      { label: "Start a project", href: "/contact", variant: "secondary" },
    ],
    followUps: getDefaultQuickPrompts(),
    relatedPages: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
    ],
  };
}
