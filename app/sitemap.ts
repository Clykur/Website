import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { getAllSitemapPaths } from "@/lib/seo/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const paths = getAllSitemapPaths();

  return paths.map((path) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency:
      path === "/"
        ? ("weekly" as const)
        : path.startsWith("/services") || path.startsWith("/blog")
          ? ("weekly" as const)
          : path.startsWith("/careers/")
            ? ("weekly" as const)
            : ("monthly" as const),
    priority:
      path === "/"
        ? 1
        : path === "/contact" || path.startsWith("/services/")
          ? 0.9
          : path.startsWith("/hire-") || path.includes("company")
            ? 0.85
            : path.startsWith("/careers/")
              ? 0.75
              : 0.8,
  }));
}
