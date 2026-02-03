import Image from "next/image";

const UDYAM_VERIFICATION_URL =
  "https://udyamregistration.gov.in/verifyudyambarcode.aspx?verifyudrn=cXBF0XeDBvCFZgbrC1WRSpCzCIRijDesXxYCgheNPLs=";

export function TrustVerification() {
  return (
    <section
      id="trust"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            Trust & Verification
          </h2>
          <p className="text-lg text-muted-foreground">
            Compliance and legal verification
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
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
            Scan to verify MSME (UDYAM) registration on Government of India portal
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
      </div>
    </section>
  );
}
