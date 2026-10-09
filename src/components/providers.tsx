"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame, MotionConfig, useReducedMotion, type FrameData } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * App-wide motion settings. Motion follows the visitor's reduced-motion preference, and Lenis
 * smooth scrolling runs on Motion's frame loop so scroll, UI animation and the sky share one clock.
 */
export function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = ({ timestamp }: FrameData) => lenisRef.current?.lenis?.raf(timestamp);
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {!reduceMotion && <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.12 }} />}
      {children}
    </MotionConfig>
  );
}
