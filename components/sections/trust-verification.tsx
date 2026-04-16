import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

const UDYAM_VERIFICATION_URL =
  "https://udyamregistration.gov.in/verifyudyambarcode.aspx?verifyudrn=cXBF0XeDBvCFZgbrC1WRSpCzCIRijDesXxYCgheNPLs=";

export function TrustVerification() {
  return (
    <section
      id="trust"
      className="clykur-story-section border-t border-foreground/[0.06] bg-gradient-to-b from-[#fafaf9] via-white to-[#fafaf9]"
      aria-labelledby="trust-heading"
    >
      <ScrollReveal className="clykur-story-shell max-w-5xl">
        <div
          data-reveal-item
          className="flex flex-col items-stretch gap-12 md:flex-row md:items-center md:justify-between md:gap-16 lg:gap-20"
        >
          <div className="max-w-md space-y-6 md:py-1">
            <div className="flex items-center gap-4">
              <span
                className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent"
                aria-hidden
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/40">
                Trust
              </p>
            </div>
            <h2
              id="trust-heading"
              className="font-poppins text-[clamp(1.875rem,4vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.03em] text-foreground"
            >
              Trust & Verification
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/48 md:text-base">
              We publish our MSME (UDYAM) registration so you can verify it yourself on the official
              government site no extra steps.
            </p>
            <a
              href={UDYAM_VERIFICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 text-[14px] font-medium text-[#ff3b1f] transition-opacity hover:opacity-85"
            >
              udyamregistration.gov.in
              <ArrowUpRight className="h-4 w-4 opacity-80" strokeWidth={1.75} aria-hidden />
            </a>
          </div>

          <a
            href={UDYAM_VERIFICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mx-auto block w-full max-w-[260px] shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/30 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf9] md:mx-0 md:max-w-[248px]"
            aria-label="Open official MSME UDYAM verification"
          >
            <div className="relative">
              {/* Orange L-shaped corner marks — drafting / verification frame */}
              <span
                className="pointer-events-none absolute -left-px -top-px z-[1] h-8 w-8 border-l-2 border-t-2 border-[#ff3b1f] md:h-9 md:w-9"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -right-px -top-px z-[1] h-8 w-8 border-r-2 border-t-2 border-[#ff3b1f] md:h-9 md:w-9"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -bottom-px -left-px z-[1] h-8 w-8 border-b-2 border-l-2 border-[#ff3b1f] md:h-9 md:w-9"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -bottom-px -right-px z-[1] h-8 w-8 border-b-2 border-r-2 border-[#ff3b1f] md:h-9 md:w-9"
                aria-hidden
              />
              <Image
                src="/udyam-verification-qr.png"
                alt="QR code for MSME UDYAM verification on udyamregistration.gov.in"
                width={280}
                height={280}
                className="relative z-0 h-auto w-full transition-transform duration-500 motion-safe:group-hover:-translate-y-0.5"
                unoptimized
              />
            </div>
            <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/35">
              Scan to verify
            </p>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
