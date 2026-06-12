-- Full reindex ingest: one row per content_hash (required for upsert; ingest uses delete + insert)
UPDATE public.knowledge_chunks
SET content_hash = md5(id::text || coalesce(content, ''))
WHERE content_hash IS NULL OR content_hash = '';

DROP INDEX IF EXISTS knowledge_chunks_unique_idx;

CREATE UNIQUE INDEX IF NOT EXISTS knowledge_chunks_content_hash_unique
  ON public.knowledge_chunks (content_hash);
