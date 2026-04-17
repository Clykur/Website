import { ArrowUpRight, Mail } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

export function Contact() {
  const whatsappNumber = "8179299096";
  const whatsappMessage = `Hello Team Clykur,
I'm interested in engaging your services and would like to connect to discuss my project requirements. Looking forward to your response.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const emailAddress = "info@clykur.com";
  const emailSubject = "Inquiry About Your Services";
  const emailBody = `Hello Team Clykur,

I'm interested in engaging your services and would like to connect to discuss my project requirements. Looking forward to your response.

Best regards`;
  const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <section
      id="contact"
      className="clykur-story-section bg-gradient-to-b from-white via-[#fafaf9] to-white"
      aria-labelledby="contact-heading"
    >
      <ScrollReveal className="clykur-story-shell">
        <header data-reveal-item className="mb-14 text-center md:mb-20">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/40">
            Let&apos;s talk
          </p>
          <h2
            id="contact-heading"
            className="mb-5 font-semibold tracking-tight text-[clamp(2.25rem,5vw,3.75rem)] text-foreground"
          >
            Get in touch
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[15px] leading-relaxed text-foreground/55 md:text-lg md:leading-relaxed">
            Building a product or need an engineering partner? We&apos;d like to
            hear from you.
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/35">
            Remote-first · Global · Responsive
          </p>
        </header>

        {/* Editorial channels — no card boxes; hairline separation only */}
        <div data-reveal-item className="mx-auto max-w-2xl">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-b border-foreground/[0.07] py-10 transition-colors first:pt-0 md:py-14"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <Image
                    src="/whatsapp.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] opacity-90"
                    unoptimized
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff3b1f]/90">
                    WhatsApp
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/55 md:text-base">
                  Quick response, instant communication
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors group-hover:text-[#ff3b1f]">
                Send a message
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} aria-hidden />
              </span>
            </div>
          </a>

          <a href={emailUrl} className="group block py-10 md:py-14">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-[22px] w-[22px] text-foreground/70" strokeWidth={1.35} aria-hidden />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff3b1f]/90">
                    Email
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/55 md:text-base">
                  Detailed inquiries and project discussions
                </p>
                <p className="pt-1 font-mono text-[13px] text-foreground/70 md:text-sm">
                  {emailAddress}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors group-hover:text-[#ff3b1f]">
                Write us
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} aria-hidden />
              </span>
            </div>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
