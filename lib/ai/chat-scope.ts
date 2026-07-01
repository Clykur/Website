/** Clykur-only scope: block clearly off-site topics before the LLM runs. */

const CLYKUR_SCOPE =
  /\b(clykur|your (company|team|studio|service|website|site)|this (site|website|page))\b/i;

const OFF_TOPIC_PATTERNS: RegExp[] = [
  /\b(chatgpt|openai|gemini|claude|gpt-?\d|llama|copilot|bard|deepseek)\b/i,
  /\b(large language model|llms?)\b/i,
  /\b(chief minister|\bcm\b of|prime minister|\bmp\b of|president of|election|politics|political party)\b/i,
  /\b(andhra|telangana|modi|trump|biden)\b/i,
  /\b(weather|forecast|temperature today)\b/i,
  /\b(recipe|cook|ingredients for)\b/i,
  /\b(stock price|crypto|bitcoin|ethereum)\b/i,
  /\b(homework|solve this math|equation)\b/i,
];

const GENERIC_WHO_WHAT =
  /^(who is|what is|what are|tell me about|explain|define|how does|why does)\b/i;

export function isOffTopicForClykur(message: string): boolean {
  const q = message.trim();
  if (!q) return false;
  if (CLYKUR_SCOPE.test(q)) return false;

  if (OFF_TOPIC_PATTERNS.some((re) => re.test(q))) return true;

  if (GENERIC_WHO_WHAT.test(q) && !CLYKUR_SCOPE.test(q)) {
    if (
      /\b(cm|minister|ceo of (?!clykur)|president|actor|cricketer|footballer)\b/i.test(
        q,
      )
    ) {
      return true;
    }
    if (
      /\b(chatgpt|openai|google|microsoft|apple|amazon|meta|facebook|netflix)\b/i.test(
        q,
      )
    ) {
      return true;
    }
  }

  if (/^who is the cm\b/i.test(q)) return true;

  return false;
}

export function shouldRefuseOutsideClykur(message: string): boolean {
  return isOffTopicForClykur(message);
}

export const OFF_TOPIC_REPLY = `Sorry, I can only help with Clykur.

**Explore Clykur**
• [Services](/services)
• [Case studies](/case-studies)
• [Process](/process)
• [Start a project](/contact)`;

export const CHAT_OPENING_WELCOME = `Hey! I am the Clykur Assistant.

Ask me anything about our **services**, **case studies**, **process**, or how to **start a project**.`;

/** Normalize assistant copy: no em dashes, tighter spacing for UI. */
export function sanitizeAssistantCopy(text: string): string {
  return text
    .replace(/\u2014/g, ". ")
    .replace(/\u2013/g, "-")
    .replace(/\s+\./g, ".")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function getOffTopicExtras() {
  return {
    actions: [
      {
        label: "View Services",
        href: "/services",
        variant: "primary" as const,
      },
      { label: "Contact", href: "/contact", variant: "secondary" as const },
    ],
    followUps: [
      "What services do you offer?",
      "Show case studies",
      "Book a discovery call",
    ],
    relatedPages: [
      { label: "Services", href: "/services" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  };
}
