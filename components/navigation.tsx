"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import {
  flattenGroupItems,
  MOBILE_QUICK_LINKS,
  NAV_STRUCTURE,
  type NavGroup,
  type NavItem,
} from "@/lib/site-navigation";
import { cn } from "@/lib/utils";

const PAGE_SECTION_ORDER = [
  "services",
  "about",
  "process",
  "client-works",
  "case-studies",
  "faq",
  "trust",
  "contact",
] as const;

function mapScrollSectionToNavId(raw: string): string {
  if (!raw) return "";
  const navSectionIds = new Set([
    "services",
    "about",
    "process",
    "client-works",
    "case-studies",
    "faq",
    "trust",
    "contact",
  ]);
  return navSectionIds.has(raw) ? raw : "";
}

function isNavItemActive(
  item: NavItem,
  pathname: string,
  activeSection: string,
): boolean {
  const href = item.href;
  if (href.startsWith("/#")) {
    const sectionId = href.slice(2);
    return pathname === "/" && activeSection === sectionId;
  }
  if (href === "/") return pathname === "/";
  if (pathname === href) return true;
  if (href === "/services")
    return pathname === "/services" || pathname.startsWith("/services/");
  if (href === "/careers")
    return pathname === "/careers" || pathname.startsWith("/careers/");
  if (href.startsWith("/industries/")) return pathname === href;
  if (href.startsWith("/blog"))
    return pathname === href || pathname.startsWith("/blog/");
  return false;
}

function groupContainsActive(
  group: NavGroup,
  activeSection: string,
  pathname: string,
): boolean {
  return flattenGroupItems(group).some((i) =>
    isNavItemActive(i, pathname, activeSection),
  );
}

function getOpenNavGroup(openId: string | null): NavGroup | null {
  if (!openId) return null;
  const block = NAV_STRUCTURE.find(
    (b) => b.type === "group" && b.id === openId,
  );
  return block && block.type === "group" ? block : null;
}

function NavIconBadge({
  icon: Icon,
  active,
}: {
  icon: LucideIcon;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-[0_1px_0_rgba(255,255,255,0.95)_inset] transition-[border-color,background-color,color,transform] duration-200",
        active
          ? "border-[#ff3b1f]/35 bg-gradient-to-br from-[#ff3b1f]/14 via-[#ff3b1f]/[0.06] to-white text-[#ff3b1f]"
          : "border-foreground/[0.08] bg-gradient-to-br from-white via-[#fafaf9] to-[#f5f5f4] text-foreground/50 group-hover/nav-row:border-[#ff3b1f]/22 group-hover/nav-row:text-[#ff3b1f] group-hover/nav-row:shadow-[0_8px_20px_-12px_rgba(255,59,31,0.35)]",
      )}
      aria-hidden
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.65} />
    </span>
  );
}

