import Link from "next/link";
import { Mail, ExternalLink, Github, Linkedin } from "lucide-react";

export function Footer() {
  const emailAddress = "clykur@outlook.com";
  const emailSubject = "Inquiry About Your Services";
  const emailBody = `Hello Team Clykur,

I'm interested in engaging your services and would like to connect to discuss my project requirements. Looking forward to your response.

Best regards`;
  const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="text-lg font-calegar font-semibold mb-4 uppercase">clykur</h3>
            <p className="text-sm text-muted-foreground">
              A Click Away
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Professional freelance services for clients worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#portfolio"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={emailUrl}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {emailAddress}
                </a>
              </li>
              <li>
                <a
                  href="https://portfolio.chandukalluru.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/chinnuk0521"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/chandu-kalluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <span className="font-calegar font-semibold uppercase">clykur</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

