import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { TiltCard } from "@/components/landing/tilt-card";

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
      className="clykur-story-section bg-white"
      aria-labelledby="contact-heading"
    >
      <ScrollReveal className="clykur-story-shell">
        <header data-reveal-item className="mb-16 text-center md:mb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Let&apos;s talk
          </p>
          <h2 id="contact-heading" className="mb-4 text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Get in touch
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Building a product or need an engineering partner? We&apos;d like to
            hear from you.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
            <span className="text-sm font-medium text-foreground">
              Remote-first · Global · Responsive
            </span>
          </div>
        </header>

        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {/* WhatsApp Card */}
            <div data-reveal-item>
              <TiltCard className="clykur-card-shadow rounded-2xl border border-border bg-white p-8 transition-colors hover:border-border">
                <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Image
                    src="/whatsapp.svg"
                    alt="WhatsApp"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">WhatsApp</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Quick response, instant communication
                </p>
<Button
  asChild
  size="lg"
  className="w-full rounded-2xl px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300"
>
                    <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <Image
                      src="/whatsapp.svg"
                      alt="WhatsApp"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                    Send a Message
                  </a>
                </Button>
                </div>
              </TiltCard>
            </div>

            {/* Email Card */}
            <div data-reveal-item>
              <TiltCard className="clykur-card-shadow rounded-2xl border border-border bg-white p-8 transition-colors hover:border-border">
                <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Mail className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Email</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Detailed inquiries and project discussions
                </p>
              <Button
  asChild
  variant="outline"
  size="lg"
  className="w-full rounded-2xl px-6 py-3 shadow-sm hover:shadow-md transition-all duration-300"
>
                  <a
                    href={emailUrl}
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    {emailAddress}
                  </a>
                </Button>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
