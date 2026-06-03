import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site-config";
import type { SeoLandingPage } from "@/lib/seo/types";

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const canonical = `${SITE_URL}${input.path}`;
  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords?.join(", "),
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function landingMetadata(page: SeoLandingPage): Metadata {
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: page.keywords,
  });
}
