"use client";

import { Lock, Pause, UserRound } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Flow = {
  /** Which line the coin travels: between you and the vault, or the vault and the Captain */
  side: "crew" | "captain";
  /** Start and end along that line, from 0 at its left end to 1 at its right end */
  from: number;
  to: number;
  label: string;
  /** Stopped halfway, by a lock (refused) or a pause (limits) */
  stop?: "lock" | "pause";
};

type Scene = {
  flow: Flow;
  holdings: { coin: string; amount: string; fresh?: boolean }[];
  caption: string;
};

/** One scene per article, in the same order. Amounts are samples. */
export const scenes: Scene[] = [
  {
    flow: { side: "captain", from: 1, to: 0, label: "Buy SOL" },
    holdings: [
      { coin: "USDC", amount: "600" },
      { coin: "SOL", amount: "400", fresh: true },
    ],
    caption:
      "Atlas buys SOL with the vault’s money. The coins change inside the vault; nothing leaves it.",
  },
  {
    flow: { side: "captain", from: 0, to: 0.5, label: "Withdraw", stop: "lock" },
    holdings: [
      { coin: "USDC", amount: "600" },
      { coin: "SOL", amount: "400" },
    ],
    caption:
      "Atlas tries to move money out to a private wallet. The vault refuses: only Crew can take money out.",
  },
  {
    flow: { side: "captain", from: 1, to: 0.5, label: "Risky trade", stop: "pause" },
    holdings: [
      { coin: "USDC", amount: "540" },
      { coin: "SOL", amount: "160" },
    ],
    caption:
      "The vault has fallen too far from its last high, so new risky trades pause until it recovers.",
  },
  {
    flow: { side: "captain", from: 1, to: 0, label: "Sell JUP" },
    holdings: [
      { coin: "USDC", amount: "820", fresh: true },
      { coin: "SOL", amount: "400" },
    ],
    caption:
      "Atlas sells JUP. The trade lands in the public log the moment it happens, for anyone to check.",
  },
  {
    flow: { side: "crew", from: 1, to: 0, label: "Withdraw" },
    holdings: [{ coin: "USDC", amount: "0" }],
    caption:
      "You leave whenever you choose. Your share goes back to your own wallet, no permission needed.",
  },
];

const COIN_SECONDS = 1.6;

