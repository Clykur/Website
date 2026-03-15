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
    <Button
      type="submit"
      size="lg"
      className="h-12 w-full sm:w-auto min-w-[220px] rounded-xl font-semibold text-base"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
          Submitting...
        </>
      ) : (
        "Submit application"
      )}
    </Button>
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
        aria-describedby="resume-helper"
      />
      <button
        type="button"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2
          ${selectedFile ? "border-primary/40 bg-primary/5" : isDragOver ? "border-primary/50 bg-muted/50" : "border-border bg-muted/30 hover:bg-muted/50"}
        `}
        aria-label="Upload your resume"
      >
        {selectedFile ? (
          <>
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-primary">
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
            <span
              id="resume-hint"
              className="mt-1 text-xs text-muted-foreground"
            >
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
  "mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-colors";
const labelClass = "text-sm font-medium text-foreground";
const sectionLabelClass =
  "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4";

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
      <div className="mx-auto max-w-[720px] rounded-2xl border border-border bg-card p-8 md:p-10 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          Application received.
        </h2>
        <p className="mt-3 max-w-md mx-auto text-muted-foreground leading-relaxed">
          Our team will review your application and contact you if there&apos;s
          a fit.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/careers">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl font-medium h-12"
            >
              View other roles
            </Button>
          </Link>
          {alreadyApplied && (
            <Button
              variant="ghost"
              size="lg"
              className="rounded-xl font-medium text-muted-foreground h-12"
              onClick={handleSubmitAnother}
            >
              Submit another application for this role
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[720px] rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="border-b border-border bg-muted/20 px-8 py-8 md:px-10 md:py-9">
        <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          Apply for this role
        </h2>
        <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed w-full">
          Tell us a bit about yourself and upload your resume. Our team
          personally reviews every application.
        </p>
      </div>

      <form action={formAction} className="p-8 md:p-10">
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
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-colors resize-y min-h-[120px]"
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
                className="mt-1 text-sm text-muted-foreground"
                id="resume-helper"
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
            className="mt-8 text-sm text-destructive rounded-xl bg-destructive/10 px-4 py-3"
            role="alert"
          >
            {state.error}
          </p>
        )}

        <div className="mt-10 pt-2 flex flex-col items-center text-center">
          <SubmitButton />
          <p className="mt-4 text-xs text-muted-foreground">
            We review every application personally.
          </p>
        </div>
      </form>
    </div>
  );
}
