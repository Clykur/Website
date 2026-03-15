-- Applications table for job applications from careers page
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  linkedin TEXT,
  portfolio TEXT,
  role_slug TEXT NOT NULL,
  cover_note TEXT,
  resume_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'shortlisted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for listing by role and status
CREATE INDEX IF NOT EXISTS idx_applications_role_slug ON applications(role_slug);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);

-- Row Level Security: only service role can read/write (applications submitted via Server Action using service role)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- No anon access; service role bypasses RLS by default
CREATE POLICY "Service role only applications"
  ON applications FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
