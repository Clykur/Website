import {
  LEGAL_VENUE_CITY,
  LegalPageShell,
  LegalSection,
  legalDividerClass,
  legalH3Class,
  legalPClass,
  legalUlClass,
} from "./legal-page-shell";
import { cn } from "@/lib/utils";

const UPDATED = "16 April 2026";

const cookieCategoryListClass = cn(legalUlClass, "space-y-6 md:space-y-7");

export function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      introSummary="This policy explains what data we collect, why we use it, and how we protect it."
      intro="This Privacy Policy describes how Clykur collects, processes, stores, and shares personal data when you visit our website, communicate with us, or contract for our services. We align with the Digital Personal Data Protection Act, 2023 (“DPDP Act”) and rules thereunder (as and when notified and enforceable). We also follow sensible practice for transparency, security, and legitimate business needs—for clients in India and overseas—while respecting your rights."
      lastUpdated={UPDATED}
    >
      <LegalSection id="controller" title="1. Data fiduciary and contact">
        <p className={legalPClass}>
          Clykur operates from <strong className="text-foreground/78">{LEGAL_VENUE_CITY}</strong>. We act
          as the <strong className="text-foreground/78">data fiduciary</strong> for personal data
          processed through this website and for typical business-development activities.
        </p>
        <p className={legalPClass}>
          If a separate agreement names another entity (for example a group company) as controller for
          a specific product, that document controls for that product.
        </p>
        <p className={legalPClass}>
          For privacy rights requests, security incidents involving your data, or questions about this
          Policy, contact{" "}
          <a
            href="mailto:info@clykur.com?subject=Privacy%20request"
            className="font-medium text-[#ff3b1f] underline-offset-2 hover:underline"
          >
            info@clykur.com
          </a>{" "}
          with the subject line “Privacy request”.
        </p>
        <p className={legalPClass}>
          We may ask reasonable questions to confirm your identity before we disclose or correct
          information.
        </p>
        <p className={legalPClass}>
          Where the DPDP Act requires a named grievance or data protection contact, the same channel
          applies until we publish a dedicated role on this page. We will respond within timelines the
          law prescribes when those rules are in force.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="collect" title="2. Categories of personal data">
        <p className={legalPClass}>
          The data we process depends on how you interact with us. We practise{" "}
          <strong className="text-foreground/78">data minimisation</strong>: we collect what is
          necessary, relevant, and not excessive for the purposes we state.
        </p>
        <ul className={legalUlClass}>
          <li>
            <strong className="text-foreground/78">Identifiers and professional context:</strong> full
            name, work email, telephone, job title, organisation, industry, billing address, GSTIN or
            other tax identifiers you provide, and names of signatories.
          </li>
          <li>
            <strong className="text-foreground/78">Usage and device data:</strong> IP address, cookie
            IDs, browser type and language, device category, approximate location from IP, referring
            URL, pages viewed, scroll or click analytics where we use them, timestamps, and diagnostic
            logs we need for security.
          </li>
          <li>
            <strong className="text-foreground/78">Engagement and project data:</strong> messages; call
            recordings only if you consent; meeting notes you share; support tickets; repository
            identifiers; and configuration details we need to deliver Services.
          </li>
          <li>
            <strong className="text-foreground/78">Financial and compliance:</strong> bank or payment
            metadata, invoices, credit checks where the law allows, and know-your-customer documents if
            a higher-risk engagement requires them.
          </li>
        </ul>
        <p className={legalPClass}>
          We do not knowingly collect sensitive personal data within the meaning of the DPDP Act through
          our marketing website unless you send it voluntarily (for example health information in an
          unsolicited email).
        </p>
        <p className={legalPClass}>
          Please do not share unnecessary sensitive data through unsecured channels.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="bases" title="3. Purposes and lawful bases">
        <p className={legalPClass}>We process personal data for purposes that include:</p>
        <ul className={legalUlClass}>
          <li>
            <strong className="text-foreground/78">Contract performance:</strong> negotiating, executing,
            and delivering statements of work; invoicing; and support.
          </li>
          <li>
            <strong className="text-foreground/78">Consent:</strong> marketing communications,
            non-essential cookies, or optional surveys. If you withdraw consent, we stop that processing
            unless another lawful basis applies.
          </li>
          <li>
            <strong className="text-foreground/78">Legitimate interests:</strong> securing networks,
            keeping the website reliable, limited business analytics, and asserting legal claims—while
            respecting your rights.
          </li>
          <li>
            <strong className="text-foreground/78">Legal obligation:</strong> tax and accounting;
            responding to lawful government requests after appropriate review; and complying with court
            orders.
          </li>
        </ul>
        <p className={legalPClass}>
          Automated decision-making that produces legal or similarly significant effects is not central
          to how we run this website today.
        </p>
        <p className={legalPClass}>
          If that changes, we will update this Policy and give clear information about the logic
          involved and your rights.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="cookies" title="4. Cookies and similar technologies">
        <p className={legalPClass}>
          We use cookies, local storage, pixels, or SDKs where needed to operate and measure our digital
          properties.
        </p>
        <p className={legalPClass}>
          You can control many cookies in your browser. If you block strictly necessary cookies, some
          features (such as login or security) may not work.
        </p>
        <h3 className={legalH3Class}>Strictly necessary</h3>
        <ul className={cookieCategoryListClass}>
          <li>Session continuity and secure operation.</li>
          <li>Load balancing and bot mitigation.</li>
          <li>Storing your cookie or consent preferences where we offer a choice.</li>
        </ul>
        <h3 className={legalH3Class}>Analytics</h3>
        <ul className={cookieCategoryListClass}>
          <li>
            Aggregated or pseudonymous insight into navigation paths and conversion funnels, so we can
            improve the site.
          </li>
        </ul>
        <h3 className={legalH3Class}>Functional</h3>
        <ul className={cookieCategoryListClass}>
          <li>Remembering UI choices such as language, where we provide that option.</li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="sharing" title="5. Processors, sharing, and cross-border transfers">
        <p className={legalPClass}>
          We share personal data with vendors who process it on our instructions (“processors”). That
          includes providers of cloud infrastructure, email, CRM, analytics, accounting, and
          collaboration tools.
        </p>
        <p className={legalPClass}>
          Our contracts require confidentiality, appropriate security, and help with data-subject
          requests where that is practical.
        </p>
        <p className={legalPClass}>
          Personal data may leave India when we serve international clients or use global cloud
          regions.
        </p>
        <p className={legalPClass}>
          Where the DPDP Act limits transfers, we use permitted mechanisms—for example government
          notifications, standard contractual clauses, approved intra-group schemes, or your explicit
          consent—and we document what the final rules require.
        </p>
        <p className={legalPClass}>
          We do not sell personal data in the usual sense of trading mailing lists for cash. We disclose
          data for operations, legal compliance, or contract performance.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="retention" title="6. Retention">
        <p className={legalPClass}>
          How long we keep data depends on statute, dispute risk, and genuine business need.
        </p>
        <ul className={legalUlClass}>
          <li>
            We observe statutory minima where they apply (for example certain Indian tax records for up
            to seven years when relevant).
          </li>
          <li>
            We align with limitation periods that could affect legal claims.
          </li>
          <li>
            We refresh or delete marketing contacts after bounces, unsubscribe, or long inactivity.
          </li>
          <li>
            Project material may sit in encrypted backups with tight access until our deletion cycle
            finishes.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="security" title="7. Security measures">
        <p className={legalPClass}>
          We use administrative, technical, and organisational measures that match the risk. Examples
          include role-based access, MFA on sensitive systems, encryption in transit, logging and
          alerts, vendor reviews, and staff confidentiality training.
        </p>
        <p className={legalPClass}>
          No online system is perfectly secure. Please use strong passwords, guard API tokens, and tell
          us promptly if you suspect an incident.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="rights" title="8. Your rights and how to exercise them">
        <p className={legalPClass}>
          Under applicable law—including the DPDP Act when it applies—you may have rights such as:
        </p>
        <ul className={legalUlClass}>
          <li>Access to your personal data.</li>
          <li>Correction of inaccurate data.</li>
          <li>Erasure or restriction where the law allows.</li>
          <li>
            Nomination of a representative for handling your data after death or incapacity, where
            provided for.
          </li>
          <li>Grievance escalation under the statutory framework.</li>
          <li>Withdrawal of consent where processing is based on consent.</li>
        </ul>
        <p className={legalPClass}>
          In the EEA, UK, and some other regions you may also have rights such as objection or data
          portability.
        </p>
        <p className={legalPClass}>
          We verify requests reasonably to prevent fraud. We respond within statutory deadlines.
        </p>
        <p className={legalPClass}>
          If you remain concerned, you may complain to the Data Protection Board of India when it is
          operational, or to an overseas supervisory authority if GDPR or similar law governs our
          processing of your data.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="children" title="9. Children">
        <p className={legalPClass}>
          Our services are not aimed at children below the age of digital consent under Indian law—or
          below eighteen where consent cannot validly be given.
        </p>
        <p className={legalPClass}>
          If we learn we collected a child’s data without proper authority, we delete it as soon as we
          reasonably can, subject to any legal retention duty.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="international" title="10. International users">
        <p className={legalPClass}>
          If you browse our site from outside India, your data may be processed in India and in other
          countries where we or our processors operate.
        </p>
        <p className={legalPClass}>
          We apply the safeguards described in this Policy. If local law gives you further rights, we
          honour them where they apply to us.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="changes" title="11. Changes to this Policy">
        <p className={legalPClass}>
          We may update this Policy for legal, regulatory, or operational reasons. The “Last updated”
          date shows the current version.
        </p>
        <p className={legalPClass}>
          Important changes that affect ongoing Services will be communicated by reasonable means—for
          example email, in-product notice, or an updated contract exhibit—where the law requires it.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
