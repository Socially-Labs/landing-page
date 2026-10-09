import type { SkySceneConfig } from "@/components/sky/sky-presets";

/** One sky per section, in scroll order. See the Environment system board on the design canvas. */
export const scenes = {
  hero: {
    time: "morning",
    weather: "fair",
    horizon: 0.62,
    cover: 0.44,
    seaCover: 0.84,
    sunAz: 0.1,
    sunEl: 0.09,
    boat: { x: 54, y: 77, size: 150 },
    mobile: { horizon: 0.7, sunAz: 0.16, sunEl: 0.1, boat: { x: 70, y: 84, size: 92 } },
  },
} satisfies Record<string, SkySceneConfig>;
