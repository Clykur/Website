import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Lightweight probe for uptime checks; no external dependencies. */
export async function GET() {
  return NextResponse.json(
    { ok: true, service: "clykur-web" },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
