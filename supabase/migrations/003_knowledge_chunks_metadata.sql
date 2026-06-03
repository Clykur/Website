-- Rich metadata + improved similarity search for Clykur RAG

ALTER TABLE public.knowledge_chunks
  ADD COLUMN IF NOT EXISTS section_title text,
  ADD COLUMN IF NOT EXISTS page_type text,
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS priority_score float DEFAULT 0.8,
  ADD COLUMN IF NOT EXISTS content_hash text;

CREATE INDEX IF NOT EXISTS knowledge_chunks_content_hash_idx
  ON public.knowledge_chunks (content_hash);

CREATE INDEX IF NOT EXISTS knowledge_chunks_url_idx
  ON public.knowledge_chunks (url);

-- Return type changed (new OUT columns); REPLACE is not allowed.
DROP FUNCTION IF EXISTS public.match_knowledge_chunks(vector, double precision, integer);

CREATE FUNCTION public.match_knowledge_chunks(
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  url text,
  title text,
  section_title text,
  content text,
  page_type text,
  slug text,
  priority_score float,
  similarity float
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    kc.id,
    kc.url,
    kc.title,
    kc.section_title,
    kc.content,
    kc.page_type,
    kc.slug,
    kc.priority_score,
    1 - (kc.embedding <=> query_embedding) AS similarity
  FROM public.knowledge_chunks kc
  WHERE 1 - (kc.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC, kc.priority_score DESC NULLS LAST
  LIMIT match_count;
$$;
