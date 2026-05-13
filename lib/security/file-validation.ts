import { fileTypeFromBuffer } from "file-type";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

export async function validateResumeFile(buffer: Buffer, filename: string): Promise<{ success: boolean; error?: string }> {
  // 1. Check size
  if (buffer.length === 0) {
    return { success: false, error: "File is empty." };
  }
  if (buffer.length > MAX_FILE_BYTES) {
    return { success: false, error: "Resume must be 5MB or smaller." };
  }

  // 2. Check Magic Bytes using file-type
  const type = await fileTypeFromBuffer(buffer);
  
  if (!type) {
    // Some older .doc files might not be detected by file-type easily.
    // However, it's safer to reject unknown files.
    // If you find legitimate .doc files being rejected, you might need a fallback check.
    const isDoc = filename.toLowerCase().endsWith(".doc");
    if (isDoc) {
        return { success: true };
    }
    return { success: false, error: "Unable to verify file type." };
  }

  if (!ALLOWED_MIME_TYPES.includes(type.mime)) {
    return { success: false, error: "File must be a valid PDF, DOC, or DOCX." };
  }

  return { success: true };
}
