"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  submitApplication,
  type ApplyFormState,
} from "@/lib/careers/apply-actions";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, Upload, X } from "lucide-react";

const STORAGE_KEY_PREFIX = "clykur_applied_";
const ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function getStorageKey(roleSlug: string) {
  return `${STORAGE_KEY_PREFIX}${roleSlug}`;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        primaryGradientCtaClassName,
        "h-12 w-full max-w-md justify-center px-8 text-[14px] disabled:pointer-events-none disabled:opacity-60 sm:w-auto sm:max-w-none sm:min-w-[14rem]",
      )}
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Submitting…
        </span>
      ) : (
        "Submit application"
      )}
    </button>
  );
}

function ResumeUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const validExt = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!validTypes.includes(file.type) && !validExt) return;
    if (file.size > 5 * 1024 * 1024) return;
    setSelectedFile(file);
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    if (inputRef.current) inputRef.current.files = dataTransfer.files;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        name="resume"
        required
        accept={ACCEPT}
        onChange={handleChange}
        className="sr-only"
        id="resume"
        aria-describedby="resume-field-description"
      />
      <button
        type="button"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-8 text-center shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25 focus-visible:ring-offset-2",
          selectedFile
            ? "border-[#ff3b1f]/35 bg-[#ff3b1f]/[0.04]"
            : isDragOver
              ? "border-[#ff3b1f]/45 bg-[#fafaf9]/90"
              : "border-foreground/[0.12] bg-white/70 hover:border-foreground/[0.18] hover:bg-[#fafaf9]/80",
        )}
        aria-label="Upload your resume"
      >
        {selectedFile ? (
          <>
            <div className="flex max-w-full items-center gap-2 rounded-full bg-[#ff3b1f]/10 px-3 py-1.5 text-[13px] font-medium text-[#ff3b1f]">
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              <span className="text-sm font-medium">{selectedFile.name}</span>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
              Remove
            </button>
          </>
        ) : (
          <>
            <Upload
              className="h-10 w-10 text-muted-foreground mb-3"
              aria-hidden
            />
            <span className="text-sm font-medium text-foreground">
              Upload your resume
            </span>
            <span className="mt-1 text-xs text-foreground/45">
              PDF, DOC, or DOCX — max 5MB
            </span>
          </>
        )}
      </button>
    </div>
  );
}

interface ApplicationFormProps {
  roleSlug: string;
  roleTitle: string;
}

const INITIAL_STATE: ApplyFormState = {};

const inputClass =
  "mt-2 h-11 w-full rounded-xl border border-foreground/[0.11] bg-white/90 px-4 py-2.5 text-sm text-foreground shadow-[0_1px_0_rgba(255,255,255,0.95)_inset] placeholder:text-foreground/35 transition-[border-color,box-shadow] duration-200 focus-visible:border-[#ff3b1f]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/15";
const labelClass = "text-sm font-medium text-foreground";
const sectionLabelClass =
  "mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/38";

