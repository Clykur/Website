import type { MetadataRoute } from "next";
import { ALLOWED_CRAWLER_USER_AGENTS } from "@/lib/seo/crawler-agents";
import { SITE_URL } from "@/lib/site-config";

const DISALLOW = ["/api/", "/monitoring", "/sentry-example-page"];

export default function robots(): MetadataRoute.Robots {
  const specificAgents = ALLOWED_CRAWLER_USER_AGENTS.filter((ua) => ua !== "*");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      ...specificAgents.map((userAgent) => ({
        userAgent,
        allow: "/" as const,
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
