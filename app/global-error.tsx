"use client";

import { useEffect } from "react";

/**
 * Renders when an error bubbles past the root layout. Must include html + body.
 */
export default function GlobalError({
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
    <html lang="en">
      <body className="min-h-screen bg-[#fafaf9] font-sans text-foreground antialiased">
        <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Something went wrong
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Clykur — application error
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
            Please refresh the page. If the problem continues, try again in a moment.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-8 rounded-full bg-[#ff3b1f] px-6 py-2.5 text-[13px] font-medium text-white hover:opacity-90"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
