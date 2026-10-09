"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useId, useState } from "react";
import { Insignia } from "@/components/ornaments/insignia";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { series } from "@/lib/sample-data";

const tabs = ["Performance", "Holdings", "Trades", "Updates"] as const;
type Tab = (typeof tabs)[number];

const profileStats = [
  { value: "+42.8%", label: "Return, 90 days", tone: "text-mint" },
  { value: "−12.8%", label: "Worst drop", tone: "text-coral" },
  { value: "$482K", label: "In vault", tone: "text-ink" },
  { value: "124", label: "Crew", tone: "text-ink" },
  { value: "10 of 14", label: "Months in profit", tone: "text-ink" },
];

const trades = [
  { side: "Bought", asset: "SOL", size: "$2,680", when: "2 min ago" },
  { side: "Sold", asset: "JUP", size: "$940", when: "3 h ago" },
  { side: "Bought", asset: "JTO", size: "$610", when: "Yesterday" },
  { side: "Sold", asset: "BONK", size: "$1,120", when: "2 days ago" },
  { side: "Bought", asset: "BTC", size: "$3,400", when: "4 days ago" },
];

const holdings = [
  { asset: "SOL", name: "Solana", weight: 58 },
  { asset: "USDC", name: "US Dollar Coin", weight: 24 },
  { asset: "BTC", name: "Bitcoin", weight: 12 },
  { asset: "ETH", name: "Ether", weight: 6 },
];

const updates = [
  {
    when: "Today",
    text: "SOL looks stronger than the market this week. I’m moving a third of the vault into it.",
  },
  {
    when: "Monday",
    text: "Took profit on JUP after the run. Holding more cash until the market settles.",
  },
  {
    when: "Last week",
    text: "Kept the vault light through the dip. Worst day was −2.1%.",
  },
];

/** 90 days of a sample vault, drawn to scale with its labelled axis. */
function PerformanceChart() {
  const id = useId();
  const values = series(7, 42.8, 44);
  const W = 640;
  const H = 260;
  const pad = { left: 48, right: 12, top: 12, bottom: 28 };
  const min = -10;
  const max = 50;
  const x = (i: number) => pad.left + (i / (values.length - 1)) * (W - pad.left - pad.right);
  const y = (v: number) => pad.top + ((max - v) / (max - min)) * (H - pad.top - pad.bottom);
  const line = values
    .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ");
  const axis = ["90 days ago", "60 days ago", "30 days ago", "Today"];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Vault value up 42.8% over 90 days"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16805E" stopOpacity="0.16" />
          <stop offset="1" stopColor="#16805E" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 20, 40].map((tick) => (
        <g key={tick}>
          <line x1={pad.left} x2={W - pad.right} y1={y(tick)} y2={y(tick)} stroke="#E3EAF1" />
          <text x={pad.left - 10} y={y(tick) + 4} textAnchor="end" fontSize="11" fill="#64758B">
            {tick > 0 ? `+${tick}%` : "0%"}
          </text>
        </g>
      ))}
      {axis.map((label, i) => (
        <text
          key={label}
          x={pad.left + (i / 3) * (W - pad.left - pad.right)}
          y={H - 6}
          textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}
          fontSize="11"
          fill="#64758B"
        >
          {label}
        </text>
      ))}
      <path
        d={`${line} L${x(values.length - 1)} ${y(min)} L${x(0)} ${y(min)} Z`}
        fill={`url(#${id})`}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#16805E"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.45, 0, 0.55, 1] }}
      />
      <circle
        cx={x(values.length - 1)}
        cy={y(values[values.length - 1])}
        r="5"
        fill="#FFFFFF"
        stroke="#16805E"
        strokeWidth="2"
      />
    </svg>
  );
}

