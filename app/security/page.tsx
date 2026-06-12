import Link from "next/link";
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

const PATH = "/security";
const UPDATED = "16 April 2026";

export const metadata = buildPageMetadata({
  title: "Security",
  description:
    "Clykur security overview: data protection, access controls, encryption, backups, incident response, and responsible disclosure.",
  path: PATH,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Security", href: PATH },
];

export default function SecurityPage() {
  const schemas = [
    organizationSchema(),
    webPageSchemaFromPath({
      title: "Security",
      description: "How Clykur protects client and operational data.",
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
        title="Security"
        introSummary="How we protect systems, credentials, and client data across delivery and operations."
        intro="This page describes our security posture at a high level. Detailed controls for a specific engagement may be documented in a statement of work, DPA, or security appendix upon request."
        lastUpdated={UPDATED}
        showEntityTop
      >
        <LegalSection id="overview" title="Security overview">
          <p className={legalPClass}>
            Security is part of how we deliver software: least-privilege access,
            encryption in transit for production systems, reviewed tooling, and
            prompt escalation when something looks wrong. No online service is
            perfectly secure; we combine prevention, monitoring, and response
            appropriate to the risk of each engagement.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="data-protection" title="Data protection measures">
          <ul className={legalUlClass}>
            <li>
              Role-based access to repositories, cloud, and collaboration tools.
            </li>
            <li>
              Multi-factor authentication on sensitive accounts where supported.
            </li>
            <li>
              Confidentiality training and contractual duties for personnel and
              subcontractors.
            </li>
            <li>
              Data minimisation in sales and delivery (collect only what we
              need).
            </li>
            <li>
              Alignment with our Privacy Policy and applicable data-protection
              law.
            </li>
          </ul>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="access" title="Access controls">
          <p className={legalPClass}>
            Access to client environments is granted only for named individuals
            who need it for the SOW. We revoke access when roles change or
            engagements end. Shared credentials are discouraged; prefer
            individual accounts and audit logs where your platform supports
            them.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="encryption" title="Encryption practices">
          <p className={legalPClass}>
            We use TLS for data in transit to our website and standard cloud
            services. Data at rest depends on the platforms you choose (for
            example cloud provider encryption on volumes and object storage).
            Specific encryption requirements can be documented in your SOW or
            DPA.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="backups" title="Backups">
          <p className={legalPClass}>
            Backup and disaster recovery for production systems are normally
            your responsibility unless the SOW assigns them to us. We recommend
            documented backup schedules, tested restores, and separation of
            production and non-production data. We can implement backup-related
            tasks when explicitly in scope.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="incident" title="Incident response">
          <p className={legalPClass}>
            If we suspect a security incident affecting client data or systems
            we touch, we aim to notify you without undue delay and cooperate on
            containment and remediation, subject to law and contract. Report
            suspected issues to us immediately using the contact below.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="vulnerability" title="Vulnerability reporting">
          <p className={legalPClass}>
            If you believe you have found a vulnerability in a Clykur-operated
            property (website or agreed product surface), please report it
            responsibly. Email{" "}
            <a
              href={LEGAL_MAILTO.security}
              className="font-medium text-[#ff3b1f] hover:underline"
            >
              {LEGAL_ENTITY.email}
            </a>{" "}
            with subject &quot;Security inquiry&quot;, include reproduction
            steps and impact, and allow reasonable time to investigate before
            public disclosure.
          </p>
          <p className={legalPClass}>
            Do not access data that is not yours, degrade service, or violate
            applicable law while testing.
          </p>
        </LegalSection>

        <hr className={legalDividerClass} />

        <LegalSection id="security-contact" title="Contact security team">
          <p className={legalPClass}>
            Security and incident reports:{" "}
            <a
              href={LEGAL_MAILTO.security}
              className="font-medium text-[#ff3b1f] hover:underline"
            >
              {LEGAL_ENTITY.email}
            </a>
            . Phone:{" "}
            <a
              href={`tel:${LEGAL_ENTITY.phoneTel}`}
              className="font-medium text-[#ff3b1f] hover:underline"
            >
              {LEGAL_ENTITY.phoneDisplay}
            </a>
            .
          </p>
          <p className={legalPClass}>
            For data-processing terms, see our{" "}
            <Link
              href="/compliance"
              className="font-medium text-[#ff3b1f] hover:underline"
            >
              Compliance
            </Link>{" "}
            page (DPA available upon request).
          </p>
        </LegalSection>
      </TrustPageView>
    </>
  );
}
