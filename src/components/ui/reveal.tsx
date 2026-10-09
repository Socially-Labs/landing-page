"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Fades up a few pixels the first time it scrolls into view. Kept small on purpose. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.2, 0.9, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
