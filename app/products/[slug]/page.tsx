import { notFound } from "next/navigation";
import { SeoLandingPageView } from "@/components/seo/seo-landing-page";
import { landingMetadata } from "@/lib/seo/metadata";
import { getProductPage, PRODUCT_SLUGS } from "@/lib/seo/pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = getProductPage(slug);
  if (!page) return {};
  return landingMetadata(page);
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getProductPage(slug);
  if (!page) notFound();
  return <SeoLandingPageView page={page} />;
}
