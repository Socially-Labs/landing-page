"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ShipsWheel, WheelCompass } from "@/components/ornaments/ships-wheel";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

/** One entry per handle, clockwise from north: what a Captain gets and agrees to. */
const helm = [
  {
    label: "Your share",
    value: "80%",
    detail: "Of every fee your Crew pays, you keep 80%. Socially keeps the other 20%.",
  },
  {
    label: "Crew fee",
    value: "10%",
    detail: "Your Crew pays 10% of new profit only. No new high, no fee.",
  },
  {
    label: "Paid in",
    value: "Vault shares",
    detail: "Your fee is paid in shares of your own vault, so you rise and fall with your Crew.",
  },
  {
    label: "Track record",
    value: "Public",
    detail: "Every trade you make is logged for anyone to see. Your record is your reputation.",
  },
  {
    label: "Risk limits",
    value: "Built in",
    detail:
      "If your vault falls too far, new risky trades pause. It protects your Crew and your record.",
  },
  {
    label: "Ranks",
    value: "3",
    detail: "Rise from New Captain to Proven Captain to Admiral as your public record grows.",
  },
  {
    label: "Your tools",
    value: "App, bot, AI",
    detail: "Trade in the app, or connect a bot or an AI agent. Every key has its own limits.",
  },
  {
    label: "Review",
    value: "Vetted",
    detail: "We review every application before your vault opens to Crew.",
  },
];

const STEP = 360 / helm.length;
/** Time on each bearing before the wheel turns to the next */
const TURN_MS = 4200;

/**
 * The helm turns itself, one handle at a time, while it's on screen. The bearing under the
 * pointer is named above the wheel; its figure and meaning sit beside it.
 */
export function ForCaptains() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [turns, setTurns] = useState(0);
  const item = helm[turns % helm.length];

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timer = setTimeout(() => setTurns((count) => count + 1), TURN_MS);
    return () => clearTimeout(timer);
  }, [turns, inView, reduceMotion]);

  // Always turning the same way, so the wheel never spins back past the handles.
  const turn = useSpring(0, { stiffness: 38, damping: 13, mass: 1.1 });
  useEffect(() => {
    if (reduceMotion) turn.jump(-turns * STEP);
    else turn.set(-turns * STEP);
  }, [turns, reduceMotion, turn]);

  const swap = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
    transition: { duration: 0.35, ease: "easeOut" as const },
  };

  return (
    <Section id="captain" className="overflow-hidden py-24 md:py-28">
      <Container>
        <div
          ref={sectionRef}
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_auto] lg:gap-x-12"
        >
          <SectionHeading
            className="lg:col-start-1 lg:row-start-1 lg:self-end"
            eyebrow="For traders"
            title={
              <>
                Take the <em>helm.</em>
              </>
            }
            lede="Trade for a Crew and earn every time your vault reaches a new high."
          />
          <div className="flex flex-col items-center gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="flex h-12 items-end">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={item.label}
                  {...swap}
                  className="font-display text-[clamp(1.75rem,2.6vw,2.25rem)] leading-none text-brass-deep"
                >
                  {item.label}
                </motion.p>
              </AnimatePresence>
            </div>
            <svg viewBox="0 0 22 16" aria-hidden className="h-4 w-5.5">
              <path
                d="M1 1 H21 L11 15 Z"
                fill="#c9a66b"
                stroke="#8a6834"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>

            <div
              aria-hidden
              className="relative size-(--wheel) rounded-full [--wheel:min(88vw,30rem)] lg:[--wheel:min(38rem,44vw)]"
            >
              <span aria-hidden className="absolute inset-[6%] rounded-full bg-ice" />
              <span className="absolute inset-0 drop-shadow-[0_22px_26px_rgb(24_43_67/0.22)]">
                <motion.span style={{ rotate: turn }} className="absolute inset-0">
                  <ShipsWheel className="size-full" />
                </motion.span>
                <WheelCompass className="absolute inset-0 size-full" />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:col-start-1 lg:row-start-2 lg:self-start">
            <div aria-live="polite" className="min-h-44 border-t border-brass/30 pt-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={item.label} {...swap} className="flex flex-col gap-4">
                  <p className="font-display text-[clamp(3rem,5.5vw,4.75rem)] leading-[0.95] text-ink">
                    {item.value}
                  </p>
                  <p className="max-w-[26rem] text-[1.0625rem]/relaxed text-ink-soft">
                    {item.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="#join" size="md">
                Apply to captain
              </ButtonLink>
              <span className="text-sm text-ink-soft">
                We review every application before a vault opens.
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
