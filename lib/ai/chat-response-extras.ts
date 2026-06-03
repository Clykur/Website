import type { ChatMessageExtras } from "@/lib/ai/chat-types";

const MINIMAL: ChatMessageExtras = {
  actions: [{ label: "Contact", href: "/contact", variant: "secondary" }],
  relatedPages: [],
  followUps: [],
};

export function buildExtrasForTopic(input: {
  userQuestion: string;
  assistantText: string;
  sourcePages?: string[];
}): ChatMessageExtras {
  const q = input.userQuestion.toLowerCase();
  const t = input.assistantText.toLowerCase();
  const paths = (input.sourcePages ?? []).map((p) => p.toLowerCase());

  const mentions = (re: RegExp) => re.test(q) || re.test(t) || paths.some((p) => re.test(p));

  if (mentions(/\b(service|mvp|web dev|mobile app|ui\/ux|engineering)\b/)) {
    return {
      actions: [
        { label: "View Services", href: "/services", variant: "primary" },
        { label: "Start a project", href: "/contact", variant: "secondary" },
      ],
      relatedPages: [{ label: "Services", href: "/services" }],
      followUps: ["How do I start a project?"],
    };
  }

  if (mentions(/\b(case stud|client work|portfolio|work)\b/)) {
    return {
      actions: [
        { label: "Case studies", href: "/case-studies", variant: "primary" },
        { label: "Contact", href: "/contact", variant: "secondary" },
      ],
      relatedPages: [{ label: "Case studies", href: "/case-studies" }],
      followUps: [],
    };
  }

  if (mentions(/\b(cusown|freetrust|product)\b/)) {
    return {
      actions: [
        { label: "Products", href: "/products", variant: "primary" },
        { label: "Contact", href: "/contact", variant: "secondary" },
      ],
      relatedPages: [{ label: "Products", href: "/products" }],
      followUps: [],
    };
  }

  if (mentions(/\b(contact|start a project|hire|quote|discovery)\b/)) {
    return {
      actions: [
        { label: "Start a project", href: "/contact", variant: "primary" },
      ],
      relatedPages: [{ label: "Contact", href: "/contact" }],
      followUps: [],
    };
  }

  if (mentions(/\b(about|who is clykur|what is clykur|who are you)\b/)) {
    return {
      actions: [
        { label: "About", href: "/about", variant: "primary" },
        { label: "Services", href: "/services", variant: "secondary" },
      ],
      relatedPages: [{ label: "About", href: "/about" }],
      followUps: ["What services do you offer?"],
    };
  }

  if (mentions(/\b(career|job|hiring)\b/)) {
    return {
      actions: [{ label: "Careers", href: "/careers", variant: "primary" }],
      relatedPages: [{ label: "Careers", href: "/careers" }],
      followUps: [],
    };
  }

  return MINIMAL;
}
