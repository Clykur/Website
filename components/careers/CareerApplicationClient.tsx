'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ApplicationForm = dynamic(
  () =>
    import('@/components/careers/ApplicationForm').then((m) => ({
      default: m.ApplicationForm,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white/90 shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_-1px_0_rgba(0,0,0,0.02)_inset]">
        <div className="border-b border-foreground/[0.07] bg-gradient-to-b from-[#fafaf9]/90 to-white/90 p-6 md:p-8">
          <div className="h-5 w-40 rounded-md bg-foreground/[0.06]" />
          <div className="mt-3 h-4 max-w-md rounded-md bg-foreground/[0.05]" />
        </div>
        <div className="space-y-5 p-6 md:p-8">
          <div className="h-11 w-full max-w-md rounded-xl bg-foreground/[0.05]" />
          <div className="h-11 w-full max-w-md rounded-xl bg-foreground/[0.05]" />
          <div className="h-11 w-48 rounded-xl bg-foreground/[0.05]" />
        </div>
      </div>
    ),
  },
);

export function CareerApplicationClient({ roleSlug }: { roleSlug: string }) {
  return (
    <Suspense
      fallback={
        <div className="overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white/90 shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_-1px_0_rgba(0,0,0,0.02)_inset]">
          <div className="border-b border-foreground/[0.07] bg-gradient-to-b from-[#fafaf9]/90 to-white/90 p-6 md:p-8">
            <div className="h-5 w-40 rounded-md bg-foreground/[0.06]" />
            <div className="mt-3 h-4 max-w-md rounded-md bg-foreground/[0.05]" />
          </div>
          <div className="space-y-5 p-6 md:p-8">
            <div className="h-11 w-full max-w-md rounded-xl bg-foreground/[0.05]" />
            <div className="h-11 w-full max-w-md rounded-xl bg-foreground/[0.05]" />
            <div className="h-11 w-48 rounded-xl bg-foreground/[0.05]" />
          </div>
        </div>
      }
    >
      <ApplicationForm roleSlug={roleSlug} roleTitle={''} />
    </Suspense>
  );
}
