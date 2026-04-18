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

export function EmploymentPage() {
  return (
    <LegalPageShell
      title="Employment Policy"
      introSummary="This policy defines how we work, collaborate, and uphold trust across all roles at Clykur."
      intro="This Employment Policy sets minimum standards of conduct, confidentiality, and accountability for everyone who works with Clykur—interns, full-time and part-time employees, consultants under contract, and founding members. Read it together with your offer letter, internship deed, or consultancy agreement, and with applicable central and Karnataka employment law, rules, and internal HR policies."
      lastUpdated={UPDATED}
    >
      <LegalSection id="applies" title="1. Who is covered">
        <p className={legalPClass}>
          The Policy applies to anyone performing work for or on behalf of Clykur, anywhere in the world.
        </p>
        <p className={legalPClass}>
          Reputation, security, and client trust do not stop at an office border—especially with remote
          access.
        </p>
        <p className={legalPClass}>
          Whether you are an employee, intern, or independent contractor is decided by your written
          agreement and by law. Casual labels do not change that classification.
        </p>
        <p className={legalPClass}>
          If this Policy and your contract disagree on a point, the contract wins for that point when it
          is valid under law. Otherwise this Policy or the statute applies.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="culture" title="2. Work culture and ways of working">
        <h3 className={legalH3Class}>Remote-first culture</h3>
        <p className={legalPClass}>
          Clykur is <strong className="text-foreground/78">remote-first</strong>, with headquarters
          culture anchored in {LEGAL_VENUE_CITY}.
        </p>
        <p className={legalPClass}>
          We expect clear written updates, respect for deep-work time, and empathy across time zones when
          you work with colleagues or clients abroad.
        </p>
        <h3 className={legalH3Class}>What we value day to day</h3>
        <ul className={legalUlClass}>
          <li>
            <strong className="text-foreground/78">Ownership:</strong> Own outcomes in your lane—offer
            options, record trade-offs, and close loops without needing constant supervision.
          </li>
          <li>
            <strong className="text-foreground/78">Craft and velocity:</strong> Ship with care: measure,
            iterate, and do not trade away security or honesty for speed.
          </li>
          <li>
            <strong className="text-foreground/78">Inclusion:</strong> Discrimination or harassment on
            grounds protected under Indian law—including the Constitution and applicable labour
            enactments—is not allowed.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="conduct" title="3. Code of conduct">
        <h3 className={legalH3Class}>Professional integrity</h3>
        <ul className={legalUlClass}>
          <li>
            Treat colleagues, clients, vendors, and the public with dignity in every channel—chat,
            email, video, and social posts where you identify with Clykur.
          </li>
          <li>
            Disclose conflicts of interest: investments, advisory roles, or side work that touches
            Clykur customers, suppliers, or our roadmap.
          </li>
          <li>
            Do not offer or accept bribes, kickbacks, or gifts meant to sway business decisions. Follow
            anti-corruption guidance and the law.
          </li>
          <li>
            Do not use substances that impair judgment during work hours or client meetings.
          </li>
        </ul>
        <h3 className={legalH3Class}>Safety, security, and company assets</h3>
        <ul className={legalUlClass}>
          <li>
            Turn on MFA where we require it. Use only approved tools and repositories for code and
            data.
          </li>
          <li>
            Classify and handle data per internal guidelines.
          </li>
          <li>
            Report suspected security incidents right away—even if you caused them by mistake.
          </li>
          <li>
            Return company equipment in good condition when you leave.
          </li>
        </ul>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="posh" title="4. Prevention of sexual harassment (POSH)">
        <p className={legalPClass}>
          Clykur follows the Sexual Harassment of Women at Workplace (Prevention, Prohibition and
          Redressal) Act, 2013.
        </p>
        <p className={legalPClass}>
          That includes running an Internal Committee where the law requires it, sharing required
          information, and running enquiries fairly and confidentially.
        </p>
        <p className={legalPClass}>
          Retaliation against someone who reports in good faith—or who takes part in an enquiry—is
          grounds for serious discipline.
        </p>
        <p className={legalPClass}>
          Use HR or the IC routes described in internal handbooks to raise concerns.
        </p>
        <p className={legalPClass}>
          Everyone deserves a respectful workplace. We also address misconduct under this Policy and your
          contract when it falls outside POSH’s strict statutory wording—for example affecting men or
          non-binary colleagues.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="confidential" title="5. Confidentiality and data">
        <p className={legalPClass}>
          In your role you may see trade secrets, client information, roadmaps, financials, and
          personal data governed by the DPDP Act and client agreements.
        </p>
        <p className={legalPClass}>You must:</p>
        <ul className={legalUlClass}>
          <li>Use that information only for authorised business purposes.</li>
          <li>Work on approved devices and approved systems.</li>
          <li>
            Not copy confidential material to personal storage, personal AI tools, or other unapproved
            services without written clearance.
          </li>
          <li>
            Follow data-classification and access rules your manager or security team set.
          </li>
        </ul>
        <p className={legalPClass}>
          When your employment or internship ends, return or destroy materials as we direct.
        </p>
        <p className={legalPClass}>
          Confidentiality duties continue until information legitimately becomes public without breach.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="performance" title="6. Performance and conduct expectations">
        <p className={legalPClass}>
          Your manager sets goals that line up with team priorities. We expect you to:
        </p>
        <ul className={legalUlClass}>
          <li>Flag blockers early with enough context to help.</li>
          <li>Take part in reviews and feedback openly and professionally.</li>
          <li>Join meetings you committed to and reply within norms for your role.</li>
          <li>Record time and expenses honestly where your role uses timesheets or expenses.</li>
        </ul>
        <p className={legalPClass}>
          If performance stays below reasonable standards after documented coaching when coaching is
          appropriate, we may use performance plans, change of role, termination, or non-renewal of an
          internship—according to your contract and laws such as the Industrial Employment (Standing
          Orders) Act where they apply.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="misconduct" title="7. Zero tolerance and enforcement">
        <p className={legalPClass}>
          The following may lead to summary termination and referral to authorities:
        </p>
        <ul className={legalUlClass}>
          <li>Violence.</li>
          <li>Theft.</li>
          <li>Fraud.</li>
          <li>Deliberate data exfiltration.</li>
          <li>Sabotage.</li>
          <li>Serious harassment.</li>
          <li>Falsification of credentials or expenses.</li>
          <li>Instructing others to violate the law.</li>
        </ul>
        <p className={legalPClass}>
          Founders and executives are held to the same standard; seniority does not excuse abuse of
          power.
        </p>
        <p className={legalPClass}>
          Investigations preserve confidentiality to the extent possible, afford fair hearing principles
          proportionate to risk, and document outcomes for audit readiness.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="ip" title="8. Intellectual property">
        <p className={legalPClass}>
          Inventions, code, designs, and documentation created within the scope of employment or your
          contract are assigned to Clykur as stated in your agreement and under the Patents Act, 1970,
          and Copyright Act, 1957, where applicable.
        </p>
        <p className={legalPClass}>
          Open-source contributions need prior approval and a licence check so we do not create
          conflicts for the company or clients.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="exit" title="9. Exit, handover, and settlements">
        <p className={legalPClass}>
          When you resign or we end the relationship, give the notice your contract requires, hand over
          knowledge, turn off personal access to our systems, and return assets.
        </p>
        <p className={legalPClass}>
          Final salary, leave encashment, gratuity if you qualify, and tax forms such as Form 16 follow
          legal deadlines and payroll schedules.
        </p>
        <p className={legalPClass}>
          If your contract includes a non-compete, it must be reasonable in scope and length under
          Indian contract law.
        </p>
        <p className={legalPClass}>
          Where we can, we prefer clear confidentiality and non-solicitation terms that courts are more
          likely to uphold.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="international" title="10. International contributors">
        <p className={legalPClass}>
          If you work outside India, you still must follow Indian export controls, sanctions lists, and
          any client rules on where data may be stored or processed when you use Clykur systems.
        </p>
        <p className={legalPClass}>
          Your local employment or contractor law may give you extra rights. Your written agreement says
          which country’s law governs the relationship.
        </p>
      </LegalSection>

      <hr className={legalDividerClass} />

      <LegalSection id="changes" title="11. Updates">
        <p className={legalPClass}>
          We may update this Policy for legal, client, or business reasons.
        </p>
        <p className={legalPClass}>
          Important changes will be shared by email or through internal tools.
        </p>
        <p className={legalPClass}>
          After reasonable notice, continuing in your role usually means you accept updated operational
          rules where the law allows that.
        </p>
        <p className={legalPClass}>
          If the law requires a separate consent, we will handle that on its own.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
