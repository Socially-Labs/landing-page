"use client";

import { BellRing } from "lucide-react";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  Whale,
  WHALE_FIN_PIVOT,
  WHALE_FLUKE_PIVOT,
  WHALE_NOSE,
  WHALE_TAIL,
} from "@/components/ornaments/whale";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { captains, type Captain } from "@/lib/sample-data";

/* ---------- Sample whale moves, in the order the whales bring them in ---------- */

type Move = { captain: Captain; verb: string; amount: string; rest: string };

const byId = Object.fromEntries(captains.map((c) => [c.id, c])) as Record<string, Captain>;

const MOVES: Move[] = [
  { captain: byId.northstar, verb: "added", amount: "$220K", rest: "of BTC" },
  { captain: byId.solstice, verb: "took profit on", amount: "$310K", rest: "of JUP" },
  { captain: byId.atlas, verb: "moved", amount: "$95K", rest: "into SOL" },
  { captain: byId.bluewater, verb: "bought", amount: "$120K", rest: "of JTO" },
  { captain: byId.tide, verb: "moved", amount: "$150K", rest: "into USDC" },
];

/** The nth move to land. Keys stay unique, so a repeat enters as a new card. */
type Entry = { key: number; move: Move };
const entry = (n: number): Entry => ({ key: n, move: MOVES[n % MOVES.length] });
const FIRST_FEED = [entry(2), entry(1), entry(0)];
const WHEN = ["Just now", "4 min ago", "9 min ago"];

/* ---------- The sea ---------- */

/** Mean height of the near waterline, as a fraction of the stage height from the top */
const SEA_LEVEL = 0.76;

/** The near waterline, as a fraction of the stage height, at a fraction `u` across. */
function waterline(u: number) {
  return (
    SEA_LEVEL +
    0.012 * Math.sin(2 * Math.PI * (1.3 * u + 0.15)) +
    0.006 * Math.sin(2 * Math.PI * (3.1 * u + 0.6))
  );
}

/** `waterline` traced on a 1000 × 100 box */
const FRONT_EDGE =
  "M0 76.6 C8.3 76.6 33.3 76.5 50 76.6 C66.7 76.6 83.3 76.7 100 76.9 C116.7 77 133.3 77.2 150 77.2 C166.7 77.3 183.3 77.3 200 77.2 C216.7 77.1 233.3 76.9 250 76.6 C266.7 76.3 283.3 75.9 300 75.6 C316.7 75.3 333.3 74.9 350 74.7 C366.7 74.5 383.3 74.4 400 74.4 C416.7 74.5 433.3 74.6 450 74.8 C466.7 74.9 483.3 75.2 500 75.3 C516.7 75.5 533.3 75.6 550 75.7 C566.7 75.7 583.3 75.7 600 75.6 C616.7 75.6 633.3 75.5 650 75.6 C666.7 75.6 683.3 75.7 700 75.8 C716.7 76 733.3 76.3 750 76.6 C766.7 76.8 783.3 77.2 800 77.4 C816.7 77.6 833.3 77.8 850 77.8 C866.7 77.8 883.3 77.7 900 77.5 C916.7 77.3 933.3 76.9 950 76.6 C966.7 76.3 991.7 75.9 1000 75.8";

/** Engraved wave marks in the near water, chart style: [x, y] on a 1440 × 80 box */
const MARKS = [
  [96, 22],
  [262, 52],
  [418, 18],
  [560, 44],
  [742, 26],
  [880, 58],
  [1030, 20],
  [1186, 46],
  [1338, 24],
];

/** Far and middle swells, behind the whale. Each darkens a touch toward its crest. */
function BackSea({ id }: { id: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      className="absolute inset-0 size-full"
    >
      <defs>
        <linearGradient
          id={`${id}-far`}
          x1="0"
          y1="58"
          x2="0"
          y2="72"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d3e3f2" />
          <stop offset="1" stopColor="#dde8f4" />
        </linearGradient>
        <linearGradient
          id={`${id}-mid`}
          x1="0"
          y1="66"
          x2="0"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#dfe9f4" />
          <stop offset="1" stopColor="#e8f0f8" />
        </linearGradient>
      </defs>
      <path
        d="M0 62 C120 58 250 65.5 390 61.5 C530 57.5 650 66 790 61 C880 58 950 61.5 1000 60.5 L1000 100 L0 100 Z"
        fill={`url(#${id}-far)`}
      />
      <path
        d="M0 69.5 C150 65.5 290 73 440 69 C590 65 710 73 860 68.8 C930 67 975 69 1000 68.5 L1000 100 L0 100 Z"
        fill={`url(#${id}-mid)`}
      />
    </svg>
  );
}

