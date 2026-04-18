import {
  LEGAL_VENUE_CITY,
  LegalPageShell,
  LegalSection,
  legalCalloutClass,
  legalDividerClass,
  legalH3Class,
  legalPClass,
  legalUlClass,
} from "./legal-page-shell";
import { cn } from "@/lib/utils";

const UPDATED = "16 April 2026";

export function RefundPage() {
  return (
    <LegalPageShell
      title="Refund Policy"
      introSummary="This policy explains when payments are refundable, when they are not, and how we handle billing disputes."
      intro="This Refund Policy explains how Clykur treats payments for professional services. Engagements are usually milestone-based or time-and-materials, with invoicing set out in your statement of work (SOW). The Policy is transparent for clients in India and abroad: it describes when money may be returned or credited, when it will not, and how disagreements are escalated. It does not replace stricter or more favourable remedies in your SOW when those apply."
      lastUpdated={UPDATED}
    >
      <LegalSection id="nature" title="1. Nature of our fees">
        <p className={legalPClass}>
          Software services are intangible. Value is delivered through expertise, time, and artefacts—not
          through a physical product you can send back.
        </p>
        <p className={legalPClass}>
          Fairness therefore comes from clear milestones, acceptance criteria, and change control—not
          from open-ended refund rights after work is delivered.
        </p>
        <p className={legalPClass}>
          Unless the SOW says otherwise, invoices fall due on the dates or events written there—such as
          milestone acceptance, a monthly cycle, or approved expenses.
        </p>
        <p className={legalPClass}>
          You must pay even if you have not yet deployed deliverables to end users—unless the SOW makes
          deployment an express condition before payment is due.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="milestone" title="2. Milestone and retainer mechanics">
        <ul className={legalUlClass}>
          <li>
            <strong className="text-foreground/78">Milestone payments:</strong> Usually invoiced when
            outputs meet objective criteria, or when deemed acceptance applies under the Engagement
            Terms.
          </li>
          <li>
            <strong className="text-foreground/78">Retainers and deposits:</strong> May reserve calendar
            time or fund discovery. Amounts already applied to completed work or third-party costs are
            not refundable. Unused portions are credited or refunded only if the SOW says so.
          </li>
          <li>
            <strong className="text-foreground/78">Taxes and bank fees:</strong> Indian GST and similar
            taxes follow statute. Cross-border wire fees and correspondent bank charges are normally paid
            by the payer unless we agree otherwise.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="eligibility" title="3. When refunds or credits may be granted">
        <p className={legalPClass}>
          We may offer a <strong className="text-foreground/78">refund or credit</strong> (your choice,
          where that is practical) only when all of the following apply:
        </p>
        <ul className={legalUlClass}>
          <li>
            After good-faith effort, we materially fail to perform a prepaid milestone, and the shortfall
            is not due to your conduct or omissions.
          </li>
          <li>
            We cannot cure the failure within a reasonable remedy period that we confirm in writing.
          </li>
          <li>
            You support the review with proportionate records—for example the SOW, ticket or email
            history, repository or artefact state, and relevant invoices.
          </li>
        </ul>
        <p className={legalPClass}>We may also:</p>
        <ul className={legalUlClass}>
          <li>
            <strong className="text-foreground/78">Correct duplicate charges:</strong> Reverse or
            credit verified duplicate payments promptly.
          </li>
          <li>
            <strong className="text-foreground/78">Clykur-initiated cancellation:</strong> If we end the
            engagement for reasons other than your breach and you prepaid for work not yet delivered, we
            refund or credit the unused balance after deducting non-recoverable costs we identify to you.
          </li>
          <li>
            <strong className="text-foreground/78">Respect mandatory law:</strong> Nothing in this Policy
            limits non-waivable rights under the Consumer Protection Act, 2019, other Indian statutes, or
            foreign consumer law where it governs your transaction.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="nonrefund" title="4. Non-refundable and high-friction scenarios">
        <p className={legalPClass}>
          The items below are{" "}
          <strong className="text-foreground/78">generally non-refundable</strong> because work has been
          delivered, risk has moved to you, or the spend cannot fairly be unwound:
        </p>
        <ul className={legalUlClass}>
          <li>
            Fees for milestones you accepted or that were deemed accepted—including if you put
            deliverables into production without timely objection.
          </li>
          <li>
            Time-and-materials charges for hours actually worked, recorded as the SOW requires.
          </li>
          <li>
            Pass-through costs we incurred with your authority: software licences, cloud usage, domains,
            paid APIs, or similar contractor pass-throughs.
          </li>
          <li>
            Deposits or initiation fees the SOW clearly marks as non-refundable to cover planning,
            legal review, or reserved capacity.
          </li>
          <li>
            Situations where you step back after work has started—such as long silence, reprioritisation,
            or internal reorganisation—without releasing you from fees for effort already spent.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="cancellation" title="5. Termination for convenience or cause">
        <h3 className={legalH3Class}>If you end the engagement for convenience</h3>
        <p className={legalPClass}>
          You pay for all work completed through the termination date, any in-flight milestone amount
          the SOW prorates, and third-party commitments we cannot cancel.
        </p>
        <h3 className={legalH3Class}>If we end the engagement for your material breach</h3>
        <p className={legalPClass}>
          That includes material breach such as non-payment, as described in the SOW.
        </p>
        <p className={legalPClass}>
          Outstanding invoices remain due immediately to the extent permitted by law.
        </p>
        <p className={legalPClass}>
          After reasonable notice, we may <strong className="text-foreground/78">temporarily suspend</strong>{" "}
          Services where the contract and statute allow.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="chargeback" title="6. Chargebacks and payment disputes">
        <h3 className={legalH3Class}>Contact us first</h3>
        <p className={legalPClass}>
          Email{" "}
          <a
            href="mailto:info@clykur.com"
            className="font-medium text-[#ff3b1f] underline-offset-2 hover:underline"
          >
            info@clykur.com
          </a>{" "}
          before you ask your bank for a chargeback or reversal. Many billing issues are honest mistakes
          we can fix quickly together.
        </p>
        <h3 className={legalH3Class}>If you dispute payment without contacting us first</h3>
        <p className={legalPClass}>
          If you initiate a card chargeback or bank reversal on an undisputed, contractually due invoice
          without first contacting us, we may:
        </p>
        <ul className={legalUlClass}>
          <li>
            <strong className="text-foreground/78">Temporarily suspend Services</strong>, where permitted.
          </li>
          <li>
            <strong className="text-foreground/78">Seek recovery</strong> of the invoiced amounts plus
            reasonable administrative costs, where the law allows.
          </li>
          <li>
            <strong className="text-foreground/78">Pursue legal remedies</strong> where appropriate.
          </li>
        </ul>
        <h3 className={legalH3Class}>Your responsibilities in a dispute</h3>
        <p className={legalPClass}>
          Give a clear factual summary, cite invoice and SOW references, and keep copies of agreements and
          payment records. That helps us decide fairly and quickly.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="process" title="7. How to request a formal review">
        <p className={legalPClass}>
          Send email to{" "}
          <a
            href="mailto:info@clykur.com?subject=Refund%20or%20billing%20review"
            className="font-medium text-[#ff3b1f] underline-offset-2 hover:underline"
          >
            info@clykur.com
          </a>{" "}
          with:
        </p>
        <ul className={legalUlClass}>
          <li>Invoice numbers and SOW references.</li>
          <li>A concise, factual timeline of what happened.</li>
          <li>Any attachments that fairly support your position.</li>
        </ul>
        <h3 className={legalH3Class}>Target response timelines</h3>
        <div className={legalCalloutClass}>
          <ul className={cn(legalUlClass, "mb-0 space-y-3")}>
            <li>
              <strong className="text-foreground/78">Acknowledgement:</strong> We aim to reply within{" "}
              <strong className="text-foreground/78">five (5) Indian business days</strong> of receipt.
            </li>
            <li>
              <strong className="text-foreground/78">Internal review:</strong> We aim to finish within{" "}
              <strong className="text-foreground/78">twenty (20) business days</strong> where that is
              practical—then we propose a refund, credit, further delivery, or a written explanation if
              we deny the request.
            </li>
          </ul>
        </div>
        <p className={legalPClass}>
          Complex matters involving counsel, forensics, or third parties may need longer; we will tell you
          if that applies.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="law" title="8. Governing framework">
        <p className={legalPClass}>
          This Policy is governed by the laws of India.
        </p>
        <p className={legalPClass}>
          Fee disputes may be filed with competent courts at{" "}
          <strong className="text-foreground/78">{LEGAL_VENUE_CITY}</strong>, unless your SOW names
          arbitration or a different forum.
        </p>
        <p className={legalPClass}>
          If you are an international client, you may still rely on non-waivable protections in your home
          jurisdiction when those laws apply to our relationship.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
