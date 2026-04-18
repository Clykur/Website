import type { Metadata } from "next";
import { EmploymentPage } from "@/components/legal/EmploymentPage";
import { SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Employment Policy",
  description: `Culture, code of conduct, confidentiality, performance, and exit expectations for team members at ${SITE_NAME}.`,
  openGraph: {
    title: `Employment Policy | ${SITE_NAME}`,
    description: `Employment and conduct standards at ${SITE_NAME} — remote-first culture, integrity, and zero tolerance for misconduct.`,
  },
};

export default function EmploymentPolicyRoute() {
  return <EmploymentPage />;
}
