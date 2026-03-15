"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

const RESUMES_BUCKET = "Resumes";
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const isDev = process.env.NODE_ENV === "development";

function getExtension(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
}

function isValidFileType(type: string, name: string): boolean {
  if (ALLOWED_TYPES.includes(type)) return true;
  return ALLOWED_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext));
}

export type ApplyFormState = { success?: boolean; error?: string };

export async function submitApplication(
  _prevState: ApplyFormState,
  formData: FormData,
): Promise<ApplyFormState> {
  try {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const linkedin = (formData.get("linkedin") as string)?.trim() || null;
    const portfolio = (formData.get("portfolio") as string)?.trim() || null;
    const role_slug = (formData.get("role_slug") as string)?.trim();
    const cover_note = (formData.get("cover_note") as string)?.trim() || null;
    const resume = formData.get("resume") as File | null;

    if (!name || !email || !phone || !role_slug) {
      return {
        success: false,
        error: "Name, email, phone, and role are required.",
      };
    }

    if (!resume || resume.size === 0) {
      return {
        success: false,
        error: "Please upload your resume (PDF, DOC, or DOCX, max 5MB).",
      };
    }

    if (resume.size > MAX_FILE_BYTES) {
      return { success: false, error: "Resume must be 5MB or smaller." };
    }

    const ext = getExtension(resume.name);
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return { success: false, error: "Resume must be PDF, DOC, or DOCX." };
    }

    if (!isValidFileType(resume.type, resume.name)) {
      return { success: false, error: "Resume must be PDF, DOC, or DOCX." };
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase env vars");
      return {
        success: false,
        error: "Server configuration error. Please contact the site owner.",
      };
    }

    const supabase = createServerSupabaseClient();

    // Prevent duplicate: same email + role
    const emailLower = email.toLowerCase();
    const { data: existing } = await supabase
      .from("applications")
      .select("id, email")
      .eq("role_slug", role_slug);
    const duplicate = existing?.some(
      (row) => row.email?.toLowerCase() === emailLower,
    );
    if (duplicate) {
      return {
        success: false,
        error:
          "You have already applied for this role with this email address.",
      };
    }

    const applicationId = crypto.randomUUID();
    const resumeFileName = `resume${ext}`;
    const storagePath = `${applicationId}/${resumeFileName}`;

    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(RESUMES_BUCKET)
      .upload(storagePath, buffer, {
        contentType: resume.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Resume upload error:", uploadError.message, uploadError);
      const hint = isDev ? ` (${uploadError.message})` : "";
      return {
        success: false,
        error: `Failed to upload resume. Please try again.${hint}`,
      };
    }

    const resume_path = `${applicationId}/${resumeFileName}`;

    const { error: insertError } = await supabase.from("applications").insert({
      id: applicationId,
      name,
      email,
      phone,
      linkedin,
      portfolio,
      role_slug,
      cover_note,
      resume_path,
      status: "new",
    });

    if (insertError) {
      console.error(
        "Application insert error:",
        insertError.message,
        insertError,
      );
      const hint = isDev ? ` (${insertError.message})` : "";
      return {
        success: false,
        error: `Failed to submit application. Please try again.${hint}`,
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Application submit error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return {
      success: false,
      error: isDev
        ? `Something went wrong: ${message}`
        : "Something went wrong. Please try again.",
    };
  }
}
