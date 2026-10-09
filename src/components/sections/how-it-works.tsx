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

const STEP_MS = 5200;

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
    <Section id="how" className="py-24 md:py-32">
      <Container>
        <div
          ref={sectionRef}
          className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20"
        >
          <div className="flex flex-col gap-10">
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
                      className="relative grid w-full grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-2xl leading-none italic transition-colors",
                          current ? "text-brass-deep" : "text-muted/60",
                        )}
                      >
                        {item.numeral}
                      </span>
                      <span className="flex flex-col gap-2">
                        <span
                          className={cn(
                            "font-display text-[1.5rem] leading-tight transition-colors",
                            current ? "text-ink" : "text-ink/55",
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
                              transition={{ duration: 0.3, ease: [0.2, 0.9, 0.25, 1] }}
                              className="block overflow-hidden text-[0.9375rem]/relaxed text-ink-soft"
                            >
                              {item.body}
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
                          className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-brass"
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
              className="absolute top-1/2 left-1/2 size-[min(32rem,110%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ice"
            />
            <CompassRose className="absolute top-1/2 left-1/2 size-[min(36rem,125%)] -translate-x-1/2 -translate-y-1/2 text-brass/30" />

            <PhoneFrame className="h-[min(36rem,calc(100svh-10rem))] min-h-[28rem]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={step.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.9, 0.25, 1] }}
                >
                  <Image
                    src={step.src}
                    alt={step.alt}
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>

            <AnimatePresence mode="wait">
              <motion.div
                key={step.chip}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", damping: 26, stiffness: 260 }}
                aria-live="polite"
                className="absolute bottom-[14%] left-1/2 flex -translate-x-[95%] items-center gap-3 rounded-2xl px-4 py-3 panel sm:-translate-x-[110%]"
              >
                <span className="grid size-9 place-items-center rounded-full bg-ice text-brass-deep">
                  <step.Icon aria-hidden className="size-4.5" />
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
