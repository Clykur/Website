# Supabase setup for Careers applications

## 1. Database table

Run the SQL migrations in order in the Supabase Dashboard:

- Go to **SQL Editor** and run `supabase/migrations/001_applications.sql`, then `002_applications_unique_email_role.sql`.

The second migration adds a unique constraint so the same email cannot apply twice for the same role.

Or, if you use Supabase CLI:

```bash
supabase db push
```

## 2. Storage bucket (Resumes)

1. In Supabase Dashboard go to **Storage**.
2. Click **New bucket**.
3. Name: `Resumes` (must match exactly; bucket names are case-sensitive).
4. Set **Public bucket** to **OFF** (private).
5. Create the bucket.

### Storage policies (SQL in Dashboard → Storage → Policies)

Create a policy so the backend (service role) can upload and read:

- **Allow service role to upload**: In Storage → Resumes → Policies, add policy:
  - Name: `Service role full access`
  - Allowed operation: All (or INSERT, SELECT)
  - Target roles: `service_role`
  - Policy definition: `true` for WITH CHECK and USING

Or run in SQL Editor:

```sql
-- Storage bucket 'Resumes' is created via UI as private.
-- Policy: service role can do everything (used by Server Action to upload).
CREATE POLICY "Service role full access resumes"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'Resumes')
WITH CHECK (bucket_id = 'Resumes');
```

## 3. Allowed file types and size

- Allowed: PDF, DOC, DOCX.
- Max size: 5 MB (enforced in application code).

## 4. Environment variables

Add to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these from Supabase Dashboard → Settings → API.

- **Service role key** must stay server-side only (never in client code).
- Copy `.env.example` to `.env.local` and fill in your values.

## 5. Optional: email on new application

To get an email when someone applies, you can:

- Use **Supabase Database Webhooks**: in Dashboard → Database → Webhooks, add a webhook on `applications` INSERT that calls your endpoint or a service like Zapier/Make.
- Or add a **Supabase Edge Function** that runs on `applications` insert and sends an email via Resend/SendGrid/etc.
