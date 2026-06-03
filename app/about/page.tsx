import { HubPageView } from "@/components/seo/hub-page";
import { ABOUT_HUB } from "@/lib/seo/hubs";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: ABOUT_HUB.title,
  description: ABOUT_HUB.description,
  path: ABOUT_HUB.path,
});

export default function AboutPage() {
  return <HubPageView page={ABOUT_HUB} />;
}
