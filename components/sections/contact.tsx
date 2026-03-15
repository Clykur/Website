import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Image from "next/image";

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
      className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto w-full">
        <header className="text-center mb-16 md:mb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Let&apos;s talk
          </p>
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4"
          >
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
            <div className="border border-border rounded-lg p-8 hover:border-foreground/20 transition-colors">
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
                <Button asChild size="lg" className="w-full group">
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
            </div>

            {/* Email Card */}
            <div className="border border-border rounded-lg p-8 hover:border-foreground/20 transition-colors">
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
                  className="w-full group"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
