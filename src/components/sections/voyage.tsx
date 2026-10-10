"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

/* ---------- A sample vault: $1,000 over twelve months ---------- */

const VALUES = [1000, 1060, 1120, 1085, 1030, 1100, 1180, 1240, 1165, 1110, 1200, 1290, 1340];
const MONTHS = VALUES.length - 1;
const START = VALUES[0];
const FEE = 0.1;
/** Samples per month, for the last-high line and the shaded dips */
const STEPS = 20;

/* Drawn on a 1000 × 360 box and stretched to fit; dots and labels are placed in percentages. */
const W = 1000;
const H = 360;
const TOP = 56;
const BOTTOM = 316;
const LOW = 960;
const HIGH = 1380;
const STEP_X = W / MONTHS;

const xAt = (month: number) => STEP_X * month;
const yAt = (value: number) => BOTTOM - ((value - LOW) / (HIGH - LOW)) * (BOTTOM - TOP);
const clampMonth = (month: number) => Math.min(Math.max(month, 0), MONTHS);

/** Bezier values for one month of a Catmull-Rom curve through VALUES. */
function segment(i: number) {
  const before = VALUES[Math.max(i - 1, 0)];
  const from = VALUES[i];
  const to = VALUES[i + 1];
  const after = VALUES[Math.min(i + 2, MONTHS)];
  return [from, from + (to - before) / 6, to - (after - from) / 6, to] as const;
}

/** The vault's value at a month, on the same curve the line is drawn with. */
function valueAt(t: number) {
  const month = clampMonth(t);
  const i = Math.min(Math.floor(month), MONTHS - 1);
  const u = month - i;
  const v = 1 - u;
  const [a, b, c, d] = segment(i);
  return v * v * v * a + 3 * v * v * u * b + 3 * v * u * u * c + u * u * u * d;
}

/* Months are evenly spaced, so x moves linearly through each curve and matches xAt. */
const LINE = VALUES.slice(1).reduce(
  (path, _, i) => {
    const [, b, c, d] = segment(i);
    const x = xAt(i);
    return `${path} C${x + STEP_X / 3} ${yAt(b)} ${x + (2 * STEP_X) / 3} ${yAt(c)} ${xAt(i + 1)} ${yAt(d)}`;
  },
  `M0 ${yAt(START)}`,
);
const AREA = `${LINE} L${W} ${H} L0 ${H} Z`;

const SAMPLES = Array.from({ length: MONTHS * STEPS + 1 }, (_, k) => valueAt(k / STEPS));
/** The highest value so far at each sample: the line fees are measured from. */
const HIGHS = SAMPLES.reduce<number[]>(
  (highs, value) => [...highs, Math.max(highs.at(-1) ?? START, value)],
  [],
);
const highAt = (t: number) => Math.max(HIGHS[Math.floor(clampMonth(t) * STEPS)], valueAt(t));
const HIGH_LINE = HIGHS.map((v, k) => `${k ? "L" : "M"}${xAt(k / STEPS)} ${yAt(v)}`).join(" ");

/** Each stretch below the last high: a shaded band, where it starts, and its deepest point. */
const DIPS = (() => {
  const dips: { path: string; from: number; month: number; depth: number }[] = [];
  let start = -1;
  SAMPLES.forEach((value, k) => {
    const below = HIGHS[k] - value > 0.5;
    if (below && start < 0) start = k - 1;
    if ((!below || k === SAMPLES.length - 1) && start >= 0) {
      const ks = Array.from({ length: k - start + 1 }, (_, n) => start + n);
      const top = ks.map((n, i) => `${i ? "L" : "M"}${xAt(n / STEPS)} ${yAt(HIGHS[n])}`);
      const bottom = [...ks].reverse().map((n) => `L${xAt(n / STEPS)} ${yAt(SAMPLES[n])}`);
      const lowest = ks.reduce((a, b) => (SAMPLES[b] < SAMPLES[a] ? b : a));
      dips.push({
        path: `${top.join(" ")} ${bottom.join(" ")} Z`,
        from: start / STEPS,
        month: lowest / STEPS,
        depth: Math.round((SAMPLES[lowest] / HIGHS[lowest] - 1) * 100),
      });
      start = -1;
    }
  });
  return dips;
})();

