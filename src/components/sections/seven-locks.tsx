"use client";

import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SkyScene } from "@/components/sky/sky-scene";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { scenes } from "./scenes";

/** The program's checks, in the order it runs them. */
const locks = [
  { title: "Vault is active", detail: "Not frozen or closed" },
  { title: "Key is allowed", detail: "This key may trade this vault" },
  { title: "Venue is approved", detail: "Program is on the allowlist" },
  { title: "Size and pace", detail: "Within trade and daily limits" },
  { title: "Price is fair", detail: "Fresh price, slippage capped" },
  { title: "Output returns", detail: "Proceeds land in the vault" },
  { title: "Caps respected", detail: "Token tier and position limits" },
];

const scenarios = {
  fair: {
    label: "Atlas swaps 100 USDC for SOL",
    failAt: -1,
    lead: "Executed.",
    text: "The SOL lands back in the vault and the Crew gets a live alert.",
  },
  drain: {
    label: "A route sends the SOL to the Captain’s wallet",
    failAt: 5,
    lead: "Reverted at lock 6.",
    text: "Trade output has to return to the vault, so nothing moved, not even the 100 USDC.",
  },
  cap: {
    label: "A bot puts 15% of the vault into a new token",
    failAt: 6,
    lead: "Reverted at lock 7.",
    text: "In this sample policy, unvetted tokens are capped at 10% of the vault each.",
  },
};

type ScenarioKey = keyof typeof scenarios;
type LockStatus = "pass" | "fail" | "skip";

const STAGGER = 0.14;

const surfaces: Record<LockStatus | "idle", { backgroundColor: string; borderColor: string }> = {
  idle: { backgroundColor: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.8)" },
  pass: { backgroundColor: "rgba(236,250,244,0.84)", borderColor: "rgba(22,128,94,0.35)" },
  fail: { backgroundColor: "rgba(253,240,242,0.92)", borderColor: "rgba(175,72,84,0.5)" },
  skip: { backgroundColor: "rgba(255,255,255,0.36)", borderColor: "rgba(255,255,255,0.6)" },
};

const chips: Record<LockStatus, { label: string; className: string }> = {
  pass: { label: "Passed", className: "bg-[#d6f0e4] text-mint-deep" },
  fail: { label: "Reverted", className: "bg-[#f6d9dd] text-coral-deep" },
  skip: { label: "Not reached", className: "bg-white/70 text-ink-soft" },
};

export function SevenLocks() {
  const [key, setKey] = useState<ScenarioKey>("drain");
  const scenario = scenarios[key];
  const lastChecked = scenario.failAt === -1 ? locks.length - 1 : scenario.failAt;
  const statusOf = (index: number): LockStatus =>
    scenario.failAt === -1 || index < scenario.failAt
      ? "pass"
      : index === scenario.failAt
        ? "fail"
        : "skip";

  return (
    <SkyScene id="checks" scene={scenes.locks} className="py-28 md:py-40">
      <Container>
        <SectionHeading
          eyebrow="The Seven Locks"
          title="Every trade clears seven checks, or it never leaves the harbor."
          lede="Pick a trade and watch where the program stops it. If any lock fails, the whole trade reverts. Nothing half-happens."
        />

        <div
          role="group"
          aria-label="Choose a trade to run"
          className="mt-10 flex flex-wrap gap-2.5"
        >
          {(Object.keys(scenarios) as ScenarioKey[]).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={key === option}
              onClick={() => setKey(option)}
              className={cn(
                "min-h-11 rounded-full border px-4.5 py-2.5 text-left text-[0.9375rem] font-medium transition-colors",
                key === option
                  ? "border-ink bg-ink text-on-navy"
                  : "text-ink glass hover:bg-white/80",
              )}
            >
              {scenarios[option].label}
            </button>
          ))}
        </div>

        {/* Keyed by scenario so each run replays the locks in order */}
        <motion.ol
          key={key}
          initial="idle"
          whileInView="done"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ done: { transition: { staggerChildren: STAGGER } } }}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7"
        >
          {locks.map((lock, index) => {
            const status = statusOf(index);
            return (
              <motion.li
                key={lock.title}
                variants={{
                  idle: surfaces.idle,
                  done: { ...surfaces[status], transition: { duration: 0.35 } },
                }}
                className={cn(
                  "flex min-h-60 flex-col items-center gap-2.5 rounded-t-[90px] rounded-b-[20px] border px-4 pt-6 pb-4 text-center shadow-soft backdrop-blur-[18px] transition-opacity",
                  status === "skip" && "opacity-65",
                )}
              >
                <motion.span
                  variants={{ idle: { scale: 0.8, opacity: 0.4 }, done: { scale: 1, opacity: 1 } }}
                  className={cn(
                    "grid size-10 place-items-center rounded-full text-sm font-bold",
                    status === "pass" && "bg-mint text-white",
                    status === "fail" && "bg-coral text-white",
                    status === "skip" && "bg-white text-muted",
                  )}
                >
                  {status === "pass" && <Check aria-hidden className="size-4.5" strokeWidth={3} />}
                  {status === "fail" && <X aria-hidden className="size-4.5" strokeWidth={3} />}
                  {status === "skip" && index + 1}
                </motion.span>
                <span className="text-[0.9375rem] leading-tight font-semibold text-ink">
                  {lock.title}
                </span>
                <span className="text-[0.8125rem]/snug text-ink-soft">{lock.detail}</span>
                <span
                  className={cn(
                    "mt-auto rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wider uppercase",
                    chips[status].className,
                  )}
                >
                  {chips[status].label}
                </span>
              </motion.li>
            );
          })}
        </motion.ol>

        <motion.div
          key={`result-${key}`}
          aria-live="polite"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (lastChecked + 1) * STAGGER, duration: 0.35 }}
          className={cn(
            "mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-[20px] border px-5 py-4 text-base backdrop-blur-[18px]",
            scenario.failAt === -1
              ? "border-mint/35 bg-mint-tint/85 text-mint-deep"
              : "border-coral/45 bg-coral-tint/90 text-coral-deep",
          )}
        >
          <b className="font-semibold">{scenario.lead}</b>
          <span>{scenario.text}</span>
        </motion.div>
        <p className="mt-4 text-[0.8125rem] text-ink-soft">Sample trades and a sample policy.</p>
      </Container>
    </SkyScene>
  );
}
