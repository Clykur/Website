"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/landing/smooth-scroll";
import { cn } from "@/lib/utils";

type NavItem = { id: string; label: string };

function getHeaderOffset(): number {
  if (typeof window === "undefined") return 104;
  const v = getComputedStyle(document.documentElement).getPropertyValue(
    "--seo-toc-offset",
  );
  const parsed = v ? parseFloat(v) : NaN;
  if (!Number.isNaN(parsed)) return parsed;
  return window.matchMedia("(min-width: 768px)").matches ? 104 : 92;
}

function useActiveSection(items: NavItem[]) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const visible = new Map<string, number>();
    const observers: IntersectionObserver[] = [];

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visible.set(item.id, entry.boundingClientRect.top);
            } else {
              visible.delete(item.id);
            }
          }
          if (visible.size === 0) return;
          const topmost = [...visible.entries()].sort((a, b) => a[1] - b[1])[0];
          if (topmost) setActiveId(topmost[0]);
        },
        { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.1, 0.25] },
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  return activeId;
}

function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function OnThisPageList({
  items,
  activeId,
  onPick,
}: {
  items: NavItem[];
  activeId: string | null;
  onPick?: () => void;
}) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => {
              scrollToId(item.id);
              onPick?.();
            }}
            title={item.label}
            className={cn(
              "w-full rounded-lg px-2 py-1.5 text-left text-[12.5px] leading-snug transition-colors",
              activeId === item.id
                ? "bg-[#ff3b1f]/[0.08] font-semibold text-[#ff3b1f]"
                : "text-foreground/52 hover:bg-foreground/[0.04] hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function OnThisPageNavMobile({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(items);
  const topClass =
    "top-[max(5.75rem,calc(env(safe-area-inset-top)+4.75rem))] md:top-[max(6.5rem,calc(env(safe-area-inset-top)+5.25rem))]";

  if (items.length < 3) return null;

  return (
    <nav
      className={cn(
        "sticky z-30 mb-10 rounded-2xl border border-foreground/[0.08] bg-white/95 p-4 shadow-[0_8px_32px_-20px_rgba(10,10,10,0.12)] backdrop-blur-md lg:hidden",
        topClass,
      )}
      aria-label="On this page"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left text-[13px] font-semibold text-foreground"
        aria-expanded={open}
      >
        On this page
        <span className="text-foreground/40">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div className="mt-3 max-h-[min(50vh,20rem)] overflow-y-auto border-t border-foreground/[0.06] pt-3">
          <OnThisPageList
            items={items}
            activeId={activeId}
            onPick={() => setOpen(false)}
          />
        </div>
      ) : null}
    </nav>
  );
}

type DockMode = "fixed" | "docked";

/**
 * Fixed while reading; docks to the bottom of the article column when the
 * footer nears so it scrolls away with the page (works with Lenis).
 */
export function OnThisPageNavDesktop({ items }: { items: NavItem[] }) {
  const activeId = useActiveSection(items);
  const lenis = useLenis();
  const columnRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [dock, setDock] = useState<DockMode>("fixed");
  const [fixedStyle, setFixedStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const updateDock = useCallback(() => {
    const column = columnRef.current;
    const panel = panelRef.current;
    if (!column || !panel) return;

    const columnRect = column.getBoundingClientRect();
    const panelHeight = panel.offsetHeight;
    const topGap = getHeaderOffset();
    const footer = document.querySelector("footer");
    const footerTop =
      footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;

    const columnBottom = Math.min(columnRect.bottom, footerTop);
    const wouldOverflow = columnBottom < topGap + panelHeight + 8;

    if (wouldOverflow) {
      setDock("docked");
      setFixedStyle(null);
    } else {
      setDock("fixed");
      setFixedStyle({
        top: topGap,
        left: columnRect.left,
        width: columnRect.width,
      });
    }
  }, []);

  useEffect(() => {
    updateDock();
    const onScroll = () => updateDock();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onScroll)
        : null;
    if (ro && columnRef.current) ro.observe(columnRef.current);
    if (ro && panelRef.current) ro.observe(panelRef.current);

    if (lenis) {
      lenis.on("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro?.disconnect();
      lenis?.off("scroll", onScroll);
    };
  }, [lenis, updateDock]);

  if (items.length < 3) return null;

  return (
    <div ref={columnRef} className="relative hidden min-h-full w-full lg:block">
      <nav
        ref={panelRef}
        className={cn(
          "z-30 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-2xl border border-foreground/[0.08] bg-white/95 p-4 shadow-[0_12px_40px_-32px_rgba(10,10,10,0.12)] backdrop-blur-md",
          dock === "docked" ? "absolute bottom-0 left-0 w-full" : "fixed",
        )}
        style={
          dock === "fixed" && fixedStyle
            ? {
                top: fixedStyle.top,
                left: fixedStyle.left,
                width: fixedStyle.width,
              }
            : undefined
        }
        aria-label="On this page"
      >
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/40">
          On this page
        </p>
        <OnThisPageList items={items} activeId={activeId} />
      </nav>
    </div>
  );
}
