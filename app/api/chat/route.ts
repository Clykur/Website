import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { GoogleGenAI } from '@google/genai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Initialize Upstash Redis ratelimit only if env vars are present
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const ratelimit = (redisUrl && redisToken)
  ? new Ratelimit({
    redis: new Redis({ url: redisUrl, token: redisToken }),
    limiter: Ratelimit.slidingWindow(10, '10 s'),
    analytics: true,
  })
  : null;

// Simple greeting detection — bypass RAG for openers
const GREETING_PATTERNS = /^(hi|hey|hello|howdy|greetings|sup|what'?s up|yo|good (morning|afternoon|evening)|hiya)[!.,?]?\s*$/i;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error('[Chat API] Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable');
      return new Response('API configuration error', { status: 500 });
    }

    // Rate Limiting
    if (ratelimit) {
      const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        console.warn(`[Chat API] Rate limit exceeded for IP: ${ip}`);
        return new Response('Too many requests, please try again later.', { status: 429 });
      }
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid request payload', { status: 400 });
    }

    const coreMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.text || (msg.parts ? msg.parts.map((p: any) => p.text).join('') : ''),
    }));

    const startTime = Date.now();
    console.log(`[Chat API] Processing request with ${messages.length} messages`);

    // Get the user's latest query
    const latestMessage = coreMessages[coreMessages.length - 1];
    const userQuestion = latestMessage?.content ?? "";
    console.log(`[Chat API] User Question: "${userQuestion}"`);

    // --- Greeting Fast Path: skip RAG for conversational openers ---
    if (GREETING_PATTERNS.test(userQuestion.trim())) {
      console.log('[Chat API] Detected greeting, skipping RAG.');
      return new Response(
        "Hello! 👋 I'm the Clykur AI assistant. I can help you with information about Clykur's services, work, careers, policies, and more. What would you like to know?",
        { status: 200 }
      );
    }

    // --- RAG IMPLEMENTATION ---
    let contextStr = "";

    if (latestMessage && latestMessage.role === 'user') {
      try {
        console.log('[Chat API] Generating embedding...');
        const genAI = new GoogleGenAI({
          apiKey,
          httpOptions: { headers: { 'Accept-Encoding': 'identity' } }
        });

        const embedResponse = await genAI.models.embedContent({
          model: 'gemini-embedding-001',
          contents: userQuestion,
          config: { outputDimensionality: 768 }
        });

        const embedding = embedResponse.embeddings?.[0]?.values;

        if (!embedding) {
          throw new Error("Embedding generation failed");
        }

        console.log('[Chat API] Searching Supabase for relevant chunks...');
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
          throw new Error("Supabase credentials missing");
        }

        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data, error } = await supabase.rpc('match_knowledge_chunks', {
          query_embedding: embedding,
          match_threshold: 0.65,
          match_count: 5
        });

        if (error) {
          throw new Error(`Supabase RPC error: ${error.message}`);
        }

        console.log(`[Chat API] Retrieved ${data?.length || 0} chunks.`);

        // Hallucination Protection — require at least one chunk above 0.72 similarity
        if (!data || data.length === 0 || data[0].similarity < 0.72) {
          if (data && data.length > 0) {
            console.log(`[Chat API] Best similarity score (${data[0].similarity}) below threshold (0.72). Refusing.`);
          } else {
            console.log(`[Chat API] No relevant chunks found. Refusing.`);
          }

          return new Response(
            "I can only assist with information available on the Clykur website. Try asking about our services, work, careers, or company policies!",
            { status: 200 }
          );
        }

        // Build Context
        contextStr = data.map((chunk: any) => {
          console.log(`[Chat API] Match: URL=${chunk.url} Similarity=${chunk.similarity.toFixed(4)}`);
          return `[Source: ${chunk.url}]\n${chunk.content}`;
        }).join("\n\n---\n\n");

      } catch (err: any) {
        console.error('[Chat API] RAG retrieval error:', err);
        return new Response(
          "Sorry, I'm currently unable to access the Clykur knowledge base.\nPlease try again later.",
          { status: 200 }
        );
      }
    }

    const systemPrompt = `
You are the official AI assistant for Clykur.

You must answer ONLY using the provided CONTEXT.

RULES:

1. Use only information from CONTEXT.
2. Do not invent services, pricing, timelines, features, policies, or company information.
3. If the answer is not contained in CONTEXT, respond exactly:

"I can only assist with information available on the Clykur website."

4. Keep responses concise and professional.
5. Use bullet points when appropriate.
6. Never answer unrelated questions.
7. Never use outside knowledge.

CONTEXT:

${contextStr}
`;

    console.log('[Chat API] Calling Gemini for completion...');
    const customGoogle = createGoogleGenerativeAI({
      apiKey,
      headers: { 'Accept-Encoding': 'identity' }
    });

    // gemini-2.5-flash-lite: confirmed working on this API key
    const result = streamText({
      model: customGoogle('gemini-2.5-flash-lite'),
      system: systemPrompt,
      messages: coreMessages,
    });

    console.log(`[Chat API] Response streaming started in ${Date.now() - startTime}ms`);
    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error('[Chat API] Internal Error:', error);
    return new Response(
      "Sorry, I'm currently unable to access the Clykur knowledge base.\nPlease try again later.",
      { status: 200 }
    );
  }
}

