import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ApplicationInput } from "@/lib/security/validation";

export async function checkDuplicateApplication(email: string, roleSlug: string): Promise<{ isDuplicate: boolean; error?: string }> {
  try {
    const supabase = createServerSupabaseClient();
    const emailLower = email.toLowerCase();
    
    const { data: existing, error } = await supabase
      .from("applications")
      .select("id")
      .eq("role_slug", roleSlug)
      .eq("email", emailLower)
      .limit(1);

    if (error) {
      console.error("Error checking duplicate:", error);
      return { isDuplicate: false, error: "Could not verify existing applications." };
    }

    return { isDuplicate: existing && existing.length > 0 };
  } catch (err) {
    console.error("Unexpected error in checkDuplicateApplication:", err);
    return { isDuplicate: false, error: "Unexpected error checking duplicates." };
  }
}

export async function saveApplication(
  id: string,
  data: ApplicationInput,
  storagePath: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("applications").insert({
      id,
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      linkedin: data.linkedin,
      portfolio: data.portfolio,
      role_slug: data.role_slug,
      cover_note: data.cover_note,
      resume_path: storagePath,
      status: "new",
    });

    if (error) {
      console.error("Application insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error in saveApplication:", err);
    return { success: false, error: "Unexpected error saving application." };
  }
}
