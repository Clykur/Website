import Link from "next/link";
import Image from "next/image";
import { Mail, ExternalLink, Github, Linkedin } from "lucide-react";

export function Footer() {
  const emailAddress = "info@clykur.com";
  const emailSubject = "Inquiry About Your Services";
  const emailBody = `Hello Team Clykur,

I'm interested in engaging your services and would like to connect to discuss my project requirements. Looking forward to your response.

Best regards`;
  const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <footer className="relative border-t border-border bg-foreground/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-20">
          {/* Brand column — logo unchanged */}
          <div className="md:col-span-5 lg:col-span-5">
            <Link
              href="/"
              className="inline-block mb-4"
              aria-label="Clykur home"
            >
              <Image
                src="/Clykur Logo.svg"
                alt="Clykur"
                width={540}
                height={144}
                className="h-36 w-auto md:h-44"
              />
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mt-6">
              A Click Away
            </p>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-sm">
              Software products that power modern businesses. Engineering
              partnerships that ship.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground mb-6">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/#products"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#portfolio"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/#trust"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Trust & Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3 lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground mb-6">
              Connect
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={emailUrl}
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  {emailAddress}
                </a>
              </li>
              {/* <li>
                <a
                  href="https://portfolio.chandukalluru.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                  About Me
                </a>
              </li> */}
              {/* <li>
                <a
                  href="https://github.com/chinnuk0521"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Github className="h-4 w-4 shrink-0" aria-hidden />
                  GitHub
                </a>
              </li> */}
              <li>
                <a
                  href="https://www.linkedin.com/company/clykur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Linkedin className="h-4 w-4 shrink-0" aria-hidden />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 md:mt-20 pt-8 border-t border-border/80 text-center">
          <p className="text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} Clykur. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