/** The near water the whale breaks out of, with a white glint on its edge */
function FrontSea({ id }: { id: string }) {
  return (
    <>
      <svg
        aria-hidden
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
      >
        <defs>
          <linearGradient
            id={`${id}-near`}
            x1="0"
            y1="74"
            x2="0"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#edf3f9" />
            <stop offset="1" stopColor="#f2f6fb" />
          </linearGradient>
        </defs>
        <path d={`${FRONT_EDGE} L1000 100 L0 100 Z`} fill={`url(#${id}-near)`} />
        <path
          d={FRONT_EDGE}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-x-0 bottom-0 h-[19%] w-full"
      >
        <g fill="none" stroke="#b6cadd" strokeWidth="1" strokeLinecap="round">
          {MARKS.map(([x, y]) => (
            <path key={x} d={`M${x} ${y} c5 -3.5 10 -3.5 15 0 c5 3.5 10 3.5 15 0`} />
          ))}
        </g>
      </svg>
    </>
  );
}

/* ---------- The leap ---------- */

const LEAP_SECONDS = 3.8;
const PAUSE_MS = 2400;
const FIRST_LEAP_MS = 600;
/** Where successive leaps are centred, as a fraction of the stage width */
const CENTRES = [0.5, 0.53, 0.47, 0.51];
/** Apex of the whale's centre, as a fraction of the stage height from the top */
const APEX = 0.27;
const EASE = [0.2, 0.9, 0.25, 1] as const;

type Leap = { dir: 1 | -1; centre: number };
type Size = { width: number; height: number };

function whaleWidth(stageWidth: number) {
  return Math.min(340, Math.max(110, stageWidth * 0.22));
}

/**
 * Where the whale's centre is at progress `p` through a leap, and its heading. The centre
 * follows a parabola that starts and ends far enough under the waterline to hide the whole
 * whale, so it rises out of the sea and dives back in; the heading follows the curve.
 */
function pose(p: number, leap: Leap, { width, height }: Size) {
  const size = whaleWidth(width);
  const span = Math.min(900, Math.max(230, width * 0.6));
  const start = leap.centre * width - (leap.dir * span) / 2;
  const depth = height * SEA_LEVEL + size * 0.62;
  const lift = depth - height * APEX;
  const x = start + leap.dir * span * p;
  const y = depth - lift * 4 * p * (1 - p);
  const slope = -lift * 4 * (1 - 2 * p);
  const angle = Math.atan2(leap.dir * slope, span);
  return { x, y, angle, size, span, start, depth, lift };
}

/** A point on the whale's long axis, `offset` pixels ahead of its centre. */
function along(x: number, y: number, angle: number, offset: number) {
  return { x: x + offset * Math.cos(angle), y: y + offset * Math.sin(angle) };
}

/* ---------- Splashes ---------- */

type SplashSpec = {
  id: number;
  kind: "burst" | "ripple";
  x: number;
  y: number;
  scale: number;
  dir: 1 | -1;
};

/** Droplets thrown up by a burst: drift (forward is positive), height, radius, seconds */
const DROPS = [
  [-34, 28, 2.3, 0.9],
  [-20, 50, 1.8, 1.05],
  [-8, 70, 2.8, 1.2],
  [3, 58, 1.6, 1.1],
  [12, 66, 2.2, 1.15],
  [24, 44, 2.5, 1],
  [38, 24, 1.8, 0.85],
  [-46, 14, 1.5, 0.75],
  [48, 12, 1.4, 0.7],
] as const;

function Splash({ kind, x, y, scale, dir }: Omit<SplashSpec, "id">) {
  const rings = kind === "burst" ? [0, 0.18, 0.38] : [0, 0.22];
  const reach = kind === "burst" ? 1 : 0.62;

  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{ transform: `translate(${x}px, ${y}px) scale(${scale})` }}
    >
      <svg
        viewBox="-100 -80 200 110"
        overflow="visible"
        className="absolute -top-20 -left-25 h-27.5 w-50"
      >
        {kind === "burst" && (
          <motion.ellipse
            rx="24"
            ry="3.6"
            fill="#ffffff"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.95, 0], scale: [0.4, 1.1, 1.35] }}
            transition={{ duration: 1.2, times: [0, 0.2, 1], ease: "easeOut" }}
          />
        )}
        {rings.map((delay) => (
          <motion.ellipse
            key={delay}
            rx={66 * reach}
            ry={8 * reach}
            fill="none"
            stroke="#88a3be"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0, scale: 0.12 }}
            animate={{ opacity: [0, 0.75, 0], scale: 1 }}
            transition={{
              duration: 1.9,
              delay,
              ease: [0.15, 0.6, 0.3, 1],
              opacity: { duration: 1.9, delay, times: [0, 0.12, 1] },
            }}
          />
        ))}
        {kind === "burst" &&
          DROPS.map(([drift, height, r, seconds]) => (
            <motion.circle
              key={drift}
              r={r}
              fill="#8faac6"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: drift * dir, y: [0, -height, 6], opacity: [0, 1, 1, 0] }}
              transition={{
                x: { duration: seconds, ease: "linear" },
                y: { duration: seconds, times: [0, 0.45, 1], ease: ["easeOut", "easeIn"] },
                opacity: { duration: seconds, times: [0, 0.08, 0.8, 1] },
              }}
            />
          ))}
      </svg>
    </div>
  );
}

