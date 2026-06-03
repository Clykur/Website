import Link from "next/link";
import { LEGAL_MAILTO } from "@/lib/legal-entity";
import {
  legalCalloutClass,
  legalPClass,
} from "@/components/legal/legal-page-shell";
import { cn } from "@/lib/utils";

const trustLinks = [
  { label: "NDA", href: LEGAL_MAILTO.nda },
  { label: "DPA", href: LEGAL_MAILTO.dpa },
  { label: "Service Agreement", href: LEGAL_MAILTO.msa },
  { label: "GST Information", href: LEGAL_MAILTO.gstInfo },
  { label: "Vendor Onboarding Documents", href: LEGAL_MAILTO.vendor },
] as const;

export function LegalTrustBanner({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        legalCalloutClass,
        "border-l-[#ff3b1f]/50 bg-gradient-to-br from-[#ff3b1f]/[0.05] via-white to-white",
        className,
      )}
      aria-labelledby="legal-trust-banner-heading"
    >
      <h2
        id="legal-trust-banner-heading"
        className="font-poppins text-[15px] font-semibold tracking-[-0.02em] text-foreground md:text-base"
      >
        Questions about compliance?
      </h2>
      <p className={cn(legalPClass, "mt-2 text-[13px] md:text-[14px]")}>
        Contact us for procurement, security review, or vendor onboarding:
      </p>
      <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2">
        {trustLinks.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="inline-flex min-h-[44px] items-center text-[13px] font-semibold text-[#ff3b1f] underline-offset-2 hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <p className={cn(legalPClass, "mt-4 text-[12px] text-foreground/48")}>
        Or visit our{" "}
        <Link
          href="/compliance"
          className="font-medium text-[#ff3b1f] hover:underline"
        >
          Compliance
        </Link>{" "}
        and{" "}
        <Link
          href="/security"
          className="font-medium text-[#ff3b1f] hover:underline"
        >
          Security
        </Link>{" "}
        pages for an overview.
      </p>
    </section>
  );
}
