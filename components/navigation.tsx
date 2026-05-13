"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  FileText,
  HelpCircle,
  Layers,
  LayoutGrid,
  ListOrdered,
  Menu,
  Package,
  Globe,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  id: string;
  icon: LucideIcon;
};

type MenuAlign = "start" | "center" | "end";

type NavGroup = {
  type: "group";
  id: string;
  label: string;
  icon: LucideIcon;
  menuAlign: MenuAlign;
  items: NavItem[];
};

type NavLink = {
  type: "link";
  href: string;
  label: string;
  id: string;
};

type NavBlock = NavGroup | NavLink;

const NAV_STRUCTURE: NavBlock[] = [
  {
    type: "group",
    id: "offerings",
    label: "Offerings",
    icon: Layers,
    menuAlign: "start",
    items: [
      { href: "/#products", label: "Products", id: "products", icon: Package },
      { href: "/#ecosystem", label: "Ecosystem", id: "ecosystem", icon: Layers },
      { href: "/#services", label: "Services", id: "services", icon: Wrench },
      { href: "/#about", label: "About", id: "about", icon: Users },
      { href: "/#process", label: "Process", id: "process", icon: ListOrdered },
    ],
  },
  {
    type: "group",
    id: "work",
    label: "Work",
    icon: LayoutGrid,
    menuAlign: "center",
    items: [
      { href: "/#portfolio", label: "Portfolio", id: "portfolio", icon: LayoutGrid },
      { href: "/#client-works", label: "Client works", id: "client-works", icon: Sparkles },
      { href: "/work", label: "All projects", id: "work-all", icon: Globe },
      { href: "/#case-studies", label: "Case studies", id: "case-studies", icon: FileText },
    ],
  },
  {
    type: "group",
    id: "resources",
    label: "Resources",
    icon: BookOpen,
    menuAlign: "end",
    items: [
      { href: "/#faq", label: "FAQ", id: "faq", icon: HelpCircle },
      { href: "/#trust", label: "Trust", id: "trust", icon: ShieldCheck },
    ],
  },
  { type: "link", href: "/careers", label: "Careers", id: "careers" },
  { type: "link", href: "/#contact", label: "Contact", id: "contact" },
];

const PAGE_SECTION_ORDER = [
  "products",
  "ecosystem",
  "services",
  "about",
  "process",
  "portfolio",
  "client-works",
  "case-studies",
  "faq",
  "trust",
  "contact",
] as const;

function mapScrollSectionToNavId(raw: string): string {
  if (!raw) return "";
  const navSectionIds = new Set([
    "products",
    "ecosystem",
    "services",
    "about",
    "process",
    "portfolio",
    "client-works",
    "case-studies",
    "faq",
    "trust",
    "contact",
  ]);
  return navSectionIds.has(raw) ? raw : "";
}

function groupContainsActive(
  group: NavGroup,
  activeSection: string,
  pathname: string,
): boolean {
  return group.items.some((i) => {
    if (i.href === "/work") return pathname === "/work";
    return activeSection === i.id;
  });
}

function menuPanelAlignClass(align: MenuAlign): string {
  switch (align) {
    case "start":
      return "left-0 right-auto translate-x-0";
    case "center":
      return "left-1/2 right-auto -translate-x-1/2";
    case "end":
      return "left-auto right-0 translate-x-0";
    default:
      return "left-0";
  }
}

