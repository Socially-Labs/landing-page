"use client";

import { Flag, Pause, Play, RotateCcw, Sailboat, Waves } from "lucide-react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { type CSSProperties, useCallback, useEffect, useId, useRef, useState } from "react";
import { CompassRose } from "@/components/ornaments/compass-rose";
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
const VOYAGE_SECONDS = 12;
/** Readouts update in twentieths of a month */
const STEPS = 20;

/* The chart is drawn on a 1000 × 380 box, stretched to fit; labels are placed in percentages. */
const W = 1000;
const H = 380;
const LEFT = 40;
const RIGHT = 960;
const TOP = 50;
const BOTTOM = 320;
const LOW = 960;
const HIGH = 1380;
const STEP_X = (RIGHT - LEFT) / MONTHS;

const xAt = (month: number) => LEFT + STEP_X * month;
const yAt = (value: number) => BOTTOM - ((value - LOW) / (HIGH - LOW)) * (BOTTOM - TOP);

/** Bezier values for one month of a Catmull-Rom curve through VALUES. */
function segment(i: number) {
  const before = VALUES[Math.max(i - 1, 0)];
  const from = VALUES[i];
  const to = VALUES[i + 1];
  const after = VALUES[Math.min(i + 2, MONTHS)];
  return [from, from + (to - before) / 6, to - (after - from) / 6, to] as const;
}

/** The vault's value at month `t`, on the same curve the route is drawn with. */
function valueAt(t: number) {
  const month = Math.min(Math.max(t, 0), MONTHS);
  const i = Math.min(Math.floor(month), MONTHS - 1);
  const u = month - i;
  const v = 1 - u;
  const [a, b, c, d] = segment(i);
  return v * v * v * a + 3 * v * v * u * b + 3 * v * u * u * c + u * u * u * d;
}

/* Months are evenly spaced, so x moves linearly through each curve and matches xAt. */
const ROUTE = VALUES.slice(1).reduce(
  (path, _, i) => {
    const [, b, c, d] = segment(i);
    const x = xAt(i);
    return `${path} C${x + STEP_X / 3} ${yAt(b)} ${x + (2 * STEP_X) / 3} ${yAt(c)} ${xAt(i + 1)} ${yAt(d)}`;
  },
  `M${xAt(0)} ${yAt(START)}`,
);

/** The highest value so far, sampled along the curve: the line fees are measured from. */
const HIGHS = Array.from({ length: MONTHS * STEPS + 1 }, (_, k) => valueAt(k / STEPS)).map(
  (_, k, all) => Math.max(START, ...all.slice(0, k + 1)),
);
const highAt = (t: number) =>
  Math.max(HIGHS[Math.floor(Math.min(Math.max(t, 0), MONTHS) * STEPS)], valueAt(t));
const HIGH_LINE = HIGHS.map((value, k) => `${k ? "L" : "M"}${xAt(k / STEPS)} ${yAt(value)}`).join(
  " ",
);

const MARKS = [
  { month: 2, kind: "high", label: "New high · $1,120" },
  { month: 4, kind: "storm", label: "Storm · −8%" },
  { month: 7, kind: "high", label: "New high · $1,240" },
  { month: 9, kind: "storm", label: "Storm · −10%" },
  { month: 12, kind: "high", label: "New high · $1,340" },
] as const;

const WAVES = [
  [120, 352],
  [300, 364],
  [470, 348],
  [650, 360],
  [820, 350],
  [210, 30],
  [560, 22],
];

const usd = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;
const at = (x: number, y: number): CSSProperties => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
});

function Readout({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="eyebrow text-[0.6875rem] text-muted">{label}</span>
      <span className={cn("font-display text-[1.625rem] leading-none tabular-nums", tone)}>
        {value}
      </span>
    </div>
  );
}

/**
 * A year in a sample vault, drawn as a voyage on a sea chart. The ship sails the vault's value;
 * fees grow only while it's above its last high. Plays once in view; can be scrubbed.
 */
