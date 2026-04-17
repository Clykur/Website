"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Lock } from "lucide-react";
import { memo, useCallback, useState, type ReactNode } from "react";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

const portfolioItems = [
  {
    title: "Enterprise Website Frontend",
    description:
      "Design-to-code: responsive, animated, performant across breakpoints.",
    category: "Website Frontend",
  },
  {
    title: "Mobile App Interface",
    description:
      "Native-feeling UI from mockups gestures, motion, and polish.",
    category: "Mobile App Frontend",
  },
  {
    title: "Web Application UI",
    description:
      "Complex flows in React: accessible components, clear hierarchy.",
    category: "Web App Frontend",
  },
  {
    title: "Design System Implementation",
    description:
      "Tokens and components scaled across products one source of truth.",
    category: "Component Development",
  },
  {
    title: "E-Commerce Frontend",
    description:
      "Catalog, cart, checkout pixel fidelity under real traffic.",
    category: "Website Frontend",
  },
  {
    title: "Dashboard Interface",
    description:
      "Data-dense views that stay legible on every screen size.",
    category: "Web App Frontend",
  },
] as const;

type Item = (typeof portfolioItems)[number];

const archInk = "rgba(10,10,10,0.14)";
const archInkFaint = "rgba(10,10,10,0.08)";
const archAccent = "rgba(255,59,31,0.45)";
const archInkFill = (a: number) => `rgba(10,10,10,${a})`;

/**
 * One diagram per tile — wireframe metaphors for that project type (stroke-only).
 */
