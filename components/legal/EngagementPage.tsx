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

const legalOlClass = cn(
  legalUlClass,
  "list-decimal space-y-2.5 marker:font-medium marker:text-foreground/45",
);

export function EngagementPage() {
  return (
    <LegalPageShell
      title="Engagement Terms"
      introSummary="These terms set how we define scope, run milestones, accept work, and resolve issues—together with your statement of work."
      intro={`These Engagement Terms (“Engagement Terms”) apply to professional services we perform for you, unless a master services agreement expressly replaces them. We are based in ${LEGAL_VENUE_CITY}. Together with your statement of work (“SOW”), they explain how scope is fixed, how work moves forward, how acceptance works, and how risk is shared—including when you operate outside India and local rules may also apply to you.`}
      lastUpdated={UPDATED}
    >
      <LegalSection id="order" title="1. Order of precedence and incorporation">
        <p className={legalPClass}>
          The SOW, any order form, and these Engagement Terms form one commercial understanding.
        </p>
        <p className={legalPClass}>
          If documents conflict, this order applies unless you and we expressly change it in writing:
        </p>
        <ol className={legalOlClass}>
          <li>Fully executed master agreement, if there is one.</li>
          <li>SOW or order form.</li>
          <li>These Engagement Terms.</li>
          <li>
            Our general Terms &amp; Conditions on the website, for topics these Engagement Terms do
            not cover.
          </li>
        </ol>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="scope" title="2. Scope definition and change control">
        <p className={legalPClass}>
          We do not commit engineering time until the SOW records the following in writing:
        </p>
        <ul className={legalUlClass}>
          <li>Business objectives.</li>
          <li>In-scope and out-of-scope items.</li>
          <li>Deliverable descriptions.</li>
          <li>Technical assumptions.</li>
          <li>Environment targets (browsers, devices, regions).</li>
          <li>Third-party dependencies.</li>
          <li>Acceptance criteria.</li>
          <li>A communication plan.</li>
        </ul>
        <p className={legalPClass}>
          Conversations and calls are preliminary until authorised signatories confirm in writing—or
          email clearly says work is “approved for execution”.
        </p>
        <p className={legalPClass}>
          Any material change needs a written change request. Examples include added features, new
          integrations, different performance targets, or shorter timelines.
        </p>
        <p className={legalPClass}>
          The change request should describe impact on schedule, risk, and fees. We are not required to
          start changed work until the change is signed or acknowledged in writing.
        </p>
        <h3 className={legalH3Class}>Why this matters</h3>
        <div className={legalCalloutClass}>
          <p className={cn(legalPClass, "mt-0")}>
            Fixed fees and milestones assume scope stays stable.
          </p>
          <p className={legalPClass}>
            Scope that keeps growing without change control hurts predictability—for you and for us.
          </p>
          <p className={legalPClass}>
            Clear change requests keep engagements fair and easier to review if questions come up
            later.
          </p>
        </div>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="milestones" title="3. Milestones, dependencies, and scheduling">
        <p className={legalPClass}>
          Engagements are usually phased—for example discovery, build, hardening, and launch support.
        </p>
        <p className={legalPClass}>
          Each milestone should list outputs, review windows, payment triggers, and what we need from
          you (such as design sign-off, API keys, or legal clearance for third-party data).
        </p>
        <h3 className={legalH3Class}>Client delays</h3>
        <p className={legalPClass}>
          If you miss agreed dates for inputs, timelines move accordingly. That delay is not a breach
          by Clykur.
        </p>
        <p className={legalPClass}>
          Long delays may require re-planning fees or pausing the team after we give notice.
        </p>
        <h3 className={legalH3Class}>Deemed acceptance</h3>
        <p className={legalPClass}>
          If the SOW sets a review period and, after a reminder, you neither approve the deliverable
          nor send a written defect list in time, the deliverable may be treated as accepted.
        </p>
        <p className={legalPClass}>
          That acceptance can start invoicing and any warranty period the SOW describes.
        </p>
        <h3 className={legalH3Class}>Force majeure</h3>
        <p className={legalPClass}>
          Events outside reasonable control pause obligations (except payment) for as long as the event
          lasts.
        </p>
        <p className={legalPClass}>
          Each party must notify the other promptly and use good faith to reduce harm.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="communication" title="4. Communication and governance">
        <h3 className={legalH3Class}>How we work together</h3>
        <p className={legalPClass}>
          We are remote-first and use a simple governance model:
        </p>
        <ul className={legalUlClass}>
          <li>A named Clykur lead for the engagement.</li>
          <li>One primary decision-maker on your side.</li>
          <li>Written action items and decisions where it helps avoid ambiguity.</li>
          <li>Channels we agree on—email, chat, calls.</li>
        </ul>
        <p className={legalPClass}>
          Unless the SOW says otherwise, we align working hours with India Standard Time.
        </p>
        <h3 className={legalH3Class}>Production support and SLAs</h3>
        <p className={legalPClass}>
          Severity levels, response times, and on-call coverage belong in a support SOW or SLA add-on.
        </p>
        <p className={legalPClass}>
          Informal chat alone is not enough to define those obligations—we need them in writing so they
          are measurable.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="client" title="5. Client responsibilities">
        <p className={legalPClass}>You agree to:</p>
        <ul className={legalUlClass}>
          <li>
            Give accurate requirements, lawful data, and timely approvals. Late feedback can use budget
            or milestone capacity you have already committed.
          </li>
          <li>
            Keep valid licences and rights for everything you give us—content, fonts, trademarks, and
            training data.
          </li>
          <li>
            Make sure your planned use of deliverables follows applicable law (privacy, financial
            promotion, sector licensing, and similar rules).
          </li>
          <li>
            Understand that we do not give legal or regulatory sign-off unless a separate engagement
            clearly covers that work.
          </li>
          <li>
            Run your own backup, disaster recovery, and security monitoring for production systems—unless
            the SOW explicitly assigns those duties to us.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="delivery" title="6. Delivery, inspection, and warranty">
        <p className={legalPClass}>
          We supply deliverables in the formats the SOW names—for example code repositories, build
          artefacts, or documentation.
        </p>
        <p className={legalPClass}>
          Acceptance follows the written criteria in the SOW. It is not based on subjective taste
          unless the design specification defines objective standards.
        </p>
        <h3 className={legalH3Class}>Warranty</h3>
        <p className={legalPClass}>
          If the SOW includes a warranty against material non-conformity, it runs for the period stated
          there.
        </p>
        <p className={legalPClass}>It covers defects that are reproducible in supported environments.</p>
        <p className={legalPClass}>It does not cover issues that arise from:</p>
        <ul className={legalUlClass}>
          <li>Changes you or others make after handover without our written agreement.</li>
          <li>Platforms or configurations the SOW does not support.</li>
          <li>Failures of third-party services or APIs outside our control.</li>
          <li>Data loss or corruption not caused by us.</li>
        </ul>
        <h3 className={legalH3Class}>Out-of-scope work and estimates</h3>
        <p className={legalPClass}>
          Rework, redesign, or polish outside the SOW needs a new estimate and usually a change order.
        </p>
        <p className={legalPClass}>
          We may share good-faith effort guidance, but numbers are not binding unless we fix them in a
          signed change order.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="outcomes" title="7. No guarantee of business outcomes">
        <p className={legalPClass}>
          Clykur provides engineering execution, architecture judgment, and product craft.
        </p>
        <p className={legalPClass}>
          Unless the SOW includes an explicit, measurable guarantee signed by Clykur leadership, we do{" "}
          <strong className="text-foreground/78">not</strong> promise:
        </p>
        <ul className={legalUlClass}>
          <li>Revenue, profit, or user growth.</li>
          <li>Search rankings or fundraising results.</li>
          <li>Regulatory approval or market adoption.</li>
          <li>Uptime of third-party APIs or platforms.</li>
        </ul>
        <p className={legalPClass}>
          Those results depend on strategy, capital, compliance, competition, and much more than code
          alone.
        </p>
        <p className={legalPClass}>
          You stay responsible for business, legal, tax, and compliance choices. Our technical input is
          not a replacement for advice from your lawyers, accountants, or auditors.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="personnel" title="8. Personnel and subcontractors">
        <p className={legalPClass}>
          We may use employees or qualified subcontractors under equivalent confidentiality and security
          obligations.
        </p>
        <p className={legalPClass}>
          We remain responsible to you for performance of the Services as a whole.
        </p>
        <p className={legalPClass}>
          You may not solicit for hire our personnel who materially worked on your engagement during
          the engagement and for twelve (12) months after—except through a mutually agreed conversion
          fee in writing.
        </p>
        <p className={legalPClass}>
          A <strong className="text-foreground/78">conversion fee</strong> means a one-time fee you
          and we fix in writing if you want to employ someone from our team who worked on your
          project. It helps cover handover, replacement, and transition costs for Clykur.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="confidential" title="9. Confidentiality and intellectual property">
        <p className={legalPClass}>
          Each party protects the other’s confidential information with at least reasonable care.
        </p>
        <p className={legalPClass}>
          Ownership, licences, and open-source obligations for deliverables are set out in the SOW and in
          our general Terms.
        </p>
        <p className={legalPClass}>
          You grant Clykur a limited licence to use your marks and materials only to perform the SOW.
        </p>
        <p className={legalPClass}>
          If you separately approve it, we may also list you in a reasonable client reference format.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="law" title="10. Governing law and disputes">
        <p className={legalPClass}>These Engagement Terms are governed by the laws of India.</p>
        <p className={legalPClass}>
          Subject to mandatory consumer or employment forums, the courts at{" "}
          <strong className="text-foreground/78">{LEGAL_VENUE_CITY}</strong> have exclusive jurisdiction
          over disputes arising from the Services.
        </p>
        <p className={legalPClass}>
          The SOW may instead provide for arbitration seated in {LEGAL_VENUE_CITY} under the Arbitration
          and Conciliation Act, 1996. Many international clients choose that path for cross-border
          enforcement.
        </p>
        <p className={legalPClass}>
          Before filing suit or starting arbitration, both sides will try good-faith negotiation for
          thirty (30) days—unless urgent injunctive relief is needed to prevent irreparable harm.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
