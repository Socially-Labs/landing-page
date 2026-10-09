"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SkyScene } from "@/components/sky/sky-scene";
import { Container } from "@/components/ui/container";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { scenes } from "./scenes";

const steps = [
  {
    title: "Sign in with email or Google",
    body: "Privy creates a wallet for you. There’s no seed phrase to write down and no extension to install.",
    src: "/app/sign-in.webp",
    alt: "Socially sign-in screen with an email field and Continue with Google",
  },
  {
    title: "Choose how you come aboard",
    body: "Join as Crew to back a Captain, or apply as a Captain to run a vault of your own.",
    src: "/app/signup-role.webp",
    alt: "Role choice between joining as Crew and becoming a Captain",
  },
  {
    title: "Pick a Captain",
    body: "Compare returns beside drawdowns, read each strategy and check the rules before you commit.",
    src: "/app/discover.webp",
    alt: "Discover screen with the Top Captain card for Atlas",
  },
  {
    title: "Join with USDC",
    body: "Choose an amount, see the vault shares you’ll receive and the fee, then confirm.",
    src: "/app/investment.webp",
    alt: "Invest with Atlas screen with a 500 USDC amount",
  },
];

type Step = (typeof steps)[number];

function StepItem({
  step,
  index,
  active,
  onEnter,
}: {
  step: Step;
  index: number;
  active: boolean;
  onEnter: (index: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <li ref={ref} className="relative flex gap-5 pb-14 lg:min-h-[42svh]">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "grid size-10 flex-none place-items-center rounded-full font-semibold transition-colors duration-500",
            active ? "bg-ink text-on-navy" : "text-ink glass",
          )}
        >
          {index + 1}
        </span>
        {index < steps.length - 1 && <span aria-hidden className="mt-3 w-px flex-1 bg-ink/15" />}
      </div>
      <div
        className={cn(
          "flex flex-col gap-3 pt-1.5 transition-opacity duration-500",
          active ? "opacity-100" : "lg:opacity-55",
        )}
      >
        <h3 className="font-display text-[2rem] leading-tight font-semibold">{step.title}</h3>
        <p className="max-w-[30rem] text-[1.0625rem]/relaxed text-ink-soft">{step.body}</p>
        <PhoneFrame className="mt-3 h-[26rem] self-start lg:hidden">
          <Image src={step.src} alt={step.alt} fill sizes="200px" className="object-cover" />
        </PhoneFrame>
      </div>
    </li>
  );
}

export function ComeAboard() {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <SkyScene id="how" scene={scenes.aboard} className="py-28 md:py-40">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="hidden lg:block">
          <div className="sticky top-[max(7rem,calc(50svh-21rem))] flex flex-col items-center gap-3">
            <PhoneFrame className="h-[min(40.5rem,calc(100svh-12rem))]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.9, 0.25, 1] }}
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
            <p className="text-xs text-ink-soft">App preview · Sample data</p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="How it works"
            title="Come aboard in four steps."
            lede="Socially handles the wallet, the network and the routing. You choose who trades for you."
          />
          <ol className="mt-12 flex flex-col">
            {steps.map((step, index) => (
              <StepItem
                key={step.title}
                step={step}
                index={index}
                active={active === index}
                onEnter={setActive}
              />
            ))}
          </ol>
          <Reveal className="w-fit rounded-full px-6 py-4 text-[0.9375rem] font-medium text-ink shadow-soft glass">
            No seed phrase. No browser extension. No gas maths.
          </Reveal>
        </div>
      </Container>
    </SkyScene>
  );
}
