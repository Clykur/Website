-- One application per email per role (case-insensitive email)
CREATE UNIQUE INDEX IF NOT EXISTS idx_applications_email_role_unique
  ON applications (role_slug, lower(email));
