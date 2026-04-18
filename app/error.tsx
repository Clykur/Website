"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center font-poppins">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/40">
        Something went wrong
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">
        We couldn&apos;t load this page
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-foreground/55">
        A runtime error occurred. You can try again, or return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full border border-foreground/15 bg-foreground/[0.03] px-5 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:border-[#ff3b1f]/35 hover:text-[#ff3b1f]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full bg-[#ff3b1f] px-5 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-10 font-mono text-[10px] text-foreground/30">Ref: {error.digest}</p>
      ) : null}
    </div>
  );
}
