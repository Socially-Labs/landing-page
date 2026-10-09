"use client";

import { type CSSProperties, useId, useState } from "react";

const FEE = 0.1;
const CAPTAIN_SHARE = 0.8;

/** Whole dollars stay whole; anything with cents shows both digits. */
function usd(value: number) {
  const cents = Math.round(value * 100) / 100;
  return `$${cents.toLocaleString(
    "en-US",
    Number.isInteger(cents)
      ? { maximumFractionDigits: 0 }
      : { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  )}`;
}

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-ink-soft">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-[1.5rem] leading-none text-ink">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ "--fill": `${fill}%` } as CSSProperties}
        className="range-brass"
      />
    </div>
  );
}

/** Try the fee: pick an amount and how much the vault grows, see what's paid and what's kept. */
export function FeeCalculator() {
  const [amount, setAmount] = useState(1000);
  const [growth, setGrowth] = useState(10);

  const profit = (amount * growth) / 100;
  const fee = profit * FEE;
  const kept = amount + profit - fee;

  return (
    <div className="flex flex-col gap-6 rounded-card bg-white p-6 shadow-soft ring-1 ring-line">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-brass-deep">Try it</span>
        <span className="text-xs text-muted">Sample growth, not a forecast</span>
      </div>

      <div className="flex flex-col gap-4">
        <Slider
          label="You put in"
          value={amount}
          display={usd(amount)}
          min={100}
          max={10000}
          step={100}
          onChange={setAmount}
        />
        <Slider
          label="Your vault grows by"
          value={growth}
          display={`${growth}%`}
          min={0}
          max={50}
          step={1}
          onChange={setGrowth}
        />
      </div>

      <dl className="flex flex-col border-t border-line text-[0.9375rem]">
        <div className="flex items-baseline justify-between py-3">
          <dt className="text-ink-soft">New profit</dt>
          <dd className="text-ink tabular-nums">{usd(profit)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line py-3">
          <dt className="text-ink-soft">Fee, 10% of new profit</dt>
          <dd className="text-ink tabular-nums">{fee > 0 ? `−${usd(fee)}` : "$0"}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-3">
          <dt className="font-semibold text-ink">You keep</dt>
          <dd className="font-display text-[1.75rem] leading-none text-mint tabular-nums">
            {usd(kept)}
          </dd>
        </div>
      </dl>

      <p className="rounded-xl bg-pearl px-4 py-3 text-sm text-ink-soft">
        {fee > 0 ? (
          <>
            Of the {usd(fee)} fee, the Captain gets{" "}
            <b className="font-semibold text-ink">{usd(fee * CAPTAIN_SHARE)}</b> and Socially gets{" "}
            <b className="font-semibold text-ink">{usd(fee * (1 - CAPTAIN_SHARE))}</b>.
          </>
        ) : (
          "No new profit, so nobody is paid. Not the Captain, not Socially."
        )}
      </p>
    </div>
  );
}
