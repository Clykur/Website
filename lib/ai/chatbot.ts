import { buildKnowledgeContext } from './knowledge';
import { SYSTEM_RULES } from './prompts';

export function getSystemPrompt(dynamicContext: string = ""): string {
  // We use the dynamic context from RAG, fallback to empty string if not provided
  return `${SYSTEM_RULES}\n\nHere is the essential information retrieved from the Clykur website:\n\n${dynamicContext}`;
}
