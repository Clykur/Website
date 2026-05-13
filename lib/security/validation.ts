import { z } from "zod";
import sanitizeHtml from "sanitize-html";

// Utility to sanitize string inputs
const sanitizeString = (str: string) => {
  return sanitizeHtml(str, {
    allowedTags: [], // no HTML allowed
    allowedAttributes: {},
  }).trim();
};

export const applicationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .transform(sanitizeString),
  
  email: z
    .string()
    .email("Invalid email address")
    .transform(sanitizeString),
  
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format")
    .transform(sanitizeString),
  
  linkedin: z
    .string()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val) : null)),
  
  portfolio: z
    .string()
    .url("Invalid Portfolio URL")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val) : null)),
  
  role_slug: z
    .string()
    .min(1, "Role is required")
    .transform(sanitizeString),
  
  cover_note: z
    .string()
    .max(2000, "Cover note is too long (max 2000 characters)")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? sanitizeString(val) : null)),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
