import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { getRolePaths } from "@/lib/careers-roles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const rolePaths = getRolePaths();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const careerPages: MetadataRoute.Sitemap = rolePaths.map((slug) => ({
    url: `${baseUrl}/careers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...careerPages];
}
