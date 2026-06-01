import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

if (!GOOGLE_API_KEY) {
  console.error("Missing GOOGLE_GENERATIVE_AI_API_KEY in .env.local");
  process.exit(1);
}

// Initialize official Google Gen AI SDK
// Accept-Encoding: identity is CRITICAL to bypass Node 26 fetch gzip bugs
const ai = new GoogleGenAI({
  apiKey: GOOGLE_API_KEY,
  httpOptions: { headers: { 'Accept-Encoding': 'identity' } }
});
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const EMBEDDING_MODEL = 'gemini-embedding-001';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.clykur.com';

const HARDCODED_FALLBACK_ROUTES = [
  `${BASE_URL}`,
  `${BASE_URL}/careers`,
  `${BASE_URL}/work`,
  `${BASE_URL}/terms-and-conditions`,
  `${BASE_URL}/privacy-policy`,
  `${BASE_URL}/engagement-terms`,
  `${BASE_URL}/refund-policy`,
  `${BASE_URL}/employment-policy`
];

interface DocumentChunk {
  url: string;
  title: string;
  section_title: string;
  content: string;
}

// Logging counters
let routesDiscovered = 0;
let pagesCrawled = 0;
let chunksGenerated = 0;
let chunksInserted = 0;
let failures = 0;

