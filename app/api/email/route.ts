import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/db/supabase";
import { sendEmail } from "@/lib/email/resend";
import { EmailSchema } from "@/lib/types/email";
import { isOversizedApiBody } from "@/lib/security/api-request-limits";

import { requireAuthenticatedUser } from "@/lib/api/require-authenticated-user";

export const maxDuration = 25;
export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireAuthenticatedUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient();

    const { data, error } = await supabase.from("emails").select("*");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Error fetching emails" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/email error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (isOversizedApiBody(req)) {
      return NextResponse.json(
        { message: "Payload too large" },
        { status: 413 },
      );
    }

    const user = await requireAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = EmailSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid request body", errors: validation.error.issues },
        { status: 400 },
      );
    }

    const { to, subject, html, text } = validation.data;

    try {
      await sendEmail({ to, subject, html, text });
    } catch (emailError) {
      console.error("Resend error:", emailError);
      // Non-blocking: still attempt to save metadata even if email fails
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("emails")
      .insert([{ to, subject, sent_at: new Date() }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Error saving email metadata" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Email sent and metadata saved", data },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/email error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
