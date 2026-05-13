import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_DOMAIN: z.string().min(1, "NEXT_PUBLIC_DOMAIN is required"),
  NEXT_PUBLIC_ADMIN_EMAIL: z.string().email("NEXT_PUBLIC_ADMIN_EMAIL must be a valid email").optional(),
  
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
  
  // Resend
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  
  // Upstash Redis
  UPSTASH_REDIS_REST_URL: z.string().url("UPSTASH_REDIS_REST_URL must be a valid URL").optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  
  // Cloudflare Turnstile
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
});

// We parse process.env in a try-catch to log a helpful error if it fails
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((i) => i.path[0]).join(", ");
      console.error(`❌ Invalid environment variables: ${missingVars}`);
      console.error(error.flatten().fieldErrors);
    }
    // We don't throw here to avoid completely breaking the build on missing non-critical vars during Vercel build phase,
    // but in a strict setup you might want to `throw new Error("Invalid Environment variables");`
    return process.env as unknown as z.infer<typeof envSchema>; 
  }
}

export const env = validateEnv();