// Helper for exponential backoff
async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch sitemap.xml and extract routes
async function getRoutesFromSitemap(): Promise<string[]> {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  console.log(`Fetching sitemap: ${sitemapUrl}`);

  try {
    const response = await fetch(sitemapUrl, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 ClykurBot/1.0',
        'Accept': 'application/xml,text/xml,text/plain,*/*',
        'Accept-Encoding': 'identity' // Prevent gzip decoding issues
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch sitemap. Status: ${response.status}`);
      return HARDCODED_FALLBACK_ROUTES;
    }

    const xml = await response.text();
    
    // Parse all <loc> tags using a global regex
    const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/gi)];
    const urls = matches.map(m => m[1].trim());

    if (urls.length === 0) {
      console.warn("No URLs found in sitemap. Using fallback routes.");
      return HARDCODED_FALLBACK_ROUTES;
    }

    console.log(`Discovered ${urls.length} routes from sitemap.`);
    return urls;
  } catch (error) {
    console.error("Error parsing sitemap. Falling back to hardcoded routes.", error);
    return HARDCODED_FALLBACK_ROUTES;
  }
}

// Generate embedding with retry logic
async function generateEmbedding(text: string, retries = 3, delay = 1000): Promise<number[] | null> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.embedContent({
        model: EMBEDDING_MODEL,
        contents: text,
        config: { outputDimensionality: 768 }
      });
      
      const values = response.embeddings?.[0]?.values;
      if (values && values.length > 0) {
        return values;
      }
      throw new Error('No embedding returned from API');
    } catch (error) {
      console.error(`[Attempt ${attempt}/${retries}] Embedding generation failed:`, error instanceof Error ? error.message : error);
      if (attempt === retries) return null;
      await sleep(delay * attempt); // Exponential backoff
    }
  }
  return null;
}

// Semantic Chunker
function extractSemanticChunks(url: string, pageTitle: string, $: cheerio.CheerioAPI): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  
  // Append newlines to block elements to safely extract paragraphs
  $('p, div, section, article, h1, h2, h3, h4, h5, h6, li').append('\n\n');
  const rawText = $('body').text().replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
  
  const paragraphs = rawText.split('\n\n').map(p => p.trim()).filter(p => p.length > 0);
  
  let currentChunkContent = '';
  
  for (const para of paragraphs) {
    if (currentChunkContent.length + para.length > 1500) {
      if (currentChunkContent.length > 0) {
        chunks.push({ url, title: pageTitle, section_title: pageTitle, content: currentChunkContent.trim() });
        currentChunkContent = '';
      }
      
      if (para.length > 1500) {
        let remaining = para;
        while (remaining.length > 0) {
          chunks.push({ url, title: pageTitle, section_title: pageTitle, content: remaining.slice(0, 1500).trim() });
          remaining = remaining.slice(1500);
        }
      } else {
        currentChunkContent = para;
      }
    } else {
      currentChunkContent += (currentChunkContent ? '\n\n' : '') + para;
    }
  }
  
  if (currentChunkContent.length > 0) {
    chunks.push({ url, title: pageTitle, section_title: pageTitle, content: currentChunkContent.trim() });
  }
  
  // Deduplicate and filter empty/tiny chunks
  const uniqueChunks: DocumentChunk[] = [];
  const seenContent = new Set<string>();
  
  for (const c of chunks) {
    if (c.content.length > 10 && !seenContent.has(c.content)) {
      seenContent.add(c.content);
      uniqueChunks.push(c);
    }
  }
  
  return uniqueChunks;
}

async function scrapePage(url: string): Promise<DocumentChunk[]> {
  try {
    console.log(`[Scrape] Fetching ${url}...`);
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 ClykurBot/1.0',
        'Accept-Encoding': 'identity'
      },
    });
    
    if (!response.ok) {
      console.warn(`[Scrape] Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const html = await response.text();
    console.log(`[Scrape] Downloaded ${html.length} bytes from ${url}`);
    
    const $ = cheerio.load(html);

    // Remove noise
    $('script, style, nav, footer, header, noscript, iframe, svg, canvas').remove();
    
    const title = $('title').text().replace(' | Clykur', '').trim() || 'Clykur Page';
    
    const chunks = extractSemanticChunks(url, title, $);
    console.log(`[Scrape] Extracted ${chunks.length} semantic chunks from ${url}`);
    
    return chunks;

  } catch (error) {
    console.error(`[Scrape] Error scraping ${url}:`, error);
    return [];
  }
}

async function verifyEmbeddingModel() {
  console.log(`Verifying embedding model: ${EMBEDDING_MODEL}`);
  const embedding = await generateEmbedding('test');
  if (!embedding) {
    console.error("Failed to generate test embedding. Aborting ingestion.");
    process.exit(1);
  }
  console.log(`Embedding dimension: ${embedding.length}`);
  return embedding.length;
}

async function ingest() {
  console.log("Starting website ingestion...");
  
  const dimensions = await verifyEmbeddingModel();
  console.log(`Using embedding dimensions: ${dimensions}`);

  // 1. Clear existing chunks
  console.log("Clearing old knowledge chunks...");
  const { error: deleteError } = await supabase
    .from('knowledge_chunks')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.error("Error clearing chunks:", deleteError);
  }

  const allChunks: DocumentChunk[] = [];

  // 2. Discover and scrape all routes
  const urls = await getRoutesFromSitemap();
  routesDiscovered = urls.length;

  for (const url of urls) {
    const chunks = await scrapePage(url);
    if (chunks.length > 0) pagesCrawled++;
    allChunks.push(...chunks);
  }

  chunksGenerated = allChunks.length;
  console.log(`\nGenerated ${chunksGenerated} total chunks to process.\n`);

  // 3. Generate embeddings and insert into Supabase
  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i];
    console.log(`[Process] Chunk ${i + 1}/${allChunks.length} | ${chunk.url}`);
    
    try {
      const embedding = await generateEmbedding(chunk.content);
      
      if (!embedding) {
        console.warn(`[Process] Skipping chunk ${i + 1} due to embedding failure.`);
        failures++;
        continue;
      }

      if (embedding.length !== dimensions) {
         console.warn(`[Process] Skipping chunk ${i + 1}: Dimension mismatch (got ${embedding.length}, expected ${dimensions})`);
         failures++;
         continue;
      }

      const { error: insertError } = await supabase
        .from('knowledge_chunks')
        .insert({
          url: chunk.url,
          title: chunk.title,
          section_title: chunk.section_title,
          content: chunk.content,
          embedding: embedding
        });

      if (insertError) {
        console.error(`[Process] Error inserting chunk ${i + 1}:`, insertError.message || insertError);
        failures++;
      } else {
        chunksInserted++;
      }
    } catch (e) {
      console.error(`[Process] Unexpected error processing chunk ${i + 1}:`, e);
      failures++;
    }
    
    await sleep(200);
  }

  console.log("\n====================================");
  console.log("         INGESTION COMPLETE         ");
  console.log("====================================");
  console.log(`Routes discovered : ${routesDiscovered}`);
  console.log(`Pages crawled     : ${pagesCrawled}`);
  console.log(`Chunks generated  : ${chunksGenerated}`);
  console.log(`Chunks inserted   : ${chunksInserted}`);
  console.log(`Failures          : ${failures}`);
  console.log("====================================\n");
}

ingest().catch((error) => {
  console.error("Fatal error during ingestion:", error);
  process.exit(1);
});