export function ApplicationForm({ roleSlug, roleTitle }: ApplicationFormProps) {
  const [state, formAction] = useFormState(submitApplication, INITIAL_STATE);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [submitAgain, setSubmitAgain] = useState(false);

  useEffect(() => {
    const key = getStorageKey(roleSlug);
    try {
      if (
        typeof window !== "undefined" &&
        localStorage.getItem(key) === "true"
      ) {
        setAlreadyApplied(true);
      }
    } catch {
      // ignore
    }
  }, [roleSlug]);

  useEffect(() => {
    if (state?.success) {
      try {
        localStorage.setItem(getStorageKey(roleSlug), "true");
      } catch {
        // ignore
      }
    }
  }, [state?.success, roleSlug]);

  const showSuccess = !submitAgain && (state?.success || alreadyApplied);

  const handleSubmitAnother = () => {
    try {
      localStorage.removeItem(getStorageKey(roleSlug));
      setAlreadyApplied(false);
      setSubmitAgain(true);
    } catch {
      // ignore
    }
  };

  if (showSuccess) {
    return (
      <div className="mx-auto max-w-[720px] overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white/95 px-6 py-10 text-center shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_56px_-40px_rgba(10,10,10,0.1)] md:px-12 md:py-12">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff3b1f]/10 text-[#ff3b1f]">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="font-poppins text-xl font-semibold tracking-[-0.02em] text-foreground md:text-2xl">
          Application received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-foreground/55">
          Our team will review your application and contact you if there&apos;s
          a fit.
        </p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="/careers"
            className={cn(
              primaryGradientCtaClassName,
              "h-12 w-full justify-center sm:w-auto",
            )}
          >
            View other roles
          </Link>
          {alreadyApplied && (
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="h-12 rounded-xl px-6 text-[13px] font-medium text-foreground/50 hover:bg-[#fafaf9] hover:text-foreground"
              onClick={handleSubmitAnother}
            >
              Apply again for this role
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[720px] overflow-hidden rounded-2xl border border-foreground/[0.09] bg-white shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_64px_-40px_rgba(10,10,10,0.1)]">
      <div className="relative border-b border-foreground/[0.07] px-6 py-9 md:px-10 md:py-11">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_100%_0%,rgba(255,59,31,0.07),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fafaf9]/98 via-white/90 to-white"
          aria-hidden
        />
        <div className="relative">
          <div className="mb-4 flex items-center gap-3 md:mb-5">
            <span
              className="h-px w-9 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent md:w-10"
              aria-hidden
            />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground/42">
              Application
            </p>
          </div>
          <h2
            id="apply-form-title"
            className="font-poppins text-[clamp(1.375rem,3.5vw,1.875rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-foreground"
          >
            Apply for {roleTitle}
          </h2>
          <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.65] text-foreground/52 md:text-[15.5px]">
            Share a few details and your resume—our team reads every submission
            with care. No automated gates; we reply when there&apos;s a genuine
            fit.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-foreground/[0.07] pt-6 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/36">
            <span className="text-[#ff3b1f]/85">Human review</span>
            <span className="text-foreground/18" aria-hidden>
              ·
            </span>
            <span>Response if it&apos;s a match</span>
          </div>
        </div>
      </div>

      <form action={formAction} className="px-6 py-8 md:px-10 md:py-10">
        <input type="hidden" name="role_slug" value={roleSlug} />

        <div className="space-y-10">
          {/* Group 1: Personal info */}
          <section aria-labelledby="personal-info-heading">
            <h3 id="personal-info-heading" className={sectionLabelClass}>
              Personal info
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className={labelClass}>
                  Full name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className={inputClass}
                  aria-required="true"
                />
              </div>
              <div>
                <Label htmlFor="email" className={labelClass}>
                  Email address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                  aria-required="true"
                />
              </div>
            </div>
            <div className="mt-6">
              <Label htmlFor="phone" className={labelClass}>
                Phone number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+1 234 567 8900"
                className={inputClass}
                aria-required="true"
              />
            </div>
          </section>

          {/* Group 2: Professional links */}
          <section aria-labelledby="links-heading">
            <h3 id="links-heading" className={sectionLabelClass}>
              Professional links
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label
                  htmlFor="linkedin"
                  className="text-sm font-medium text-muted-foreground"
                >
                  LinkedIn URL{" "}
                  <span className="text-muted-foreground/80">(optional)</span>
                </Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  className={inputClass}
                />
              </div>
              <div>
                <Label
                  htmlFor="portfolio"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Portfolio URL{" "}
                  <span className="text-muted-foreground/80">(optional)</span>
                </Label>
                <Input
                  id="portfolio"
                  name="portfolio"
                  type="url"
                  placeholder="https://yourportfolio.com"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Group 3: Cover note */}
          <section aria-labelledby="cover-heading">
            <h3 id="cover-heading" className={sectionLabelClass}>
              Cover note
            </h3>
            <div>
              <Label
                htmlFor="cover_note"
                className="text-sm font-medium text-muted-foreground"
              >
                Cover note{" "}
                <span className="text-muted-foreground/80">(optional)</span>
              </Label>
              <Textarea
                id="cover_note"
                name="cover_note"
                placeholder="Tell us why you're interested in this role or anything you'd like us to know."
                rows={4}
                className="mt-2 min-h-[120px] w-full resize-y rounded-xl border border-foreground/[0.11] bg-white/90 px-4 py-3 text-sm text-foreground shadow-[0_1px_0_rgba(255,255,255,0.95)_inset] placeholder:text-foreground/35 transition-[border-color,box-shadow] duration-200 focus-visible:border-[#ff3b1f]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/15"
              />
            </div>
          </section>

          {/* Group 4: Resume */}
          <section aria-labelledby="resume-heading">
            <h3 id="resume-heading" className={sectionLabelClass}>
              Resume upload
            </h3>
            <div>
              <Label htmlFor="resume" className={labelClass}>
                Resume <span className="text-destructive">*</span>
              </Label>
              <p
                className="mt-1 text-sm leading-relaxed text-foreground/48"
                id="resume-field-description"
              >
                Upload your resume in PDF or Word format. Maximum size 5MB.
              </p>
              <div className="mt-3">
                <ResumeUpload />
              </div>
            </div>
          </section>
        </div>

        {state?.error && (
          <p
            className="mt-8 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {state.error}
          </p>
        )}

        <div className="mt-10 flex flex-col items-center border-t border-foreground/[0.07] bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(250,250,249,0.45))] pt-9 text-center">
          <SubmitButton />
          <p className="mt-4 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/34">
            We review every application personally
          </p>
        </div>
      </form>
    </div>
  );
}