/** Premium dropdown panel: header, coral rule, icon tiles, optional two-column grid. */
function NavProcessSheet({
  group,
  activeSection,
  pathname,
  onPick,
}: {
  group: NavGroup;
  activeSection: string;
  pathname: string;
  onPick: () => void;
}) {
  const GroupIcon = group.icon;
  const allItems = group.sections.flatMap((s) => s.items);
  const viewAllItems = allItems.filter((i) =>
    i.label.toLowerCase().includes("view all"),
  );
  const linkItems = allItems.filter(
    (i) => !i.label.toLowerCase().includes("view all"),
  );

  return (
    <div className="w-full">
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-foreground/[0.1] bg-white/95 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_28px_64px_-32px_rgba(10,10,10,0.16)] backdrop-blur-xl">
        <div className="flex items-center gap-3.5 border-b border-foreground/[0.08] bg-gradient-to-r from-[#fafaf9] via-white to-[#fafaf9] px-5 py-4 sm:px-6">
          <NavIconBadge icon={GroupIcon} active />
          <div className="min-w-0">
            <p className="font-poppins text-[14px] font-semibold tracking-[-0.02em] text-foreground">
              {group.label}
            </p>
            <p className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-foreground/40">
              Explore
            </p>
          </div>
        </div>

        <div
          className="h-[3px] w-full bg-gradient-to-r from-[#ff3b1f]/90 via-[#ff3b1f]/40 to-transparent"
          aria-hidden
        />

        <div className="flex min-h-[15.5rem] flex-col bg-white p-3 sm:p-4">
          <ol className="grid flex-1 grid-cols-1 content-start gap-2 sm:grid-cols-2">
            {linkItems.map((item) => {
              const itemActive = isNavItemActive(item, pathname, activeSection);
              const ItemIcon = item.icon;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    role="menuitem"
                    onClick={onPick}
                    className={cn(
                      "group/nav-row grid h-full min-h-[3.75rem] grid-cols-[auto_minmax(0,1fr)_1.125rem] items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200",
                      itemActive
                        ? "bg-[#ff3b1f]/[0.07] ring-1 ring-[#ff3b1f]/15"
                        : "hover:bg-[#fafaf9] hover:ring-1 hover:ring-foreground/[0.06]",
                    )}
                  >
                    <NavIconBadge icon={ItemIcon} active={itemActive} />
                    <span className="min-w-0 font-poppins text-[14px] font-medium leading-snug tracking-[-0.02em] text-foreground">
                      {item.label}
                    </span>
                    <span
                      className="flex h-full items-center justify-end"
                      aria-hidden
                    >
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 shrink-0 text-foreground/30 transition-colors duration-200 group-hover/nav-row:text-[#ff3b1f]/55",
                          itemActive && "text-[#ff3b1f]/70",
                        )}
                        strokeWidth={2}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>

          {viewAllItems.length > 0 ? (
            <div className="mt-3 grid gap-2 border-t border-foreground/[0.06] pt-3">
              {viewAllItems.map((item) => {
                const itemActive = isNavItemActive(
                  item,
                  pathname,
                  activeSection,
                );
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    role="menuitem"
                    onClick={onPick}
                    className={cn(
                      "group/nav-row relative flex min-h-[3rem] items-center justify-center rounded-xl border border-dashed border-foreground/[0.12] bg-[#fafaf9]/60 px-4 py-2.5 pr-11 text-[14px] font-semibold tracking-[-0.01em] text-foreground/70 transition-colors hover:border-[#ff3b1f]/25 hover:text-[#ff3b1f]",
                      itemActive && "border-[#ff3b1f]/30 text-[#ff3b1f]",
                    )}
                  >
                    {item.label}
                    <ChevronRight
                      className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 shrink-0 text-foreground/35 group-hover/nav-row:text-[#ff3b1f]/60"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Navigation() {
  const pathname = usePathname() ?? "";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navActiveSection = pathname === "/" ? activeSection : "";
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = document.getElementById("nav-scroll-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setIsScrolled(!e.isIntersecting);
      },
      { root: null, threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const NAV_OFFSET = 140;

    const updateActiveFromSections = () => {
      const y = window.scrollY;
      const activationPoint = y + NAV_OFFSET;
      let currentRaw = "";

      for (const id of PAGE_SECTION_ORDER) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (activationPoint >= top) {
          currentRaw = id;
        }
      }

      setActiveSection(mapScrollSectionToNavId(currentRaw));
    };

    const io = new IntersectionObserver(
      () => {
        updateActiveFromSections();
      },
      {
        root: null,
        rootMargin: `-${NAV_OFFSET}px 0px -45% 0px`,
        threshold: 0,
      },
    );

    for (const id of PAGE_SECTION_ORDER) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }

    updateActiveFromSections();

    const onLayout = () => updateActiveFromSections();
    window.addEventListener("hashchange", onLayout);
    window.addEventListener("resize", onLayout);

    return () => {
      io.disconnect();
      window.removeEventListener("hashchange", onLayout);
      window.removeEventListener("resize", onLayout);
    };
  }, [pathname]);

  const iconStroke = 1.5;
  const openNavGroup = getOpenNavGroup(openDropdown);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        isScrolled
          ? "border-b border-foreground/[0.06] bg-white/72 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_8px_32px_-8px_rgba(10,10,10,0.06)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
          : "border-b border-transparent bg-gradient-to-b from-white via-white/85 to-white/0",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="relative z-[102] flex shrink-0 items-center"
            aria-label="Clykur home"
          >
            <Image
              src="/Clykur Logo.svg"
              alt="Clykur"
              width={176}
              height={176}
              className="h-36 w-auto md:h-44"
              priority
            />
          </Link>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[101] hidden -translate-y-1/2 justify-center md:flex">
            <div
              ref={dropdownContainerRef}
              className="pointer-events-auto relative w-max max-w-[calc(100vw-10rem)] sm:max-w-[calc(100vw-12rem)] lg:max-w-[calc(100vw-18rem)]"
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="flex flex-wrap items-center justify-center gap-0.5 lg:gap-1">
                {NAV_STRUCTURE.map((block) => {
                  if (block.type === "link") {
                    const isActive = isNavItemActive(
                      {
                        href: block.href,
                        label: block.label,
                        id: block.id,
                        icon: Menu,
                      },
                      pathname,
                      navActiveSection,
                    );

                    return (
                      <Link
                        key={block.id}
                        href={block.href}
                        className={cn(
                          "group relative shrink-0 rounded-lg px-2.5 py-2 text-[12px] font-medium tracking-[-0.01em] transition-colors duration-300 ease-out lg:px-3 lg:text-[13px]",
                          isActive
                            ? "text-foreground"
                            : "text-foreground/48 hover:text-foreground/88",
                        )}
                      >
                        <span className="relative z-10 whitespace-nowrap">
                          {block.label}
                        </span>
                        <span
                          className={cn(
                            "pointer-events-none absolute bottom-0.5 left-2.5 right-2.5 h-[2px] origin-center rounded-full bg-gradient-to-r from-[#ff5a3c] via-[#ff3b1f] to-[#ff5a3c] transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] lg:left-3 lg:right-3",
                            isActive
                              ? "scale-x-100 opacity-100"
                              : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100",
                          )}
                          aria-hidden
                        />
                      </Link>
                    );
                  }

                  const groupActive = groupContainsActive(
                    block,
                    navActiveSection,
                    pathname ?? "",
                  );
                  return (
                    <div key={block.id} className="relative">
                      <button
                        type="button"
                        aria-expanded={openDropdown === block.id}
                        aria-haspopup="menu"
                        onMouseEnter={() => setOpenDropdown(block.id)}
                        onClick={() =>
                          setOpenDropdown((d) =>
                            d === block.id ? null : block.id,
                          )
                        }
                        className={cn(
                          "group relative flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-2 text-left text-[12px] font-medium tracking-[-0.01em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25 lg:gap-1.5 lg:px-3 lg:text-[13px]",
                          groupActive || openDropdown === block.id
                            ? "text-foreground"
                            : "text-foreground/48 hover:text-foreground/88",
                        )}
                      >
                        <span className="whitespace-nowrap">{block.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 shrink-0 opacity-55 transition-transform duration-300 lg:h-4 lg:w-4",
                            openDropdown === block.id && "rotate-180",
                          )}
                          strokeWidth={iconStroke}
                          aria-hidden
                        />
                        <span
                          className={cn(
                            "pointer-events-none absolute bottom-0.5 left-2.5 right-2.5 h-[2px] origin-center rounded-full bg-gradient-to-r from-[#ff5a3c] via-[#ff3b1f] to-[#ff5a3c] transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] lg:left-3 lg:right-3",
                            groupActive
                              ? "scale-x-100 opacity-100"
                              : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100",
                          )}
                          aria-hidden
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {openNavGroup ? (
                  <div className="absolute left-1/2 top-full z-[110] w-[min(calc(100vw-2rem),32rem)] -translate-x-1/2 pt-2.5 sm:w-[min(calc(100vw-2rem),38rem)] lg:w-[min(calc(100vw-2rem),44rem)]">
                    <motion.div
                      key={openNavGroup.id}
                      role="menu"
                      initial={{ opacity: 0, y: 6, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.99 }}
                      transition={{
                        duration: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="origin-top w-full rounded-[1.15rem] bg-gradient-to-b from-white/80 to-[#f8f8f7]/90 p-[1px] shadow-[0_24px_56px_-28px_rgba(10,10,10,0.2)] ring-1 ring-foreground/[0.06]"
                    >
                      <NavProcessSheet
                        group={openNavGroup}
                        activeSection={navActiveSection}
                        pathname={pathname ?? ""}
                        onPick={() => setOpenDropdown(null)}
                      />
                    </motion.div>
                  </div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative z-[102] ml-auto flex shrink-0 items-center gap-2">
            <Link
              href="/contact"
              className={cn(
                primaryGradientCtaClassName,
                "shrink-0 !px-4 !py-2 text-[12px] xl:!px-5",
              )}
            >
              Start a project
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((p) => !p)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "relative z-[101] rounded-xl p-2.5 transition-colors duration-300 md:hidden",
              isMobileMenuOpen
                ? "text-foreground"
                : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground",
            )}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[98] bg-foreground/[0.12] backdrop-blur-[2px] md:hidden"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 right-0 top-[4rem] z-[99] mx-3 flex max-h-[min(85vh,calc(100dvh-4.5rem))] flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white/95 shadow-[0_24px_64px_-28px_rgba(10,10,10,0.18)] backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-2 pb-3 pt-3">
                <div className="mb-2 grid grid-cols-2 gap-2 px-1">
                  {MOBILE_QUICK_LINKS.map((item) => {
                    const QuickIcon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex min-h-[48px] flex-col items-center justify-center gap-1.5 rounded-xl border border-foreground/[0.08] bg-gradient-to-b from-white to-[#fafaf9] px-2 py-3 text-center text-[12px] font-semibold leading-tight text-foreground/85 shadow-[0_1px_0_rgba(255,255,255,1)_inset] transition-all hover:border-[#ff3b1f]/25 hover:shadow-[0_12px_28px_-18px_rgba(255,59,31,0.35)]"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ff3b1f]/15 bg-[#ff3b1f]/[0.06]">
                          <QuickIcon
                            className="h-4 w-4 text-[#ff3b1f]"
                            strokeWidth={1.65}
                            aria-hidden
                          />
                        </span>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                {NAV_STRUCTURE.map((block) => {
                  if (block.type === "link") {
                    return (
                      <Link
                        key={block.id}
                        href={block.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="min-h-[48px] rounded-xl px-4 py-3.5 text-[16px] font-medium tracking-[-0.02em] text-foreground/85 transition-colors duration-200 hover:bg-[#ff3b1f]/[0.06] hover:text-foreground"
                      >
                        {block.label}
                      </Link>
                    );
                  }

                  const expanded = mobileOpenGroup === block.id;
                  const groupActive = groupContainsActive(
                    block,
                    navActiveSection,
                    pathname ?? "",
                  );

                  return (
                    <div
                      key={block.id}
                      className="rounded-xl border border-transparent"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setMobileOpenGroup((g) =>
                            g === block.id ? null : block.id,
                          )
                        }
                        className={cn(
                          "flex min-h-[48px] w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[16px] font-medium tracking-[-0.02em] transition-colors",
                          groupActive
                            ? "bg-[#ff3b1f]/[0.07] text-foreground"
                            : "text-foreground/85 hover:bg-foreground/[0.04]",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <NavIconBadge
                            icon={block.icon}
                            active={groupActive}
                          />
                          {block.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 opacity-50 transition-transform duration-300",
                            expanded && "rotate-180",
                          )}
                          strokeWidth={1.75}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.25,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden pl-2"
                          >
                            <div className="border-l border-foreground/[0.08] pb-2 pl-3 pt-1">
                              {flattenGroupItems(block).map((item) => {
                                const itemActive = isNavItemActive(
                                  item,
                                  pathname ?? "",
                                  navActiveSection,
                                );
                                return (
                                  <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setMobileOpenGroup(null);
                                    }}
                                    className="group/ms flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground/85 transition-colors hover:bg-[#ff3b1f]/[0.06] hover:text-[#ff3b1f]"
                                  >
                                    <NavIconBadge
                                      icon={item.icon}
                                      active={itemActive}
                                    />
                                    {item.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
              <div className="shrink-0 border-t border-foreground/[0.08] bg-white/95 p-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    primaryGradientCtaClassName,
                    "mb-2 w-full justify-center py-3.5",
                  )}
                >
                  Start a project
                </Link>
                <Link
                  href="/contact#inquiry-form"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex min-h-[44px] w-full items-center justify-center rounded-xl border border-foreground/15 text-[13px] font-semibold text-foreground/75"
                >
                  Project brief form
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
