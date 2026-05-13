-- Supabase Database Enhancements

-- 1. Ensure 'applications' table has unique constraint for (email, role_slug)
ALTER TABLE public.applications 
ADD CONSTRAINT applications_email_role_unique UNIQUE (email, role_slug);

-- 2. Ensure RLS policies are set correctly for 'applications' table
-- We shouldn't allow anonymous users to read applications
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Only authenticated admins can read
CREATE POLICY "Admins can view applications"
ON public.applications
FOR SELECT
TO authenticated
USING (auth.uid() IN (SELECT id FROM auth.users WHERE role = 'admin'));

-- Only service role can insert (because our Next.js Server Action uses service role key)
CREATE POLICY "Service role can insert applications"
ON public.applications
FOR INSERT
TO service_role
WITH CHECK (true);

-- 3. Resumes Storage Bucket Policies
-- The Resumes bucket should be PRIVATE.
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow Service Role full access to Resumes bucket
CREATE POLICY "Service role full access to Resumes"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'Resumes');

-- No public policies should exist for 'Resumes' bucket!
-- If you have a public policy, DROP it:
-- DROP POLICY IF EXISTS "Public access" ON storage.objects;
