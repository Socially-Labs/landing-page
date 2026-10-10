"use client";

import { Check, KeyRound, Users } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { Insignia } from "@/components/ornaments/insignia";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sparkline } from "@/components/ui/sparkline";
import { cn } from "@/lib/cn";
import { series } from "@/lib/sample-data";

const EASE = [0.16, 1, 0.3, 1] as const;
const ONCE = { once: true, amount: 0.6 } as const;

/** The white card every fragment of app UI sits on. */
function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-[20px] bg-white shadow-lift ring-1 ring-ink/[0.06]", className)}>
      {children}
    </div>
  );
}

function Portrait({ id, className }: { id: string; className?: string }) {
  return (
    <Image
      src={`/captains/${id}.webp`}
      alt=""
      width={44}
      height={44}
      className={cn("size-9 flex-none rounded-full object-cover", className)}
    />
  );
}

/* ---------- The fragments ---------- */

const atlasLine = series(7, 42.8, 30);

function CaptainProfile() {
  return (
    <div className="relative flex flex-col gap-4">
      <Card className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Portrait id="atlas" className="size-11 rounded-xl" />
          <div className="flex min-w-0 flex-col">
            <span className="flex items-center gap-2 font-display text-xl leading-tight text-ink">
              Atlas <Insignia rank="Admiral" className="size-5 text-[0.6rem]" />
            </span>
            <span className="truncate text-xs text-muted">Solana Momentum · 14 months</span>
          </div>
        </div>
        <dl className="grid grid-cols-4 gap-3 border-y border-line py-4">
          {[
            { label: "90-day return", value: "+42.8%", tone: "text-mint" },
            { label: "Worst drop", value: "−12.8%", tone: "text-coral" },
            { label: "In vault", value: "$482K", tone: "text-ink" },
            { label: "Crew", value: "124", tone: "text-ink" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="text-[0.6875rem] leading-tight text-muted">{stat.label}</dt>
              <dd className={cn("font-display text-lg leading-none tabular-nums", stat.tone)}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={ONCE}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Sparkline values={atlasLine} area className="h-24 w-full text-brass-deep" />
        </motion.div>
      </Card>
      <Card className="ml-8 flex flex-col gap-2 p-5 sm:ml-14">
        <span className="eyebrow text-[0.625rem] text-brass-deep">Latest update</span>
        <p className="font-display text-[1.0625rem] leading-snug text-ink italic">
          “SOL looks stronger than the market this week. I’m moving a third of the vault into it.”
        </p>
        <span className="text-xs text-muted">Atlas · Today</span>
      </Card>
    </div>
  );
}

const alerts = [
  { id: "atlas", who: "Atlas", what: "bought SOL", note: "A third of the vault", when: "now" },
  {
    id: "atlas",
    who: "Atlas",
    what: "posted an update",
    note: "Why I’m moving into SOL",
    when: "1m",
  },
  { id: "solstice", who: "Solstice", what: "sold JUP", note: "Taking profit", when: "9m" },
];

function Alerts() {
  return (
    <div className="relative h-36">
      {alerts.map((alert, index) => (
        <motion.div
          key={alert.what}
          className="absolute inset-x-0 top-0"
          style={{ zIndex: alerts.length - index }}
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1 - index * 0.25, y: index * 14, scale: 1 - index * 0.05 }}
          viewport={ONCE}
          transition={{ delay: 0.15 + (alerts.length - index) * 0.12, duration: 0.8, ease: EASE }}
        >
          <Card className="flex items-center gap-3 px-4 py-3.5">
            <Portrait id={alert.id} />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm text-ink-soft">
                <b className="font-semibold text-ink">{alert.who}</b> {alert.what}
              </span>
              <span className="truncate text-xs text-muted">{alert.note}</span>
            </div>
            <span className="text-xs text-muted">{alert.when}</span>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

const vaults = [
  { id: "atlas", name: "Atlas", amount: "$4,230.50", change: "+5.8%", share: "40%" },
  { id: "solstice", name: "Solstice", amount: "$3,980.10", change: "+4.7%", share: "38%" },
  { id: "northstar", name: "Northstar", amount: "$2,291.60", change: "+4.2%", share: "22%" },
];

function Portfolio() {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted">Portfolio value</span>
          <span className="font-display text-[1.75rem] leading-none text-ink tabular-nums">
            $10,502.20
          </span>
        </div>
        <span className="text-sm font-medium text-mint tabular-nums">+$320.18 · 30D</span>
      </div>
      <ul className="flex flex-col gap-3 border-t border-line pt-4">
        {vaults.map((vault) => (
          <li key={vault.id} className="flex items-center gap-3">
            <Portrait id={vault.id} className="size-8" />
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-ink">{vault.name}</span>
                <span className="text-ink tabular-nums">{vault.amount}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-line">
                <motion.span
                  className="block h-full rounded-full bg-brass"
                  initial={{ width: 0 }}
                  whileInView={{ width: vault.share }}
                  viewport={ONCE}
                  transition={{ delay: 0.3, duration: 1.2, ease: EASE }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function SignIn() {
  return (
    <Card className="flex flex-col gap-3 p-5">
      <span className="font-display text-lg leading-tight text-ink">Welcome aboard</span>
      <span className="rounded-xl bg-pearl px-3.5 py-2.5 text-sm text-muted ring-1 ring-line">
        you@example.com
      </span>
      <span className="rounded-xl bg-navy px-3.5 py-2.5 text-center text-sm font-semibold text-white">
        Continue
      </span>
      <span className="flex items-center justify-center gap-1.5 text-xs text-muted">
        <KeyRound aria-hidden className="size-3.5 text-brass-deep" />
        No seed phrase to keep
      </span>
    </Card>
  );
}

function Roles() {
  return (
    <Card className="flex flex-col gap-2.5 p-4">
      {[
        { title: "Join as Crew", body: "Follow a Captain’s trades", chosen: true },
        { title: "Become a Captain", body: "Lead your own Crew", chosen: false },
      ].map((role) => (
        <div
          key={role.title}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3.5 py-3 ring-1",
            role.chosen ? "bg-ice ring-navy/30" : "ring-line",
          )}
        >
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-semibold text-ink">{role.title}</span>
            <span className="text-xs text-muted">{role.body}</span>
          </div>
          <span
            className={cn(
              "grid size-5 place-items-center rounded-full",
              role.chosen ? "bg-navy text-white" : "ring-1 ring-ink/20",
            )}
          >
            {role.chosen && <Check aria-hidden className="size-3" strokeWidth={3} />}
          </span>
        </div>
      ))}
    </Card>
  );
}

function Dashboard() {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted">Assets under management</span>
        <span className="font-display text-[1.75rem] leading-none text-ink tabular-nums">
          $648,000
        </span>
        <span className="text-xs font-medium text-mint tabular-nums">+3.98% · 30D</span>
      </div>
      <div className="grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
        <span className="flex items-center gap-2 text-ink-soft">
          <Users aria-hidden className="size-4 text-brass-deep" />
          <b className="font-semibold text-ink">232</b> Crew
        </span>
        <span className="text-ink-soft">
          <b className="font-semibold text-ink">$1,248</b> earned
        </span>
      </div>
    </Card>
  );
}

/* ---------- The grid ---------- */

const tiles: {
  eyebrow: string;
  title: string;
  body: string;
  visual: ReactNode;
  span: string;
  /** Lets a fragment run off the bottom edge, so the tile reads as a window onto the app */
  bleed?: boolean;
}[] = [
  {
    eyebrow: "Before you join",
    title: "See everything a Captain does",
    body: "Their return beside their worst drop, the size of the vault and its Crew, and their own notes on each move.",
    visual: <CaptainProfile />,
    span: "lg:col-span-3 lg:row-span-2",
  },
  {
    eyebrow: "Trade alerts",
    title: "Know the moment they move",
    body: "Every trade your Captain makes lands as an alert, with a note on why.",
    visual: <Alerts />,
    span: "lg:col-span-3",
  },
  {
    eyebrow: "Your portfolio",
    title: "Every vault, in one view",
    body: "Your share of each Captain’s vault, updated as they trade.",
    visual: <Portfolio />,
    span: "lg:col-span-3",
    bleed: true,
  },
  {
    eyebrow: "Sign up",
    title: "Email in, wallet ready",
    body: "No extension and no seed phrase. The wallet is yours.",
    visual: <SignIn />,
    span: "lg:col-span-2",
    bleed: true,
  },
  {
    eyebrow: "Your place aboard",
    title: "Crew or Captain",
    body: "Follow a Captain, or build a record and lead your own Crew.",
    visual: <Roles />,
    span: "lg:col-span-2",
    bleed: true,
  },
  {
    eyebrow: "For Captains",
    title: "Run your vault",
    body: "Your Crew, your earnings and your vaults, in one place.",
    visual: <Dashboard />,
    span: "lg:col-span-2",
    bleed: true,
  },
];

/** What the app does, as a bento of small pieces of its interface with sample figures. */
export function InsideApp() {
  return (
    <Section className="py-24 md:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Inside the app"
          title={
            <>
              Everything on deck, <em>in your pocket.</em>
            </>
          }
          lede="What you’ll see in the Socially app. Figures are samples before launch."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {tiles.map((tile, index) => (
            <Reveal
              key={tile.title}
              delay={(index % 3) * 0.06}
              className={cn(
                "flex flex-col gap-7 overflow-hidden rounded-panel bg-[linear-gradient(165deg,#f9fbfd_0%,#eef3f9_100%)] p-6 ring-1 ring-line sm:p-7",
                tile.span,
                index === 0 && "md:col-span-2",
              )}
            >
              <div className="flex flex-col gap-2">
                <span className="eyebrow text-[0.6875rem] text-brass-deep">{tile.eyebrow}</span>
                <h3 className="font-display text-[1.5rem] leading-tight text-ink">{tile.title}</h3>
                <p className="max-w-[28rem] text-[0.9375rem]/relaxed text-ink-soft">{tile.body}</p>
              </div>
              <div className={cn("mt-auto", tile.bleed && "-mb-10 sm:-mb-12")}>{tile.visual}</div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