function PortfolioArchitectureLines({ index }: { index: number }) {
  const common =
    "pointer-events-none absolute inset-x-4 inset-y-6 z-[2] md:inset-x-6 md:inset-y-8";
  const svg = (children: ReactNode) => (
    <svg
      className="h-full w-full overflow-visible text-[0]"
      viewBox="0 0 240 140"
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );

  switch (index) {
    case 0:
      // Marketing / enterprise site: browser frame, nav, hero, content columns
      return (
        <div className={common}>
          {svg(
            <>
              <rect
                x="8"
                y="12"
                width="224"
                height="116"
                rx="3"
                stroke={archInk}
                strokeWidth="0.9"
              />
              <line
                x1="8"
                y1="28"
                x2="232"
                y2="28"
                stroke={archInkFaint}
                strokeWidth="0.75"
              />
              <circle cx="18" cy="20" r="2" fill={archAccent} opacity="0.9" />
              <circle cx="28" cy="20" r="2" fill={archInkFill(0.12)} />
              <circle cx="38" cy="20" r="2" fill={archInkFill(0.12)} />
              <line
                x1="180"
                y1="18"
                x2="224"
                y2="18"
                stroke={archInkFaint}
                strokeWidth="0.6"
              />
              <rect
                x="16"
                y="36"
                width="208"
                height="38"
                rx="1.5"
                stroke={archAccent}
                strokeWidth="0.85"
                opacity="0.9"
              />
              <line
                x1="16"
                y1="84"
                x2="224"
                y2="84"
                stroke={archInkFaint}
                strokeWidth="0.6"
                strokeDasharray="3 3"
              />
              <rect x="16" y="92" width="64" height="28" rx="1" stroke={archInk} strokeWidth="0.75" />
              <rect x="88" y="92" width="64" height="28" rx="1" stroke={archInk} strokeWidth="0.75" />
              <rect x="160" y="92" width="64" height="28" rx="1" stroke={archInk} strokeWidth="0.75" />
              <line x1="120" y1="92" x2="120" y2="120" stroke={archInkFaint} strokeWidth="0.5" />
            </>,
          )}
        </div>
      );
    case 1:
      // Mobile shell: device, status, stacked surfaces
      return (
        <div className={common}>
          {svg(
            <>
              <rect
                x="72"
                y="10"
                width="96"
                height="120"
                rx="14"
                stroke={archInk}
                strokeWidth="0.95"
              />
              <line
                x1="108"
                y1="22"
                x2="132"
                y2="22"
                stroke={archInkFaint}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect x="82" y="34" width="76" height="8" rx="2" stroke={archAccent} strokeWidth="0.7" />
              <rect x="82" y="48" width="76" height="22" rx="2" stroke={archInk} strokeWidth="0.75" />
              <rect x="82" y="76" width="76" height="22" rx="2" stroke={archInk} strokeWidth="0.75" />
              <rect x="82" y="104" width="76" height="18" rx="2" stroke={archInkFaint} strokeWidth="0.65" />
              <path
                d="M 112 128 Q 120 132 128 128"
                stroke={archInkFaint}
                strokeWidth="0.6"
                fill="none"
              />
            </>,
          )}
        </div>
      );
    case 2:
      // Web app: sidebar + main + route nodes
      return (
        <div className={common}>
          {svg(
            <>
              <rect x="12" y="16" width="44" height="108" rx="2" stroke={archInk} strokeWidth="0.8" />
              <line x1="20" y1="28" x2="48" y2="28" stroke={archAccent} strokeWidth="0.7" />
              <line x1="20" y1="40" x2="44" y2="40" stroke={archInkFaint} strokeWidth="0.55" />
              <line x1="20" y1="50" x2="42" y2="50" stroke={archInkFaint} strokeWidth="0.55" />
              <line x1="20" y1="60" x2="46" y2="60" stroke={archInkFaint} strokeWidth="0.55" />
              <rect x="64" y="16" width="164" height="24" rx="2" stroke={archInk} strokeWidth="0.75" />
              <rect x="64" y="46" width="164" height="78" rx="2" stroke={archInk} strokeWidth="0.8" />
              <circle cx="96" cy="86" r="5" stroke={archAccent} strokeWidth="0.75" />
              <circle cx="132" cy="72" r="5" stroke={archInk} strokeWidth="0.75" />
              <circle cx="168" cy="98" r="5" stroke={archInk} strokeWidth="0.75" />
              <path
                d="M 101 86 L 127 74 M 137 72 L 163 93"
                stroke={archInkFaint}
                strokeWidth="0.6"
              />
              <path
                d="M 96 91 L 96 108 L 132 108"
                stroke={archAccent}
                strokeWidth="0.55"
                opacity="0.6"
              />
            </>,
          )}
        </div>
      );
    case 3:
      // Design system: nested modules / atomic lattice
      return (
        <div className={common}>
          {svg(
            <>
              <rect x="20" y="20" width="200" height="100" rx="2" stroke={archInk} strokeWidth="0.75" />
              <rect x="28" y="28" width="88" height="40" rx="1.5" stroke={archAccent} strokeWidth="0.8" />
              <rect x="124" y="28" width="88" height="40" rx="1.5" stroke={archInk} strokeWidth="0.75" />
              <rect x="28" y="76" width="40" height="36" rx="1" stroke={archInkFaint} strokeWidth="0.65" />
              <rect x="76" y="76" width="40" height="36" rx="1" stroke={archInkFaint} strokeWidth="0.65" />
              <rect x="124" y="76" width="40" height="36" rx="1" stroke={archInk} strokeWidth="0.7" />
              <rect x="172" y="76" width="40" height="36" rx="1" stroke={archInk} strokeWidth="0.7" />
              <line x1="68" y1="48" x2="124" y2="48" stroke={archInkFaint} strokeWidth="0.5" strokeDasharray="2 3" />
              <line x1="48" y1="68" x2="48" y2="76" stroke={archAccent} strokeWidth="0.5" opacity="0.7" />
            </>,
          )}
        </div>
      );
    case 4:
      // Commerce: product grid + checkout rail
      return (
        <div className={common}>
          {svg(
            <>
              <rect x="16" y="18" width="92" height="72" rx="2" stroke={archInk} strokeWidth="0.75" />
              <rect x="116" y="18" width="92" height="72" rx="2" stroke={archInk} strokeWidth="0.75" />
              <line x1="64" y1="18" x2="64" y2="90" stroke={archInkFaint} strokeWidth="0.5" />
              <line x1="16" y1="54" x2="108" y2="54" stroke={archInkFaint} strokeWidth="0.5" />
              <line x1="116" y1="54" x2="208" y2="54" stroke={archInkFaint} strokeWidth="0.5" />
              <rect x="116" y="18" width="46" height="36" stroke={archAccent} strokeWidth="0.65" opacity="0.85" />
              <rect x="16" y="100" width="208" height="22" rx="2" stroke={archAccent} strokeWidth="0.85" />
              <line x1="28" y1="108" x2="100" y2="108" stroke={archInk} strokeWidth="0.6" />
              <line x1="28" y1="114" x2="80" y2="114" stroke={archInkFaint} strokeWidth="0.55" />
              <circle cx="208" cy="111" r="6" stroke={archInk} strokeWidth="0.7" />
            </>,
          )}
        </div>
      );
    case 5:
      // Dashboard: axes, bars, KPI tiles
      return (
        <div className={common}>
          {svg(
            <>
              <rect x="150" y="18" width="78" height="22" rx="2" stroke={archInk} strokeWidth="0.7" />
              <rect x="150" y="46" width="78" height="22" rx="2" stroke={archInkFaint} strokeWidth="0.65" />
              <line x1="24" y1="118" x2="212" y2="118" stroke={archInk} strokeWidth="0.8" />
              <line x1="24" y1="32" x2="24" y2="118" stroke={archInk} strokeWidth="0.8" />
              <rect x="40" y="92" width="14" height="26" stroke={archAccent} strokeWidth="0.75" />
              <rect x="62" y="84" width="14" height="34" stroke={archInk} strokeWidth="0.75" />
              <rect x="84" y="72" width="14" height="46" stroke={archAccent} strokeWidth="0.75" opacity="0.85" />
              <rect x="106" y="88" width="14" height="30" stroke={archInk} strokeWidth="0.75" />
              <rect x="128" y="96" width="14" height="22" stroke={archInkFaint} strokeWidth="0.65" />
              <path
                d="M 38 68 L 54 76 L 70 58 L 86 64 L 102 48 L 118 52"
                stroke={archAccent}
                strokeWidth="0.7"
                fill="none"
                opacity="0.65"
              />
            </>,
          )}
        </div>
      );
    default:
      return null;
  }
}

