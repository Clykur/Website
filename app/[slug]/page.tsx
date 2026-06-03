import { notFound } from "next/navigation";
import { SeoLandingPageView } from "@/components/seo/seo-landing-page";
import { landingMetadata } from "@/lib/seo/metadata";
import { getProgrammaticPage, PROGRAMMATIC_SLUGS } from "@/lib/seo/pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROGRAMMATIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = getProgrammaticPage(slug);
  if (!page) return {};
  return landingMetadata(page);
}

export default async function ProgrammaticSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getProgrammaticPage(slug);
  if (!page) notFound();
  return <SeoLandingPageView page={page} />;
}
