"use client";

import { BellRing, Fingerprint, Users, Wallet } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CompassRose } from "@/components/ornaments/compass-rose";
import { Container } from "@/components/ui/container";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

/** Long enough to read the step and glance at the screen. */
const STEP_MS = 8000;
const EASE = [0.2, 0.9, 0.25, 1] as const;

const steps = [
  {
    numeral: "I",
    title: "Sign up in a minute",
    body: "Use email or Google. There’s no seed phrase to write down and no extension to install.",
    src: "/app/sign-in.webp",
    alt: "Socially sign-in screen with email and Google options",
    Icon: Fingerprint,
    chip: "No seed phrase needed",
  },
  {
    numeral: "II",
    title: "Add money",
    body: "Top up your Socially wallet with USDC. It stays yours until you join a vault.",
    src: "/app/wallet.webp",
    alt: "Socially wallet with a sample balance and a Deposit button",
    Icon: Wallet,
    chip: "+500.00 USDC added",
  },
  {
    numeral: "III",
    title: "Pick your Captain",
    body: "Compare returns, worst drops and trading styles, then join with the amount you choose.",
    src: "/app/discover.webp",
    alt: "Discover screen showing the Top Captain card for Atlas",
    Icon: Users,
    chip: "Atlas · +42.8% in 90 days",
  },
  {
    numeral: "IV",
    title: "Watch every trade",
    body: "Get an alert the moment your Captain makes a move, and see your share grow.",
    src: "/app/crew-notifications.webp",
    alt: "Notifications with recent vault updates",
    Icon: BellRing,
    chip: "Atlas bought SOL · just now",
  },
];

/** Onboarding: four steps beside one phone. Steps advance on their own until someone takes over. */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const autoplay = inView && !paused && !reduceMotion;
  const step = steps[active];

  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => setActive((index) => (index + 1) % steps.length), STEP_MS);
    return () => clearTimeout(timer);
  }, [active, autoplay]);

  return (
    <Section id="how" className="overflow-x-clip py-24 md:py-28">
      <Container>
        <div
          ref={sectionRef}
          className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20"
        >
          <div className="flex flex-col gap-9">
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  Aboard in <em>four steps.</em>
                </>
              }
              lede="No wallets to set up and no charts to learn. Choose who trades for you, then follow along."
            />

            <ol
              className="flex flex-col"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              {steps.map((item, index) => {
                const current = index === active;
                return (
                  <li key={item.title} className="border-t border-line last:border-b">
                    <button
                      type="button"
                      aria-current={current ? "step" : undefined}
                      onClick={() => setActive(index)}
                      className="relative grid w-full grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-4.5 text-left"
                    >
                      <span
                        className={cn(
                          "pt-0.5 font-display text-xl leading-none italic transition-colors duration-500",
                          current ? "text-brass-deep" : "text-muted/60",
                        )}
                      >
                        {item.numeral}
                      </span>
                      <span className="flex flex-col">
                        <span
                          className={cn(
                            "font-display text-[1.375rem] leading-tight transition-colors duration-500",
                            current ? "text-ink" : "text-ink/50",
                          )}
                        >
                          {item.title}
                        </span>
                        <AnimatePresence initial={false}>
                          {current && (
                            <motion.span
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease: EASE }}
                              className="block overflow-hidden"
                            >
                              <span className="block pt-2 text-[0.9375rem]/relaxed text-ink-soft">
                                {item.body}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      {current && autoplay && (
                        <motion.span
                          key={`progress-${active}`}
                          aria-hidden
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                          className="absolute inset-x-0 -bottom-px h-px origin-left bg-brass"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative flex justify-center py-6">
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 size-[min(30rem,105%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ice"
            />
            <CompassRose className="absolute top-1/2 left-1/2 size-[min(34rem,120%)] -translate-x-1/2 -translate-y-1/2 text-brass/25" />

            <PhoneFrame className="h-[min(34rem,calc(100svh-10rem))] min-h-[28rem]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={step.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <Image
                    src={step.src}
                    alt={step.alt}
                    fill
                    sizes="260px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>

            <AnimatePresence mode="wait">
              <motion.div
                key={step.chip}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                aria-live="polite"
                className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 panel sm:bottom-[14%] sm:-translate-x-[110%]"
              >
                <span className="grid size-8.5 place-items-center rounded-full bg-ice text-brass-deep">
                  <step.Icon aria-hidden className="size-4" />
                </span>
                <span className="text-sm font-semibold whitespace-nowrap text-ink">
                  {step.chip}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