/** The line between two parties, with a coin that travels it on a loop. */
function Line({ flow, active }: { flow: Flow; active: boolean }) {
  const reduceMotion = useReducedMotion();
  // A stopped coin halts just short of the lock or pause in the middle of the line.
  const end = flow.stop ? (flow.from ? 0.58 : 0.42) : flow.to;

  return (
    // Down the page on phones, across from sm up. The coin rides --p, from 0 to 1 along it.
    <div className="relative h-16 w-full sm:h-16 sm:w-auto sm:min-w-10 sm:flex-1">
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-1/2 border-l border-dashed transition-colors duration-500 sm:inset-x-0 sm:inset-y-auto sm:top-1/2 sm:left-0 sm:border-t sm:border-l-0",
          active ? "border-brass" : "border-ink/15",
        )}
      />
      <AnimatePresence>
        {active && (
          <motion.div
            key={`${flow.label}-${flow.from}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <span
              className={cn(
                "absolute top-1/2 left-[calc(50%+1.5rem)] -translate-y-1/2 rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold whitespace-nowrap sm:top-0 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-0",
                flow.stop === "lock"
                  ? "bg-coral-tint text-coral"
                  : flow.stop === "pause"
                    ? "bg-amber-tint text-amber"
                    : "bg-white text-brass-deep ring-1 ring-brass/40",
              )}
            >
              {flow.stop === "lock" ? "Refused" : flow.stop === "pause" ? "Paused" : flow.label}
            </span>
            <motion.span
              aria-hidden
              className="absolute top-[calc(var(--p)*100%)] left-1/2 -mt-2 -ml-2 size-4 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f4e3b8,#c9a66b_55%,#8a6834)] shadow-[0_2px_6px_rgb(138_104_52/0.45)] sm:top-1/2 sm:left-[calc(var(--p)*100%)]"
              initial={{ "--p": flow.from, opacity: 0 }}
              animate={
                reduceMotion
                  ? { "--p": end, opacity: 1 }
                  : { "--p": [flow.from, end], opacity: [0, 1, 1, 0] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: COIN_SECONDS,
                      ease: [0.45, 0, 0.25, 1],
                      repeat: Infinity,
                      repeatDelay: 0.9,
                      opacity: {
                        duration: COIN_SECONDS,
                        times: [0, 0.12, 0.85, 1],
                        repeat: Infinity,
                        repeatDelay: 0.9,
                      },
                    }
              }
            />
            {flow.stop && (
              <span
                className={cn(
                  "absolute top-1/2 left-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white ring-1",
                  flow.stop === "lock" ? "text-coral ring-coral/40" : "text-amber ring-amber/40",
                )}
              >
                {flow.stop === "lock" ? (
                  <Lock aria-hidden className="size-3.5" />
                ) : (
                  <Pause aria-hidden className="size-3.5" />
                )}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Party({ name, role, children }: { name: string; role: string; children: ReactNode }) {
  return (
    <div className="flex flex-none items-center gap-3 sm:w-20 sm:flex-col sm:gap-2 sm:text-center">
      {children}
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-ink">{name}</span>
        <span className="text-xs text-muted">{role}</span>
      </span>
    </div>
  );
}

/**
 * You, the vault and the Captain in a row (a column on phones). Each scene sends a coin along one line and shows
 * what's in the vault afterwards.
 */
export function VaultScene({ index }: { index: number }) {
  const scene = scenes[index];
  const logged = index === 3;

  return (
    <div className="flex flex-col gap-6 rounded-panel bg-white p-5 shadow-lift ring-1 ring-line sm:p-8">
      <div className="flex flex-col items-center sm:flex-row">
        <Party name="You" role="Crew">
          <span className="relative grid size-12 place-items-center rounded-full bg-ice text-steel ring-1 ring-line sm:size-16">
            <UserRound aria-hidden className="size-6" strokeWidth={1.5} />
            <AnimatePresence>
              {index === 4 && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mint-tint px-2 py-0.5 text-[0.6875rem] font-semibold whitespace-nowrap text-mint"
                >
                  +1,000 USDC
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </Party>

        <Line flow={scene.flow} active={scene.flow.side === "crew"} />

        <div className="flex w-full max-w-60 flex-none flex-col gap-3 rounded-[20px] bg-[#fdfbf6] p-4 frame-brass sm:w-44">
          <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-brass-deep uppercase">
            <Lock aria-hidden className="size-3.5" />
            The vault
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex min-h-15 flex-col gap-1.5"
            >
              {scene.holdings.map((holding) => (
                <li
                  key={holding.coin}
                  className={cn(
                    "flex items-baseline justify-between rounded-lg px-2 py-1 text-sm",
                    holding.fresh ? "bg-white ring-1 ring-brass/40" : "bg-white/60",
                  )}
                >
                  <span className="font-semibold text-ink">{holding.coin}</span>
                  <span className="text-ink-soft tabular-nums">{holding.amount}</span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
          <span className="text-[0.6875rem] text-muted">On Solana · open to inspect</span>
        </div>

        <Line flow={scene.flow} active={scene.flow.side === "captain"} />

        <Party name="Atlas" role="Captain">
          <Image
            src="/captains/atlas.webp"
            alt=""
            width={64}
            height={64}
            className="size-12 rounded-full object-cover ring-2 ring-brass/50 sm:size-16"
          />
        </Party>
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="min-h-[3.25rem] text-[0.9375rem]/relaxed text-ink-soft"
          >
            {scene.caption}
          </motion.p>
        </AnimatePresence>
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-500",
            logged ? "bg-ice text-ink" : "bg-pearl text-muted",
          )}
        >
          <span className="flex-none eyebrow text-[0.625rem] text-brass-deep">Public log</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={logged ? "new" : "old"}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: logged ? 1 : 0 }}
              className="min-w-0"
            >
              {logged ? (
                <>
                  <b className="font-semibold">Atlas</b> sold JUP · just now
                </>
              ) : (
                <>
                  <b className="font-semibold">Atlas</b> bought SOL · 2 min ago
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
