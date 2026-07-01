import type { RagConfidenceBand } from "@/lib/ai/rag-retrieval";
import { getChatCanonicalFactsBlock } from "@/lib/ai/chat-grounding";
import { getClykurAboutSummaryHint } from "@/lib/ai/chat-identity";

const DEFAULT_LINKS = ["/about", "/services", "/process", "/contact"];

export function buildSystemPrompt(input: {
  confidenceBand: RagConfidenceBand;
  contextStr: string;
  sourcePages: string[];
}): string {
  const links =
    input.sourcePages.length > 0 ? input.sourcePages : DEFAULT_LINKS;
  const linkBlock = links.map((u) => `- ${u}`).join("\n");

  const contextBlock = input.contextStr.trim()
    ? `CONTEXT (primary source, answer from this only; do not mix unrelated pages):\n${input.contextStr}`
    : `CONTEXT: (none retrieved)\n${getClykurAboutSummaryHint()}`;

  const confidenceHint =
    input.confidenceBand === "weak"
      ? "Retrieval confidence: weak. Use the company summary and stay aligned with Clykur services. Guide to a relevant page if needed. Never refuse a Clykur-related question."
      : "Retrieval confidence: sufficient. Ground the answer in CONTEXT only.";

  return `You are Clykur's official website assistant.

Rules:
- Always use provided context when available.
- If context is weak, use reasoning but stay aligned with Clykur services and process.
- Never mix unrelated pages into one answer (do not combine careers, legal, refund, or hiring copy unless the user asked about those topics).
- Never show legal or careers content unless the user explicitly asked about it.
- Be concise and accurate.
- If unsure, guide the user to the relevant page instead of refusing.
- Never use the em dash character.
- Off-site topics: brief apology and link to Clykur pages only.
- For social or contact details: use CANONICAL FACTS below.

${confidenceHint}

${getChatCanonicalFactsBlock()}

${contextBlock}

Relevant paths:
${linkBlock}`;
}
