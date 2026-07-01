import { createClient } from "@/lib/db/supabase";
import type { User } from "@supabase/supabase-js";

export async function requireAuthenticatedUser(): Promise<User | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
