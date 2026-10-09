"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import type { SkySceneConfig } from "./sky-presets";
import { useSky } from "./sky-provider";

type SkySceneProps = ComponentPropsWithoutRef<"section"> & { scene: SkySceneConfig };

/** A page section that takes over the sky while it crosses the middle of the viewport. */
export function SkyScene({ scene, children, ...props }: SkySceneProps) {
  const ref = useRef<HTMLElement>(null);
  const { setScene } = useSky();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setScene(scene);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [scene, setScene]);

  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  );
}
