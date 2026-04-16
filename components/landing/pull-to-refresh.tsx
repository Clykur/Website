"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

const THRESHOLD_PX = 60;
const MAX_PULL_PX = 120;

function useIsMobilePullEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return enabled;
}

export function PullToRefresh() {
  const router = useRouter();
  const mobile = useIsMobilePullEnabled();
  const [isPending, startTransition] = useTransition();
  const [pullPx, setPullPx] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const refreshingRef = useRef(false);

  const startY = useRef(0);
  const tracking = useRef(false);
  const armed = useRef(false);
  const pullDistanceRef = useRef(0);

  refreshingRef.current = refreshing;

  // ✅ FIX: Always use native scroll position
  const atTop = useCallback(() => {
    return window.scrollY <= 2;
  }, []);

  const atTopRef = useRef(atTop);
  atTopRef.current = atTop;

  useEffect(() => {
    if (!mobile) return;

    const onTouchStart = (e: TouchEvent) => {
      if (refreshingRef.current) return;
      if (!atTopRef.current()) {
        armed.current = false;
        return;
      }
      armed.current = true;
      startY.current = e.touches[0].clientY;
      tracking.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!armed.current || refreshingRef.current) return;

      const dy = e.touches[0].clientY - startY.current;

      if (dy <= 0) {
        if (tracking.current) {
          pullDistanceRef.current = 0;
          setPullPx(0);
          tracking.current = false;
        }
        return;
      }

      if (!atTopRef.current()) {
        armed.current = false;
        pullDistanceRef.current = 0;
        setPullPx(0);
        return;
      }

      tracking.current = true;

      // prevent native refresh
      e.preventDefault();

      const d = Math.min(dy, MAX_PULL_PX);
      pullDistanceRef.current = d;
      setPullPx(d);
    };

    const endGesture = () => {
      if (!tracking.current) {
        armed.current = false;
        return;
      }

      const distance = pullDistanceRef.current;

      tracking.current = false;
      armed.current = false;
      pullDistanceRef.current = 0;
      setPullPx(0);

      if (distance >= THRESHOLD_PX && !refreshingRef.current) {
        refreshingRef.current = true;
        setRefreshing(true);

        startTransition(() => {
          router.refresh();
        });

        // small delay for UX smoothness
        window.setTimeout(() => {
          refreshingRef.current = false;
          setRefreshing(false);
        }, 800);
      }
    };

    const onTouchEnd = () => endGesture();
    const onTouchCancel = () => endGesture();

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("touchcancel", onTouchCancel, { passive: true });

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [mobile, router, startTransition]);

  const progress =
    pullPx > 0
      ? Math.min(1, pullPx / THRESHOLD_PX)
      : refreshing || isPending
      ? 1
      : 0;

  const show = mobile && (pullPx > 0 || refreshing || isPending);

  if (!mobile) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 z-[101] flex justify-center md:hidden"
      style={{
        top: "max(4.25rem, calc(env(safe-area-inset-top, 0px) + 3.25rem))",
      }}
      aria-hidden={!show}
    >
      <div
        className={`flex h-9 min-w-[2.25rem] items-center justify-center rounded-full border border-foreground/[0.08] bg-white/90 px-3 shadow-[0_8px_30px_-12px_rgba(10,10,10,0.2)] backdrop-blur-md transition-opacity duration-200 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="h-4 w-4 rounded-full border-2 border-[#ff3b1f]/25 border-t-[#ff3b1f] transition-transform duration-150 ease-out"
          style={{
            transform: `rotate(${progress * 300}deg)`,
          }}
        />
        <span className="sr-only">
          {refreshing || isPending
            ? "Refreshing"
            : "Pull down to refresh"}
        </span>
      </div>
    </div>
  );
}