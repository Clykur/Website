"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Building2,
  Search,
  ChevronDown,
  Users,
  SlidersHorizontal,
  X,
  Check,
  Layers,
} from "lucide-react";
import {
  ROLES,
  TEAMS,
  EMPLOYMENT_TYPES,
  LOCATIONS,
  getSlugForRole,
  type CareerRole,
} from "@/lib/careers-roles";
import { primaryGradientCtaClassName } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

const CAREERS_INTRO = {
  eyebrow: "Careers at Clykur",
  headline: "Join us in building the next generation of software products",
  supporting:
    "We're a fast-growing product company and engineering partner. Build with ownership, drive innovation, and shape product culture, remote-first, with teams that ship.",
  aboutTitle: "Why Clykur",
  aboutBody:
    "Clykur builds software products that power modern businesses and partners with companies to ship exceptional technology. We care about product thinking, engineering excellence, and execution speed. Recognized as an MSME under the Government of India, we combine product innovation with real client impact. If you want ownership, innovation, and a no-drama culture, you'll fit right in.",
};

const roleCardClass =
  "group block overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white/90 p-5 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_20px_48px_-36px_rgba(10,10,10,0.07)] transition-all duration-300 md:p-7 " +
  "hover:-translate-y-0.5 hover:border-foreground/[0.12] hover:shadow-[0_24px_56px_-40px_rgba(10,10,10,0.12)] active:translate-y-0";

function RoleCard({ role }: { role: CareerRole }) {
  return (
    <Link href={`/careers/${getSlugForRole(role)}`} className={roleCardClass}>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate font-poppins text-[1.0625rem] font-semibold tracking-[-0.02em] text-foreground md:text-lg">
            {role.title}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-foreground/45 md:text-sm">
            <span>{role.team}</span>
            <span className="text-foreground/20" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
              {role.employmentType}
            </span>
            <span className="text-foreground/20" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
              {role.location}
            </span>
          </div>
        </div>
        <span
          className="shrink-0 text-foreground/25 transition-colors group-hover:text-[#ff3b1f]"
          aria-hidden
        >
          <ChevronDown className="h-5 w-5 rotate-[-90deg]" />
        </span>
      </div>
    </Link>
  );
}

const filterShellClass =
  "rounded-2xl border border-foreground/[0.09] bg-white/80 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_64px_-40px_rgba(10,10,10,0.09)]";

const filterInputClass =
  "h-12 w-full rounded-xl border border-foreground/[0.1] bg-white/90 pl-10 pr-3 text-[13px] text-foreground shadow-[0_1px_0_rgba(255,255,255,0.98)_inset] placeholder:text-foreground/32 transition-[border-color,box-shadow] " +
  "focus:border-[#ff3b1f]/40 focus:outline-none focus:ring-2 focus:ring-[#ff3b1f]/16";

/** Matches `Navigation` desktop dropdown frame + `NavProcessSheet` inner panel */
const navDropdownFrameClass =
  "rounded-2xl bg-[#f8f8f7] p-[1px] shadow-[0_20px_48px_-28px_rgba(10,10,10,0.14)]";
const navDropdownPanelClass =
  "overflow-hidden rounded-2xl border border-foreground/[0.09] bg-white shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_24px_48px_-32px_rgba(10,10,10,0.08)]";
const navDropdownHeaderClass =
  "border-b border-foreground/[0.08] bg-[#fafaf9] px-4 py-2.5 sm:px-5 sm:py-3";
const navCoralRuleClass =
  "h-[3px] w-full bg-gradient-to-r from-[#ff3b1f]/85 via-[#ff3b1f]/35 to-foreground/[0.12]";

