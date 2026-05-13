import Link from "next/link";

const solutionsLinks = [
  { href: "/#products", label: "Products" },
  { href: "/#services", label: "Engineering Services" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/work", label: "Client work" },
] as const;

const productLinks = [
  { href: "/#about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/#contact", label: "Contact" },
  { href: "/#trust", label: "Trust & Verification" },
] as const;

const legalLinks = [
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/engagement-terms", label: "Engagement Terms" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/employment-policy", label: "Employment Policy" },
] as const;

const linkClass =
  "text-[13px] leading-relaxed text-foreground/65 transition-colors duration-300 hover:text-[#ff3b1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f6] rounded-sm";

const navHeadingClass =
  "text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/50";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[12] mb-0 w-full overflow-x-hidden border-t border-border/40 pb-0 font-poppins">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#faf9f6] via-[#f6f7f4] to-[#e9eee7]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,rgba(255,59,31,0.05),transparent_55%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] flex w-full items-end justify-center overflow-x-hidden leading-[0] pb-0"
        aria-hidden
      >
        <span
          className="m-0 inline-block max-w-none translate-y-[3px] whitespace-nowrap p-0 text-center font-semibold uppercase leading-none text-[#ff3b1f] opacity-[0.52] sm:translate-y-[4px] sm:opacity-[0.58] md:opacity-[0.62] lg:translate-y-[4px] lg:opacity-[0.66] text-[22vw]"
        >
          CLYKUR
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-12 sm:gap-14 md:grid-cols-2 md:gap-x-12 md:gap-y-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
          {/* Brand */}
          <div className="flex flex-col gap-6 md:col-span-1 lg:col-span-4 lg:max-w-[22rem]">
            <div className="border-l-2 border-[#ff3b1f]/25 pl-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                A Click Away
              </p>
            </div>
            <p className="text-[14px] leading-[1.75] text-foreground/70">
              Software products that power modern businesses. Engineering partnerships that ship.
            </p>
            <p className="pt-1 text-[12px] leading-relaxed tracking-wide text-foreground/45">
              © {year} CLYKUR · All rights reserved
            </p>
          </div>

          {/* Link columns — Solutions · Product · Legal */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 md:col-span-1 md:grid-cols-3 md:gap-x-6 lg:col-span-8 lg:gap-x-10 xl:gap-x-14">
            <nav className="min-w-0 space-y-5" aria-labelledby="footer-solutions-heading">
              <h2 id="footer-solutions-heading" className={navHeadingClass}>
                Solutions
              </h2>
              <ul className="space-y-[0.65rem]">
                {solutionsLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="min-w-0 space-y-5" aria-labelledby="footer-product-heading">
              <h2 id="footer-product-heading" className={navHeadingClass}>
                Product
              </h2>
              <ul className="space-y-[0.65rem]">
                {productLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav
              className="col-span-2 min-w-0 space-y-5 sm:col-span-2 md:col-span-1"
              aria-labelledby="footer-legal-heading"
            >
              <h2 id="footer-legal-heading" className={navHeadingClass}>
                Legal
              </h2>
              <ul className="space-y-[0.65rem]">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div
          className="mt-10 min-h-[12rem] sm:mt-12 sm:min-h-[14rem] md:min-h-[16rem] lg:mt-14 lg:min-h-[18rem] xl:min-h-[20rem]"
          aria-hidden
        />
      </div>
    </footer>
  );
}
