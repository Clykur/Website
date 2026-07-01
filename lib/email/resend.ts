import { Resend } from "resend";
import { EmailPayload } from "@/lib/types/email";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set.");
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export const sendEmail = async (payload: EmailPayload) => {
  const domain = process.env.DOMAIN;
  if (!domain) {
    throw new Error("DOMAIN environment variable is not set.");
  }

  const { to, subject, html, text } = payload;

  try {
    const { data, error } = await getResendClient().emails.send({
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
