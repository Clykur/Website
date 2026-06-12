/**
 * Chatbot guardrails: off-topic refusal + RAG path (no intent routing).
 * Run: npm run validate:chat
 */
import { getDefaultQuickPrompts } from "../lib/ai/chat-suggestions";
import { resolveChatTurn } from "../lib/ai/chat-turn";
import {
  shouldRefuseOutsideClykur,
  isOffTopicForClykur,
} from "../lib/ai/chat-scope";
import { resolvePreLlmTurn, isLikelyGibberish } from "../lib/ai/chat-pre-llm";
import { buildContextFromChunks } from "../lib/ai/rag-retrieval";
import type { KnowledgeChunkRow } from "../lib/ai/rag-retrieval";

const OFF_TOPIC_SAMPLES = [
  "who is the cm of andhra pradesh",
  "what is chatgpt",
  "bitcoin price today",
  "write me a recipe for pasta",
  "solve this equation 2x + 1 = 5",
  "weather in hyderabad",
];

const CLYKUR_SHOULD_LLM = [
  "what services do you offer?",
  "tell me about cusown",
  "do you work with startups in the US",
  "what is on the compliance page",
  "how do I apply for careers",
];

let failures = 0;

function fail(msg: string) {
  failures += 1;
  console.error(`FAIL: ${msg}`);
}

function ok(msg: string) {
  console.log(`ok: ${msg}`);
}

const QUICK_PROMPT_CANONICAL = new Set(["Can we talk this week?"]);

console.log("=== Quick prompts → LLM (not off-topic) ===\n");
for (const phrase of getDefaultQuickPrompts()) {
  const turn = resolveChatTurn(phrase);
  const expectCanonical = QUICK_PROMPT_CANONICAL.has(phrase);
  if (!turn) {
    fail(`quick prompt no turn: "${phrase}"`);
  } else if (expectCanonical && turn.mode !== "canonical") {
    fail(`quick prompt should be canonical: "${phrase}" → ${turn.mode}`);
  } else if (!expectCanonical && turn.mode !== "llm") {
    fail(`quick prompt should use LLM: "${phrase}" → ${turn?.mode}`);
  }
  if (shouldRefuseOutsideClykur(phrase)) {
    fail(`quick prompt refused: "${phrase}"`);
  }
}
ok(`${getDefaultQuickPrompts().length} quick prompts`);

console.log("\n=== Off-topic must refuse ===\n");
for (const sample of OFF_TOPIC_SAMPLES) {
  if (!isOffTopicForClykur(sample)) {
    fail(`expected off-topic: "${sample}"`);
    continue;
  }
  const turn = resolveChatTurn(sample);
  if (!turn || turn.mode !== "off_topic") {
    fail(`expected off_topic for "${sample}"`);
  }
}
ok(`${OFF_TOPIC_SAMPLES.length} off-topic samples`);

console.log("\n=== Clykur questions → LLM ===\n");
for (const sample of CLYKUR_SHOULD_LLM) {
  if (sample.toLowerCase().includes("linkedin")) continue;
  const turn = resolveChatTurn(sample);
  if (!turn || turn.mode !== "llm") {
    fail(`Clykur question not LLM: "${sample}" → ${turn?.mode}`);
  }
}
ok(`${CLYKUR_SHOULD_LLM.length} Clykur samples`);

console.log("\n=== Social questions → canonical ===\n");
const social = resolveChatTurn("does clykur have linkedin and instagram?");
if (!social || social.mode !== "canonical") {
  fail("social question should return canonical response");
} else ok("social canonical reply");

console.log("\n=== Greeting / gibberish (no LLM) ===\n");
const greet = resolveChatTurn("hey good morning");
if (!greet || greet.mode !== "canonical") {
  fail("greeting should be canonical");
} else ok("greeting canonical");

const gib = resolveChatTurn("jbfahbbs");
if (!gib || gib.mode !== "off_topic") {
  fail("gibberish should be off_topic");
} else ok("gibberish off_topic");

if (!isLikelyGibberish("jbfahbbs")) fail("isLikelyGibberish jbfahbbs");

console.log("\n=== Identity → canonical (not random RAG dump) ===\n");
for (const q of ["what is clykur", "who is clykur", "who are you?"]) {
  const turn = resolveChatTurn(q);
  if (!turn || turn.mode !== "canonical") {
    fail(`identity should be canonical: "${q}" → ${turn?.mode}`);
  } else if (!turn.text.toLowerCase().includes("clykur")) {
    fail(`identity answer missing Clykur: "${q}"`);
  }
}
ok("identity canonical replies");

console.log("\n=== Blog list & leadership → canonical ===\n");
const blogQ = resolveChatTurn("what all the blogs were here in this website");
if (!blogQ || blogQ.mode !== "canonical" || !blogQ.text.includes("/blog/")) {
  fail("blog list question should return canonical with links");
} else ok("blog list canonical");

const ownersQ = resolveChatTurn("whos the owners of this company");
if (
  !ownersQ ||
  ownersQ.mode !== "canonical" ||
  !/chandu|karthik|founder/i.test(ownersQ.text)
) {
  fail("owners question should return founding team canonical");
} else ok("leadership canonical");

console.log("\n=== Context compression ===\n");
const mockChunks: KnowledgeChunkRow[] = [
  {
    id: "1",
    url: "https://www.clykur.com/about",
    title: "About",
    section_title: "What Clykur does",
    content: "Clykur is a software product company and engineering partner.",
    similarity: 0.9,
  },
  {
    id: "3",
    url: "https://www.clykur.com/services",
    title: "Services",
    section_title: "Web",
    content: "Web development services.",
    similarity: 0.8,
  },
  {
    id: "4",
    url: "https://www.clykur.com/products",
    title: "Products",
    content: "Cusown and FreeTrust.",
    similarity: 0.75,
  },
];
const { contextForLlm, sourcePages } = buildContextFromChunks(mockChunks);
if (sourcePages.length > 3) fail("expected at most 3 source pages in pack");
if (!contextForLlm.includes("/about")) fail("context should include about");
else ok("RAG context packs clean chunks");

console.log(`\n=== Done: ${failures} failure(s) ===\n`);
process.exit(failures > 0 ? 1 : 0);
