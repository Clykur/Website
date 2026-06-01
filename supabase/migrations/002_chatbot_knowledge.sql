-- Enable the pgvector extension to work with embedding vectors
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a table to store knowledge base chunks
CREATE TABLE IF NOT EXISTS public.knowledge_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  embedding vector(768) -- Google Gemini gemini-embedding-001 uses 768 dimensions
);

-- Enable RLS (only service role should be able to read/write for now, or authenticated users if needed)
-- Since the chatbot runs server-side, service_role is sufficient.
ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to knowledge"
ON public.knowledge_chunks FOR ALL
TO service_role
USING (true);

-- Create an IVFFlat index for faster similarity search
-- lists = 100 is a good starting point for < 1M rows
CREATE INDEX ON public.knowledge_chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Create a function to perform similarity search via RPC
CREATE OR REPLACE FUNCTION match_knowledge_chunks(
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  url text,
  title text,
  content text,
  similarity float
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    knowledge_chunks.id,
    knowledge_chunks.url,
    knowledge_chunks.title,
    knowledge_chunks.content,
    1 - (knowledge_chunks.embedding <=> query_embedding) as similarity
  FROM public.knowledge_chunks
  WHERE 1 - (knowledge_chunks.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
