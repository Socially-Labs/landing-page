export type TimeOfDay = "dawn" | "morning" | "noon" | "golden" | "dusk" | "night";
export type Weather = "fair" | "haze" | "storm";

/** Boat position in percent of the viewport, size in px. */
export type BoatPlacement = { x: number; y: number; size: number };

type SceneSettings = {
  weather?: Weather;
  /** Horizon height as a fraction of the viewport from the top. */
  horizon?: number;
  /** High-cloud cover, 0 to 1. Defaults to the weather's value. */
  cover?: number;
  /** Cloud-sea density, 0 to 1. Defaults to the weather's value. */
  seaCover?: number;
  /** Fog bank, 0 to 0.9. Defaults to the weather's value. */
  fog?: number;
  /** Sun or moon azimuth and elevation in radians. Defaults to the time of day's. */
  sunAz?: number;
  sunEl?: number;
  /** Distance from the camera down to the cloud sea. */
  depth?: number;
  boat?: BoatPlacement | null;
};

export type SkySceneConfig = SceneSettings & {
  time: TimeOfDay;
  /** Overrides below the `lg` breakpoint, where the layout is a single column. */
  mobile?: SceneSettings;
};

type Vec3 = [number, number, number];

export type SkyUniforms = {
  top: Vec3;
  horizon: Vec3;
  sun: Vec3;
  lit: Vec3;
  shade: Vec3;
  sea: Vec3;
  haze: Vec3;
  ridge: Vec3;
  sunDir: Vec3;
  sunSize: number;
  cover: number;
  seaCover: number;
  fog: number;
  storm: number;
  night: number;
  pitch: number;
  depth: number;
};

type Palette = {
  top: string;
  horizon: string;
  sun: string;
  lit: string;
  shade: string;
  sea: string;
  haze: string;
  ridge: string;
  az: number;
  el: number;
  size: number;
};

/** Colour keys every palette shares, including the storm overlay. */
type ColorKey = "top" | "horizon" | "sun" | "lit" | "shade" | "sea" | "haze" | "ridge";

/** Built from the app's tokens: Sky #E4EDF5 and pearl at morning, deep water #07172C at night. */
export const PALETTES: Record<TimeOfDay, Palette> = {
  dawn: {
    top: "#8FA9D4",
    horizon: "#F4D8C8",
    sun: "#FFD3A6",
    lit: "#FFF0E6",
    shade: "#9AA6C4",
    sea: "#5E80AC",
    haze: "#EEDCD3",
    ridge: "#A3AECB",
    az: -0.55,
    el: 0.05,
    size: 0.0006,
  },
  morning: {
    top: "#7FA9DE",
    horizon: "#E4EDF5",
    sun: "#FFF3DC",
    lit: "#FFFFFF",
    shade: "#A7BBD6",
    sea: "#3E76B4",
    haze: "#DDE8F3",
    ridge: "#A9BED8",
    az: 0.1,
    el: 0.09,
    size: 0.00045,
  },
  noon: {
    top: "#5A93DA",
    horizon: "#D4E5F6",
    sun: "#FFFFFF",
    lit: "#FFFFFF",
    shade: "#B4C7E0",
    sea: "#2F6DB0",
    haze: "#D5E4F3",
    ridge: "#A1B9D6",
    az: 0.05,
    el: 0.62,
    size: 0.0004,
  },
  golden: {
    top: "#7898C6",
    horizon: "#F5D6AE",
    sun: "#FFC27A",
    lit: "#FFEBD0",
    shade: "#9F93A8",
    sea: "#4A6C9A",
    haze: "#F0D9C0",
    ridge: "#A59BB1",
    az: -0.42,
    el: 0.06,
    size: 0.0007,
  },
  dusk: {
    top: "#2C416A",
    horizon: "#E59E7E",
    sun: "#FFA472",
    lit: "#F4B9A0",
    shade: "#535678",
    sea: "#283F68",
    haze: "#C99088",
    ridge: "#6E6584",
    az: 0.5,
    el: 0.015,
    size: 0.0008,
  },
  night: {
    top: "#07172C",
    horizon: "#1F3656",
    sun: "#E2ECFF",
    lit: "#9DB3D3",
    shade: "#1C2C47",
    sea: "#0B1F3A",
    haze: "#24395A",
    ridge: "#1A2B47",
    az: -0.35,
    el: 0.32,
    size: 0.0003,
  },
};

/** Storm greys each palette moves 75% toward. */
const STORM: Record<ColorKey, string> = {
  top: "#4F5E74",
  horizon: "#9FAABA",
  sun: "#C9D2DE",
  lit: "#C3CCD8",
  shade: "#46536A",
  sea: "#34475F",
  haze: "#8E9AAB",
  ridge: "#5E6B7E",
};

export const WEATHER: Record<
  Weather,
  { cover: number; seaCover: number; fog: number; storm: number }
> = {
  fair: { cover: 0.42, seaCover: 0.8, fog: 0, storm: 0 },
  haze: { cover: 0.6, seaCover: 0.86, fog: 0.38, storm: 0 },
  storm: { cover: 0.94, seaCover: 0.95, fog: 0.12, storm: 1 },
};

/** Merges the mobile overrides when the viewport is narrow. */
export function sceneForViewport(scene: SkySceneConfig, narrow: boolean): SkySceneConfig {
  if (!narrow || !scene.mobile) return scene;
  return { ...scene, ...scene.mobile };
}

function hexToVec3(hex: string): Vec3 {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function mix(a: Vec3, b: Vec3, t: number): Vec3 {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

export function resolveScene(scene: SkySceneConfig): SkyUniforms {
  const palette = PALETTES[scene.time];
  const weather = WEATHER[scene.weather ?? "fair"];
  const color = (key: ColorKey) =>
    mix(hexToVec3(palette[key]), hexToVec3(STORM[key]), weather.storm * 0.75);
  const az = scene.sunAz ?? palette.az;
  const el = scene.sunEl ?? palette.el;

  return {
    top: color("top"),
    horizon: color("horizon"),
    sun: color("sun"),
    lit: color("lit"),
    shade: color("shade"),
    sea: color("sea"),
    haze: color("haze"),
    ridge: color("ridge"),
    sunDir: [Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)],
    sunSize: palette.size,
    cover: scene.cover ?? weather.cover,
    seaCover: scene.seaCover ?? weather.seaCover,
    fog: scene.fog ?? weather.fog,
    storm: weather.storm,
    night: scene.time === "night" ? 1 : 0,
    pitch: 0.5 - (scene.horizon ?? 0.6),
    depth: scene.depth ?? 0.35,
  };
}

/** CSS stand-in painted under the canvas: first paint, no WebGL, or a lost context. */
export function fallbackGradient(scene: SkySceneConfig): string {
  const p = PALETTES[scene.time];
  const h = Math.round((scene.horizon ?? 0.6) * 100);
  return `linear-gradient(180deg, ${p.top} 0%, ${p.horizon} ${h - 1}%, ${p.lit} ${h + 1}%, ${p.shade} 100%)`;
}
