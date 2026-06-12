"use client";

import { useEffect, useState, useRef } from "react";

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

function initialProgressPercent(): number {
  if (typeof window === "undefined") return 0;
  return window.matchMedia("(max-width: 479px)").matches ? 100 : 0;
}

export function SplashScreen() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  return <SplashScreenDev />;
}

function SplashScreenDev() {
  const [showSplash] = useState(() => !getSplashSeen());
  if (!showSplash) return null;
  return <SplashScreenDevInner />;
}

function SplashScreenDevInner() {
  const [percent, setPercent] = useState(initialProgressPercent);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = performance.now();

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const ultra = window.matchMedia("(max-width: 479px)").matches;

    const clearTick = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      rafRef.current = 0;
      intervalRef.current = null;
    };

    if (!ultra) {
      if (mobile) {
        intervalRef.current = window.setInterval(() => {
          const start = startRef.current ?? performance.now();
          const elapsed = performance.now() - start;
          const progress = Math.min(elapsed / DURATION_MS, 1);
          const eased = easeOutCubic(progress);
          setPercent(Math.round(eased * 100));
          if (progress >= 1 && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }, 140);
      } else {
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
      }
    }

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
      clearTick();
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex animate-in fade-in items-center justify-center bg-background duration-500 fill-mode-both"
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${visible ? FADE_IN_MS : FADE_OUT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex min-h-0 flex-col">
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 py-6 sm:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element -- dev splash SVG */}
          <img
            src="/Clykur Logo.svg"
            alt=""
            className="h-auto max-h-full w-[88vw] max-w-[88vw] object-contain"
          />
        </div>

        <div className="relative z-10 flex shrink-0 justify-end bg-background/80 p-8 backdrop-blur-[2px] md:p-12">
          <span className="font-mono text-3xl font-semibold tabular-nums tracking-tight text-[#ff3b1f] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] md:text-4xl">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}
