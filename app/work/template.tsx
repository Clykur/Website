"use client";

import { ScrollToTop } from "@/components/landing/scroll-to-top";

export default function WorkTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
