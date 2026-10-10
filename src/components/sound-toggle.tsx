"use client";

import { VolumeX } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";

const STORAGE_KEY = "socially-sound";

/** What the button drives: a music file, or the sea made in the browser when there's none. */
type Engine = {
  start: () => Promise<void>;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  dispose: () => void;
};

/** Saves the visitor's choice; storage can be unavailable, which just means it isn't kept. */
function remember(choice: "on" | "off") {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {}
}

/* ---------- A music file, looped ---------- */

const TRACK_VOLUME = 0.35;
const FADE_MS = 1200;

/** Ramps an audio element's volume, then calls `done`. Returns a cancel function. */
function fade(audio: HTMLAudioElement, to: number, done?: () => void) {
  const from = audio.volume;
  const begin = performance.now();
  let frame = 0;
  const step = (now: number) => {
    const t = Math.min((now - begin) / FADE_MS, 1);
    audio.volume = from + (to - from) * t;
    if (t < 1) frame = requestAnimationFrame(step);
    else done?.();
  };
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}

function createTrack(src: string): Engine {
  const audio = Object.assign(new Audio(src), { loop: true, volume: 0 });
  let cancel = () => {};
  return {
    start: async () => {
      cancel();
      await audio.play();
      cancel = fade(audio, TRACK_VOLUME);
    },
    stop: () => {
      cancel();
      cancel = fade(audio, 0, () => audio.pause());
    },
    pause: () => audio.pause(),
    resume: () => void audio.play().catch(() => {}),
    dispose: () => {
      cancel();
      audio.pause();
    },
  };
}

/* ---------- The sea, made in the browser ---------- */

/*
 * Tuned for laptop speakers, which play little below 250 Hz: the surf is a band of noise around
 * 900 Hz and the strings sit in the middle register, over a soft bass. Rendered offline this
 * comes to about -16 dBFS with peaks near 0.6.
 */
const SEA_VOLUME = 0.8;
/** Seconds for the volume to get most of the way to its target (about a third of the fade) */
const SEA_EASE = 0.4;
/** D minor, moving Dm, B♭, F, C. A bass note and three string voices for each, in Hz. */
const CHORDS = [
  { bass: 146.83, voices: [293.66, 349.23, 440] },
  { bass: 116.54, voices: [293.66, 349.23, 466.16] },
  { bass: 174.61, voices: [261.63, 349.23, 440] },
  { bass: 130.81, voices: [261.63, 329.63, 392] },
];
const CHORD_MS = 8000;

function createSea(): Engine {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Surf: four seconds of noise on a loop, banded around 900 Hz, swelling every ten seconds.
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
  const surf = ctx.createBufferSource();
  surf.buffer = buffer;
  surf.loop = true;
  const surfTone = ctx.createBiquadFilter();
  surfTone.type = "bandpass";
  surfTone.frequency.value = 900;
  surfTone.Q.value = 0.5;
  const swell = ctx.createGain();
  swell.gain.value = 0.22;
  const tide = ctx.createOscillator();
  tide.frequency.value = 0.1;
  const tideDepth = ctx.createGain();
  tideDepth.gain.value = 0.154;
  tide.connect(tideDepth).connect(swell.gain);
  surf.connect(surfTone).connect(swell).connect(master);

  // Strings: three soft triangle voices through a warm filter, and a sine bass under them.
  const stringTone = ctx.createBiquadFilter();
  stringTone.type = "lowpass";
  stringTone.frequency.value = 2200;
  const strings = ctx.createGain();
  strings.gain.value = 0.16;
  stringTone.connect(strings).connect(master);
  const voices = CHORDS[0].voices.map((frequency, i) => {
    const voice = ctx.createOscillator();
    voice.type = "triangle";
    voice.frequency.value = frequency;
    voice.detune.value = (i - 1) * 5;
    voice.connect(stringTone);
    return voice;
  });
  const bass = ctx.createOscillator();
  bass.frequency.value = CHORDS[0].bass;
  const bassLevel = ctx.createGain();
  bassLevel.gain.value = 0.12;
  bass.connect(bassLevel).connect(master);

  let chord = 0;
  const chords = setInterval(() => {
    chord = (chord + 1) % CHORDS.length;
    const next = CHORDS[chord];
    voices.forEach((voice, i) =>
      voice.frequency.setTargetAtTime(next.voices[i], ctx.currentTime, 1.5),
    );
    bass.frequency.setTargetAtTime(next.bass, ctx.currentTime, 1.5);
  }, CHORD_MS);

  [surf, tide, bass, ...voices].forEach((node) => node.start());

  let sleep: ReturnType<typeof setTimeout> | undefined;
  return {
    start: async () => {
      clearTimeout(sleep);
      await ctx.resume();
      master.gain.setTargetAtTime(SEA_VOLUME, ctx.currentTime, SEA_EASE);
    },
    stop: () => {
      master.gain.setTargetAtTime(0, ctx.currentTime, SEA_EASE / 1.5);
      sleep = setTimeout(() => void ctx.suspend(), 1500);
    },
    pause: () => void ctx.suspend(),
    resume: () => void ctx.resume(),
    dispose: () => {
      clearInterval(chords);
      clearTimeout(sleep);
      void ctx.close();
    },
  };
}

/* ---------- The button ---------- */

/**
 * Sound for the site, off until the visitor turns it on. It plays `src` when there is one,
 * and the sea made in the browser when there isn't. Nothing loads until the first click; it
 * fades in and out, and pauses while the tab is hidden. A visitor who left it on gets it back
 * on their first click or key press next time.
 */
export function SoundToggle({ src }: { src?: string }) {
  const engine = useRef<Engine | null>(null);
  const [on, setOn] = useState(false);

  const start = () => {
    engine.current ??= src ? createTrack(src) : createSea();
    engine.current
      .start()
      .then(() => {
        setOn(true);
        remember("on");
      })
      .catch(() => setOn(false));
  };

  const stop = () => {
    setOn(false);
    remember("off");
    engine.current?.stop();
  };

  // Browsers need a gesture before playing sound, so a returning visitor's first one counts.
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
    if (!on) return;
    const onVisibility = () => {
      if (document.hidden) engine.current?.pause();
      else engine.current?.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [on]);

  useEffect(() => () => engine.current?.dispose(), []);

  return (
    <button
      type="button"
      onClick={on ? stop : start}
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      title={on ? "Sound off" : "Sound on"}
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
