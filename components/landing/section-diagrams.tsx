import type { ReactNode } from "react";

export const ecosystemVisualTypes = [
  "automation",
  "trust",
  "infrastructure",
  "saas",
] as const;

export type EcosystemVisualType = (typeof ecosystemVisualTypes)[number];

const ink = "rgba(10,10,10,0.14)";
const inkM = "rgba(10,10,10,0.22)";
const accent = "#ff3b1f";
const accentSoft = "rgba(255,59,31,0.14)";
const label = "rgba(10,10,10,0.42)";

function SvgLabel({
  x,
  y,
  children,
}: {
  x: number | string;
  y: number | string;
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={label}
      style={{ fontSize: "7.5px", fontFamily: "system-ui, sans-serif" }}
      textAnchor="middle"
    >
      {children}
    </text>
  );
}

/** Product ecosystem pillar diagrams — shared by ecosystem section and hero. */
export function EcosystemVisual({
  type,
  idPrefix = "eco",
  density = "card",
  presentation = "panel",
}: {
  type: EcosystemVisualType;
  /** Avoid duplicate SVG marker ids when multiple instances exist on one page. */
  idPrefix?: string;
  density?: "card" | "compact";
  /** `minimal` = SVG only, no gradient panels or corner brackets (e.g. hero). */
  presentation?: "panel" | "minimal";
}) {
  const mid = `${idPrefix}-arr-${type}`;
  const frame =
    density === "compact"
      ? "relative aspect-[16/10] max-h-[128px] w-full overflow-hidden"
      : "relative aspect-[5/3] w-full overflow-hidden md:aspect-[16/10]";

  const showPanel = presentation === "panel";

  return (
    <div className={frame}>
      {showPanel && (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#f4f3f1] via-white to-[#fafaf9]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_70%_20%,rgba(255,59,31,0.07),transparent_55%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,rgba(10,10,10,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.04)_1px,transparent_1px)] [background-size:20px_20px]"
            aria-hidden
          />
        </>
      )}
      <svg
        className={
          density === "compact"
            ? `relative z-[1] h-full w-full ${presentation === "minimal" ? "p-2" : "p-3"}`
            : "relative z-[1] h-full w-full p-5 md:p-7"
        }
        viewBox="0 0 240 132"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <marker
            id={mid}
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 7 3.5, 0 7" fill={accent} />
          </marker>
        </defs>

        {type === "automation" && (
          <>
            <rect x="14" y="44" width="46" height="30" rx="4" stroke={inkM} strokeWidth="1.05" />
            <SvgLabel x="37" y="62">
              Trigger
            </SvgLabel>
            <line
              x1="60"
              y1="59"
              x2="86"
              y2="59"
              stroke={accent}
              strokeWidth="1.25"
              markerEnd={`url(#${mid})`}
            />
            <rect
              x="88"
              y="36"
              width="64"
              height="46"
              rx="5"
              stroke={accent}
              strokeWidth="1.35"
              fill={accentSoft}
            />
            <SvgLabel x="120" y="58">
              Rules & run
            </SvgLabel>
            <line
              x1="152"
              y1="59"
              x2="178"
              y2="59"
              stroke={accent}
              strokeWidth="1.25"
              markerEnd={`url(#${mid})`}
            />
            <rect x="180" y="44" width="46" height="30" rx="4" stroke={inkM} strokeWidth="1.05" />
            <SvgLabel x="203" y="62">
              Outcome
            </SvgLabel>
            <path
              d="M 203 78 C 203 98, 120 108, 37 98"
              stroke={inkM}
              strokeWidth="1"
              strokeDasharray="3 3"
              fill="none"
            />
            <SvgLabel x="120" y="122">
              Continuous loop
            </SvgLabel>
          </>
        )}

        {type === "trust" && (
          <>
            <rect x="16" y="52" width="48" height="34" rx="4" stroke={inkM} strokeWidth="1.05" />
            <SvgLabel x="40" y="72">
              Business
            </SvgLabel>
            <line
              x1="64"
              y1="69"
              x2="94"
              y2="69"
              stroke={accent}
              strokeWidth="1.2"
              markerEnd={`url(#${mid})`}
            />
            <SvgLabel x="78" y="62">
              attest
            </SvgLabel>
            <path
              d="M 120 28 L 144 40 V 72 C 144 88 120 98 120 98 C 120 98 96 88 96 72 V 40 Z"
              stroke={accent}
              strokeWidth="1.3"
              fill={accentSoft}
            />
            <path
              d="M 110 62 L 116 70 L 130 54"
              stroke={accent}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <SvgLabel x="120" y="112">
              Verified core
            </SvgLabel>
            <line
              x1="146"
              y1="69"
              x2="174"
              y2="69"
              stroke={accent}
              strokeWidth="1.2"
              markerEnd={`url(#${mid})`}
            />
            <SvgLabel x="160" y="62">
              share
            </SvgLabel>
            <rect x="176" y="52" width="48" height="34" rx="4" stroke={inkM} strokeWidth="1.05" />
            <SvgLabel x="200" y="72">
              Professional
            </SvgLabel>
          </>
        )}

        {type === "infrastructure" && (
          <>
            <rect
              x="36"
              y="96"
              width="168"
              height="22"
              rx="3"
              stroke={accent}
              strokeWidth="1.15"
              fill="rgba(255,59,31,0.06)"
            />
            <SvgLabel x="120" y="110">
              Data & integrations
            </SvgLabel>
            <line x1="120" y1="96" x2="120" y2="84" stroke={accent} strokeWidth="1.2" markerEnd={`url(#${mid})`} />
            <rect x="44" y="62" width="152" height="22" rx="3" stroke={inkM} strokeWidth="1" />
            <SvgLabel x="120" y="76">
              Platform & APIs
            </SvgLabel>
            <line x1="120" y1="62" x2="120" y2="50" stroke={accent} strokeWidth="1.2" markerEnd={`url(#${mid})`} />
            <rect x="52" y="28" width="136" height="22" rx="3" stroke={inkM} strokeWidth="1" />
            <SvgLabel x="120" y="42">
              Apps & workflows
            </SvgLabel>
            <SvgLabel x="120" y="18">
              ↑ stack builds upward
            </SvgLabel>
          </>
        )}

        {type === "saas" && (
          <>
            <rect x="12" y="50" width="42" height="32" rx="4" stroke={inkM} strokeWidth="1.05" />
            <SvgLabel x="33" y="68">
              Intake
            </SvgLabel>
            <line
              x1="54"
              y1="66"
              x2="72"
              y2="66"
              stroke={accent}
              strokeWidth="1.2"
              markerEnd={`url(#${mid})`}
            />
            <rect x="74" y="50" width="42" height="32" rx="4" stroke={inkM} strokeWidth="1.05" />
            <SvgLabel x="95" y="68">
              Process
            </SvgLabel>
            <line
              x1="116"
              y1="66"
              x2="134"
              y2="66"
              stroke={accent}
              strokeWidth="1.2"
              markerEnd={`url(#${mid})`}
            />
            <rect x="136" y="50" width="42" height="32" rx="4" stroke={inkM} strokeWidth="1.05" />
            <SvgLabel x="157" y="68">
              Deliver
            </SvgLabel>
            <line
              x1="178"
              y1="66"
              x2="196"
              y2="66"
              stroke={accent}
              strokeWidth="1.2"
              markerEnd={`url(#${mid})`}
            />
            <rect
              x="198"
              y="46"
              width="34"
              height="40"
              rx="4"
              stroke={accent}
              strokeWidth="1.35"
              fill={accentSoft}
            />
            <SvgLabel x="215" y="68">
              Live
            </SvgLabel>
            <SvgLabel x="120" y="100">
              One connected workflow · handoffs are explicit
            </SvgLabel>
          </>
        )}
      </svg>
      {showPanel && (
        <>
          <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-foreground/[0.1]" />
          <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-foreground/[0.1]" />
        </>
      )}
    </div>
  );
}

