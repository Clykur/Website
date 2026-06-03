import { sanitizeAssistantCopy } from "@/lib/ai/chat-scope";
import { getDefaultAssistantExtras } from "@/lib/ai/chat-suggestions";
import type { ChatMessageExtras } from "@/lib/ai/chat-types";
import type { RagRetrievalResult } from "@/lib/ai/rag-retrieval";
import { buildContextFromChunks } from "@/lib/ai/rag-retrieval";

function pathnameFromUrl(url: string): string {
  try {
    return new URL(url).pathname || url;
  } catch {
    return url;
  }
}

function snippet(text: string, maxLen: number): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= maxLen) return flat;
  const cut = flat.slice(0, maxLen);
  const dot = cut.lastIndexOf(".");
  if (dot > 100) return cut.slice(0, dot + 1);
  return `${cut.trim()}…`;
}

export function composeRagFallbackAnswer(rag: RagRetrievalResult): {
  text: string;
  extras: ChatMessageExtras;
} {
  const chunks = rag.topChunks.slice(0, 2);
  const { sourcePages } = buildContextFromChunks(rag.topChunks);

  const body =
    chunks.length > 0
      ? chunks
          .map((c) => {
            const path = pathnameFromUrl(c.url);
            const title = c.section_title || c.title || path;
            return `**${title}** — ${snippet(c.content, 280)}`;
          })
          .join("\n\n")
      : `Clykur builds and ships software — web, mobile, and product engineering.`;

  const linkLines = (
    sourcePages.length ? sourcePages : ["/services", "/contact"]
  )
    .slice(0, 5)
    .map(
      (p) => `• [${p.replace(/^\//, "").replace(/-/g, " ") || "home"}](${p})`,
    )
    .join("\n");

  const text = sanitizeAssistantCopy(
    `${body}

**Explore**
${linkLines}`,
  );

  const relatedPages = (
    sourcePages.length ? sourcePages : ["/services", "/products", "/contact"]
  )
    .slice(0, 4)
    .map((href) => ({
      label: href.replace(/^\//, "").replace(/-/g, " ") || "Home",
      href,
    }));

  return {
    text,
    extras: {
      ...getDefaultAssistantExtras(),
      relatedPages,
    },
  };
}

export function getLlmUnavailableReply(): {
  text: string;
  extras: ChatMessageExtras;
} {
  return {
    text: sanitizeAssistantCopy(
      `Our assistant is busy right now (high demand). Here is the fastest path:

• [Services](/services)
• [Products](/products)
• [Case studies](/case-studies)
• [Start a project](/contact)

You can also email us from the [contact page](/contact).`,
    ),
    extras: getDefaultAssistantExtras(),
  };
}
