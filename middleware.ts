import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_MAX_BODY_BYTES } from "@/lib/security/api-request-limits";

const HEAVY_API_PREFIXES = ["/api/chat", "/api/contact", "/api/email"];

function oversizedBody(req: NextRequest): boolean {
  if (req.method === "GET" || req.method === "HEAD") return false;
  const raw = req.headers.get("content-length");
  if (!raw) return false;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > API_MAX_BODY_BYTES;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    process.env.NODE_ENV === "production" &&
    pathname.startsWith("/api/sentry-example-api")
  ) {
    return new NextResponse(null, { status: 404 });
  }

  if (
    HEAVY_API_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    )
  ) {
    if (oversizedBody(req)) {
      return NextResponse.json(
        { message: "Payload too large" },
        { status: 413 },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