export function Voyage() {
  const reduceMotion = useReducedMotion();
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef, { once: true, amount: 0.5 });
  const voyage = useRef<ReturnType<typeof animate> | null>(null);
  const clipId = `${useId().replace(/[^a-zA-Z0-9_-]/g, "")}-sailed`;

  const month = useMotionValue(0);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  useMotionValueEvent(month, "change", (value) => setT(Math.round(value * STEPS) / STEPS));
  useMotionValueEvent(month, "animationStart", () => setPlaying(true));
  useMotionValueEvent(month, "animationComplete", () => setPlaying(false));
  useMotionValueEvent(month, "animationCancel", () => setPlaying(false));

  const sailedWidth = useTransform(month, (m) => xAt(m));
  const shipLeft = useTransform(month, (m) => `${(xAt(m) / W) * 100}%`);
  const shipTop = useTransform(month, (m) => `${(yAt(valueAt(m)) / H) * 100}%`);

  const play = useCallback(() => {
    const from = month.get() >= MONTHS ? 0 : month.get();
    month.set(from);
    voyage.current?.stop();
    voyage.current = animate(month, MONTHS, {
      duration: ((MONTHS - from) / MONTHS) * VOYAGE_SECONDS,
      ease: "linear",
    });
  }, [month]);

  const pause = () => {
    voyage.current?.stop();
    setPlaying(false);
  };

  useEffect(() => {
    if (reduceMotion) month.set(MONTHS);
    else if (inView) play();
    return () => voyage.current?.stop();
  }, [inView, reduceMotion, month, play]);

  const value = valueAt(t);
  const high = highAt(t);
  const fees = FEE * (high - START);
  const atHigh = value >= high - 0.5 && t > 0;
  const done = t >= MONTHS;

  return (
    <Section tone="ice" className="border-y border-brass/20 py-24 md:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="A sample voyage"
          title={
            <>
              Paid only at <em>new highs.</em>
            </>
          }
          lede="Follow a $1,000 vault for a year. The fee is taken only when the vault sails past its last high. Through storms, nobody is paid until it’s back above."
        />

        <Reveal className="relative overflow-hidden rounded-panel bg-[#fdfbf6] p-5 shadow-soft frame-brass sm:p-8">
          <CompassRose className="pointer-events-none absolute -top-16 -right-16 size-64 text-brass/20" />

          <div className="relative grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            <Readout label="Month" value={`${Math.floor(t)} / ${MONTHS}`} tone="text-ink" />
            <Readout label="Vault value" value={usd(value)} tone="text-ink" />
            <Readout label="Last high" value={usd(high)} tone="text-ink" />
            <Readout label="Fees paid" value={usd(fees)} tone="text-brass-deep" />
          </div>

          <p
            aria-live="polite"
            className={cn(
              "relative mt-5 inline-flex rounded-full px-3 py-1 text-sm font-medium transition-colors duration-300",
              t === 0
                ? "bg-white text-muted ring-1 ring-line"
                : atHigh
                  ? "bg-mint-tint text-mint"
                  : "bg-amber-tint text-amber",
            )}
          >
            {t === 0
              ? "Setting sail with $1,000"
              : atHigh
                ? "Above its last high: 10% of the new profit is paid"
                : `Below its last high of ${usd(high)}: no fee`}
          </p>

          <div ref={chartRef} className="relative mt-6 h-60 sm:h-80 lg:h-96">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              aria-hidden
              className="absolute inset-0 size-full"
            >
              <defs>
                <clipPath id={clipId}>
                  <motion.rect x="0" y="0" height={H} width={sailedWidth} />
                </clipPath>
              </defs>
              <g fill="none" stroke="#b6cadd" strokeLinecap="round">
                {WAVES.map(([x, y]) => (
                  <path
                    key={`${x}-${y}`}
                    d={`M${x} ${y} c5 -3.5 10 -3.5 15 0 c5 3.5 10 3.5 15 0`}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>
              <line
                x1={LEFT}
                x2={RIGHT}
                y1={yAt(START)}
                y2={yAt(START)}
                stroke="#8a6834"
                strokeOpacity="0.4"
                strokeDasharray="2 6"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={ROUTE}
                fill="none"
                stroke="#182b43"
                strokeOpacity="0.18"
                strokeWidth="2"
                strokeDasharray="1 7"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <g clipPath={`url(#${clipId})`}>
                <path
                  d={HIGH_LINE}
                  fill="none"
                  stroke="#16805e"
                  strokeOpacity="0.6"
                  strokeWidth="1.25"
                  strokeDasharray="5 5"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={ROUTE}
                  fill="none"
                  stroke="#8a6834"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            </svg>

            <span
              className="absolute translate-y-1.5 text-xs text-muted"
              style={at(LEFT, yAt(START))}
            >
              <span className="sm:hidden">$1,000</span>
              <span className="hidden sm:inline">Set sail · $1,000</span>
            </span>

            {MARKS.map((mark) => {
              const reached = t >= mark.month;
              const isHigh = mark.kind === "high";
              return (
                <div
                  key={mark.month}
                  className={cn(
                    "absolute flex flex-col items-center gap-1 transition-opacity duration-500",
                    // The last flag sits at the right edge, so its label leans left
                    mark.month === MONTHS ? "-translate-x-[85%] items-end" : "-translate-x-1/2",
                    isHigh ? "-translate-y-[calc(100%+0.75rem)]" : "translate-y-3",
                    reached ? "opacity-100" : "opacity-0",
                  )}
                  style={at(xAt(mark.month), yAt(VALUES[mark.month]))}
                >
                  {isHigh ? (
                    <>
                      <span className="hidden rounded-full bg-white px-2 py-0.5 text-[0.6875rem] font-semibold whitespace-nowrap text-mint ring-1 ring-mint/30 sm:block">
                        {mark.label}
                      </span>
                      <Flag aria-hidden className="size-4 text-brass-deep" />
                    </>
                  ) : (
                    <>
                      <Waves aria-hidden className="size-4 text-steel" />
                      <span className="hidden rounded-full bg-white px-2 py-0.5 text-[0.6875rem] font-semibold whitespace-nowrap text-amber ring-1 ring-amber/30 sm:block">
                        {mark.label}
                      </span>
                    </>
                  )}
                </div>
              );
            })}

            <motion.div
              aria-hidden
              className="absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brass-deep shadow-[0_4px_12px_rgb(138_104_52/0.3)] ring-2 ring-brass"
              style={{ left: shipLeft, top: shipTop }}
            >
              <Sailboat className="size-5" strokeWidth={1.75} />
            </motion.div>
          </div>

          <div className="relative mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={playing ? pause : play}
              aria-label={
                playing ? "Pause the voyage" : done ? "Replay the voyage" : "Play the voyage"
              }
              className="grid size-11 flex-none place-items-center rounded-full bg-white text-brass-deep ring-1 ring-brass/50 transition-colors hover:ring-brass"
            >
              {playing ? (
                <Pause aria-hidden className="size-4" />
              ) : done ? (
                <RotateCcw aria-hidden className="size-4" />
              ) : (
                <Play aria-hidden className="size-4" />
              )}
            </button>
            <label htmlFor={`${clipId}-month`} className="sr-only">
              Month of the voyage
            </label>
            <input
              id={`${clipId}-month`}
              type="range"
              min={0}
              max={MONTHS * STEPS}
              step={1}
              value={Math.round(t * STEPS)}
              aria-valuetext={`Month ${Math.floor(t)}: vault ${usd(value)}, fees paid ${usd(fees)}`}
              onChange={(event) => {
                pause();
                month.set(Number(event.target.value) / STEPS);
              }}
              style={{ "--fill": `${(t / MONTHS) * 100}%` } as CSSProperties}
              className="range-brass"
            />
          </div>

          <div className="relative mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-0.5 w-5 rounded-full bg-brass-deep" />
              Vault value
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="w-5 border-t border-dashed border-mint" />
              Last high: fees are measured from here
            </span>
            <span>Sample figures before fees, not a forecast.</span>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