const archInk = "rgba(10,10,10,0.14)";
const archInkFaint = "rgba(10,10,10,0.08)";
const archAccent = "rgba(255,59,31,0.45)";
const archInkFill = (a: number) => `rgba(10,10,10,${a})`;

/** Portfolio tile wireframes — same metaphors as portfolio section. */
export function PortfolioWireframeSvg({ index }: { index: number }) {
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
      return svg(
        <>
          <rect x="8" y="12" width="224" height="116" rx="3" stroke={archInk} strokeWidth="0.9" />
          <line x1="8" y1="28" x2="232" y2="28" stroke={archInkFaint} strokeWidth="0.75" />
          <circle cx="18" cy="20" r="2" fill={archAccent} opacity="0.9" />
          <circle cx="28" cy="20" r="2" fill={archInkFill(0.12)} />
          <circle cx="38" cy="20" r="2" fill={archInkFill(0.12)} />
          <line x1="180" y1="18" x2="224" y2="18" stroke={archInkFaint} strokeWidth="0.6" />
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
          <line x1="16" y1="84" x2="224" y2="84" stroke={archInkFaint} strokeWidth="0.6" strokeDasharray="3 3" />
          <rect x="16" y="92" width="64" height="28" rx="1" stroke={archInk} strokeWidth="0.75" />
          <rect x="88" y="92" width="64" height="28" rx="1" stroke={archInk} strokeWidth="0.75" />
          <rect x="160" y="92" width="64" height="28" rx="1" stroke={archInk} strokeWidth="0.75" />
          <line x1="120" y1="92" x2="120" y2="120" stroke={archInkFaint} strokeWidth="0.5" />
        </>,
      );
    case 1:
      return svg(
        <>
          <rect x="72" y="10" width="96" height="120" rx="14" stroke={archInk} strokeWidth="0.95" />
          <line x1="108" y1="22" x2="132" y2="22" stroke={archInkFaint} strokeWidth="2" strokeLinecap="round" />
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
      );
    case 2:
      return svg(
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
          <path d="M 101 86 L 127 74 M 137 72 L 163 93" stroke={archInkFaint} strokeWidth="0.6" />
          <path
            d="M 96 91 L 96 108 L 132 108"
            stroke={archAccent}
            strokeWidth="0.55"
            opacity="0.6"
          />
        </>,
      );
    case 3:
      return svg(
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
      );
    case 4:
      return svg(
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
      );
    case 5:
      return svg(
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
      );
    default:
      return null;
  }
}

