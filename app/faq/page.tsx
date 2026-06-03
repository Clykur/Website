import { HubPageView } from "@/components/seo/hub-page";
import { FAQ_HUB } from "@/lib/seo/hubs";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: FAQ_HUB.title,
  description: FAQ_HUB.description,
  path: FAQ_HUB.path,
});

export default function FaqHubPage() {
  return <HubPageView page={FAQ_HUB} />;
}