/** Rings left on the water where the whale broke out: the still version of a splash */
function StillRipples() {
  return (
    <svg
      viewBox="-100 -20 200 40"
      overflow="visible"
      className="absolute -top-5 -left-25 h-10 w-50"
    >
      <g fill="none" stroke="#88a3be" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <ellipse rx="22" ry="2.8" strokeOpacity="0.6" />
        <ellipse rx="42" ry="5.2" strokeOpacity="0.4" />
        <ellipse rx="64" ry="7.8" strokeOpacity="0.22" />
      </g>
    </svg>
  );
}

/* ---------- The section ---------- */

export function WhaleWatch() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.45 });
  const finRef = useRef<SVGGElement>(null);
  const flukesRef = useRef<SVGGElement>(null);
  const leapCount = useRef(0);
  const landed = useRef(2);
  const splashCount = useRef(0);
  const [feed, setFeed] = useState(FIRST_FEED);
  const [splashes, setSplashes] = useState<SplashSpec[]>([]);
  const baseId = useId().replace(/:/g, "");
  const listId = `${baseId}-moves`;

  // The whale is placed frame by frame through motion values, so React never re-renders it.
  const whaleX = useMotionValue(0);
  const whaleY = useMotionValue(0);
  const heading = useMotionValue(0);
  const whaleSize = useMotionValue(0);
  const whaleHeight = useTransform(whaleSize, (s) => s / 2);
  const facing = useMotionValue(1);
  const shown = useMotionValue(0);
  const rippleX = useMotionValue(0);
  const rippleY = useMotionValue(0);
  const rippleScale = useMotionValue(1);
  const rippleShown = useMotionValue(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let size: Size = { width: stage.clientWidth, height: stage.clientHeight };
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controls: ReturnType<typeof animate> | undefined;

    const sea = (x: number) => size.height * waterline(x / size.width);

    const place = (p: number, leap: Leap) => {
      const at = pose(p, leap, size);
      whaleSize.set(at.size);
      whaleX.set(at.x - at.size / 2);
      whaleY.set(at.y - at.size / 4);
      heading.set((at.angle * 180) / Math.PI);
      facing.set(leap.dir);
      // The fin opens like a wing at the top of the arc; the flukes lift as it dives.
      const fin = -15 * Math.sin(Math.PI * p);
      const flukes = 6 * (2 * p - 1) - 3 * Math.sin(Math.PI * p);
      finRef.current?.setAttribute(
        "transform",
        `rotate(${fin.toFixed(2)} ${WHALE_FIN_PIVOT[0]} ${WHALE_FIN_PIVOT[1]})`,
      );
      flukesRef.current?.setAttribute(
        "transform",
        `rotate(${flukes.toFixed(2)} ${WHALE_FLUKE_PIVOT[0]} ${WHALE_FLUKE_PIVOT[1]})`,
      );
      return at;
    };

    const still = () => {
      const leap: Leap = { dir: 1, centre: 0.5 };
      const at = place(0.4, leap);
      // Where the arc broke the surface on the way up
      const breakout = (1 - Math.sqrt(1 - (at.depth - size.height * SEA_LEVEL) / at.lift)) / 2;
      const x = at.start + at.span * breakout;
      rippleX.set(x);
      rippleY.set(sea(x));
      rippleScale.set(at.size / 300);
      rippleShown.set(1);
      shown.set(1);
    };

    const observer = new ResizeObserver(() => {
      size = { width: stage.clientWidth, height: stage.clientHeight };
      if (reduceMotion) still();
    });
    observer.observe(stage);
    const stop = () => {
      cancelled = true;
      clearTimeout(timer);
      controls?.stop();
      observer.disconnect();
      shown.set(0);
    };

    if (reduceMotion) {
      still();
      return () => observer.disconnect();
    }
    rippleShown.set(0);
    if (!inView) return stop;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    const splash = (kind: SplashSpec["kind"], x: number, scale: number, dir: 1 | -1) => {
      const id = ++splashCount.current;
      setSplashes((list) => [...list.slice(-3), { id, kind, x, y: sea(x), scale, dir }]);
    };

    const land = () => {
      const n = ++landed.current;
      setFeed((list) => [entry(n), ...list].slice(0, 3));
    };

    const leapOnce = (leap: Leap) =>
      new Promise<void>((resolve) => {
        let noseUnder = true;
        let tailUnder = true;
        shown.set(1);
        controls = animate(0, 1, {
          duration: LEAP_SECONDS,
          ease: "linear",
          onUpdate: (p) => {
            const at = place(p, leap);
            const scale = at.size / 300;
            const nose = along(at.x, at.y, at.angle, leap.dir * WHALE_NOSE * at.size);
            const tail = along(at.x, at.y, at.angle, leap.dir * WHALE_TAIL * at.size);
            if (noseUnder && p < 0.5 && nose.y < sea(nose.x)) {
              noseUnder = false;
              splash("burst", nose.x, scale, leap.dir);
            } else if (!noseUnder && p > 0.5 && nose.y > sea(nose.x)) {
              noseUnder = true;
              splash("burst", nose.x, scale, leap.dir);
              land();
            }
            if (tailUnder && p < 0.5 && tail.y < sea(tail.x)) {
              tailUnder = false;
              splash("ripple", tail.x, scale, leap.dir);
            } else if (!tailUnder && p > 0.5 && tail.y > sea(tail.x)) {
              tailUnder = true;
              splash("ripple", tail.x, scale, leap.dir);
            }
          },
          onComplete: () => resolve(),
        });
      });

    (async () => {
      await wait(FIRST_LEAP_MS);
      while (!cancelled) {
        const k = leapCount.current++;
        const leap: Leap = {
          dir: k % 2 === 0 ? 1 : -1,
          centre: CENTRES[k % CENTRES.length],
        };
        await leapOnce(leap);
        if (cancelled) return;
        shown.set(0);
        await wait(PAUSE_MS);
      }
    })();

    return stop;
  }, [
    inView,
    reduceMotion,
    whaleX,
    whaleY,
    heading,
    whaleSize,
    facing,
    shown,
    rippleX,
    rippleY,
    rippleScale,
    rippleShown,
  ]);

  return (
    <Section id="whales" className="relative overflow-hidden pt-24 md:pt-28">
      <Container className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Whale watch"
          title={
            <>
              When the whales move, <em>you see it first.</em>
            </>
          }
          lede="Big trades from top Captains show up in your app the moment they happen."
        />
        <Reveal className="flex-none">
          <ButtonLink href="#join" variant="outline" size="md">
            <BellRing aria-hidden className="size-4" />
            Get whale alerts
          </ButtonLink>
        </Reveal>
      </Container>

      <div
        ref={stageRef}
        aria-hidden
        className="relative mt-6 h-60 overflow-hidden bg-[linear-gradient(180deg,transparent_0%,#f0f5fa_64%)] sm:h-76 md:mt-2 md:h-88 lg:h-100"
      >
        <BackSea id={`${baseId}-sea`} />
        <motion.div
          className="absolute top-0 left-0 will-change-transform"
          style={{
            x: whaleX,
            y: whaleY,
            rotate: heading,
            width: whaleSize,
            height: whaleHeight,
            opacity: shown,
          }}
        >
          <motion.div className="size-full" style={{ scaleX: facing }}>
            <Whale className="size-full" finRef={finRef} flukesRef={flukesRef} />
          </motion.div>
        </motion.div>
        <FrontSea id={`${baseId}-sea`} />
        <motion.div
          className="pointer-events-none absolute top-0 left-0"
          style={{ x: rippleX, y: rippleY, scale: rippleScale, opacity: rippleShown }}
        >
          <StillRipples />
        </motion.div>
        {splashes.map(({ id, ...splash }) => (
          <Splash key={id} {...splash} />
        ))}
      </div>

      <div className="bg-[linear-gradient(180deg,#f2f6fb_0%,#ffffff_100%)] pb-24 md:pb-28">
        <Container className="flex flex-col gap-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 id={listId} className="eyebrow whitespace-nowrap text-brass-deep">
              Latest whale moves
            </h3>
            <p className="text-xs text-muted">Sample moves, for illustration</p>
          </div>
          <ol aria-labelledby={listId} className="relative grid gap-4 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {feed.map(({ key, move }, index) => (
                <motion.li
                  key={key}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="relative flex items-center gap-4 rounded-card p-4 panel"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-card ring-1 ring-brass/50 transition-opacity duration-700",
                      index === 0 ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <Image
                    src={move.captain.portrait}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 flex-none rounded-full object-cover"
                  />
                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="text-[0.9375rem]/snug text-ink-soft">
                      <span className="font-semibold text-ink">{move.captain.name}</span>{" "}
                      {move.verb}{" "}
                      <span className="font-semibold text-ink tabular-nums">{move.amount}</span>{" "}
                      {move.rest}
                    </p>
                    <p className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
                      {move.captain.style}
                      <span aria-hidden>·</span>
                      <span className={cn(index === 0 && "font-medium text-brass-deep")}>
                        {WHEN[index]}
                      </span>
                    </p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        </Container>
      </div>
    </Section>
  );
}
