import { createServerSupabaseClient } from "@/lib/supabase/server";

const RESUMES_BUCKET = "Resumes";

export async function uploadResume(
  buffer: Buffer,
  filename: string,
  contentType: string,
  roleSlug: string,
  applicationId: string
): Promise<{ path?: string; error?: string }> {
  try {
    const supabase = createServerSupabaseClient();
    const ext = getExtension(filename);
    const resumeFileName = `resume${ext}`;
    const storagePath = `${roleSlug}/${applicationId}/${resumeFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(RESUMES_BUCKET)
      .upload(storagePath, buffer, {
        contentType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Resume upload error:", uploadError);
      return { error: uploadError.message };
    }

    return { path: storagePath };
  } catch (err) {
    console.error("Unexpected error in uploadResume:", err);
    return { error: "An unexpected error occurred during upload." };
  }
}

export async function getResumeSignedUrl(path: string): Promise<string | null> {
    try {
        const supabase = createServerSupabaseClient();
        const { data, error } = await supabase.storage
            .from(RESUMES_BUCKET)
            .createSignedUrl(path, 60 * 60 * 24 * 7); // 7 days

        if (error || !data) {
            console.error("Failed to generate signed URL:", error);
            return null;
        }

        return data.signedUrl;
    } catch(err) {
        console.error("Unexpected error generating signed URL:", err);
        return null;
    }
}

function getExtension(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
}
