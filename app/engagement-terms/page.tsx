import type { Metadata } from "next";
import { EngagementPage } from "@/components/legal/EngagementPage";
import { SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Engagement Terms",
  description: `Milestones, communication, client responsibilities, and delivery expectations for ${SITE_NAME} engineering engagements.`,
  openGraph: {
    title: `Engagement Terms | ${SITE_NAME}`,
    description: `How ${SITE_NAME} scopes and delivers client work — milestones, acceptance, revisions, and outcome disclaimers.`,
  },
};

export default function EngagementTermsRoute() {
  return <EngagementPage />;
}
