import { Check, TrendingDown, X } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/** Sample vault value in $K over 12 weeks: peaks at $100K, crosses the $70K breaker in week 10. */
const WEEKS = [92, 96, 100, 97, 93, 88, 84, 79, 74, 70, 68.5, 69.5];
const BREAKER = 70;
const W = 588;
const H = 240;
const PAD = { left: 52, right: 12, top: 12, bottom: 28 };
const x = (i: number) => PAD.left + (i * (W - PAD.left - PAD.right)) / (WEEKS.length - 1);
const y = (v: number) => PAD.top + ((105 - v) / (105 - 60)) * (H - PAD.top - PAD.bottom);
const breach = WEEKS.findIndex((v) => v <= BREAKER);
const path = (from: number, to: number) =>
  WEEKS.slice(from, to + 1)
    .map((v, i) => `${i === 0 ? "M" : "L"}${x(from + i)} ${y(v)}`)
    .join(" ");

function BreakerChart() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Vault value peaks at $100,000 and falls to $68,500, crossing the $70,000 breaker in week 10"
      className="h-auto w-full"
    >
      {[100, 90, 80, 70].map((tick) => (
        <g key={tick}>
          {tick !== BREAKER && (
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="rgb(213 229 245 / 0.14)"
            />
          )}
          <text
            x={PAD.left - 8}
            y={y(tick) + 4}
            textAnchor="end"
            fontSize="11"
            fill={tick === BREAKER ? "#FFC2C9" : "#B8CADC"}
          >
            ${tick}K
          </text>
        </g>
      ))}
      <line
        x1={PAD.left}
        x2={W - PAD.right}
        y1={y(BREAKER)}
        y2={y(BREAKER)}
        stroke="#FF9EA9"
        strokeWidth="1.4"
        strokeDasharray="6 5"
      />
      <text x={PAD.left + 8} y={y(BREAKER) + 26} fontSize="11.5" fontWeight="600" fill="#FFC2C9">
        Breaker · 30% below the $100K peak
      </text>
      <path
        d={path(0, breach)}
        fill="none"
        stroke="#D5E5F5"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={path(breach, WEEKS.length - 1)}
        fill="none"
        stroke="#FF9EA9"
        strokeWidth="2.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={x(2)} cy={y(100)} r="4.5" fill="#0A182A" stroke="#D5E5F5" strokeWidth="2" />
      <text x={x(2) + 12} y={y(100) - 6} fontSize="11.5" fill="#DCE5EF">
        Peak $100,000
      </text>
      <circle
        cx={x(breach)}
        cy={y(WEEKS[breach])}
        r="5"
        fill="#0A182A"
        stroke="#FF9EA9"
        strokeWidth="2.2"
      />
      <text x={PAD.left} y={H - 6} fontSize="11" fill="#8FA3BC">
        Week 1
      </text>
      <text x={W - PAD.right} y={H - 6} textAnchor="end" fontSize="11" fill="#8FA3BC">
        Week 12
      </text>
    </svg>
  );
}

const allowed = ["Sell positions", "Reduce exposure", "Return to cash"];
const blocked = ["Open new risk", "Increase risky positions"];

const exitSteps = [
  { title: "Cash share", body: "Comes back to your wallet straight away." },
  { title: "Token share", body: "Queued and sold by the Captain." },
  { title: "Deadline", body: "If anything is still unsold, the program sells it." },
];

export function Storm() {
  return (
    <Section id="risk" tone="dark" className="py-28 md:py-40">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
        <div className="flex flex-col gap-8">
          <SectionHeading
            tone="night"
            eyebrow="Storm protocol"
            title="When the weather turns, the vault battens down."
            lede="If a vault falls 30% below its peak, the program freezes new risk. The Captain can still sell, reduce exposure and move to cash. The Crew gets an alert straight away."
          />
          <Reveal className="flex max-w-sm items-start gap-3 rounded-[22px] px-4 py-3.5 text-ink shadow-lift glass">
            <span className="grid size-[34px] flex-none place-items-center rounded-full bg-coral-tint text-coral">
              <TrendingDown aria-hidden className="size-4" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Horizon Growth froze new risk</span>
              <span className="text-[0.8125rem] text-ink-soft">
                Drawdown reached 30% from its peak · Sample
              </span>
            </span>
          </Reveal>
        </div>

        <Reveal className="flex flex-col gap-5 rounded-[28px] p-5 text-on-navy shadow-navy glass-dark md:p-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-semibold">Horizon Growth</span>
              <span className="text-[0.8125rem] text-on-navy-muted">
                Sample vault · value over 12 weeks
              </span>
            </div>
            <span className="rounded-full border border-coral-glow/40 bg-coral-glow/15 px-3 py-1.5 text-[0.8125rem] font-semibold text-[#ffc2c9]">
              New risk frozen
            </span>
          </div>
          <BreakerChart />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2.5 rounded-[18px] border border-on-navy/15 bg-on-navy/5 p-4">
              <span className="eyebrow text-on-navy-muted">Still allowed</span>
              {allowed.map((item) => (
                <span key={item} className="flex items-center gap-2.5">
                  <Check aria-hidden className="size-4 text-mint-glow" strokeWidth={3} />
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2.5 rounded-[18px] border border-on-navy/15 bg-on-navy/5 p-4">
              <span className="eyebrow text-on-navy-muted">Blocked</span>
              {blocked.map((item) => (
                <span key={item} className="flex items-center gap-2.5">
                  <X aria-hidden className="size-4 text-coral-glow" strokeWidth={3} />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <p className="text-[0.8125rem] text-on-navy-muted">
            Example threshold and sample values. Each vault’s rules set its own breaker.
          </p>
        </Reveal>
      </Container>

      <Container className="mt-20">
        <Reveal className="grid gap-8 rounded-[28px] p-6 text-on-navy glass-dark md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="flex flex-col gap-3">
            <p className="eyebrow text-on-navy-muted">Leaving port</p>
            <h3 className="font-display text-[2.5rem] leading-tight font-semibold">
              Leave when you choose.
            </h3>
            <p className="max-w-[32rem] text-on-navy-soft">
              Ask to leave and your share of the vault’s cash comes back straight away. Your share
              of any tokens is sold for you first, so that part can take a little longer.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-3">
            {exitSteps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col gap-2 rounded-[18px] border border-on-navy/15 bg-on-navy/5 p-4"
              >
                <span className="grid size-7 place-items-center rounded-full bg-on-navy text-xs font-semibold text-ink">
                  {index + 1}
                </span>
                <span className="font-semibold">{step.title}</span>
                <span className="text-[0.875rem]/snug text-on-navy-soft">{step.body}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
