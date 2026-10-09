/**
 * Dummy figures for the landing page until the app is live. Captain names, portraits and
 * 90-day numbers match the app preview (socially-apk/src/constants/discover.ts).
 */

export type Period = "7D" | "30D" | "90D" | "All";
export const periods: Period[] = ["7D", "30D", "90D", "All"];

export type Rank = "New Captain" | "Proven Captain" | "Admiral";

export type Captain = {
  id: string;
  name: string;
  style: string;
  portrait: string;
  rank: Rank;
  risk: "Low" | "Medium" | "High";
  months: number;
  inVault: string;
  crew: number;
  returns: Record<Period, number>;
  worstDrop: Record<Period, number>;
};

export const captains: Captain[] = [
  {
    id: "atlas",
    name: "Atlas",
    style: "Solana Momentum",
    portrait: "/captains/atlas.webp",
    rank: "Admiral",
    risk: "Medium",
    months: 14,
    inVault: "$482K",
    crew: 124,
    returns: { "7D": 3.2, "30D": 11.4, "90D": 42.8, All: 118.6 },
    worstDrop: { "7D": -2.1, "30D": -6.4, "90D": -12.8, All: -21.3 },
  },
  {
    id: "solstice",
    name: "Solstice",
    style: "Balanced Horizons",
    portrait: "/captains/solstice.webp",
    rank: "Admiral",
    risk: "Low",
    months: 22,
    inVault: "$1.24M",
    crew: 286,
    returns: { "7D": 1.1, "30D": 6.2, "90D": 24.6, All: 71.3 },
    worstDrop: { "7D": -0.2, "30D": -0.3, "90D": -0.3, All: -4.8 },
  },
  {
    id: "northstar",
    name: "Northstar",
    style: "Long View",
    portrait: "/captains/northstar.webp",
    rank: "Proven Captain",
    risk: "Medium",
    months: 28,
    inVault: "$860K",
    crew: 162,
    returns: { "7D": 0.8, "30D": 5.1, "90D": 19.2, All: 88.4 },
    worstDrop: { "7D": -1.4, "30D": -4.2, "90D": -12.5, All: -18.9 },
  },
  {
    id: "bluewater",
    name: "Bluewater",
    style: "DeFi Current",
    portrait: "/captains/bluewater.webp",
    rank: "Proven Captain",
    risk: "Medium",
    months: 16,
    inVault: "$215K",
    crew: 98,
    returns: { "7D": 2.4, "30D": 7.9, "90D": 16.8, All: 39.5 },
    worstDrop: { "7D": -1.8, "30D": -5.6, "90D": -13.4, All: -19.2 },
  },
  {
    id: "nova",
    name: "Nova",
    style: "Early Signals",
    portrait: "/captains/nova.webp",
    rank: "New Captain",
    risk: "High",
    months: 5,
    inVault: "$78K",
    crew: 43,
    returns: { "7D": -2.6, "30D": 14.9, "90D": 32.6, All: 41.2 },
    worstDrop: { "7D": -4.9, "30D": -11.2, "90D": -18.7, All: -18.7 },
  },
  {
    id: "tide",
    name: "Tide",
    style: "Steady Reserve",
    portrait: "/captains/tide.webp",
    rank: "Proven Captain",
    risk: "Low",
    months: 18,
    inVault: "$342K",
    crew: 112,
    returns: { "7D": 0.6, "30D": 2.8, "90D": 9.4, All: 27.1 },
    worstDrop: { "7D": -0.4, "30D": -0.9, "90D": -2.1, All: -3.6 },
  },
];

export const stats = [
  { label: "Active Captains", value: 128, prefix: "", suffix: "", note: "+14 this month" },
  { label: "Crew members", value: 2860, prefix: "", suffix: "", note: "+18% this month" },
  { label: "Trades made", value: 48920, prefix: "", suffix: "", note: "1,340 this week" },
  { label: "Volume traded", value: 24.6, prefix: "$", suffix: "M", note: "+$3.1M this month" },
];

export const shipsLog = [
  { captain: "Atlas", portrait: "/captains/atlas.webp", text: "bought SOL", when: "2m" },
  { captain: "Solstice", portrait: "/captains/solstice.webp", text: "sold JUP", when: "9m" },
  { captain: "Northstar", portrait: "/captains/northstar.webp", text: "bought BTC", when: "14m" },
  { captain: "Atlas", portrait: "/captains/atlas.webp", text: "posted an update", when: "21m" },
  { captain: "Bluewater", portrait: "/captains/bluewater.webp", text: "bought JTO", when: "32m" },
  { captain: "Nova", portrait: "/captains/nova.webp", text: "welcomed 12 new Crew", when: "48m" },
  { captain: "Tide", portrait: "/captains/tide.webp", text: "moved 20% to USDC", when: "1h" },
];

/** A deterministic wandering line from 0 to `end`, for sparklines and charts. */
export function series(seed: number, end: number, points = 28): number[] {
  let state = seed * 9301 + 49297;
  const random = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
  const swing = Math.max(Math.abs(end) * 0.35, 3);
  return Array.from({ length: points }, (_, i) => {
    const t = i / (points - 1);
    const noise = i === 0 || i === points - 1 ? 0 : (random() - 0.45) * swing;
    return end * t + noise * Math.sin(Math.PI * t);
  });
}

export function signedPercent(value: number) {
  return `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(1)}%`;
}