/** New highs worth marking: the peak before each dip, and where the year ends. */
const PEAKS = [
  ...DIPS.map((dip) => ({ month: dip.from, value: HIGHS[Math.round(dip.from * STEPS)] })),
  { month: MONTHS, value: VALUES[MONTHS] },
];

const usd = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;
const at = (month: number, value: number): CSSProperties => ({
  left: `${(xAt(month) / W) * 100}%`,
  top: `${(yAt(value) / H) * 100}%`,
});

function Readout({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 border-line pl-4 not-first:border-l first:pl-0 max-sm:nth-3:border-l-0 max-sm:nth-3:pl-0">
      <span className="eyebrow text-[0.6875rem] text-muted">{label}</span>
      <span
        className={cn(
          "font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-none tabular-nums",
          accent ? "text-brass-deep" : "text-ink",
        )}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * A year in a sample vault as a clean line chart. The line draws in once, then follows the
 * pointer (or the arrow keys) so any month can be read. Fees only grow above the last high.
 */
export function Voyage() {
  const reduceMotion = useReducedMotion();
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef, { once: true, amount: 0.5 });
  const clipId = `${useId().replace(/[^a-zA-Z0-9_-]/g, "")}-drawn`;

  /** How far the line has drawn, in months */
  const drawn = useMotionValue(0);
  const [drawnTo, setDrawnTo] = useState(0);
  const [inspecting, setInspecting] = useState<number | null>(null);
  useMotionValueEvent(drawn, "change", (value) => setDrawnTo(value));

  useEffect(() => {
    if (reduceMotion) {
      drawn.jump(MONTHS);
      return;
    }
    if (!inView) return;
    const controls = animate(drawn, MONTHS, { duration: 2.4, ease: [0.65, 0, 0.35, 1] });
    return () => controls.stop();
  }, [inView, reduceMotion, drawn]);

  const month = inspecting ?? drawnTo;
  const value = valueAt(month);
  const high = highAt(month);
  const fees = FEE * (high - START);
  const atHigh = value >= high - 0.5;

  const inspect = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    drawn.jump(MONTHS);
    setInspecting(clampMonth(((event.clientX - box.left) / box.width) * MONTHS));
  };

  const step = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowLeft: -0.5,
      ArrowRight: 0.5,
      Home: -MONTHS,
      End: MONTHS,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    drawn.jump(MONTHS);
    setInspecting(clampMonth((inspecting ?? MONTHS) + moves[event.key]));
  };

  return (
    <Section tone="ice" className="border-y border-brass/20 py-24 md:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="A sample year"
          title={
            <>
              Paid only at <em>new highs.</em>
            </>
          }
          lede="Here is a $1,000 vault over twelve months. The fee is taken only when it climbs past its last high. Through the dips, nobody is paid until it’s back above."
        />

        <Reveal className="rounded-panel bg-white p-6 shadow-soft ring-1 ring-line sm:p-9">
          <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
            <Readout label="Month" value={`${Math.round(month * 2) / 2}`} />
            <Readout label="Vault value" value={usd(value)} />
            <Readout label="Last high" value={usd(high)} />
            <Readout label="Fees paid" value={usd(fees)} accent />
          </div>

          <p
            aria-live="polite"
            className={cn(
              "mt-6 flex items-center gap-2 eyebrow text-[0.6875rem] transition-colors duration-300",
              atHigh ? "text-mint" : "text-amber",
            )}
          >
            <span aria-hidden className="size-1.5 rounded-full bg-current" />
            {atHigh
              ? "At its high · 10% of new profit is paid"
              : `Below its high of ${usd(high)} · no fee`}
          </p>

          <div
            ref={chartRef}
            role="slider"
            tabIndex={0}
            aria-label="Month of the sample year"
            aria-valuemin={0}
            aria-valuemax={MONTHS}
            aria-valuenow={Math.round(month * 2) / 2}
            aria-valuetext={`Month ${Math.round(month)}: vault ${usd(value)}, last high ${usd(high)}, fees paid ${usd(fees)}`}
            onPointerMove={inspect}
            onPointerDown={inspect}
            onPointerLeave={() => setInspecting(null)}
            onKeyDown={step}
            onBlur={() => setInspecting(null)}
            className="relative mt-10 h-56 cursor-crosshair touch-pan-y outline-none select-none focus-visible:ring-2 focus-visible:ring-steel focus-visible:ring-offset-8 sm:h-72 lg:h-80"
          >
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              aria-hidden
              className="absolute inset-0 size-full overflow-visible"
            >
              <defs>
                <clipPath id={clipId}>
                  <rect x="-4" y="-20" height={H + 40} width={drawnTo * STEP_X + 8} />
                </clipPath>
                <linearGradient id={`${clipId}-area`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#c9a66b" stopOpacity="0.18" />
                  <stop offset="1" stopColor="#c9a66b" stopOpacity="0" />
                </linearGradient>
              </defs>

              <line
                x1="0"
                x2={W}
                y1={yAt(START)}
                y2={yAt(START)}
                stroke="#182b43"
                strokeOpacity="0.12"
                vectorEffect="non-scaling-stroke"
              />

              <g clipPath={`url(#${clipId})`}>
                <path d={AREA} fill={`url(#${clipId}-area)`} />
                {DIPS.map((dip) => (
                  <path key={dip.from} d={dip.path} fill="#7a5226" fillOpacity="0.07" />
                ))}
                <path
                  d={HIGH_LINE}
                  fill="none"
                  stroke="#182b43"
                  strokeOpacity="0.35"
                  strokeDasharray="3 4"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={LINE}
                  fill="none"
                  stroke="#8a6834"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            </svg>

            <span
              className="absolute right-0 -translate-y-[calc(100%+0.375rem)] text-[0.6875rem] text-muted tabular-nums"
              style={{ top: `${(yAt(START) / H) * 100}%` }}
            >
              $1,000 start
            </span>

            {PEAKS.map((peak) => (
              <div
                key={peak.month}
                aria-hidden
                className={cn(
                  "absolute transition-opacity duration-500",
                  drawnTo >= peak.month - 0.05 ? "opacity-100" : "opacity-0",
                )}
                style={at(peak.month, peak.value)}
              >
                <span className="absolute size-2 -translate-1/2 rounded-full bg-brass-deep ring-2 ring-white" />
                <span
                  className={cn(
                    "absolute bottom-3 hidden flex-col gap-1 whitespace-nowrap sm:flex",
                    peak.month === MONTHS ? "right-0 items-end" : "-translate-x-1/2 items-center",
                  )}
                >
                  <span className="eyebrow text-[0.625rem] text-brass-deep">New high</span>
                  <span className="font-display text-base leading-none text-ink tabular-nums">
                    {usd(peak.value)}
                  </span>
                </span>
              </div>
            ))}

            {DIPS.map((dip) => (
              <span
                key={dip.month}
                aria-hidden
                className={cn(
                  "absolute hidden -translate-x-1/2 translate-y-3 flex-col items-center gap-0.5 whitespace-nowrap transition-opacity duration-500 sm:flex",
                  drawnTo >= dip.month ? "opacity-100" : "opacity-0",
                )}
                style={at(dip.month, valueAt(dip.month))}
              >
                <span className="font-display text-base leading-none text-amber tabular-nums">
                  {dip.depth}%
                </span>
                <span className="eyebrow text-[0.625rem] text-muted">No fee</span>
              </span>
            ))}

            {inspecting !== null && (
              <span
                aria-hidden
                className="absolute inset-y-0 w-px -translate-x-1/2 bg-ink/25"
                style={{ left: `${(xAt(month) / W) * 100}%` }}
              />
            )}
            <span
              aria-hidden
              className={cn(
                "absolute size-3 -translate-1/2 rounded-full bg-white ring-2 transition-opacity",
                atHigh ? "ring-mint" : "ring-amber",
                drawnTo > 0 ? "opacity-100" : "opacity-0",
              )}
              style={at(month, value)}
            />
          </div>

          <div className="mt-4 flex justify-between text-[0.6875rem] text-muted tabular-nums">
            <span>Start</span>
            <span>6 months</span>
            <span>12 months</span>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-3 border-t border-line pt-5 text-xs text-muted sm:flex-row">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-0.5 w-5 bg-brass-deep" />
                Vault value
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="w-5 border-t border-dashed border-ink/50" />
                Last high, where fees are measured from
              </span>
            </div>
            <span>Hover or drag to read any month. Sample figures, not a forecast.</span>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
