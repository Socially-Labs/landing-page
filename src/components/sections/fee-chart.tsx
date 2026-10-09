"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";

/** One sample year of a vault, per $1,000 invested. Uses the spec's $1,180 → $1,300 example. */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
const VALUES = [1000, 1060, 1120, 1180, 1110, 1040, 1090, 1150, 1180, 1240, 1300];
const FEE_RATE = 0.1;

const HIGH_WATER: number[] = [];
const FEES: number[] = [];
const FEES_SO_FAR: number[] = [];
{
  let high = VALUES[0];
  let total = 0;
  VALUES.forEach((value, i) => {
    let fee = 0;
    if (i > 0 && value > high) {
      fee = (value - high) * FEE_RATE;
      high = value;
    }
    total += fee;
    HIGH_WATER.push(high);
    FEES.push(fee);
    FEES_SO_FAR.push(total);
  });
}

const W = 640;
const H = 270;
const PAD = { left: 56, right: 18, top: 16, bottom: 34 };
const Y_MIN = 960;
const Y_MAX = 1340;
const TICKS = [1000, 1100, 1200, 1300];
const LAST = VALUES.length - 1;

const x = (i: number) => PAD.left + (i * (W - PAD.left - PAD.right)) / LAST;
const y = (v: number) => PAD.top + ((Y_MAX - v) / (Y_MAX - Y_MIN)) * (H - PAD.top - PAD.bottom);
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function linePath(from: number, to: number) {
  let d = "";
  for (let i = from; i <= to; i++) d += `${i === from ? "M" : " L"}${x(i)} ${y(VALUES[i])}`;
  return d;
}

function highWaterPath(to: number) {
  let d = `M${x(0)} ${y(HIGH_WATER[0])}`;
  for (let i = 1; i <= to; i++) d += ` H${x(i)} V${y(HIGH_WATER[i])}`;
  return d;
}

/** Shaded stretches spent below the high-water mark, where no fee is charged. */
function recoveryAreas(to: number) {
  const areas: string[] = [];
  for (let a = 1; a <= to; a++) {
    if (VALUES[a] >= HIGH_WATER[a]) continue;
    let b = a;
    while (b + 1 <= to && VALUES[b + 1] < HIGH_WATER[b + 1]) b++;
    const start = a - 1;
    const end = Math.min(b + 1, to);
    let d = "";
    for (let k = start; k <= end; k++) d += `${k === start ? "M" : " L"}${x(k)} ${y(VALUES[k])}`;
    d += ` L${x(end)} ${y(HIGH_WATER[start])} L${x(start)} ${y(HIGH_WATER[start])} Z`;
    areas.push(d);
    a = b;
  }
  return areas;
}

function noteFor(month: number) {
  if (month === 0)
    return "Deposit month. The starting value of $1,000 is the first high-water mark.";
  const fee = FEES[month];
  const previousHigh = HIGH_WATER[month - 1];
  if (fee > 0 && month === LAST)
    return "A new high of $1,300. Profit above the old $1,180 high is $120 over two months, so the fee is $12.";
  if (fee > 0 && previousHigh === 1180 && month > 3)
    return "Past the old $1,180 high for the first time since April. Only the $60 above it is charged: $6.";
  if (fee > 0)
    return `A new high. The fee is 10% of the ${money(VALUES[month] - previousHigh)} of new profit: ${money(fee)}.`;
  if (VALUES[month] === HIGH_WATER[month])
    return "Back to $1,180, the previous high. Recovering the loss charges nothing.";
  return `Below the ${money(HIGH_WATER[month])} high-water mark. No fee while the vault recovers.`;
}

export function FeeChart() {
  const [month, setMonth] = useState(LAST);
  const titleId = useId();

  const stats = [
    { label: "Vault value", value: money(VALUES[month]) },
    { label: "High-water mark", value: money(HIGH_WATER[month]) },
    { label: "Fee this month", value: money(FEES[month]), fee: true },
    { label: "Fees so far", value: money(FEES_SO_FAR[month]), fee: true },
  ];

  return (
    <div className="flex flex-col gap-5">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={titleId} className="h-auto w-full">
        <title id={titleId}>
          Sample vault value per $1,000 invested, with its high-water mark and the months where a
          fee applies.
        </title>
        {TICKS.map((tick) => (
          <g key={tick}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(tick)} y2={y(tick)} stroke="#E3EAF1" />
            <text x={PAD.left - 10} y={y(tick) + 4} textAnchor="end" fill="#64758B" fontSize="11">
              {money(tick)}
            </text>
          </g>
        ))}
        {MONTHS.map((label, i) => (
          <text key={label} x={x(i)} y={H - 12} textAnchor="middle" fill="#64758B" fontSize="11">
            {label}
          </text>
        ))}
        {recoveryAreas(month).map((d) => (
          <path key={d} d={d} fill="#AF4854" fillOpacity="0.09" />
        ))}
        <path
          d={highWaterPath(month)}
          fill="none"
          stroke="#B8935A"
          strokeWidth="1.6"
          strokeDasharray="5 4"
        />
        {month < LAST && (
          <path
            d={linePath(month, LAST)}
            fill="none"
            stroke="#182B43"
            strokeOpacity="0.18"
            strokeWidth="2"
          />
        )}
        <motion.path
          d={linePath(0, month)}
          fill="none"
          stroke="#182B43"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.45, 0, 0.55, 1] }}
        />
        {VALUES.map((value, i) =>
          i > 0 && i <= month && FEES[i] > 0 ? (
            <g key={MONTHS[i]}>
              <line
                x1={x(i - 1)}
                y1={y(VALUES[i - 1])}
                x2={x(i)}
                y2={y(value)}
                stroke="#16805E"
                strokeWidth="5"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
              <text
                x={(x(i - 1) + x(i)) / 2 - 6}
                y={y((VALUES[i - 1] + value) / 2) - 10}
                textAnchor="middle"
                fill="#16805E"
                fontSize="11"
                fontWeight="600"
              >
                {money(FEES[i])}
              </text>
            </g>
          ) : null,
        )}
        {VALUES[month] < HIGH_WATER[month] && (
          <text
            x={x(month) - 10}
            y={y(HIGH_WATER[month]) - 8}
            textAnchor="end"
            fill="#926536"
            fontSize="11"
            fontWeight="600"
          >
            High-water mark {money(HIGH_WATER[month])}
          </text>
        )}
        <circle
          cx={x(month)}
          cy={y(VALUES[month])}
          r="6"
          fill="#FFFFFF"
          stroke="#182B43"
          strokeWidth="2.4"
        />
      </svg>

      <div className="flex flex-col gap-2">
        <label htmlFor="fee-month" className="flex justify-between text-sm text-ink-soft">
          <span>Drag through a sample year</span>
          <span className="font-semibold text-ink">{MONTHS[month]}</span>
        </label>
        <input
          id="fee-month"
          type="range"
          min={0}
          max={LAST}
          step={1}
          value={month}
          onChange={(event) => setMonth(Number(event.target.value))}
          className="h-8 w-full accent-ink"
        />
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 rounded-2xl bg-white/60 px-4 py-3">
            <dt className="text-xs text-ink-soft">{stat.label}</dt>
            <dd
              className={`font-display text-[1.75rem] leading-none font-semibold tabular-nums ${stat.fee ? "text-mint" : "text-ink"}`}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      <p
        aria-live="polite"
        className="rounded-2xl bg-steel-tint px-4 py-3 text-[0.9375rem] text-ink"
      >
        {noteFor(month)}
      </p>
    </div>
  );
}
