/** Max JSON body size for public API routes (bytes). */
export const API_MAX_BODY_BYTES = 256 * 1024;

export function isOversizedApiBody(req: Request): boolean {
  const raw = req.headers.get("content-length");
  if (!raw) return false;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > API_MAX_BODY_BYTES;
}

export function getClientIpFromRequest(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip")?.trim() ?? "unknown";
}
