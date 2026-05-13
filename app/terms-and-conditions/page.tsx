import type { Metadata } from "next";
import { TermsPage } from "@/components/legal/TermsPage";
import { SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Read the terms governing use of ${SITE_NAME}'s website and services — scope, payments, liability, and governing law (India).`,
  openGraph: {
    title: `Terms & Conditions | ${SITE_NAME}`,
    description: `Legal terms for ${SITE_NAME}: services scope, user responsibilities, and Indian governing law.`,
  },
};

export default function TermsAndConditionsRoute() {
  return <TermsPage />;
}
