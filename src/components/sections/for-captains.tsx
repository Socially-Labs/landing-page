"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { Insignia } from "@/components/ornaments/insignia";
import { ShipsWheel } from "@/components/ornaments/ships-wheel";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import type { Rank } from "@/lib/sample-data";

/** One entry per handle, clockwise from the top. Figures are samples before launch. */
const helm = [
  {
    label: "Your share",
    value: "80%",
    detail: "Captains keep 80% of the Captain’s share, paid in vault shares at every new high.",
  },
  {
    label: "Captains",
    value: "128",
    detail: "Captains already trading on Socially. Sample figure before launch.",
  },
  {
    label: "Crew",
    value: "5,420",
    detail: "People waiting to join a vault. Sample figure before launch.",
  },
  {
    label: "Volume",
    value: "$24.6M",
    detail: "Traded by Captains so far. Sample figure before launch.",
  },
  {
    label: "Trades",
    value: "48,920",
    detail: "Every trade is public and permanent, the losing ones included.",
  },
  {
    label: "Ranks",
    value: "3",
    detail: "Rise from New Captain to Proven Captain to Admiral on your public record.",
  },
  {
    label: "Crew fee",
    value: "10%",
    detail: "Your Crew pays only on new profit. No profit, no fee.",
  },
  {
    label: "Your tools",
    value: "App, bot, AI",
    detail: "Trade from the app or connect your own tools. Each key has its own limits.",
  },
];

const STEP = 360 / helm.length;
const ranks: Rank[] = ["New Captain", "Proven Captain", "Admiral"];

/** The index of the handle nearest the top for a given wheel rotation. */
function topIndex(rotation: number) {
  return (((Math.round(-rotation / STEP) % helm.length) + helm.length) % helm.length) as number;
}

export function ForCaptains() {
  const areaRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  // Scrolling through the section turns the wheel half a turn each way around centre.
  const { scrollYProgress } = useScroll({ target: areaRef, offset: ["start end", "end start"] });
  const scrollTurn = useSpring(useTransform(scrollYProgress, [0, 1], [-180, 180]), {
    stiffness: 70,
    damping: 22,
  });
  const still = useMotionValue(0);
  // Steering by click adds to the scroll turn and settles on its own spring.
  const steering = useSpring(0, { stiffness: 55, damping: 16 });
  const rotate = useTransform(
    () => (reduceMotion ? still.get() : scrollTurn.get()) + steering.get(),
  );
  const counter = useTransform(rotate, (r) => -r);

  useMotionValueEvent(rotate, "change", (r) => {
    const index = topIndex(r);
    setActive((current) => (current === index ? current : index));
  });

  const steer = (index: number) => {
    const current = rotate.get();
    const delta = ((((-index * STEP - current) % 360) + 540) % 360) - 180;
    if (reduceMotion) steering.jump(steering.get() + delta);
    else steering.set(steering.get() + delta);
  };

  const item = helm[active];

  return (
    <Section id="captain" tone="pearl" className="overflow-hidden py-24 md:py-28">
      <Container>
        <div
          ref={areaRef}
          className="grid items-center gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12"
        >
          <div className="flex flex-col gap-9">
            <SectionHeading
              eyebrow="For traders"
              title={
                <>
                  Take the <em>helm.</em>
                </>
              }
              lede="Trade for a Crew and earn every time your vault reaches a new high. Turn the wheel to see what comes with it."
            />

            <Reveal className="flex flex-col gap-4 rounded-card bg-white p-6 ring-1 ring-line">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-brass-deep">{item.label}</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous"
                    onClick={() => steer((active - 1 + helm.length) % helm.length)}
                    className="grid size-9 place-items-center rounded-full text-ink-soft ring-1 ring-line hover:text-ink hover:ring-brass/50"
                  >
                    <ChevronLeft aria-hidden className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next"
                    onClick={() => steer((active + 1) % helm.length)}
                    className="grid size-9 place-items-center rounded-full text-ink-soft ring-1 ring-line hover:text-ink hover:ring-brass/50"
                  >
                    <ChevronRight aria-hidden className="size-4" />
                  </button>
                </div>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  aria-live="polite"
                  className="min-h-[3.25rem] text-[0.9375rem]/relaxed text-ink-soft"
                >
                  {item.detail}
                </motion.p>
              </AnimatePresence>
            </Reveal>

            <Reveal className="flex flex-col gap-3">
              <span className="eyebrow text-muted">Rise through the ranks</span>
              <ol className="flex flex-wrap items-center gap-2">
                {ranks.map((rank, index) => (
                  <li key={rank} className="flex items-center gap-2">
                    <span className="flex items-center gap-2 rounded-full bg-white py-1 pr-3.5 pl-1 text-sm text-ink ring-1 ring-line">
                      <Insignia rank={rank} className="size-6.5 text-[0.65rem]" />
                      {rank}
                    </span>
                    {index < ranks.length - 1 && (
                      <ArrowRight aria-hidden className="size-3.5 text-brass" />
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="#join" size="md">
                Apply to captain
              </ButtonLink>
              <span className="text-sm text-ink-soft">
                We review every application before a vault opens.
              </span>
            </Reveal>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="relative my-[calc(var(--wheel)*0.07)] size-(--wheel) [--wheel:16rem] sm:[--wheel:24rem] lg:[--wheel:22rem] xl:[--wheel:27rem]">
              <motion.div style={{ rotate }} className="absolute inset-0">
                <ShipsWheel className="absolute inset-0 size-full" />
                {helm.map((entry, index) => (
                  <div
                    key={entry.label}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${index * STEP}deg) translateY(calc(var(--wheel) * -0.535)) rotate(${-index * STEP}deg)`,
                    }}
                  >
                    <motion.button
                      type="button"
                      style={{ rotate: counter }}
                      onClick={() => steer(index)}
                      aria-pressed={active === index}
                      className={cn(
                        "-translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[0.6875rem] font-semibold whitespace-nowrap ring-1 transition-colors sm:px-3 sm:py-1.5 sm:text-[0.8125rem]",
                        active === index
                          ? "bg-white text-brass-deep shadow-soft ring-brass"
                          : "bg-white/80 text-muted ring-line hover:text-ink",
                      )}
                    >
                      {entry.label}
                    </motion.button>
                  </div>
                ))}
              </motion.div>

              <div className="pointer-events-none absolute top-1/2 left-1/2 flex size-[calc(var(--wheel)*0.29)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <span
                      className={cn(
                        "font-display leading-none text-ink",
                        item.value.length > 7
                          ? "text-[calc(var(--wheel)*0.05)]"
                          : "text-[calc(var(--wheel)*0.085)]",
                      )}
                    >
                      {item.value}
                    </span>
                    <span className="text-[calc(var(--wheel)*0.028)] font-semibold tracking-[0.12em] text-brass-deep uppercase">
                      {item.label}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <p className="text-xs text-muted">Scroll, or tap a handle, to turn the wheel.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
