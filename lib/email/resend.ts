import { Resend } from "resend";
import { EmailPayload } from "@/lib/types/email";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.DOMAIN;

export const sendEmail = async (payload: EmailPayload) => {
  if (!domain) {
    throw new Error("DOMAIN environment variable is not set.");
  }

  const { to, subject, html, text } = payload;

  try {
    const { data, error } = await resend.emails.send({
      from: `Careers <noreply@${domain}>`,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};