"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const DURATION_MS = 3000;
const FADE_IN_MS = 500;
const FADE_OUT_MS = 700;
const STORAGE_KEY = "clykur_splash_seen";

// Ease-out cubic: fast start, smooth deceleration toward 100%
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function getSplashSeen(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function SplashScreen() {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const [fadedIn, setFadedIn] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  // Only on first visit: decide whether to show splash (client-side check)
  useEffect(() => {
    setShowSplash(!getSplashSeen());
  }, []);

  useEffect(() => {
    if (showSplash !== true) return;

    setFadedIn(true);
  }, [showSplash]);

  useEffect(() => {
    if (showSplash !== true) return;

    startRef.current = performance.now();

    const tick = (now: number) => {
      const start = startRef.current ?? now;
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const eased = easeOutCubic(progress);
      setPercent(Math.round(eased * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const hideTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // ignore
      }
      setVisible(false);
    }, DURATION_MS);

    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, DURATION_MS + FADE_OUT_MS);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, [showSplash]);

  if (showSplash !== true || !mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      style={{
        opacity: visible ? (fadedIn ? 1 : 0) : 0,
        transition: fadedIn
          ? `opacity ${visible ? FADE_IN_MS : FADE_OUT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
          : "none",
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex flex-col">
        {/* Centered logo */}
        <div className="flex flex-1 items-center justify-center p-8">
          <Image
            src="/Clykur Logo.svg"
            alt=""
            width={640}
            height={171}
            className="w-full max-w-[min(80vw,440px)] h-auto object-contain"
            priority
          />
        </div>

        {/* Bottom right: percentage */}
        <div className="flex justify-end items-end p-8 md:p-12">
          <span className="font-mono text-2xl md:text-[2rem] font-light tabular-nums text-foreground/70 tracking-tight">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
