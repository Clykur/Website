import {
  LegalSection,
  legalDividerClass,
  legalPClass,
  legalUlClass,
} from "@/components/legal/legal-page-shell";
import { TrustPageView } from "@/components/legal/trust-page-view";
import { LEGAL_ENTITY, LEGAL_MAILTO } from "@/lib/legal-entity";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  organizationSchema,
  webPageSchemaFromPath,
} from "@/lib/seo/schemas";

const PATH = "/compliance";
const UPDATED = "16 April 2026";

export const metadata = buildPageMetadata({
  title: "Compliance",
  description:
    "Clykur compliance overview: company registration, Udyam MSME, data protection, confidentiality, contracting, and international client practices.",
  path: PATH,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Compliance", href: PATH },
];

export default function CompliancePage() {
  const schemas = [
    organizationSchema(),
    webPageSchemaFromPath({
      title: "Compliance",
      description:
        "Clykur compliance, regulatory, and procurement information for clients in India and internationally.",
      path: PATH,
    }),
    breadcrumbSchema(breadcrumbs),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TrustPageView
        title="Compliance"
        introSummary="Transparency for procurement, finance, and legal review when you work with Clykur."
        intro="This page summarises how we identify our business, handle tax and MSME registration, protect data, and contract with clients in India and abroad. It supplements our Terms, Privacy Policy, and Engagement Terms."
        lastUpdated={UPDATED}
        showEntityTop
      >
        <LegalSection id="company" title="Company information">
          <p className={legalPClass}>
            <strong className="text-foreground/78">
              {LEGAL_ENTITY.legalName}
            </strong>{" "}
            ({LEGAL_ENTITY.tradeName}) is a micro enterprise registered under
            India&apos;s Udyam scheme, with major activity in{" "}
            {LEGAL_ENTITY.majorActivity.toLowerCase()}. Our registered office is
            in {LEGAL_ENTITY.jurisdiction}.
          </p>
          <p className={legalPClass}>
            Formal contracting, invoicing, and notices use the entity details
            shown in our legal entity disclosure on this site and on signed
            statements of work.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="regulatory" title="Regulatory information">
          <p className={legalPClass}>
            We operate under applicable Indian commercial, tax, labour, and
            information-technology laws. Engagements are documented in writing
            (statement of work, order form, or master agreement) with clear
            scope, fees, and acceptance criteria.
          </p>
          <p className={legalPClass}>
            We do not provide legal, tax, or regulatory sign-off unless a
            separate engagement explicitly covers that work. Clients remain
            responsible for their own compliance programmes and product
            obligations in their markets.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="gst" title="GST registration">
          <p className={legalPClass}>
            {LEGAL_ENTITY.gstin
              ? `Our GSTIN is ${LEGAL_ENTITY.gstin}.`
              : "We do not yet display a GSTIN on this site. When GST registration is active, we will update this page and invoices. Until then, contact us for the tax documentation that applies to your engagement."}
          </p>
          <p className={legalPClass}>
            Domestic supplies in India may attract GST where applicable. Export
            of services may be zero-rated or treated under applicable rules when
            you provide the documentation we need for your jurisdiction.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="udyam" title="MSME / Udyam">
          <p className={legalPClass}>
            Udyam registration number:{" "}
            <strong className="text-foreground/78">
              {LEGAL_ENTITY.udyamRegistrationNumber}
            </strong>
            . Classification: {LEGAL_ENTITY.enterpriseType} enterprise.
          </p>
          <p className={legalPClass}>
            Buyers and partners may verify registration through official
            Government of India channels. We can provide a registration
            certificate or letter on reasonable request for vendor onboarding.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="data" title="Data protection">
          <p className={legalPClass}>
            Our Privacy Policy describes how we collect and process personal
            data, including under India&apos;s Digital Personal Data Protection
            Act, 2023, where applicable. We use administrative, technical, and
            organisational safeguards aligned to risk.
          </p>
          <p className={legalPClass}>
            <strong className="text-foreground/78">
              Data Processing Agreement (DPA):
            </strong>{" "}
            available upon request for clients who need processor terms,
            sub-processor transparency, or cross-border transfer language. Email{" "}
            <a
              href={LEGAL_MAILTO.dpa}
              className="font-medium text-[#ff3b1f] hover:underline"
            >
              {LEGAL_ENTITY.email}
            </a>{" "}
            with the subject &quot;DPA request&quot; and your company name,
            product, and regions involved.
          </p>
          <p className={legalPClass}>
            See also our <a href="/security">Security</a> page for operational
            security practices.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="confidentiality" title="Client confidentiality">
          <p className={legalPClass}>
            Confidentiality obligations in our Engagement Terms and general
            Terms apply to non-public information shared during sales and
            delivery. We limit access to personnel and subprocessors who need it
            to perform the work.
          </p>
          <p className={legalPClass}>
            Mutual NDAs are available on request for early-stage discussions:{" "}
            <a
              href={LEGAL_MAILTO.nda}
              className="font-medium text-[#ff3b1f] hover:underline"
            >
              request an NDA
            </a>
            .
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="contracting" title="Contracting process">
          <ul className={legalUlClass}>
            <li>
              Discovery and scope alignment (written objectives and
              assumptions).
            </li>
            <li>
              Statement of work or order form referencing Engagement Terms.
            </li>
            <li>
              Optional master services agreement for larger or recurring
              programmes.
            </li>
            <li>
              Milestone acceptance, change control, and invoicing per the SOW.
            </li>
            <li>Handoff, documentation, and support terms as agreed.</li>
          </ul>
          <p className={legalPClass}>
            For a service agreement template or MSA discussion:{" "}
            <a
              href={LEGAL_MAILTO.msa}
              className="font-medium text-[#ff3b1f] hover:underline"
            >
              contact us
            </a>
            .
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="international" title="International clients">
          <p className={legalPClass}>
            We serve clients outside India with the same written scope and
            delivery practices. Governing law is typically India, with courts in{" "}
            {LEGAL_ENTITY.jurisdiction}, unless your signed SOW provides for
            arbitration under the Arbitration and Conciliation Act, 1996.
          </p>
          <p className={legalPClass}>
            You remain responsible for local consumer, privacy, sector, and tax
            rules in your country. We support reasonable audit and security
            questionnaires where proportionate to the engagement.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="contact" title="Compliance contact">
          <p className={legalPClass}>
            Email{" "}
            <a
              href={LEGAL_MAILTO.compliance}
              className="font-medium text-[#ff3b1f] hover:underline"
            >
              {LEGAL_ENTITY.email}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${LEGAL_ENTITY.phoneTel}`}
              className="font-medium text-[#ff3b1f] hover:underline"
            >
              {LEGAL_ENTITY.phoneDisplay}
            </a>{" "}
            for compliance, vendor onboarding, GST documentation, or DPA
            requests.
          </p>
          <p className={legalPClass}>
            Vendor onboarding pack:{" "}
            <a
              href={LEGAL_MAILTO.vendor}
              className="font-medium text-[#ff3b1f] hover:underline"
            >
              request documents
            </a>
            .
          </p>
        </LegalSection>
      </TrustPageView>
    </>
  );
}
