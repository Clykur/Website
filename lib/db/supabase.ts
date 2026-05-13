import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or service role key is not defined.");
  }

  return createSupabaseClient(supabaseUrl, supabaseKey);
};