/** Compact sheet aligned with `Process`: header strip, coral rule, rows with icon + label. */
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
  const twoCol = group.items.length === 2;

  return (
    <div className="max-h-[min(70vh,22rem)] overflow-y-auto overflow-x-hidden md:max-h-[min(80vh,26rem)]">
      <div className="overflow-hidden rounded-2xl border border-foreground/[0.09] bg-white shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_48px_-32px_rgba(10,10,10,0.08)]">
        <div className="border-b border-foreground/[0.08] bg-[#fafaf9] px-4 py-3 sm:px-5">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/50">
            {group.label}
          </p>
        </div>

        <div
          className="h-[3px] w-full bg-gradient-to-r from-[#ff3b1f]/85 via-[#ff3b1f]/35 to-foreground/[0.12]"
          aria-hidden
        />

        <ol
          className={cn(
            "grid bg-white",
            twoCol &&
              "grid-cols-1 divide-y divide-foreground/[0.08] sm:grid-cols-2 sm:divide-x sm:divide-y-0",
            !twoCol && "grid-cols-1 divide-y divide-foreground/[0.08]",
          )}
        >
          {group.items.map((item) => {
            const itemActive =
              item.href === "/work"
                ? pathname === "/work"
                : activeSection === item.id;
            const ItemIcon = item.icon;

            return (
              <li key={item.id} className={cn(twoCol && "min-w-0")}>
                <Link
                  href={item.href}
                  role="menuitem"
                  onClick={onPick}
                  className={cn(
                    "group/nav-row flex items-center gap-3 px-4 py-3.5 transition-colors duration-200",
                    itemActive
                      ? "bg-[#ff3b1f]/[0.06]"
                      : "hover:bg-[#fafaf9]/90",
                  )}
                >
                  <ItemIcon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0 md:h-5 md:w-5",
                      itemActive
                        ? "text-[#ff3b1f]"
                        : "text-foreground/45 group-hover/nav-row:text-[#ff3b1f]/85",
                    )}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="min-w-0 font-poppins text-[13px] font-medium leading-snug tracking-[-0.02em] text-foreground md:text-sm">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const isCareersPage = pathname === "/careers";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
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
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

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

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isScrolled
          ? "border-b border-foreground/[0.06] bg-white/72 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_8px_32px_-8px_rgba(10,10,10,0.06)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
          : "border-b border-transparent bg-gradient-to-b from-white via-white/85 to-white/0"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center">
            <img
              src="/Clykur Logo.svg"
              alt="Clykur"
              className="h-36 w-auto md:h-44"
            />
          </Link>

          <div
            ref={dropdownContainerRef}
            className="hidden min-w-0 flex-1 items-center justify-end gap-2 md:flex lg:gap-3"
          >
            <div className="flex items-center gap-0.5 lg:gap-1">
              {NAV_STRUCTURE.map((block) => {
                if (block.type === "link") {
                  const isActive =
                    block.id === "careers"
                      ? isCareersPage
                      : activeSection === block.id;

                  return (
                    <Link
                      key={block.id}
                      href={block.href}
                      className={cn(
                        "group relative shrink-0 px-2.5 py-2 text-[12px] font-medium tracking-[-0.01em] transition-colors duration-300 ease-out lg:px-3 lg:text-[13px]",
                        isActive
                          ? "text-foreground"
                          : "text-foreground/48 hover:text-foreground/88"
                      )}
                    >
                      <span className="relative z-10 whitespace-nowrap">{block.label}</span>
                      <span
                        className={cn(
                          "pointer-events-none absolute bottom-0.5 left-2.5 right-2.5 h-[2px] origin-center rounded-full bg-gradient-to-r from-[#ff5a3c] via-[#ff3b1f] to-[#ff5a3c] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:left-3 lg:right-3",
                          isActive
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                        )}
                        aria-hidden
                      />
                    </Link>
                  );
                }

                const GroupIcon = block.icon;
                const groupActive = groupContainsActive(
                  block,
                  activeSection,
                  pathname ?? "",
                );
                const isOpen = openDropdown === block.id;

                return (
                  <div
                    key={block.id}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(block.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                      onClick={() =>
                        setOpenDropdown((d) => (d === block.id ? null : block.id))
                      }
                      className={cn(
                        "group flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-2 text-left text-[12px] font-medium tracking-[-0.01em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b1f]/25 lg:gap-1.5 lg:px-3 lg:text-[13px]",
                        groupActive || isOpen
                          ? "text-foreground"
                          : "text-foreground/48 hover:text-foreground/88"
                      )}
                    >
                      <GroupIcon
                        className="h-3.5 w-3.5 shrink-0 opacity-70 lg:h-4 lg:w-4"
                        strokeWidth={iconStroke}
                        aria-hidden
                      />
                      <span className="whitespace-nowrap">{block.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 opacity-60 transition-transform duration-300 lg:h-4 lg:w-4",
                          isOpen && "rotate-180"
                        )}
                        strokeWidth={iconStroke}
                        aria-hidden
                      />
                      <span
                        className={cn(
                          "pointer-events-none absolute bottom-0.5 left-2.5 right-2.5 h-[2px] origin-center rounded-full bg-gradient-to-r from-[#ff5a3c] via-[#ff3b1f] to-[#ff5a3c] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:left-3 lg:right-3",
                          groupActive
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                        )}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <div
                          className={cn(
                            "absolute top-full z-[110] w-[min(92vw,23rem)] max-w-[calc(100vw-1.25rem)] pt-1.5",
                            menuPanelAlignClass(block.menuAlign)
                          )}
                        >
                          <motion.div
                            role="menu"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 3 }}
                            transition={{
                              duration: 0.2,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="origin-top rounded-2xl bg-[#f8f8f7] p-[1px] shadow-[0_20px_48px_-28px_rgba(10,10,10,0.14)]"
                          >
                            <NavProcessSheet
                              group={block}
                              activeSection={activeSection}
                              pathname={pathname ?? ""}
                              onPick={() => setOpenDropdown(null)}
                            />
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <Link
              href={isCareersPage ? "/#contact" : "#contact"}
              className={cn(primaryGradientCtaClassName, "shrink-0")}
            >
              Get in Touch
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
                : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground"
            )}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
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
              className="fixed left-0 right-0 top-[4rem] z-[99] mx-3 max-h-[min(78vh,calc(100dvh-5rem))] overflow-y-auto rounded-2xl border border-foreground/[0.08] bg-white/95 shadow-[0_24px_64px_-28px_rgba(10,10,10,0.18)] backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1 p-2 pb-4 pt-3">
                {NAV_STRUCTURE.map((block) => {
                  if (block.type === "link") {
                    return (
                      <Link
                        key={block.id}
                        href={block.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="rounded-xl px-4 py-3.5 text-[17px] font-medium tracking-[-0.02em] text-foreground/85 transition-colors duration-200 hover:bg-[#ff3b1f]/[0.06] hover:text-foreground"
                      >
                        {block.label}
                      </Link>
                    );
                  }

                  const GroupIcon = block.icon;
                  const expanded = mobileOpenGroup === block.id;
                  const groupActive = groupContainsActive(
                    block,
                    activeSection,
                    pathname ?? "",
                  );

                  return (
                    <div key={block.id} className="rounded-xl border border-transparent">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileOpenGroup((g) => (g === block.id ? null : block.id))
                        }
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[17px] font-medium tracking-[-0.02em] transition-colors",
                          groupActive
                            ? "bg-[#ff3b1f]/[0.07] text-foreground"
                            : "text-foreground/85 hover:bg-foreground/[0.04]"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <GroupIcon className="h-5 w-5 shrink-0 opacity-70" strokeWidth={iconStroke} />
                          {block.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 opacity-50 transition-transform duration-300",
                            expanded && "rotate-180"
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
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden pl-2"
                          >
                            <div className="border-l border-foreground/[0.08] pb-2 pl-3 pt-1">
                              {block.items.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                  <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setMobileOpenGroup(null);
                                    }}
                                    className="group/ms flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground/85 transition-colors hover:bg-[#ff3b1f]/[0.06] hover:text-[#ff3b1f]"
                                  >
                                    <ItemIcon
                                      className="h-4 w-4 shrink-0 text-foreground/45 transition-colors group-hover/ms:text-[#ff3b1f]"
                                      strokeWidth={iconStroke}
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
                <div className="mt-2 border-t border-foreground/[0.06] px-2 pt-4">
                  <Link
                    href={isCareersPage ? "/#contact" : "#contact"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(primaryGradientCtaClassName, "w-full justify-center py-5")}
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
