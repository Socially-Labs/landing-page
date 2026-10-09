"use client";

import { motion } from "motion/react";

export function ScrollCue() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-2 text-ink-soft [@media(max-height:820px)]:hidden"
    >
      <span className="eyebrow text-[0.6875rem]">Scroll to sail</span>
      <span className="relative h-8 w-px overflow-hidden bg-ink/20">
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 bg-ink/60"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        />
      </span>
    </div>
  );
}