function TabPanel({ tab }: { tab: Tab }) {
  if (tab === "Performance") {
    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <PerformanceChart />
        <div className="flex flex-col gap-3">
          <span className="eyebrow text-brass-deep">Latest update</span>
          <blockquote className="font-display text-[1.25rem] leading-snug text-ink italic">
            “{updates[0].text}”
          </blockquote>
          <span className="text-sm text-muted">Atlas · {updates[0].when}</span>
        </div>
      </div>
    );
  }
  if (tab === "Holdings") {
    return (
      <ul className="flex flex-col gap-5">
        {holdings.map((holding) => (
          <li
            key={holding.asset}
            className="grid grid-cols-[6rem_minmax(0,1fr)_3.5rem] items-center gap-4"
          >
            <span className="flex flex-col">
              <b className="font-semibold text-ink">{holding.asset}</b>
              <span className="text-xs text-muted">{holding.name}</span>
            </span>
            <span className="h-2 overflow-hidden rounded-full bg-ice">
              <span
                className="block h-full rounded-full bg-brass"
                style={{ width: `${holding.weight}%` }}
              />
            </span>
            <span className="text-right text-ink tabular-nums">{holding.weight}%</span>
          </li>
        ))}
      </ul>
    );
  }
  if (tab === "Trades") {
    return (
      <ul className="flex flex-col">
        {trades.map((trade) => (
          <li
            key={`${trade.asset}-${trade.when}`}
            className="grid grid-cols-[minmax(0,1fr)_auto_7rem] items-center gap-4 border-b border-line py-3.5 last:border-b-0"
          >
            <span>
              <span className={trade.side === "Bought" ? "text-mint" : "text-coral"}>
                {trade.side}
              </span>{" "}
              <b className="font-semibold text-ink">{trade.asset}</b>
            </span>
            <span className="text-ink-soft tabular-nums">{trade.size}</span>
            <span className="text-right text-sm text-muted">{trade.when}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {updates.map((update) => (
        <li key={update.when} className="flex flex-col gap-3 rounded-2xl bg-pearl p-5">
          <span className="text-xs text-muted">{update.when}</span>
          <p className="font-display text-xl leading-snug text-ink italic">“{update.text}”</p>
        </li>
      ))}
    </ul>
  );
}

export function CaptainProfile() {
  const [tab, setTab] = useState<Tab>("Performance");

  return (
    <Section tone="ice" className="py-24 md:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Before you join"
          title={
            <>
              See everything <em>a Captain does.</em>
            </>
          }
          lede="Every Captain has a public profile: returns, holdings, each trade and their own notes."
        />

        <Reveal className="overflow-hidden rounded-panel panel">
          <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:p-8">
            <Image
              src="/captains/atlas.webp"
              alt="Portrait of Atlas"
              width={72}
              height={72}
              className="size-18 rounded-2xl object-cover ring-1 ring-brass/50"
            />
            <div className="flex flex-1 flex-col gap-1">
              <span className="flex items-center gap-3 font-display text-[1.75rem] leading-none text-ink">
                Atlas <Insignia rank="Admiral" />
              </span>
              <span className="text-sm text-muted">
                Admiral · Solana Momentum · Trading for 14 months · Medium risk
              </span>
            </div>
            <div className="flex gap-3">
              <ButtonLink href="#join" variant="outline" size="md">
                Save
              </ButtonLink>
              <ButtonLink href="#join" size="md">
                Join Atlas
              </ButtonLink>
            </div>
          </div>

          <dl className="grid grid-cols-2 border-t border-line md:grid-cols-5">
            {profileStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 border-line px-6 py-5 not-last:border-r md:px-8"
              >
                <dt className="order-2 text-xs text-muted">{stat.label}</dt>
                <dd className={cn("order-1 font-display text-[1.5rem] tabular-nums", stat.tone)}>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div
            role="tablist"
            aria-label="Captain profile"
            className="flex gap-8 overflow-x-auto border-y border-line px-6 md:px-8"
          >
            {tabs.map((name) => (
              <button
                key={name}
                type="button"
                role="tab"
                id={`profile-tab-${name}`}
                aria-selected={tab === name}
                aria-controls="profile-panel"
                onClick={() => setTab(name)}
                className={cn(
                  "relative py-4 text-sm font-semibold whitespace-nowrap transition-colors",
                  tab === name ? "text-ink" : "text-muted hover:text-ink-soft",
                )}
              >
                {name}
                {tab === name && (
                  <motion.span
                    layoutId="profile-tab-line"
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brass"
                  />
                )}
              </button>
            ))}
          </div>

          <div
            id="profile-panel"
            role="tabpanel"
            aria-labelledby={`profile-tab-${tab}`}
            className="min-h-[21rem] p-6 md:p-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <TabPanel tab={tab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
        <p className="text-xs text-muted">
          Sample Captain. Figures are illustrative before launch.
        </p>
      </Container>
    </Section>
  );
}
