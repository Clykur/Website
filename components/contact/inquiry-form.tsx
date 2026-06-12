"use client";

import { useState } from "react";
import {
  contactFieldClass,
  contactLabelClass,
  contactTextareaClass,
} from "@/lib/contact-form-styles";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

type InquiryFormProps = {
  className?: string;
};

export function InquiryForm({ className }: InquiryFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { message?: string };
      if (!res.ok) {
        throw new Error(json.message ?? "Failed to send message");
      }
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Try email or WhatsApp.",
      );
    }
  }

  return (
    <form
      id="inquiry-form"
      onSubmit={onSubmit}
      className={cn("space-y-6", className)}
      aria-labelledby="inquiry-form-heading"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className={contactLabelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className={contactFieldClass}
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className={contactLabelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={contactFieldClass}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-company" className={contactLabelClass}>
          Company{" "}
          <span className="normal-case tracking-normal text-foreground/30">
            (optional)
          </span>
        </label>
        <input
          id="contact-company"
          name="company"
          autoComplete="organization"
          className={contactFieldClass}
          placeholder="Company or startup name"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-timeline" className={contactLabelClass}>
            Timeline{" "}
            <span className="normal-case tracking-normal text-foreground/30">
              (optional)
            </span>
          </label>
          <select
            id="contact-timeline"
            name="timeline"
            className={cn(contactFieldClass, "appearance-none")}
            defaultValue=""
          >
            <option value="">Select timeline</option>
            <option value="ASAP (4-8 weeks)">ASAP (4-8 weeks)</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="Exploring / not sure">Exploring / not sure</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-budget" className={contactLabelClass}>
            Budget band{" "}
            <span className="normal-case tracking-normal text-foreground/30">
              (optional)
            </span>
          </label>
          <select
            id="contact-budget"
            name="budget_band"
            className={cn(contactFieldClass, "appearance-none")}
            defaultValue=""
          >
            <option value="">Select range</option>
            <option value="Under $10k">Under $10k</option>
            <option value="$10k to $25k">$10k to $25k</option>
            <option value="$25k to $75k">$25k to $75k</option>
            <option value="$75k+">$75k+</option>
            <option value="Prefer to discuss">Prefer to discuss</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className={contactLabelClass}>
          Project details
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className={contactTextareaClass}
          placeholder="What are you building? Goals, timeline, links to designs or repos, and anything we should know before a call."
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-foreground/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[13px] leading-relaxed text-foreground/48">
          We typically reply within one business day with next steps or a few
          clarifying questions.
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            primaryGradientCtaClassName,
            "w-full shrink-0 sm:w-auto",
            status === "loading" && "pointer-events-none opacity-80",
          )}
        >
          {status === "loading" ? "Sending…" : "Send project brief"}
        </button>
      </div>

      {status === "success" ? (
        <p
          className="rounded-xl border border-emerald-200/80 bg-emerald-50/80 px-4 py-3 text-[14px] text-emerald-800"
          role="status"
        >
          Thanks, your brief is on its way. We will get back to you shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p
          className="rounded-xl border border-[#ff3b1f]/25 bg-[#ff3b1f]/[0.06] px-4 py-3 text-[14px] text-[#ff3b1f]"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
