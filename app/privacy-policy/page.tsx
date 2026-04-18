import type { Metadata } from "next";
import { PrivacyPage } from "@/components/legal/PrivacyPage";
import { SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects personal data — cookies, third parties, security, and your rights (India & international).`,
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `Privacy practices for ${SITE_NAME}: data use, cookies, processors, and rights under Indian law where applicable.`,
  },
};

export default function PrivacyPolicyRoute() {
  return <PrivacyPage />;
}