/** Abstract “preview” art — expands with the card; layers fill dead space. */
function PortfolioVisual({ index }: { index: number }) {
  const reduceMotion = useReducedMotion();
  const { liteMode } = usePerformanceMode();
  const staticAmbient = reduceMotion || liteMode;
  const phase = index % 3;
  const sweepDur = 10 + index * 0.5;
  return (
    <div className="relative min-h-[140px] w-full flex-1 overflow-hidden md:min-h-[160px]">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#eeece8] via-[#fafaf9] to-white"
        aria-hidden
      />
      {/* Soft vignette so edges never read as empty */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_45%,transparent_20%,rgba(250,250,249,0.85)_100%)]"
        aria-hidden
      />

      <motion.div
        className="absolute -right-6 -top-8 h-[min(55%,220px)] w-[min(70%,280px)] rounded-full bg-[#ff3b1f]/[0.14] blur-3xl"
        animate={
          staticAmbient
            ? false
            : { x: [0, 12, 0], y: [0, 16, 0], scale: [1, 1.06, 1] }
        }
        transition={{
          duration: 9 + index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-10 -left-8 h-[min(50%,200px)] w-[min(65%,260px)] rounded-full bg-foreground/[0.06] blur-3xl"
        animate={staticAmbient ? false : { x: [0, -14, 0], y: [0, -10, 0] }}
        transition={{
          duration: 11 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(90%,320px)] w-[min(90%,400px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#ff3b1f]/[0.07] via-transparent to-foreground/[0.04] blur-2xl"
        animate={
          staticAmbient
            ? false
            : { scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }
        }
        transition={{
          duration: 8 + index * 0.35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden
      />

      {/* Slow diagonal light sweep — fills perceived gaps */}
      <motion.div
        className="pointer-events-none absolute -inset-[40%] opacity-[0.55]"
        style={{
          background:
            "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 48%, rgba(255,59,31,0.06) 52%, transparent 65%)",
        }}
        animate={
          staticAmbient
            ? { x: "0%" }
            : { x: ["-20%", "25%", "-20%"] }
        }
        transition={{
          duration: sweepDur,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden
      />

      {phase === 0 && (
        <div
          className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(135deg,transparent_46%,rgba(255,59,31,0.08)_48%,transparent_50%),linear-gradient(-45deg,transparent_46%,rgba(10,10,10,0.045)_48%,transparent_50%)] [background-size:13px_13px]"
          aria-hidden
        />
      )}
      {phase === 1 && (
        <div
          className="absolute inset-0 opacity-[0.45] [background-image:radial-gradient(circle_at_center,rgba(10,10,10,0.065)_1px,transparent_1px)] [background-size:16px_16px]"
          aria-hidden
        />
      )}
      {phase === 2 && (
        <div
          className="absolute inset-0 opacity-[0.38] [background:repeating-linear-gradient(90deg,transparent,transparent_28px,rgba(10,10,10,0.055)_28px,rgba(10,10,10,0.055)_29px)]"
          aria-hidden
        />
      )}

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(255,59,31,0.1),transparent_62%)]"
        aria-hidden
      />

      {/* Themed line architecture — one diagram per project type */}
      <PortfolioArchitectureLines index={index} />

      {/* Faint arc — decorative, reads “designed” even in tall cells */}
      <div
        className="absolute -right-[20%] bottom-0 h-[85%] w-[90%] rounded-tl-[100%] border border-foreground/[0.06] opacity-40"
        aria-hidden
      />

      <div
        className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-foreground/[0.1]"
        aria-hidden
      />
      <div
        className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-foreground/[0.1]"
        aria-hidden
      />
    </div>
  );
}

function portfolioArticleClass(featured?: boolean) {
  return cn(
    "group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-foreground/[0.07] bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_20px_50px_-28px_rgba(10,10,10,0.12)] transition-shadow duration-500 hover:shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_28px_60px_-24px_rgba(255,59,31,0.12)]",
    featured && "min-h-[300px] lg:min-h-0",
  );
}

function PortfolioCardContent({
  item,
  index,
  featured,
}: {
  item: Item;
  index: number;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative z-[2] flex min-h-0 flex-1 flex-col",
        featured && "lg:min-h-[280px] lg:flex-row lg:items-stretch",
      )}
    >
      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col overflow-hidden",
          featured ? "lg:min-h-0 lg:w-[56%]" : "w-full",
        )}
      >
        <PortfolioVisual index={index} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/[0.97] via-white/35 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="font-mono text-[10px] tabular-nums text-foreground/35">
            {(index + 1).toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "relative z-[2] flex shrink-0 flex-col p-5 md:p-6",
          featured && "lg:w-[44%] lg:justify-center lg:py-8",
        )}
      >
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ff3b1f]/90">
          {item.category}
        </p>
        <h3 className="font-poppins text-lg font-medium leading-snug tracking-[-0.02em] text-foreground md:text-xl">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-foreground/48 md:line-clamp-3 md:text-[14px]">
          {item.description}
        </p>
      </div>
    </div>
  );
}

