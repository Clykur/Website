"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function InquiryForm() {
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
      onSubmit={onSubmit}
      className="mx-auto max-w-xl space-y-5 rounded-2xl border border-foreground/[0.08] bg-white/90 p-6 md:p-8"
      aria-labelledby="inquiry-form-heading"
    >
      <h2
        id="inquiry-form-heading"
        className="text-lg font-semibold text-foreground"
      >
        Start a project
      </h2>
      <div className="space-y-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input id="contact-name" name="name" required autoComplete="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-company">Company (optional)</Label>
        <Input
          id="contact-company"
          name="company"
          autoComplete="organization"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Project details</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Timeline, scope, links to designs or repos…"
        />
      </div>
      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Request consultation"}
      </Button>
      {status === "success" ? (
        <p className="text-[14px] text-emerald-700" role="status">
          Message sent. We will reply shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-[14px] text-[#ff3b1f]" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
