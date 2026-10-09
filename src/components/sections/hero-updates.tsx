"use client";

import { ArrowDown, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const updates = [
  {
    title: "Allocation confirmed",
    body: "$500.00 added to Horizon Growth · 12 min ago",
    Icon: ArrowDown,
    tone: "bg-mint-tint text-mint",
    position: "-left-56 top-[14%]",
  },
  {
    title: "Atlas bought SOL",
    body: "Passed all seven checks · 1 hr ago",
    Icon: TrendingUp,
    tone: "bg-steel-tint text-steel",
    position: "-left-48 top-[60%]",
  },
];

/** Sample notifications that settle around the hero phone after the page has loaded. */
export function HeroUpdates() {
  return updates.map(({ title, body, Icon, tone, position }, index) => (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.9 + index * 0.35, type: "spring", damping: 26, stiffness: 200 }}
      className={cn(
        "absolute hidden w-68 items-start gap-3 rounded-[22px] px-4 py-3.5 shadow-lift glass xl:flex",
        position,
      )}
    >
      <span className={cn("grid size-[34px] flex-none place-items-center rounded-full", tone)}>
        <Icon aria-hidden className="size-4" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-ink">{title}</span>
        <span className="text-[0.8125rem] leading-snug text-ink-soft">{body}</span>
      </span>
    </motion.div>
  ));
}