const PortfolioInteractiveCardLite = memo(function PortfolioInteractiveCardLite({
  item,
  index,
  featured,
  gridClassName,
}: {
  item: Item;
  index: number;
  featured?: boolean;
  gridClassName?: string;
}) {
  return (
    <div className={cn("[perspective:1100px] h-full min-h-0", gridClassName)}>
      <article
        data-reveal-item
        className={portfolioArticleClass(featured)}
      >
        <PortfolioCardContent
          item={item}
          index={index}
          featured={featured}
        />
      </article>
    </div>
  );
});

const PortfolioInteractiveCardDesktop = memo(
  function PortfolioInteractiveCardDesktop({
    item,
    index,
    featured,
    gridClassName,
  }: {
    item: Item;
    index: number;
    featured?: boolean;
    gridClassName?: string;
  }) {
    const reduceMotion = useReducedMotion();
    const mx = useMotionValue(50);
    const my = useMotionValue(50);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const updatePointer = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        if (!reduceMotion) {
          mx.set(((e.clientX - r.left) / r.width) * 100);
          my.set(((e.clientY - r.top) / r.height) * 100);
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          const rotateY = ((x / r.width) * 2 - 1) * (featured ? 4 : 5);
          const rotateX = -((y / r.height) * 2 - 1) * (featured ? 4 : 5);
          setTilt({ x: rotateX, y: rotateY });
        }
      },
      [featured, mx, my, reduceMotion],
    );

    const resetPointer = useCallback(() => {
      mx.set(50);
      my.set(50);
      setTilt({ x: 0, y: 0 });
    }, [mx, my]);

    const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(255, 59, 31, 0.2), transparent 55%)`;

    return (
      <div className={cn("[perspective:1100px] h-full min-h-0", gridClassName)}>
        <motion.article
          data-reveal-item
          className={portfolioArticleClass(featured)}
          onMouseMove={updatePointer}
          onMouseLeave={resetPointer}
          style={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            transformStyle: "preserve-3d",
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className={cn(
              "pointer-events-none absolute inset-0 z-[1] rounded-2xl",
              reduceMotion
                ? "opacity-0"
                : "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            )}
            style={reduceMotion ? undefined : { background: spotlight }}
            aria-hidden
          />
          <PortfolioCardContent
            item={item}
            index={index}
            featured={featured}
          />
        </motion.article>
      </div>
    );
  },
);

const PortfolioInteractiveCard = memo(function PortfolioInteractiveCard(
  props: {
    item: Item;
    index: number;
    featured?: boolean;
    gridClassName?: string;
  },
) {
  const { liteMode } = usePerformanceMode();
  if (liteMode) {
    return <PortfolioInteractiveCardLite {...props} />;
  }
  return <PortfolioInteractiveCardDesktop {...props} />;
});

const bentoPlacement = [
  "lg:col-start-1 lg:row-start-1 lg:col-span-2 lg:row-span-2",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-1 lg:row-start-3",
  "lg:col-start-2 lg:row-start-3",
  "lg:col-start-3 lg:row-start-3",
] as const;

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="clykur-story-section relative border-t border-foreground/[0.05]"
      aria-labelledby="portfolio-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,rgba(255,59,31,0.06),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#fafaf9] to-white"
        aria-hidden
      />

      <ScrollReveal className="clykur-story-shell relative z-10 max-w-6xl">
        <header data-reveal-item className="mb-14 md:mb-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-4">
                <span
                  className="h-px w-12 shrink-0 bg-gradient-to-r from-[#ff3b1f] to-[#ff3b1f]/0"
                  aria-hidden
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
                  Work samples
                </p>
              </div>
              <h2
                id="portfolio-heading"
                className="font-poppins text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-foreground"
              >
                Portfolio
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-foreground/48 md:text-base">
                Motion, light, and depth do the heavy lifting. You get the feel
                of our craft first. Copy stays tight because the work speaks
                for itself.
              </p>
            </div>
            <div className="shrink-0 border border-foreground/[0.08] bg-white/60 px-5 py-4 shadow-[0_20px_40px_-28px_rgba(10,10,10,0.1)] backdrop-blur-sm lg:max-w-sm">
              <div className="flex items-start gap-3">
                <Lock
                  className="mt-0.5 h-4 w-4 shrink-0 text-foreground/35"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="text-[12.5px] leading-relaxed text-foreground/48">
                  We honor every NDA. What you see here is how we work category,
                  scope, and outcome without naming clients.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-5 md:gap-6 lg:grid-cols-3 lg:grid-rows-3 lg:gap-6">
          {portfolioItems.map((item, index) => (
            <PortfolioInteractiveCard
              key={item.title}
              item={item}
              index={index}
              featured={index === 0}
              gridClassName={bentoPlacement[index]}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
