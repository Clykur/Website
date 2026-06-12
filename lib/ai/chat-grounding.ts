import { CONTACT_EMAIL } from "@/lib/site-config";
import {
  CLYKUR_SOCIAL_LINKS,
  formatSocialLinksMarkdown,
} from "@/lib/social-links";
import type { ChatMessageExtras } from "@/lib/ai/chat-types";
import { CLYKUR_FOUNDING_TEAM } from "@/lib/site-founding-team";
import { BLOG_POSTS } from "@/lib/blog/posts";

/** Compact block injected into every chat system prompt (token-light). */
export function getChatCanonicalFactsBlock(): string {
  const socialLines = CLYKUR_SOCIAL_LINKS.map(
    (s) => `- ${s.label}: ${s.href}`,
  ).join("\n");
  const founders = CLYKUR_FOUNDING_TEAM.map(
    (m) => `${m.name} (${m.role})`,
  ).join(", ");
  return `CANONICAL FACTS (always true; use for social/contact/founders/blog questions):
- Email: ${CONTACT_EMAIL}
- WhatsApp: +91 8179299096 (also on /contact)
- Founding team: ${founders}. More on /about
- Blog: ${BLOG_POSTS.length} articles at /blog (list titles with links when users ask what blogs you have)
${socialLines}
Never say you lack access to these links or that you cannot list blog posts.`;
}

const SOCIAL_QUESTION =
  /\b(linkedin|instagram|twitter|x\.com|\bx\b|clutch|product hunt|producthunt|dev\.?to|hashnode|social media|socials?|follow (us|clykur)|on social|profiles?)\b/i;

export function isClykurSocialQuestion(message: string): boolean {
  const q = message.trim();
  if (!q) return false;
  if (!SOCIAL_QUESTION.test(q)) return false;
  if (/\b(clykur|your company|you guys|your team)\b/i.test(q)) return true;
  if (/^(do you|does clykur|have you|is there)/i.test(q)) return true;
  return SOCIAL_QUESTION.test(q) && q.length < 120;
}

export function getSocialCanonicalChatResponse(): {
  text: string;
  extras: ChatMessageExtras;
} {
  return {
    text: `Here are Clykur's official profiles:

${formatSocialLinksMarkdown()}

Email us at [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}) or [start a project](/contact).`,
    extras: {
      actions: [
        {
          label: "LinkedIn",
          href: CLYKUR_SOCIAL_LINKS.find((s) => s.id === "linkedin")!.href,
          variant: "primary",
        },
        {
          label: "Clutch",
          href: CLYKUR_SOCIAL_LINKS.find((s) => s.id === "clutch")!.href,
          variant: "secondary",
        },
        { label: "Contact", href: "/contact", variant: "secondary" },
      ],
      followUps: ["What services do you offer?", "How do I start a project?"],
      relatedPages: [
        { label: "Contact", href: "/contact" },
        { label: "About", href: "/about" },
      ],
    },
  };
}
