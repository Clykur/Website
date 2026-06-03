import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getAllCaseStudies } from "@/lib/case-studies";
import { CaseStudiesHub } from "@/components/case-studies/case-studies-hub";
import { HubPageView } from "@/components/seo/hub-page";

const DESCRIPTION =
  "Clykur case studies: searchable proof of web development, product engineering, and launch outcomes across SaaS, retail, FinTech, and hospitality.";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies",
  description: DESCRIPTION,
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

  return (
    <>
      <HubPageView
        page={{
          path: "/case-studies",
          title: "Case Studies",
          description: DESCRIPTION,
          h1: "Case studies",
          lede: "Filter by industry or service, or search by technology. Each study links to a full write-up with metrics and related services.",
          sections: [],
        }}
      >
        <CaseStudiesHub studies={studies} />
      </HubPageView>
    </>
  );
}
