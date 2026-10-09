"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** App-wide motion settings: Motion follows the visitor's reduced-motion preference. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
