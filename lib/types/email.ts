import { z } from "zod";

export const EmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
  text: z.string().optional(),
});

export type EmailPayload = z.infer<typeof EmailSchema>;