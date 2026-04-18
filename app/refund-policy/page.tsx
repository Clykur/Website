import type { Metadata } from "next";
import { RefundPage } from "@/components/legal/RefundPage";
import { SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Milestone-based payments, refund eligibility, non-refundable fees, and cancellation terms for ${SITE_NAME} client engagements.`,
  openGraph: {
    title: `Refund Policy | ${SITE_NAME}`,
    description: `Refund and credit policy for ${SITE_NAME} — milestone billing, exclusions, and how to request a review.`,
  },
};

export default function RefundPolicyRoute() {
  return <RefundPage />;
}
