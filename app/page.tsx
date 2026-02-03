import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Portfolio } from "@/components/sections/portfolio";
import { CaseStudies } from "@/components/sections/case-studies";
import { FAQ } from "@/components/sections/faq";
import { TrustVerification } from "@/components/sections/trust-verification";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <Portfolio />
      <CaseStudies />
      <FAQ />
      <TrustVerification />
      <Contact />
    </>
  );
}

