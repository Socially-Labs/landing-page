/** Sample Captains from the app preview (socially-apk/src/constants/discover.ts), 90-day figures. */
export type SampleCaptain = {
  name: string;
  fund: string;
  portrait: string;
  returnPct: string;
  drawdownPct: string;
  aum: string;
  crew: number;
  risk: "Lower" | "Moderate" | "Higher";
  top?: boolean;
  /** Sparkline path in a 300 × 64 box, rising to the right. */
  chart: string;
  rules: { label: string; value: string }[];
};

export const sampleCaptains: Record<"atlas" | "solstice" | "northstar", SampleCaptain> = {
  atlas: {
    name: "Atlas",
    fund: "Solana Momentum",
    portrait: "/captains/atlas.webp",
    returnPct: "+42.8%",
    drawdownPct: "−12.8%",
    aum: "$482K",
    crew: 124,
    risk: "Moderate",
    top: true,
    chart:
      "M0 52 L25 48 L45 50 L70 40 L90 44 L115 34 L135 38 L160 28 L180 32 L205 22 L225 26 L250 16 L272 18 L300 6",
    rules: [
      { label: "Drawdown breaker", value: "−30% from peak" },
      { label: "New tokens", value: "Up to 10% each" },
      { label: "Venues", value: "Jupiter" },
      { label: "Fee", value: "10% of new profit" },
    ],
  },
  solstice: {
    name: "Solstice",
    fund: "Balanced Horizons",
    portrait: "/captains/solstice.webp",
    returnPct: "+24.6%",
    drawdownPct: "−0.3%",
    aum: "$1.24M",
    crew: 286,
    risk: "Lower",
    chart: "M0 54 L30 51 L60 48 L90 45 L120 41 L150 38 L180 34 L210 30 L240 26 L270 22 L300 16",
    rules: [
      { label: "Drawdown breaker", value: "−15% from peak" },
      { label: "New tokens", value: "Not allowed" },
      { label: "Venues", value: "Jupiter" },
      { label: "Fee", value: "10% of new profit" },
    ],
  },
  northstar: {
    name: "Northstar",
    fund: "Long View",
    portrait: "/captains/northstar.webp",
    returnPct: "+19.2%",
    drawdownPct: "−12.5%",
    aum: "$860K",
    crew: 162,
    risk: "Moderate",
    chart:
      "M0 40 L25 44 L50 38 L75 46 L100 50 L125 42 L150 36 L175 40 L200 30 L225 26 L250 30 L275 20 L300 14",
    rules: [
      { label: "Drawdown breaker", value: "−25% from peak" },
      { label: "New tokens", value: "Not allowed" },
      { label: "Venues", value: "Jupiter" },
      { label: "Fee", value: "10% of new profit" },
    ],
  },
};
