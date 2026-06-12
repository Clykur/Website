import { BLOG_POSTS } from "@/lib/blog/posts";
import { CLYKUR_FOUNDING_TEAM } from "@/lib/site-founding-team";
import { sanitizeAssistantCopy } from "@/lib/ai/chat-scope";
import type { ChatMessageExtras } from "@/lib/ai/chat-types";
import { buildExtrasForTopic } from "@/lib/ai/chat-response-extras";

const BLOG_TOPIC = /\b(blogs?|blog posts?|articles?)\b/i;
const BLOG_LIST_INTENT =
  /\b(list|all|what|which|every|show|name|titles?|tell me|here|on (the |this |your )?(site|website|web))\b/i;

const LEADERSHIP =
  /\b(founder|founders|co-?founder|owner|owners|ceo|leadership|founding team|who runs|who started|who founded|who owns)\b/i;
const CLYKUR_SCOPE =
  /\b(clykur|company|your company|this company|the company|you guys|your team)\b/i;

export function isBlogListQuestion(message: string): boolean {
  const q = message.trim();
  if (!q) return false;
  if (!BLOG_TOPIC.test(q)) return false;
  if (BLOG_LIST_INTENT.test(q)) return true;
  if (/what.*\bblog/i.test(q)) return true;
  if (/which.*\bblog/i.test(q)) return true;
  return false;
}

export function isDiscoveryCallQuestion(message: string): boolean {
  const q = message.trim();
  if (!q) return false;
  if (!/\b(talk|call|meet|chat|speak|connect)\b/i.test(q)) return false;
  return /\b(this week|soon|today|schedule|book|discovery|available|time)\b/i.test(
    q,
  );
}

export function getDiscoveryCallCanonicalResponse(): {
  text: string;
  extras: ChatMessageExtras;
} {
  const text = sanitizeAssistantCopy(
    `Yes. [Send a project brief](/contact#inquiry-form) with timeline and budget band, or email **info@clykur.com**. We reply with times for a short discovery call. Founders join early calls when it is a fit.`,
  );
  return {
    text,
    extras: {
      actions: [
        {
          label: "Start a project",
          href: "/contact#inquiry-form",
          variant: "primary",
        },
        { label: "Services", href: "/services", variant: "secondary" },
      ],
      relatedPages: [{ label: "Contact", href: "/contact" }],
      followUps: ["What services do you offer?", "How much does an MVP cost?"],
    },
  };
}

export function isLeadershipQuestion(message: string): boolean {
  const q = message.trim();
  if (!q) return false;
  if (!LEADERSHIP.test(q)) return false;
  if (CLYKUR_SCOPE.test(q)) return true;
  if (/^who('s|s| is| are| owns?| runs?| started| founded)\b/i.test(q)) {
    return true;
  }
  return false;
}

export function getBlogListCanonicalResponse(): {
  text: string;
  extras: ChatMessageExtras;
} {
  const lines = BLOG_POSTS.map((p) => `• [${p.title}](/blog/${p.slug})`).join(
    "\n",
  );

  const text = sanitizeAssistantCopy(
    `We have **${BLOG_POSTS.length} articles** on the [Blog](/blog):

${lines}

Open any title for the full article, or browse the [Blog](/blog) index.`,
  );

  return {
    text,
    extras: {
      actions: [
        { label: "Blog", href: "/blog", variant: "primary" },
        { label: "Contact", href: "/contact", variant: "secondary" },
      ],
      relatedPages: [{ label: "Blog", href: "/blog" }],
      followUps: ["What services do you offer?", "Who founded Clykur?"],
    },
  };
}

export function getLeadershipCanonicalResponse(): {
  text: string;
  extras: ChatMessageExtras;
} {
  const roster = CLYKUR_FOUNDING_TEAM.map(
    (m) => `• **${m.name}** (${m.role}): [LinkedIn](${m.linkedIn})`,
  ).join("\n");

  const text = sanitizeAssistantCopy(
    `Clykur's founding team:

${roster}

See photos and bios on [About Clykur](/about).`,
  );

  return {
    text,
    extras: buildExtrasForTopic({
      userQuestion: "who are the founders of clykur",
      assistantText: text,
      sourcePages: ["/about"],
    }),
  };
}

/** For RAG ingest: blog titles + founders in one searchable block. */
export function getCanonicalSiteFactsIngestLines(): string[] {
  const blogLines = BLOG_POSTS.map(
    (p) => `Blog: ${p.title} (/blog/${p.slug}). ${p.description}`,
  );
  const founderLine = CLYKUR_FOUNDING_TEAM.map(
    (m) => `${m.name}, ${m.role}`,
  ).join("; ");
  return [
    "list all blog posts articles on clykur website",
    "what blogs are on the site",
    "who owns clykur who are the owners founders",
    `Founding team: ${founderLine}.`,
    ...blogLines,
  ];
}
