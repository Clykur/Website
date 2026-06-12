"use client";

import dynamic from "next/dynamic";

function BelowFoldPlaceholder() {
  return <div className="min-h-[28vh] w-full" aria-hidden />;
}

const ClientWorks = dynamic(
  () =>
    import("@/components/sections/client-works").then((m) => ({
      default: m.ClientWorks,
    })),
  { ssr: false, loading: BelowFoldPlaceholder },
);
const About = dynamic(
  () =>
    import("@/components/sections/about").then((m) => ({
      default: m.About,
    })),
  { ssr: false, loading: BelowFoldPlaceholder },
);
const Process = dynamic(
  () =>
    import("@/components/sections/process").then((m) => ({
      default: m.Process,
    })),
  { ssr: false, loading: BelowFoldPlaceholder },
);
const CaseStudies = dynamic(
  () =>
    import("@/components/sections/case-studies").then((m) => ({
      default: m.CaseStudies,
    })),
  { ssr: false, loading: BelowFoldPlaceholder },
);
const TrustVerification = dynamic(
  () =>
    import("@/components/sections/trust-verification").then((m) => ({
      default: m.TrustVerification,
    })),
  { ssr: false, loading: BelowFoldPlaceholder },
);
const FAQ = dynamic(
  () => import("@/components/sections/faq").then((m) => ({ default: m.FAQ })),
  { ssr: false, loading: BelowFoldPlaceholder },
);
const Contact = dynamic(
  () =>
    import("@/components/sections/contact").then((m) => ({
      default: m.Contact,
    })),
  { ssr: false, loading: BelowFoldPlaceholder },
);
const SocialProofStrip = dynamic(
  () =>
    import("@/components/marketing/social-proof-strip").then((m) => ({
      default: m.SocialProofStrip,
    })),
  { ssr: false, loading: BelowFoldPlaceholder },
);

/** Homepage sales journey below products: proof, value, process, trust, FAQ, contact. */
export function HomeBelowFold() {
  return (
    <>
      <ClientWorks />
      <About />
      <Process />
      <CaseStudies limit={2} />
      <section className="clykur-story-section border-t border-foreground/[0.05] py-10 md:py-14">
        <div className="clykur-story-shell max-w-6xl">
          <SocialProofStrip />
        </div>
      </section>
      <TrustVerification />
      <FAQ variant="home" />
      <Contact />
    </>
  );
}
