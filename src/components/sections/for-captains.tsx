"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ShipsWheel, WheelCompass } from "@/components/ornaments/ships-wheel";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

/** One entry per handle, clockwise from north. Counts are samples before launch. */
const helm = [
  {
    dir: "N",
    label: "Your share",
    value: "80%",
    detail: "Of every fee your Crew pays, 80% is yours, paid in vault shares at each new high.",
  },
  {
    dir: "NE",
    label: "Crew fee",
    value: "10%",
    detail: "Your Crew pays 10% of new profit only. No new high, no fee.",
  },
  {
    dir: "E",
    label: "Your tools",
    value: "App, bot, AI",
    detail: "Trade in the app, or connect a bot or an AI agent. Every key has its own limits.",
  },
  {
    dir: "SE",
    label: "Ranks",
    value: "3",
    detail: "Rise from New Captain to Proven Captain to Admiral as your public record grows.",
  },
  {
    dir: "S",
    label: "Trades",
    value: "48,920",
    detail:
      "Placed by Captains so far. Every one stays public, the losing ones too. Sample figure.",
  },
  {
    dir: "SW",
    label: "Captains",
    value: "128",
    detail: "Captains already trading for a Crew. Sample figure before launch.",
  },
  {
    dir: "W",
    label: "Crew",
    value: "5,420",
    detail: "People waiting to join a vault. Sample figure before launch.",
  },
  {
    dir: "NW",
    label: "Volume",
    value: "$24.6M",
    detail: "Traded by Captains so far. Sample figure before launch.",
  },
];

const STEP = 360 / helm.length;
/** Scroll distance spent on each bearing. */
const STEP_SVH = 55;

const bearing = (index: number) => `${String(index * STEP).padStart(3, "0")}°`;

export function ForCaptains() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  // Each bearing owns an equal slice of the track; the wheel only moves when the slice changes.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(Math.min(helm.length - 1, Math.max(0, Math.floor(progress * helm.length))));
  });

  const turn = useSpring(0, { stiffness: 46, damping: 14 });
  const counter = useTransform(turn, (r) => -r);
  useEffect(() => {
    if (reduceMotion) turn.jump(-active * STEP);
    else turn.set(-active * STEP);
  }, [active, reduceMotion, turn]);

  /** Scrolls to the middle of a bearing's slice, which turns the wheel there. */
  const steer = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const travel = track.offsetHeight - window.innerHeight;
    const start = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: start + ((index + 0.5) / helm.length) * travel,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const item = helm[active];

  return (
    <Section id="captain" tone="pearl">
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${helm.length * STEP_SVH + 100}svh` }}
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          <Container className="grid h-full grid-rows-[auto_minmax(0,1fr)] gap-6 pt-12 md:pt-16 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:grid-rows-1 lg:items-center lg:gap-12 lg:pt-0">
            <div className="flex flex-col gap-5 lg:gap-8">
              <div className="flex flex-col gap-4">
                <SectionHeading
                  eyebrow="For traders"
                  title={
                    <>
                      Take the <em>helm.</em>
                    </>
                  }
                />
                <p className="hidden max-w-[32rem] text-[1.0625rem]/relaxed text-ink-soft lg:block">
                  Trade for a Crew and earn every time your vault reaches a new high. Turn the wheel
                  to see what comes with it.
                </p>
              </div>

              <div className="rounded-card bg-white p-5 shadow-soft ring-1 ring-line lg:p-7">
                <div className="flex items-center justify-between eyebrow">
                  <span className="text-brass-deep">
                    Bearing {item.dir} · {bearing(active)}
                  </span>
                  <span className="text-muted tabular-nums">
                    {String(active + 1).padStart(2, "0")} / {String(helm.length).padStart(2, "0")}
                  </span>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    aria-live="polite"
                  >
                    <p className="mt-4 font-display text-[clamp(2.75rem,5vw,4.25rem)] leading-none text-ink">
                      {item.value}
                    </p>
                    <p className="mt-3 font-semibold text-ink">{item.label}</p>
                    <p className="mt-1.5 min-h-[3.25rem] text-[0.9375rem]/relaxed text-ink-soft">
                      {item.detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-3">
                <div role="group" aria-label="Bearings" className="grid grid-cols-8 gap-1.5">
                  {helm.map((entry, index) => (
                    <button
                      key={entry.dir}
                      type="button"
                      aria-label={`${entry.dir}: ${entry.label}`}
                      aria-pressed={active === index}
                      onClick={() => steer(index)}
                      className={cn(
                        "h-10 rounded-xl text-xs font-semibold tracking-[0.08em] ring-1 transition-colors lg:h-11",
                        active === index
                          ? "bg-white text-brass-deep shadow-soft ring-brass"
                          : "text-muted ring-line hover:text-ink hover:ring-brass/50",
                      )}
                    >
                      {entry.dir}
                    </button>
                  ))}
                </div>
                <p className="hidden text-xs text-muted lg:block">
                  Scroll to turn the wheel, or pick a bearing.
                </p>
              </div>

              <div className="hidden flex-wrap items-center gap-4 lg:flex">
                <ButtonLink href="#join" size="md">
                  Apply to captain
                </ButtonLink>
                <span className="text-sm text-ink-soft">
                  We review every application before a vault opens.
                </span>
              </div>
            </div>

            <div className="relative h-full [--wheel:min(112vw,30rem)] md:[--wheel:32rem] lg:[--wheel:min(calc(100svh_-_10rem),40rem,calc(100vw_-_38rem))]">
              <div className="absolute top-8 left-1/2 size-(--wheel) -translate-x-1/2 md:top-20 lg:top-[calc(50%_+_1.75rem)] lg:-translate-y-1/2">
                <div aria-hidden className="absolute inset-[6%] rounded-full bg-ice" />
                <div className="absolute inset-0 drop-shadow-[0_22px_26px_rgb(24_43_67/0.22)]">
                  <motion.div style={{ rotate: turn }} className="absolute inset-0">
                    <ShipsWheel className="size-full" />
                  </motion.div>
                  <WheelCompass className="absolute inset-0 size-full" />
                </div>

                <motion.div
                  style={{ rotate: turn }}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 hidden md:block"
                >
                  {helm.map((entry, index) => (
                    <div
                      key={entry.dir}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `rotate(${index * STEP}deg) translateY(calc(var(--wheel) * -0.535)) rotate(${-index * STEP}deg)`,
                      }}
                    >
                      <motion.button
                        type="button"
                        tabIndex={-1}
                        style={{ rotate: counter }}
                        onClick={() => steer(index)}
                        className={cn(
                          "pointer-events-auto -translate-x-1/2 -translate-y-1/2 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-semibold whitespace-nowrap ring-1 transition-colors",
                          active === index
                            ? "bg-white text-brass-deep shadow-soft ring-brass"
                            : "bg-white/85 text-muted ring-line hover:text-ink",
                        )}
                      >
                        {entry.label}
                      </motion.button>
                    </div>
                  ))}
                </motion.div>

                <svg
                  viewBox="0 0 22 16"
                  aria-hidden
                  className="absolute -top-5 left-1/2 h-4 w-5.5 -translate-x-1/2 md:-top-[3.75rem]"
                >
                  <path
                    d="M1 1 H21 L11 15 Z"
                    fill="#c9a66b"
                    stroke="#8a6834"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}
