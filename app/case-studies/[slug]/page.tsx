import { notFound } from "next/navigation";
import { CaseStudyDetailView } from "@/components/case-studies/case-study-detail-view";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/case-studies";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return buildPageMetadata({
    title: study.seoTitle,
    description: study.seoDescription,
    path: `/case-studies/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return <CaseStudyDetailView study={study} />;
}
