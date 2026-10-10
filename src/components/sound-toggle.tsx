"use client";

import { VolumeX } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";

const VOLUME = 0.35;
const FADE_MS = 1200;
const STORAGE_KEY = "socially-sound";

/** Saves the visitor's choice; storage can be unavailable, which just means it isn't kept. */
function remember(choice: "on" | "off") {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {}
}

/** Ramps an audio element's volume, then calls `done`. Returns a cancel function. */
function fade(audio: HTMLAudioElement, to: number, done?: () => void) {
  const from = audio.volume;
  const start = performance.now();
  let frame = 0;
  const step = (now: number) => {
    const t = Math.min((now - start) / FADE_MS, 1);
    audio.volume = from + (to - from) * t;
    if (t < 1) frame = requestAnimationFrame(step);
    else done?.();
  };
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}

/**
 * Background music, off until the visitor turns it on. The file loads on the first click,
 * plays looped at a gentle volume, fades in and out, and pauses while the tab is hidden.
 * A visitor who left it on gets it back on their first click or key press next time.
 */
export function SoundToggle({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cancelFade = useRef<() => void>(() => {});
  const [on, setOn] = useState(false);

  const start = () => {
    audioRef.current ??= Object.assign(new Audio(src), { loop: true, volume: 0 });
    const audio = audioRef.current;
    cancelFade.current();
    audio
      .play()
      .then(() => {
        setOn(true);
        remember("on");
        cancelFade.current = fade(audio, VOLUME);
      })
      .catch(() => setOn(false));
  };

  const stop = () => {
    const audio = audioRef.current;
    setOn(false);
    remember("off");
    if (!audio) return;
    cancelFade.current();
    cancelFade.current = fade(audio, 0, () => audio.pause());
  };

  const toggle = () => (on ? stop() : start());

  // Resume for visitors who left sound on, once they interact (browsers need a gesture).
  const resume = useEffectEvent(() => start());
  useEffect(() => {
    let wanted = false;
    try {
      wanted = localStorage.getItem(STORAGE_KEY) === "on";
    } catch {}
    if (!wanted) return;
    const onGesture = () => resume();
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, []);

  // Quiet while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio || !on) return;
      if (document.hidden) audio.pause();
      else void audio.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [on]);

  useEffect(() => () => audioRef.current?.pause(), []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Turn music off" : "Turn music on"}
      title={on ? "Music off" : "Music on"}
      className="fixed right-5 bottom-5 z-50 grid size-12 place-items-center rounded-full bg-white/90 text-brass-deep shadow-soft ring-1 ring-brass/50 backdrop-blur transition-colors hover:bg-white hover:ring-brass"
    >
      {on ? (
        <span aria-hidden className="flex h-4 items-end gap-[3px]">
          {[0, 0.2, 0.4].map((delay) => (
            <span
              key={delay}
              className="h-full w-[3px] origin-bottom animate-eq rounded-full bg-brass-deep"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </span>
      ) : (
        <VolumeX aria-hidden className="size-5" strokeWidth={1.75} />
      )}
    </button>
  );
}
