import { FileText } from "lucide-react";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { careersCoralRuleClass } from "@/components/careers/careers-ui";
import {
  storySectionH2Class,
  storySurfaceCardClass,
} from "@/components/layout/story-page-shell";
import { cn } from "@/lib/utils";

export function ContactProjectSection() {
  return (
    <section
      id="project-form"
      aria-labelledby="inquiry-form-heading"
      className={cn(storySurfaceCardClass, "scroll-mt-28 overflow-hidden")}
    >
      <div className="border-b border-foreground/[0.08] bg-gradient-to-r from-[#fafaf9] via-white to-[#fafaf9] px-6 py-5 md:px-9 md:py-6">
        <div className="flex min-w-0 items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#ff3b1f]/20 bg-[#ff3b1f]/[0.06] text-[#ff3b1f]">
            <FileText className="h-5 w-5" strokeWidth={1.65} aria-hidden />
          </span>
          <div>
            <h2 id="inquiry-form-heading" className={storySectionH2Class}>
              Start a project
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-foreground/55">
              Share a short brief so we can route you to the right engineer.
              Timeline and budget fields are optional but help us respond
              faster.
            </p>
          </div>
        </div>
      </div>
      <div className={careersCoralRuleClass} aria-hidden />
      <div className="px-6 py-8 md:px-9 md:py-10">
        <InquiryForm />
      </div>
    </section>
  );
}
