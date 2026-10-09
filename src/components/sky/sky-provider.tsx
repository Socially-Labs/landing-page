"use client";

import { AnimatePresence, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/use-media-query";
import { Boat } from "./boat";
import { SkyEngine, type SkyQuality } from "./sky-engine";
import { fallbackGradient, sceneForViewport, type SkySceneConfig } from "./sky-presets";

const NARROW_QUERY = "(max-width: 1023px)";

/** Scroll distance of one viewport moves the camera this far over the cloud sea. */
const TRAVEL_PER_VIEWPORT = 0.9;

type SkyContextValue = { setScene: (scene: SkySceneConfig) => void };

const SkyContext = createContext<SkyContextValue | null>(null);

export function useSky() {
  const context = use(SkyContext);
  if (!context) throw new Error("useSky must be used inside <SkyProvider>");
  return context;
}

function detectQuality(): SkyQuality {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return "low";
  if ((nav.hardwareConcurrency ?? 8) <= 4) return "low";
  return window.matchMedia(NARROW_QUERY).matches ? "low" : "high";
}

/**
 * Owns the fixed sky canvas behind the page. Sections choose the scene through <SkyScene>;
 * scrolling moves the camera forward over the cloud sea.
 */
export function SkyProvider({
  initialScene,
  children,
}: {
  initialScene: SkySceneConfig;
  children: ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SkyEngine | null>(null);
  const [scene, setSceneState] = useState(initialScene);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const narrow = useMediaQuery(NARROW_QUERY);
  const reduceMotion = useReducedMotion();

  const viewScene = useMemo(() => sceneForViewport(scene, narrow), [scene, narrow]);
  const firstScene = useRef(viewScene);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new SkyEngine(canvas, firstScene.current, {
      quality: detectQuality(),
      onReady: () => setStatus("ready"),
      onFail: () => setStatus("failed"),
    });
    engineRef.current = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setScene(viewScene);
  }, [viewScene]);

  useEffect(() => {
    engineRef.current?.setMotion(!reduceMotion);
  }, [reduceMotion]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    engineRef.current?.setTravel((y / Math.max(window.innerHeight, 1)) * TRAVEL_PER_VIEWPORT);
  });

  const setScene = useCallback((next: SkySceneConfig) => {
    setSceneState((previous) => (previous === next ? previous : next));
  }, []);
  const context = useMemo(() => ({ setScene }), [setScene]);

  return (
    <SkyContext value={context}>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ background: fallbackGradient(viewScene) }}
      >
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute inset-0 size-full transition-opacity duration-1000",
            status === "ready" ? "opacity-100" : "opacity-0",
          )}
        />
        <AnimatePresence>
          {viewScene.boat && (
            <Boat
              key="boat"
              placement={viewScene.boat}
              lantern={viewScene.time === "night" || viewScene.time === "dusk"}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="relative z-10">{children}</div>
    </SkyContext>
  );
}