function optionLabel(
  filterKey: "team" | "employmentType" | "location",
  option: string,
) {
  if (filterKey === "team" && option === "All") return "All teams";
  return option;
}

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState<string>("All");
  const [employmentType, setEmploymentType] = useState<string>("All");
  const [location, setLocation] = useState<string>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [desktopOpenFilter, setDesktopOpenFilter] = useState<
    "team" | "employmentType" | "location" | null
  >(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const desktopFiltersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setOpenSection(null);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!desktopOpenFilter) return;
    const onDoc = (e: MouseEvent) => {
      if (
        desktopFiltersRef.current &&
        !desktopFiltersRef.current.contains(e.target as Node)
      ) {
        setDesktopOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [desktopOpenFilter]);

  const filteredRoles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ROLES.filter((role) => {
      const matchSearch = !q || role.title.toLowerCase().includes(q);
      const matchTeam = team === "All" || role.team === team;
      const matchEmployment =
        employmentType === "All" || role.employmentType === employmentType;
      const matchLocation = location === "All" || role.location === location;
      return matchSearch && matchTeam && matchEmployment && matchLocation;
    });
  }, [search, team, employmentType, location]);

  const hasActiveFilters =
    search.trim() !== "" ||
    team !== "All" ||
    employmentType !== "All" ||
    location !== "All";

  const clearFilters = () => {
    setSearch("");
    setTeam("All");
    setEmploymentType("All");
    setLocation("All");
    setMenuOpen(false);
    setOpenSection(null);
    setDesktopOpenFilter(null);
  };

  const filterGroups = [
    {
      key: "team",
      label: "Team",
      icon: Layers,
      options: TEAMS,
      value: team,
      setter: setTeam,
      format: (v: string) => (v === "All" ? "All teams" : v),
    },
    {
      key: "employmentType",
      label: "Employment",
      icon: Briefcase,
      options: EMPLOYMENT_TYPES,
      value: employmentType,
      setter: setEmploymentType,
      format: (v: string) => v,
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      options: LOCATIONS,
      value: location,
      setter: setLocation,
      format: (v: string) => v,
    },
  ] as const;

  const nonSearchFilterCount =
    (team !== "All" ? 1 : 0) +
    (employmentType !== "All" ? 1 : 0) +
    (location !== "All" ? 1 : 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(255,59,31,0.06),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,90,60,0.05),transparent_42%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_100%,transparent_35%,rgba(250,250,249,0.85)_100%)]"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-[1] mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8",
          "pt-[max(5.25rem,env(safe-area-inset-top))] md:pt-28",
          "pb-[max(4rem,env(safe-area-inset-bottom))] md:pb-24",
        )}
      >
        <Link
          href="/"
          className="mb-9 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40 transition-colors hover:text-[#ff3b1f] md:mb-11"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          Back to home
        </Link>

        <header className="mb-12 md:mb-14">
          <div className="mb-5 flex items-center gap-4">
            <span
              className="h-px w-10 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent sm:w-12"
              aria-hidden
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
              {CAREERS_INTRO.eyebrow}
            </p>
          </div>
          <h1 className="text-balance font-poppins text-[clamp(1.875rem,5vw+0.5rem,2.875rem)] font-medium leading-[1.08] tracking-[-0.035em] text-foreground">
            {CAREERS_INTRO.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground/52 md:text-lg md:leading-relaxed">
            {CAREERS_INTRO.supporting}
          </p>
        </header>

        <section className="mb-12 overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white/90 p-6 shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_20px_48px_-36px_rgba(10,10,10,0.07)] md:mb-14 md:p-8">
          <h2 className="mb-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/38">
            <Building2 className="h-4 w-4 text-[#ff3b1f]/80" aria-hidden />
            {CAREERS_INTRO.aboutTitle}
          </h2>
          <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/80">
            {CAREERS_INTRO.aboutBody}
          </p>
        </section>

        <div className="mb-6 md:mb-7">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/38">
                Open roles
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span
                  className="hidden h-px w-8 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-transparent sm:block"
                  aria-hidden
                />
                <h2 className="font-poppins text-xl font-medium tracking-[-0.025em] text-foreground md:text-2xl">
                  Find your team
                </h2>
              </div>
              <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-foreground/45">
                Search by title and narrow by team, contract type, or place.
              </p>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="self-start font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff3b1f]/90 transition hover:text-[#ff3b1f] sm:self-auto"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className={cn(filterShellClass, "relative z-20 mb-8")}>
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_70%_55%_at_100%_0%,rgba(255,59,31,0.06),transparent_58%)]"
            aria-hidden
          />
          <div className="relative p-4 md:p-6">
            <div className="flex flex-col gap-4 lg:gap-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <div className="relative min-w-0 flex-1">
                  <label htmlFor="careers-search" className="sr-only">
                    Search roles by title
                  </label>
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground/30"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <input
                    id="careers-search"
                    type="search"
                    placeholder="Search roles by title…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={filterInputClass}
                    autoComplete="off"
                  />
                </div>

                <div ref={menuRef} className="relative shrink-0 sm:hidden">
                  <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={cn(
                      "flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-foreground/[0.1] bg-white/90 px-4 text-[13px] font-semibold tracking-[-0.01em] text-foreground shadow-[0_1px_0_rgba(255,255,255,0.98)_inset] transition-[border-color,background-color]",
                      menuOpen && "border-[#ff3b1f]/30 bg-[#ff3b1f]/[0.04]",
                    )}
                    aria-expanded={menuOpen}
                    aria-controls="careers-mobile-filters"
                    aria-label="Open filters"
                  >
                    <SlidersHorizontal
                      className="h-[18px] w-[18px] text-foreground/55"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>Filters</span>
                    {nonSearchFilterCount > 0 && (
                      <span className="ml-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#ff3b1f] px-1.5 text-[10px] font-bold tabular-nums text-white">
                        {nonSearchFilterCount}
                      </span>
                    )}
                  </button>
                  <AnimatePresence>
                    {menuOpen && (
                      <>
                        <motion.button
                          key="careers-filters-backdrop"
                          type="button"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="fixed inset-0 z-[96] bg-foreground/[0.12] backdrop-blur-[2px] md:hidden"
                          aria-hidden
                          tabIndex={-1}
                          onClick={() => {
                            setMenuOpen(false);
                            setOpenSection(null);
                          }}
                        />
                        <motion.div
                          key="careers-filters-sheet"
                          id="careers-mobile-filters"
                          role="dialog"
                          aria-modal="true"
                          aria-label="Filter roles"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="fixed left-3 right-3 top-[4.5rem] z-[97] mx-auto max-h-[min(78vh,calc(100dvh-5rem))] overflow-hidden md:hidden"
                        >
                        <div className={navDropdownFrameClass}>
                          <div
                            className={cn(
                              navDropdownPanelClass,
                              "flex max-h-[min(78vh,calc(100dvh-8rem))] flex-col overflow-hidden",
                            )}
                          >
                            <div className="flex shrink-0 items-center justify-between border-b border-foreground/[0.08] bg-[#fafaf9] px-4 py-3 sm:px-5">
                              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/50">
                                Filters
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setMenuOpen(false);
                                  setOpenSection(null);
                                }}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/45 transition hover:bg-white hover:text-foreground"
                                aria-label="Close filters"
                              >
                                <X className="h-4 w-4" strokeWidth={2} />
                              </button>
                            </div>
                            <div className={navCoralRuleClass} aria-hidden />
                            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-white">
                              <div className="divide-y divide-foreground/[0.08]">
                                {filterGroups.map((filter) => {
                                  const Icon = filter.icon;
                                  const summary =
                                    filter.key === "team"
                                      ? filter.format(team)
                                      : filter.key === "employmentType"
                                        ? filter.format(employmentType)
                                        : filter.format(location);
                                  const expanded = openSection === filter.key;
                                  return (
                                    <div key={filter.key} className="bg-white">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setOpenSection(
                                            expanded ? null : filter.key,
                                          )
                                        }
                                        className={cn(
                                          "flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors duration-200",
                                          expanded
                                            ? "bg-[#ff3b1f]/[0.06]"
                                            : "hover:bg-[#fafaf9]/90",
                                        )}
                                      >
                                        <span className="flex min-w-0 items-center gap-3">
                                          <Icon
                                            className={cn(
                                              "h-[18px] w-[18px] shrink-0",
                                              expanded
                                                ? "text-[#ff3b1f]"
                                                : "text-foreground/45",
                                            )}
                                            strokeWidth={1.5}
                                            aria-hidden
                                          />
                                          <span className="min-w-0">
                                            <span className="block font-poppins text-[13px] font-medium leading-snug tracking-[-0.02em] text-foreground md:text-sm">
                                              {filter.label}
                                            </span>
                                            <span className="mt-0.5 block truncate text-[12px] text-foreground/45">
                                              {summary}
                                            </span>
                                          </span>
                                        </span>
                                        <ChevronDown
                                          className={cn(
                                            "h-4 w-4 shrink-0 text-foreground/40 transition-transform duration-300",
                                            expanded && "rotate-180",
                                          )}
                                          strokeWidth={2}
                                          aria-hidden
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
                                            className="overflow-hidden border-t border-foreground/[0.08] bg-[#fafaf9]/30"
                                          >
                                            <ol className="divide-y divide-foreground/[0.08]">
                                              {filter.options.map((option) => {
                                                const selected =
                                                  filter.value === option;
                                                return (
                                                  <li key={option}>
                                                    <button
                                                      type="button"
                                                      onClick={() => {
                                                        filter.setter(option);
                                                        setMenuOpen(false);
                                                        setOpenSection(null);
                                                      }}
                                                      className={cn(
                                                        "flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left font-poppins text-[13px] font-medium leading-snug tracking-[-0.02em] transition-colors duration-200 md:text-sm",
                                                        selected
                                                          ? "bg-[#ff3b1f]/[0.06] text-foreground"
                                                          : "text-foreground/85 hover:bg-white hover:text-[#ff3b1f]",
                                                      )}
                                                    >
                                                      <span>
                                                        {optionLabel(
                                                          filter.key,
                                                          option,
                                                        )}
                                                      </span>
                                                      {selected ? (
                                                        <Check
                                                          className="h-4 w-4 shrink-0 text-[#ff3b1f]"
                                                          strokeWidth={2.5}
                                                          aria-hidden
                                                        />
                                                      ) : null}
                                                    </button>
                                                  </li>
                                                );
                                              })}
                                            </ol>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="shrink-0 border-t border-foreground/[0.08] bg-[#fafaf9] px-4 py-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setMenuOpen(false);
                                  setOpenSection(null);
                                }}
                                className={cn(
                                  primaryGradientCtaClassName,
                                  "h-11 w-full justify-center text-[13px]",
                                )}
                              >
                                Show results
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div
                ref={desktopFiltersRef}
                className="hidden gap-3 sm:grid sm:grid-cols-3"
              >
                {filterGroups.map((filter) => {
                  const Icon = filter.icon;
                  const isOpen = desktopOpenFilter === filter.key;
                  const display =
                    filter.key === "team"
                      ? optionLabel("team", team)
                      : filter.key === "employmentType"
                        ? employmentType
                        : location;
                  return (
                    <div key={filter.key} className="relative min-w-0">
                      <p
                        id={`careers-filter-label-${filter.key}`}
                        className="mb-2 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/38"
                      >
                        <Icon
                          className="h-3.5 w-3.5 text-[#ff3b1f]/75"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        {filter.label}
                      </p>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup="listbox"
                        aria-labelledby={`careers-filter-label-${filter.key}`}
                        onClick={() =>
                          setDesktopOpenFilter(isOpen ? null : filter.key)
                        }
                        className={cn(
                          "group/filter-trigger flex h-12 w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-foreground/[0.1] bg-white/90 px-3 text-left shadow-[0_1px_0_rgba(255,255,255,0.98)_inset] transition-[border-color,box-shadow] duration-200",
                          isOpen &&
                            "border-[#ff3b1f]/35 ring-2 ring-[#ff3b1f]/12",
                        )}
                      >
                        <span className="truncate font-poppins text-[13px] font-medium tracking-[-0.02em] text-foreground">
                          {display}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 text-foreground/40 transition-transform duration-300",
                            isOpen && "rotate-180",
                          )}
                          strokeWidth={2}
                          aria-hidden
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 3 }}
                            transition={{
                              duration: 0.2,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute left-0 right-0 top-full z-[60] pt-1.5"
                          >
                            <div className={navDropdownFrameClass}>
                              <div className={navDropdownPanelClass}>
                                <div className={navDropdownHeaderClass}>
                                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/50">
                                    {filter.label}
                                  </p>
                                </div>
                                <div className={navCoralRuleClass} aria-hidden />
                                <ul
                                  className="max-h-[min(50vh,20rem)] divide-y divide-foreground/[0.08] overflow-y-auto overflow-x-hidden bg-white"
                                  role="listbox"
                                  aria-label={filter.label}
                                >
                                  {filter.options.map((option) => {
                                    const selected = filter.value === option;
                                    return (
                                      <li key={option} role="none">
                                        <button
                                          type="button"
                                          role="option"
                                          aria-selected={selected}
                                          onClick={() => {
                                            filter.setter(option);
                                            setDesktopOpenFilter(null);
                                          }}
                                          className={cn(
                                            "flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left font-poppins text-[13px] font-medium leading-snug tracking-[-0.02em] transition-colors duration-200 md:text-sm",
                                            selected
                                              ? "bg-[#ff3b1f]/[0.06] text-foreground"
                                              : "text-foreground/85 hover:bg-[#fafaf9]/90",
                                          )}
                                        >
                                          <span className="min-w-0 truncate">
                                            {optionLabel(filter.key, option)}
                                          </span>
                                          {selected ? (
                                            <Check
                                              className="h-4 w-4 shrink-0 text-[#ff3b1f]"
                                              strokeWidth={2.5}
                                              aria-hidden
                                            />
                                          ) : null}
                                        </button>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/38">
          <Users className="h-3.5 w-3.5 text-foreground/30" aria-hidden />
          <span>
            {filteredRoles.length} open role
            {filteredRoles.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="space-y-3">
          {filteredRoles.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-foreground/[0.12] bg-white/50 py-12 text-center text-[15px] text-foreground/45">
              No roles match your filters. Try adjusting the search or filters.
            </p>
          ) : (
            filteredRoles.map((role) => (
              <RoleCard key={getSlugForRole(role)} role={role} />
            ))
          )}
        </div>

        <div className="mt-12 rounded-2xl border border-foreground/[0.07] bg-white/60 px-5 py-6 backdrop-blur-sm md:mt-14 md:px-8 md:py-8">
          <p className="text-[15px] leading-relaxed text-foreground/55">
            Don&apos;t see a fit? We still want to hear from you. Reach out at{" "}
            <a
              href="mailto:info@clykur.com?subject=General%20careers%20inquiry%20-%20Clykur"
              className="font-medium text-[#ff3b1f] underline decoration-[#ff3b1f]/35 underline-offset-[3px] transition hover:decoration-[#ff3b1f]"
            >
              info@clykur.com
            </a>{" "}
            with your resume and a short note.
          </p>
        </div>
      </div>
    </div>
  );
}
