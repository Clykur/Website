import Link from "next/link";

const items = [
  {
    title: "Contracts & IP",
    body: "MSAs, NDAs, and statements of work. Client owns deliverables per engagement terms unless otherwise agreed in writing.",
    href: "/engagement-terms",
    linkLabel: "Engagement terms",
  },
  {
    title: "How we quote",
    body: "Discovery first, then phased milestones with written scope. Budget bands on our contact form help us route you faster.",
    href: "/contact",
    linkLabel: "Contact",
  },
  {
    title: "Who you talk to",
    body: "Founders join early discovery calls. You get a consistent point of contact plus specialists per milestone.",
    href: "/about",
    linkLabel: "About & team",
  },
  {
    title: "Security & compliance",
    body: "Published security, privacy, and compliance pages for procurement reviews.",
    href: "/security",
    linkLabel: "Security",
  },
] as const;

export function ProcurementTrust() {
  return (
    <section
      aria-labelledby="procurement-trust-heading"
      className="rounded-2xl border border-foreground/[0.08] bg-[#fafaf9]/90 p-6 md:p-8"
    >
      <h2
        id="procurement-trust-heading"
        className="font-poppins text-xl font-medium tracking-[-0.02em] text-foreground md:text-2xl"
      >
        Working with Clykur (procurement-friendly)
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-foreground/58">
        Whether you are a startup founder or an enterprise buyer, these are the
        basics we cover before build starts.
      </p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.title} className="min-w-0">
            <h3 className="text-[15px] font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/58">
              {item.body}
            </p>
            <Link
              href={item.href}
              className="mt-2 inline-block text-[13px] font-semibold text-[#ff3b1f] hover:underline"
            >
              {item.linkLabel}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
