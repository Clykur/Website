import { ProcessPageView } from "@/components/process/process-page-view";
import { PROCESS_HUB } from "@/lib/seo/hubs";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: PROCESS_HUB.title,
  description: PROCESS_HUB.description,
  path: PROCESS_HUB.path,
});

export default function ProcessPage() {
  return <ProcessPageView />;
}
