"use server";

import { headers } from "next/headers";
import { applicationSchema } from "@/lib/security/validation";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { validateResumeFile } from "@/lib/security/file-validation";
import { checkDuplicateApplication, saveApplication } from "@/lib/services/db-service";
import { uploadResume } from "@/lib/services/upload-service";
import { sendApplicantConfirmationEmail } from "@/lib/services/email-service";
import * as Sentry from "@sentry/nextjs";

export type ApplyFormState = { success?: boolean; error?: string };

export async function submitApplication(
  _prevState: ApplyFormState,
  formData: FormData,
): Promise<ApplyFormState> {
  try {
    const headerStore = await headers();
    const ip = headerStore.get("x-forwarded-for") ?? "127.0.0.1";

    // 1. Rate Limiting
    const rateLimitResult = await checkRateLimit(ip);
    if (!rateLimitResult.success) {
      return { success: false, error: "Too many requests. Please try again later." };
    }

    // 2. Honeypot check
    const honeypot = formData.get("site_url_reference");
    if (honeypot) {
      // Bot filled the honeypot field
      console.warn("Honeypot filled by bot:", ip);
      return { success: true }; // Silent failure for bots
    }

    // 3. Turnstile Verification
    const turnstileToken = formData.get("cf-turnstile-response") as string | null;
    if (process.env.NODE_ENV === "production") {
      if (!turnstileToken) {
        return { success: false, error: "Security check failed. Please refresh and try again." };
      }
      const isValidToken = await verifyTurnstileToken(turnstileToken);
      if (!isValidToken) {
        return { success: false, error: "Security validation failed." };
      }
    }

    // 4. Schema Validation (Zod)
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      linkedin: formData.get("linkedin"),
      portfolio: formData.get("portfolio"),
      role_slug: formData.get("role_slug"),
      cover_note: formData.get("cover_note"),
    };

    const validationResult = applicationSchema.safeParse(rawData);
    if (!validationResult.success) {
      // Collect human-readable errors
      const errors = validationResult.error.issues.map((i) => i.message).join(", ");
      return { success: false, error: `Validation error: ${errors}` };
    }

    const data = validationResult.data;

    // 5. File Upload Hardening
    const resume = formData.get("resume") as File | null;
    if (!resume || resume.size === 0) {
      return { success: false, error: "Please upload your resume (PDF, DOC, or DOCX, max 5MB)." };
    }

    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileCheckResult = await validateResumeFile(buffer, resume.name);
    if (!fileCheckResult.success) {
      return { success: false, error: fileCheckResult.error };
    }

    // 6. Duplicate Check
    const dupCheck = await checkDuplicateApplication(data.email, data.role_slug);
    if (dupCheck.error) {
      return { success: false, error: "Could not verify application status. Please try again." };
    }
    if (dupCheck.isDuplicate) {
      return { success: false, error: "You have already applied for this role with this email address." };
    }

    // 7. Upload Resume
    const applicationId = crypto.randomUUID();
    const uploadResult = await uploadResume(buffer, resume.name, resume.type, data.role_slug, applicationId);
    
    if (uploadResult.error || !uploadResult.path) {
      Sentry.captureMessage(`Resume upload failed: ${uploadResult.error}`, "error");
      return { success: false, error: "Failed to upload resume. Please try again." };
    }

    // 8. Save Application to DB
    const dbResult = await saveApplication(applicationId, data, uploadResult.path);
    if (!dbResult.success) {
      Sentry.captureMessage(`DB Insert failed: ${dbResult.error}`, "error");
      return { success: false, error: "Failed to submit application. Please try again." };
    }

    // 9. Send Confirmation Email
    const emailResult = await sendApplicantConfirmationEmail(data.name, data.email, data.role_slug, applicationId);
    if (!emailResult.success) {
      Sentry.captureMessage(`Confirmation email failed to send: ${emailResult.error}`, "error");
      // Don't fail the whole submission just because the email failed
    }

    return { success: true };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("Application submission failed:", error);
    Sentry.captureException(error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}