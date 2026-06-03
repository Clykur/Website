import Link from "next/link";
import { MapPin } from "lucide-react";
import { LEGAL_ENTITY, LEGAL_MAILTO } from "@/lib/legal-entity";
import { legalSectionSurfaceClass } from "@/components/legal/legal-page-shell";
import { cn } from "@/lib/utils";

type LegalEntityProps = {
  variant?: "full" | "compact";
  className?: string;
};

function DetailItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium tracking-[-0.01em] text-foreground/42">
        {label}
      </p>
      <div className="mt-1.5 text-[13px] leading-relaxed text-foreground/72 md:text-[14px]">
        {children}
      </div>
    </div>
  );
}

export function LegalEntity({ variant = "full", className }: LegalEntityProps) {
  const isCompact = variant === "compact";

  if (isCompact) {
    return (
      <footer
        className={cn(
          "not-prose border-t border-foreground/[0.06] pt-7 text-[13px] leading-relaxed text-foreground/52 md:pt-8",
          className,
        )}
        aria-label="Company registration summary"
      >
        <p>
          <span className="font-semibold text-foreground/78">
            {LEGAL_ENTITY.legalName}
          </span>
          <span className="text-foreground/28" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <span className="tabular-nums text-foreground/58">
            {LEGAL_ENTITY.udyamRegistrationNumber}
          </span>
          <span className="text-foreground/28" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <span>{LEGAL_ENTITY.jurisdiction.split(",")[0]}</span>
        </p>
        <p className="mt-2.5 flex flex-wrap items-center gap-x-1 gap-y-1">
          <a
            href={LEGAL_MAILTO.general}
            className="font-medium text-[#ff3b1f] underline-offset-2 hover:underline"
          >
            {LEGAL_ENTITY.email}
          </a>
          <span className="text-foreground/22" aria-hidden>
            ·
          </span>
          <a
            href={`tel:${LEGAL_ENTITY.phoneTel}`}
            className="text-foreground/58 underline-offset-2 hover:text-foreground hover:underline"
          >
            {LEGAL_ENTITY.phoneDisplay}
          </a>
          <span className="hidden text-foreground/22 sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/compliance"
            className="basis-full font-medium text-foreground/62 underline-offset-2 hover:text-[#ff3b1f] hover:underline sm:basis-auto"
          >
            Full company & compliance details
          </Link>
        </p>
      </footer>
    );
  }

  return (
    <aside
      className={cn(legalSectionSurfaceClass, "not-prose", className)}
      aria-labelledby="legal-entity-heading"
    >
      <div className="flex gap-3.5 sm:gap-4">
        <span
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-foreground/[0.08] bg-foreground/[0.02]"
          aria-hidden
        >
          <MapPin className="h-4 w-4 text-[#ff3b1f]/80" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/38">
            Company
          </p>
          <h2
            id="legal-entity-heading"
            className="mt-1.5 font-poppins text-[1.125rem] font-semibold tracking-[-0.03em] text-foreground sm:text-xl"
          >
            {LEGAL_ENTITY.tradeName}
          </h2>
          <p className="mt-1 text-[13px] text-foreground/50 md:text-[14px]">
            Registered as {LEGAL_ENTITY.legalName} ·{" "}
            {LEGAL_ENTITY.enterpriseType} enterprise ·{" "}
            {LEGAL_ENTITY.majorActivity}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-x-8 md:mt-7">
        <DetailItem label="Registered office">
          <address className="not-italic">
            {LEGAL_ENTITY.registeredAddressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </DetailItem>

        <DetailItem label="Udyam (MSME)">
          <span className="font-medium tabular-nums text-foreground/82">
            {LEGAL_ENTITY.udyamRegistrationNumber}
          </span>
        </DetailItem>

        <DetailItem label="Jurisdiction">
          {LEGAL_ENTITY.jurisdiction}
        </DetailItem>

        <DetailItem label="Contact">
          <a
            href={LEGAL_MAILTO.general}
            className="block font-medium text-[#ff3b1f] underline-offset-2 hover:underline"
          >
            {LEGAL_ENTITY.email}
          </a>
          <a
            href={`tel:${LEGAL_ENTITY.phoneTel}`}
            className="mt-1 block text-foreground/62 underline-offset-2 hover:text-foreground hover:underline"
          >
            {LEGAL_ENTITY.phoneDisplay}
          </a>
        </DetailItem>
      </div>

      {LEGAL_ENTITY.gstin ? (
        <p className="mt-6 border-t border-foreground/[0.05] pt-5 text-[12px] text-foreground/48 md:text-[13px]">
          GSTIN:{" "}
          <span className="tabular-nums font-medium text-foreground/65">
            {LEGAL_ENTITY.gstin}
          </span>
        </p>
      ) : (
        <p className="mt-6 border-t border-foreground/[0.05] pt-5 text-[12px] leading-relaxed text-foreground/45 md:text-[13px]">
          GST registration is in progress. For invoicing and tax documentation
          on your engagement,{" "}
          <a
            href={LEGAL_MAILTO.gstInfo}
            className="font-medium text-[#ff3b1f] hover:underline"
          >
            contact us
          </a>
          .
        </p>
      )}
    </aside>
  );
}
