import {
  LEGAL_VENUE_CITY,
  LegalPageShell,
  LegalSection,
  legalDividerClass,
  legalH3Class,
  legalPClass,
  legalUlClass,
} from "./legal-page-shell";

const UPDATED = "16 April 2026";

export function TermsPage() {
  return (
    <LegalPageShell
      title="Terms & Conditions"
      introSummary="These Terms define how you use our website and how we work together on paid engagements."
      intro="These Terms & Conditions (“Terms”) govern access to our website, pre-contractual discussions, and the legal framework for paid work with Clykur. They balance the interests of Clykur and our customers—whether in India or abroad—and keep obligations clear and enforceable under Indian law. Capitalised terms in engagement documents match the meanings below unless your statement of work defines them differently."
      lastUpdated={UPDATED}
    >
      <LegalSection id="about" title="1. About Clykur and contract hierarchy">
        <p className={legalPClass}>
          <strong className="text-foreground/82">Clykur</strong> (“Clykur”, “we”, “us”, “our”) is a
          software product and engineering company. Our operations are centred in{" "}
          <strong className="text-foreground/78">{LEGAL_VENUE_CITY}</strong>.
        </p>
        <p className={legalPClass}>
          Clykur operates as a registered business entity in India (registration and tax particulars
          appear on invoices or are available on reasonable request).
        </p>
        <p className={legalPClass}>
          We may operate under applicable business registrations, including MSME classification where
          recognised. We build and operate proprietary products (
          <strong className="text-foreground/78">Own IP</strong>) and deliver bespoke engineering,
          product, and integration <strong className="text-foreground/78">Services</strong> under
          agreed commercial documents.
        </p>
        <p className={legalPClass}>
          In these Terms, <strong className="text-foreground/78">SOW</strong> means a statement of
          work, order form, or engagement letter that references or incorporates these Terms, together
          with any schedules or change orders the parties execute.
        </p>
        <p className={legalPClass}>
          If a fully executed SOW, master services agreement, or order form conflicts with these
          Terms, that signed document controls—but only for that engagement.
        </p>
        <p className={legalPClass}>
          These Terms still apply to website use, unpaid pilots, and anything the SOW does not
          expressly cover.
        </p>
        <p className={legalPClass}>
          By using{" "}
          <a
            href="https://www.clykur.com"
            className="font-medium text-[#ff3b1f] underline-offset-2 hover:underline"
          >
            www.clykur.com
          </a>
          , submitting a contact form, or signing an order document, you confirm you have authority to
          bind yourself or your organisation. You also confirm that you accept these Terms.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="scope" title="2. Scope of services and acceptable use">
        <h3 className={legalH3Class}>What Services include</h3>
        <p className={legalPClass}>
          Services may include product discovery, UX and UI design, application engineering (frontend,
          backend, mobile), cloud deployment, DevOps, QA, technical documentation, and advisory
          workshops.
        </p>
        <p className={legalPClass}>
          Deliverables, formats, environments, and acceptance tests are defined only in a SOW. Anything
          not written there is out of scope unless both parties sign or confirm a written change order.
        </p>
        <h3 className={legalH3Class}>Own IP, your systems, and acceptable use</h3>
        <ul className={legalUlClass}>
          <li>
            <strong className="text-foreground/78">Own IP:</strong> Licences, subscriptions, and
            product terms for Clykur-owned software are set out in separate end-user or enterprise
            agreements. We grant no implied licence beyond those documents.
          </li>
          <li>
            <strong className="text-foreground/78">Client systems:</strong> You grant us the rights and
            access we reasonably need to perform the SOW. That may include your repositories, cloud
            accounts, and third-party APIs you authorise. You warrant that such access does not breach
            your agreements with third parties.
          </li>
          <li>
            <strong className="text-foreground/78">Acceptable use:</strong> You must not use our website
            or deliverables to break the law, infringe intellectual property, transmit malware, attempt
            unauthorised access, run competitive scraping that harms site performance, or reverse
            engineer our Own IP—except where mandatory law allows.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="users" title="3. User responsibilities and representations">
        <p className={legalPClass}>You represent and warrant that:</p>
        <ul className={legalUlClass}>
          <li>
            Information you provide (contact details, company status, tax identifiers) is accurate and
            kept current.
          </li>
          <li>
            You will follow applicable laws everywhere you use our deliverables or process data. That
            includes export control, sanctions, anti-bribery (including India’s Prevention of Corruption
            Act and comparable laws abroad), and sector-specific rules.
          </li>
          <li>
            If you are an international client, you alone are responsible for local filings, consumer
            disclosures, and regulatory approvals for your products. Our engineering work does not
            replace your compliance programme.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="payments" title="4. Fees, taxes, invoicing, and suspension">
        <p className={legalPClass}>
          Fees, currency, milestones, retainers, and expense rules are set out in the SOW or on our
          invoice.
        </p>
        <p className={legalPClass}>
          Unless we agree otherwise, you pay invoices in full. You may not set off, deduct, or withhold
          except where a statute requires withholding tax. If withholding applies, you gross up or give
          us timely certificates so Clykur receives the net amount we agreed.
        </p>
        <ul className={legalUlClass}>
          <li>
            <strong className="text-foreground/78">Indian indirect tax:</strong> We charge GST or other
            Indian levies where they apply on domestic supplies. Export of services may be zero-rated or
            exempt if you provide the documentation we need.
          </li>
          <li>
            <strong className="text-foreground/78">Late payment:</strong> Overdue amounts may bear
            interest at 1.5% per month or the maximum rate RBI guidance allows for commercial contracts,
            whichever is lower. We may also recover reasonable legal costs where enforceable.
          </li>
          <li>
            <strong className="text-foreground/78">Suspension:</strong> After written notice, we may
            suspend Services or withhold deliverables if invoices are materially overdue. Consumer and
            other non-waivable rights still apply.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="ip" title="5. Intellectual property and open source">
        <p className={legalPClass}>
          <strong className="text-foreground/78">Background IP:</strong> We keep all rights in tools,
          frameworks, templates, and know-how we created before or outside your SOW.
        </p>
        <p className={legalPClass}>
          <strong className="text-foreground/78">Foreground / deliverables:</strong> The SOW states how
          custom work product is assigned or licensed. Until we receive cleared funds for the relevant
          milestone, we may keep a possessory lien on source materials where the law allows.
        </p>
        <p className={legalPClass}>
          <strong className="text-foreground/78">Open source:</strong> Deliverables may include OSS.
          You comply with those licences when you distribute.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="confidential" title="6. Confidentiality">
        <p className={legalPClass}>
          Each party protects the other’s non-public information with at least the same care it uses
          for its own similar information—and never less than reasonable care.
        </p>
        <p className={legalPClass}>
          Confidential duties continue after termination for the period the SOW states. If the SOW is
          silent, they run for five (5) years. Trade secrets stay protected until they become public
          without a breach.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="warranties" title="7. Warranties and disclaimer">
        <p className={legalPClass}>
          Except as a SOW expressly states, Services and the website are{" "}
          <strong className="text-foreground/78">“as is”</strong> and{" "}
          <strong className="text-foreground/78">“as available”</strong>.
        </p>
        <p className={legalPClass}>
          As permitted under applicable law—including the Indian Contract Act, 1872, the Information
          Technology Act, 2000, and consumer statutes—we disclaim implied warranties of merchantability,
          fitness for a particular purpose, and non-infringement, except where the law voids such a
          disclaimer.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="liability" title="8. Limitation of liability">
        <p className={legalPClass}>
          Neither party limits liability for death or personal injury caused by negligence, for fraud,
          or for anything mandatory Indian law does not allow to be capped.
        </p>
        <p className={legalPClass}>
          Subject to that, Clykur’s aggregate liability arising out of or related to these Terms or the
          website (excluding amounts payable under an executed SOW for Services actually delivered)
          shall not exceed the greater of{" "}
          <strong className="text-foreground/78">INR 25,000</strong> and the fees you paid Clykur in
          the three (3) months preceding the claim.
        </p>
        <p className={legalPClass}>
          We are not liable for indirect, consequential, special, incidental, or punitive damages, or
          for lost profits, goodwill, data, or business interruption—even if we were told such loss was
          possible—except where statute forbids that exclusion.
        </p>
        <p className={legalPClass}>
          For paid engagements, the SOW may set different caps or exclusive remedies. If it does not, the
          limits in this clause apply together with any warranty period the SOW names.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="indemnity" title="9. Indemnity (client)">
        <p className={legalPClass}>
          You will indemnify, defend, and hold harmless Clykur and our personnel against third-party
          claims, damages, penalties, and reasonable legal costs that arise from any of the following:
        </p>
        <ul className={legalUlClass}>
          <li>Your materials, datasets, or instructions.</li>
          <li>Your breach of these Terms or a SOW.</li>
          <li>Your violation of law.</li>
          <li>
            Combining deliverables with products or services we did not supply—except to the extent a
            final court decision finds the harm resulted solely from Clykur’s wilful misconduct.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="termination" title="10. Termination and survival">
        <p className={legalPClass}>
          We may suspend or revoke website access if you materially breach these Terms.
        </p>
        <p className={legalPClass}>
          Commercial engagements end as the SOW describes (notice, cure, and payment). When any
          engagement ends, provisions on confidentiality, IP, payment, limitation of liability, indemnity,
          governing law, and dispute resolution stay in force where they logically apply.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="force" title="11. Force majeure">
        <p className={legalPClass}>
          Neither party is liable for delay or failure caused by events beyond reasonable control.
          Examples include natural disasters, war, civil unrest, Internet or utility failures, pandemic
          restrictions, or government action.
        </p>
        <p className={legalPClass}>
          The affected party must notify the other promptly and use reasonable efforts to reduce harm.
          Payment obligations are not excused by force majeure.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="law" title="12. Governing law, jurisdiction, and dispute resolution">
        <p className={legalPClass}>
          These Terms are governed by the laws of <strong className="text-foreground/78">India</strong>.
          We do not apply another jurisdiction’s substantive law through conflict-of-law rules.
        </p>
        <p className={legalPClass}>
          Subject to mandatory forums (such as consumer commissions or labour courts where they apply),
          the courts at <strong className="text-foreground/78">{LEGAL_VENUE_CITY}</strong> have
          exclusive jurisdiction over disputes arising from the website or these Terms—unless you are a
          consumer who may sue in your home jurisdiction under non-waivable law.
        </p>
        <p className={legalPClass}>
          International clients may choose in a signed SOW to use mediation, then arbitration seated in{" "}
          {LEGAL_VENUE_CITY} under the Arbitration and Conciliation Act, 1996, with English as the
          language of the proceeding. If the SOW does not say that, the courts above remain the default
          forum.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="misc" title="13. Miscellaneous">
        <ul className={legalUlClass}>
          <li>
            <strong className="text-foreground/78">Assignment:</strong> You may not assign these Terms
            without our prior written consent. We may assign to an affiliate or as part of a merger or
            asset sale.
          </li>
          <li>
            <strong className="text-foreground/78">Notices:</strong> Formal notices to Clykur should
            be sent to the address or email on the invoice or, if none, to{" "}
            <a
              href="mailto:info@clykur.com"
              className="font-medium text-[#ff3b1f] underline-offset-2 hover:underline"
            >
              info@clykur.com
            </a>
            , and are deemed received when acknowledged in writing.
          </li>
          <li>
            <strong className="text-foreground/78">Electronic records:</strong> You consent to
            electronic contracting and records under the Information Technology Act, 2000.
          </li>
          <li>
            <strong className="text-foreground/78">Severability and waiver:</strong> If a clause is
            invalid, the rest remains effective. Not enforcing a right once is not a waiver.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="changes" title="14. Changes to these Terms">
        <p className={legalPClass}>
          We may revise these Terms by posting a new version with an updated “Last updated” date.
        </p>
        <p className={legalPClass}>
          Continued use of the website after changes take effect means you accept them where the law
          allows. For active paid work, material adverse changes do not apply retroactively without your
          written consent—unless the law requires otherwise.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
