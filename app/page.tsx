import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { Products } from "@/components/sections/products";
import { ProductEcosystem } from "@/components/sections/product-ecosystem";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";

const Process = dynamic(
  () =>
    import("@/components/sections/process").then((m) => ({
      default: m.Process,
    })),
  { ssr: true },
);
const Portfolio = dynamic(
  () =>
    import("@/components/sections/portfolio").then((m) => ({
      default: m.Portfolio,
    })),
  { ssr: true },
);
const CaseStudies = dynamic(
  () =>
    import("@/components/sections/case-studies").then((m) => ({
      default: m.CaseStudies,
    })),
  { ssr: true },
);
const FAQ = dynamic(
  () => import("@/components/sections/faq").then((m) => ({ default: m.FAQ })),
  { ssr: true },
);
const TrustVerification = dynamic(
  () =>
    import("@/components/sections/trust-verification").then((m) => ({
      default: m.TrustVerification,
    })),
  { ssr: true },
);
const Contact = dynamic(
  () =>
    import("@/components/sections/contact").then((m) => ({
      default: m.Contact,
    })),
  { ssr: true },
);

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <ProductEcosystem />
      <Services />
      <About />
      <Process />
      <Portfolio />
      <CaseStudies />
      <FAQ />
      <TrustVerification />
      <Contact />
    </>
  );
}
