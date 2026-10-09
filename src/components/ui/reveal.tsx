"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Rises into place the first time it scrolls into view, on the app's rise spring. */
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", damping: 28, stiffness: 240, mass: 0.9, delay }}
    >
      {children}
    </motion.div>
  );
}
