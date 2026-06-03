/** Where proactive chat open helps conversion without nagging on every page. */

const EXACT_PATHS = new Set([
  "/",
  "/services",
  "/products",
  "/case-studies",
  "/work",
  "/contact",
  "/process",
  "/about",
  "/faq",
]);

const PREFIX_PATHS = [
  "/services/",
  "/products/",
  "/case-studies/",
  "/industries/",
];

const BLOCKED_PREFIXES = [
  "/privacy-policy",
  "/terms-and-conditions",
  "/engagement-terms",
  "/refund-policy",
  "/employment-policy",
  "/compliance",
  "/security",
  "/careers",
  "/blog",
  "/sentry-example-page",
];

export function normalizePath(pathname: string): string {
  const p = pathname.split("?")[0].split("#")[0];
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p || "/";
}

export function shouldAutoOpenOnPath(pathname: string): boolean {
  const path = normalizePath(pathname);

  if (BLOCKED_PREFIXES.some((b) => path === b || path.startsWith(`${b}/`))) {
    return false;
  }

  if (EXACT_PATHS.has(path)) return true;
  if (PREFIX_PATHS.some((prefix) => path.startsWith(prefix))) return true;

  if (
    /^\/hire-/.test(path) ||
    path.includes("mvp-development") ||
    path.includes("software-development")
  ) {
    return true;
  }

  return false;
}

/** Slightly longer on homepage so layout settles; quicker on high-intent contact. */
export function getAutoOpenDelayMs(pathname: string): number {
  const path = normalizePath(pathname);
  if (path === "/contact") return 900;
  if (path === "/") return 1400;
  if (path.startsWith("/services") || path.startsWith("/case-studies"))
    return 1100;
  return 1000;
}
