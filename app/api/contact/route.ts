import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email/resend";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { checkRateLimit } from "@/lib/security/rate-limit";

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  company: z.string().max(200).optional(),
  timeline: z.string().max(120).optional(),
  budget_band: z.string().max(120).optional(),
  message: z.string().min(20).max(5000),
});

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rate = await checkRateLimit(`contact:${ip}`);
    if (!rate.success) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid form data", errors: parsed.error.issues },
        { status: 400 },
      );
    }

    const { name, email, company, timeline, budget_band, message } =
      parsed.data;

    if (!process.env.RESEND_API_KEY || !process.env.DOMAIN) {
      return NextResponse.json(
        {
          message:
            "Email service is not configured. Please use WhatsApp or email directly.",
        },
        { status: 503 },
      );
    }

    const subject = `Clykur inquiry from ${name}`;
    const html = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
      ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ""}
      ${budget_band ? `<p><strong>Budget band:</strong> ${budget_band}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `;
    const text = `Name: ${name}\nEmail: ${email}\n${company ? `Company: ${company}\n` : ""}${timeline ? `Timeline: ${timeline}\n` : ""}${budget_band ? `Budget: ${budget_band}\n` : ""}\n${message}`;

    await sendEmail({
      to: CONTACT_EMAIL,
      subject,
      html,
      text,
    });

    return NextResponse.json({
      message: "Thank you, we will get back to you soon.",
    });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