/** Mirrors services “Engagement flow” as a compact SVG. */
export function ServicesPipelineSvg({ idPrefix = "svc" }: { idPrefix?: string }) {
  const m = `${idPrefix}-arrow`;
  return (
    <svg viewBox="0 0 320 88" fill="none" className="h-full w-full" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id={m} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 6 3, 0 6" fill="rgba(255,59,31,0.65)" />
        </marker>
      </defs>
      <rect x="8" y="22" width="84" height="44" rx="8" stroke="rgba(10,10,10,0.12)" strokeWidth="1" />
      <text x="50" y="40" textAnchor="middle" fill="rgba(10,10,10,0.35)" style={{ fontSize: "7px", fontWeight: 600, letterSpacing: "0.12em" }}>
        INPUT
      </text>
      <text x="50" y="54" textAnchor="middle" fill="rgba(10,10,10,0.75)" style={{ fontSize: "9px", fontWeight: 600 }}>
        Design
      </text>
      <line x1="92" y1="44" x2="118" y2="44" stroke="rgba(255,59,31,0.45)" strokeWidth="1.25" markerEnd={`url(#${m})`} />
      <rect
        x="120"
        y="16"
        width="88"
        height="56"
        rx="10"
        stroke="rgba(255,59,31,0.4)"
        strokeWidth="1.35"
        fill="rgba(255,59,31,0.06)"
      />
      <text x="164" y="36" textAnchor="middle" fill="rgba(255,59,31,0.75)" style={{ fontSize: "7px", fontWeight: 700, letterSpacing: "0.12em" }}>
        CORE
      </text>
      <text x="164" y="52" textAnchor="middle" fill="rgba(10,10,10,0.82)" style={{ fontSize: "10px", fontWeight: 600 }}>
        Engineering
      </text>
      <text x="164" y="64" textAnchor="middle" fill="rgba(10,10,10,0.38)" style={{ fontSize: "6.5px", fontWeight: 500 }}>
        build · ship
      </text>
      <line x1="208" y1="44" x2="234" y2="44" stroke="rgba(255,59,31,0.45)" strokeWidth="1.25" markerEnd={`url(#${m})`} />
      <rect x="236" y="22" width="76" height="44" rx="8" stroke="rgba(10,10,10,0.12)" strokeWidth="1" />
      <text x="274" y="40" textAnchor="middle" fill="rgba(10,10,10,0.35)" style={{ fontSize: "7px", fontWeight: 600, letterSpacing: "0.12em" }}>
        OUTPUT
      </text>
      <text x="274" y="54" textAnchor="middle" fill="rgba(10,10,10,0.75)" style={{ fontSize: "9px", fontWeight: 600 }}>
        UI live
      </text>
    </svg>
  );
}

/** Five-stage process strip — matches “How we work” pipeline. */
export function ProcessPipelineSvg() {
  const steps = ["01", "02", "03", "04", "05"];
  const xs = [32, 88, 144, 200, 256];
  return (
    <svg viewBox="0 0 288 52" fill="none" className="h-full w-full" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <line x1="32" y1="26" x2="256" y2="26" stroke="rgba(10,10,10,0.1)" strokeWidth="1.25" strokeLinecap="round" />
      {steps.map((s, i) => (
        <g key={s}>
          <circle
            cx={xs[i]}
            cy="26"
            r="14"
            stroke={i === 2 ? "rgba(255,59,31,0.45)" : "rgba(10,10,10,0.14)"}
            strokeWidth={i === 2 ? "1.35" : "1"}
            fill={i === 2 ? "rgba(255,59,31,0.07)" : "white"}
          />
          <text
            x={xs[i]}
            y="30"
            textAnchor="middle"
            fill={i === 2 ? "rgba(255,59,31,0.9)" : "rgba(10,10,10,0.45)"}
            style={{ fontSize: "8.5px", fontWeight: 600, fontFamily: "ui-monospace, monospace" }}
          >
            {s}
          </text>
        </g>
      ))}
      <text x="144" y="48" textAnchor="middle" fill="rgba(10,10,10,0.28)" style={{ fontSize: "6.5px", fontWeight: 600, letterSpacing: "0.2em" }}>
        CONSULT → QA → DELIVERY
      </text>
    </svg>
  );
}
