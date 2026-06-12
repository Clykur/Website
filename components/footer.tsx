import Link from "next/link";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import { FOOTER_LINKS } from "@/lib/site-navigation";
import {
  CLYKUR_SOCIAL_LINKS,
  footerSocialLinkClassName,
} from "@/lib/social-links";
import { cn } from "@/lib/utils";

const linkClass =
  "inline-block min-h-[44px] py-1 text-[13px] leading-relaxed text-foreground/65 transition-colors duration-300 hover:text-[#ff3b1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f6] rounded-sm";

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
        <span className="m-0 inline-block max-w-none translate-y-[3px] whitespace-nowrap p-0 text-center font-semibold uppercase leading-none text-[#ff3b1f] opacity-[0.52] sm:translate-y-[4px] sm:opacity-[0.58] md:opacity-[0.62] lg:translate-y-[4px] lg:opacity-[0.66] text-[22vw]">
          CLYKUR
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="mb-10 flex flex-col gap-4 border-b border-foreground/[0.08] pb-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[14px] leading-relaxed text-foreground/65">
            Ready to ship? Tell us about your product and timeline.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className={cn(primaryGradientCtaClassName, "justify-center")}
            >
              Start a project
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:gap-14 md:grid-cols-2 md:gap-x-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col gap-6 md:col-span-1 lg:col-span-3">
            <div className="border-l-2 border-[#ff3b1f]/25 pl-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                Clykur
              </p>
            </div>
            <p className="text-[14px] leading-[1.75] text-foreground/70">
              Product engineering and software delivery for teams that need
              execution done right.
            </p>
            <p className="text-[12px] leading-relaxed tracking-wide text-foreground/45">
              © {year} CLYKUR · All rights reserved
            </p>
          </div>

          <div className="md:col-span-1 lg:col-span-9">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-6">
              <nav
                className="min-w-0 space-y-4"
                aria-labelledby="footer-services-heading"
              >
                <h2 id="footer-services-heading" className={navHeadingClass}>
                  Services
                </h2>
                <ul className="space-y-0">
                  {FOOTER_LINKS.services.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav
                className="min-w-0 space-y-4"
                aria-labelledby="footer-products-heading"
              >
                <h2 id="footer-products-heading" className={navHeadingClass}>
                  Products
                </h2>
                <ul className="space-y-0">
                  {FOOTER_LINKS.products.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav
                className="min-w-0 space-y-4"
                aria-labelledby="footer-resources-heading"
              >
                <h2 id="footer-resources-heading" className={navHeadingClass}>
                  Resources
                </h2>
                <ul className="space-y-0">
                  {FOOTER_LINKS.resources.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav
                className="min-w-0 space-y-4"
                aria-labelledby="footer-company-heading"
              >
                <h2 id="footer-company-heading" className={navHeadingClass}>
                  Company
                </h2>
                <ul className="space-y-0">
                  {FOOTER_LINKS.company.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav
                className="min-w-0 space-y-4"
                aria-labelledby="footer-social-heading"
              >
                <h2 id="footer-social-heading" className={navHeadingClass}>
                  Social
                </h2>
                <ul className="space-y-0">
                  {CLYKUR_SOCIAL_LINKS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={footerSocialLinkClassName}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <nav
          className="mt-10 border-t border-foreground/[0.08] pt-8"
          aria-labelledby="footer-legal-heading"
        >
          <h2 id="footer-legal-heading" className={cn(navHeadingClass, "mb-4")}>
            Legal
          </h2>
          <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {FOOTER_LINKS.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="mt-10 min-h-[12rem] sm:mt-12 sm:min-h-[14rem] md:min-h-[16rem] lg:mt-14 lg:min-h-[18rem] xl:min-h-[20rem]"
          aria-hidden
        />
      </div>
    </footer>
  );
}
