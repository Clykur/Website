import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Sentry example",
  description: "Internal Sentry SDK test page.",
  path: "/sentry-example-page",
  noIndex: true,
});

export default function SentryExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
