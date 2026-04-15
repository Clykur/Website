import Image from "next/image";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

const UDYAM_VERIFICATION_URL =
  "https://udyamregistration.gov.in/verifyudyambarcode.aspx?verifyudrn=cXBF0XeDBvCFZgbrC1WRSpCzCIRijDesXxYCgheNPLs=";

export function TrustVerification() {
  return (
    <section
      id="trust"
      className="clykur-story-section border-t border-border clykur-section-soft"
      aria-labelledby="trust-heading"
    >
      <ScrollReveal className="clykur-story-shell">
        <header data-reveal-item className="mb-12 text-center md:mb-16">
          <h2 id="trust-heading" className="mb-4 text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Trust & Verification
          </h2>
          <p className="text-lg text-muted-foreground">
            Compliance and legal verification
          </p>
        </header>

        <div data-reveal-item className="flex flex-col items-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
            MSME / UDYAM Registration
          </p>
          <a
            href={UDYAM_VERIFICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 rounded-2xl"
            aria-label="Verify MSME UDYAM registration on Government of India portal"
          >
            <span className="inline-block rounded-2xl overflow-hidden border border-border bg-white p-3 shadow-sm hover:border-foreground/20 transition-colors">
              <Image
                src="/udyam-verification-qr.png"
                alt="QR code to verify MSME UDYAM registration on udyamregistration.gov.in"
                width={256}
                height={256}
                className="rounded-xl"
                unoptimized
              />
            </span>
          </a>
          <p className="mt-4 text-sm text-muted-foreground text-center max-w-sm">
            Scan to verify MSME (UDYAM) registration on Government of India
            portal
          </p>
          <a
            href={UDYAM_VERIFICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-sm font-medium text-foreground underline underline-offset-2 hover:no-underline"
          >
            udyamregistration.gov.in
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
