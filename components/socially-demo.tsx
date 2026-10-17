"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/visuals";
import { BrandEmblem, SociallyLogo } from "@/components/socially-brand";

const steps: { title: string; copy: string; icon: IconName }[] = [
  {
    title: "Sign up in a minute",
    copy: "Use email or Google. There’s no seed phrase to write down and no extension to install.",
    icon: "people",
  },
  { title: "Add money", copy: "No wallets to set up and no charts to learn.", icon: "coins" },
  {
    title: "Pick your Captain",
    copy: "Choose who trades for you, then follow along.",
    icon: "compass",
  },
  {
    title: "Watch every trade",
    copy: "Every trade your Captain makes lands as an alert, with a note on why.",
    icon: "activity",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  return (
    <div className="how-layout">
      <div
        className="how-steps"
        role="tablist"
        aria-label="How Socially works"
        aria-orientation="vertical"
      >
        {steps.map((step, i) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            id={`step-tab-${i}`}
            aria-controls="step-preview"
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            className={`how-step ${active === i ? "is-active" : ""}`}
            onClick={() => setActive(i)}
            onKeyDown={(event) => {
              let next = i;
              if (event.key === "ArrowDown" || event.key === "ArrowRight")
                next = (i + 1) % steps.length;
              else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
                next = (i + steps.length - 1) % steps.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = steps.length - 1;
              else return;
              event.preventDefault();
              setActive(next);
              document.getElementById(`step-tab-${next}`)?.focus();
            }}
          >
            <span className="step-indicator">
              <Icon name={step.icon} />
            </span>
            <span>
              <span className="step-label">
                <span className="step-index">0{i + 1}</span>
                {step.title}
              </span>
              <span className="step-copy">{step.copy}</span>
            </span>
          </button>
        ))}
      </div>
      <div
        className="demo-stage"
        role="tabpanel"
        id="step-preview"
        aria-labelledby={`step-tab-${active}`}
        tabIndex={0}
      >
        <div className="demo-orbit orbit-one" />
        <div className="demo-orbit orbit-two" />
        <div className="demo-phone">
          <div className="demo-status">
            <span>9:41</span>
            <span className="demo-island" />
            <span>▰ ▮</span>
          </div>
          <div className="demo-phone-content" key={active}>
            <div className="demo-brand">
              <BrandEmblem size={20} /> socially
            </div>
            {active === 0 && (
              <>
                <div className="demo-welcome-symbol">
                  <SociallyLogo size={56} />
                </div>
                <h3>Welcome aboard</h3>
                <p>No extension and no seed phrase. The wallet is yours.</p>
                <div className="demo-input">you@example.com</div>
                <a className="pill-button" href="#early-access">
                  Continue <Icon name="arrow" />
                </a>
                <span className="demo-footnote">
                  <Icon name="shield" /> No seed phrase to keep
                </span>
              </>
            )}
            {active === 1 && (
              <>
                <span className="demo-kicker">Your portfolio</span>
                <h3>
                  Every vault,
                  <br />
                  in one view
                </h3>
                <div className="demo-balance">
                  <span>Portfolio value</span>
                  <strong>$10,502.20</strong>
                  <small>+$320.18 · 30D</small>
                  <Sparkline />
                </div>
                <div className="demo-money">
                  <Icon name="coins" />
                  <span>Add money</span>
                  <Icon name="arrow" />
                </div>
                <span className="demo-footnote">Figures are samples before launch.</span>
              </>
            )}
            {active === 2 && (
              <>
                <span className="demo-kicker">Port of Captains</span>
                <h3>Pick your Captain</h3>
                <p>Every return sits beside its worst drop.</p>
                {captains.slice(0, 3).map((c) => (
                  <div className="demo-captain" key={c.name}>
                    <Avatar name={c.name} />
                    <span>
                      {c.name}
                      <small>{c.strategy}</small>
                    </span>
                    <strong>
                      {c.return}
                      <small>{c.drop} worst</small>
                    </strong>
                  </div>
                ))}
                <a href="#captains" className="demo-footnote">
                  Top Captains, side by side <Icon name="arrow" />
                </a>
              </>
            )}
            {active === 3 && (
              <>
                <span className="demo-kicker">Trade alerts</span>
                <h3>
                  Know the moment
                  <br />
                  they move
                </h3>
                <p>Every trade your Captain makes lands as an alert, with a note on why.</p>
                {[
                  ["Atlas", "bought SOL", "A third of the vault", "now"],
                  ["Atlas", "posted an update", "Why I’m moving into SOL", "1m"],
                  ["Solstice", "sold JUP", "Taking profit", "9m"],
                ].map(([name, action, note, time], i) => (
                  <div className="demo-alert" key={i}>
                    <Avatar name={name} />
                    <div>
                      <strong>
                        {name} <span>{action}</span>
                      </strong>
                      <small>{note}</small>
                    </div>
                    <time>{time}</time>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="demo-home-indicator" />
        </div>
      </div>
    </div>
  );
}

const captains = [
  {
    name: "Atlas",
    strategy: "Solana Momentum",
    rank: "Admiral",
    months: 14,
    return: "+42.8%",
    drop: "−12.8%",
    vault: "$482K",
    crew: 124,
    risk: "Medium",
    points: "0,47 15,40 25,44 38,29 47,34 59,23 72,29 84,15 96,20 108,7 120,0",
  },
  {
    name: "Nova",
    strategy: "Early Signals",
    rank: "New Captain",
    months: 5,
    return: "+32.6%",
    drop: "−18.7%",
    vault: "$78K",
    crew: 43,
    risk: "High",
    points: "0,44 13,36 26,46 39,24 52,34 65,10 78,22 91,5 104,15 120,0",
  },
  {
    name: "Solstice",
    strategy: "Balanced Horizons",
    rank: "Admiral",
    months: 22,
    return: "+24.6%",
    drop: "−0.3%",
    vault: "$1.24M",
    crew: 286,
    risk: "Low",
    points: "0,45 12,43 25,39 38,38 50,31 63,28 76,24 88,18 101,14 120,5",
  },
  {
    name: "Northstar",
    strategy: "Long View",
    rank: "Proven Captain",
    months: 28,
    return: "+19.2%",
    drop: "−12.5%",
    vault: "$860K",
    crew: 162,
    risk: "Medium",
    points: "0,45 15,40 28,34 40,40 54,26 65,31 78,23 90,16 103,20 120,6",
  },
  {
    name: "Bluewater",
    strategy: "DeFi Current",
    rank: "Proven Captain",
    months: 16,
    return: "+16.8%",
    drop: "−13.4%",
    vault: "$215K",
    crew: 98,
    risk: "Medium",
    points: "0,42 15,38 27,44 41,30 54,35 66,24 79,28 92,15 106,20 120,10",
  },
  {
    name: "Tide",
    strategy: "Steady Reserve",
    rank: "Proven Captain",
    months: 18,
    return: "+9.4%",
    drop: "−2.1%",
    vault: "$342K",
    crew: 112,
    risk: "Low",
    points: "0,43 16,40 30,38 45,33 60,31 75,27 90,23 105,20 120,16",
  },
];
export function Avatar({ name }: { name: string }) {
  return <span className={`captain-avatar avatar-${name.toLowerCase()}`} aria-hidden="true" />;
}
export function Sparkline({
  points = "0,43 12,41 24,30 36,34 48,22 60,26 72,14 84,20 96,9 108,13 120,3",
}: {
  points?: string;
}) {
  return (
    <svg className="sparkline" viewBox="0 0 120 50" fill="none" aria-hidden="true">
      <polyline
        points={points}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function CaptainGallery() {
  const [filter, setFilter] = useState("All");
  return (
    <>
      <div className="captain-toolbar">
        <span>
          Top Captains ranked by return over <strong>90 days</strong>
        </span>
        <div className="segmented-control" aria-label="Filter Captains by risk">
          {["All", "Low", "Medium", "High"].map((risk) => (
            <button key={risk} aria-pressed={filter === risk} onClick={() => setFilter(risk)}>
              {risk === "All" ? "All" : `${risk} risk`}
            </button>
          ))}
        </div>
      </div>
      <div className="captain-grid">
        {captains
          .filter((c) => filter === "All" || c.risk === filter)
          .map((c) => (
            <article className="captain-card" key={c.name}>
              <div className="captain-card-top">
                <Avatar name={c.name} />
                <div>
                  <h3>{c.name}</h3>
                  <span>{c.rank}</span>
                </div>
                <span className={`risk-label risk-${c.risk.toLowerCase()}`}>{c.risk} risk</span>
              </div>
              <p className="captain-strategy">
                {c.strategy} <span>· {c.months} months</span>
              </p>
              <div className="captain-performance">
                <div>
                  <span>90-day return</span>
                  <strong>{c.return}</strong>
                </div>
                <Sparkline points={c.points} />
              </div>
              <div className="captain-metrics">
                <div>
                  <span>Worst drop</span>
                  <strong>{c.drop}</strong>
                </div>
                <div>
                  <span>In vault</span>
                  <strong>{c.vault}</strong>
                </div>
                <div>
                  <span>Crew</span>
                  <strong>{c.crew}</strong>
                </div>
              </div>
            </article>
          ))}
      </div>
      <p className="sample-note">
        Sample Captains and figures before launch. Past returns don’t predict future results.
      </p>
    </>
  );
}

const values = [1000, 1040, 1120, 1090, 1030, 1110, 1240, 1190, 1100, 1200, 1270, 1300, 1340];
export function FeeExplorer() {
  const [month, setMonth] = useState(0);
  const high = Math.max(...values.slice(0, month + 1));
  const fee = (high - 1000) * 0.1;
  const points = values
    .map((value, i) => `${32 + i * 40},${190 - (value - 1000) * 0.43}`)
    .join(" ");
  const highPoints = values
    .map((_, i) => `${32 + i * 40},${190 - (Math.max(...values.slice(0, i + 1)) - 1000) * 0.43}`)
    .join(" ");
  return (
    <div className="fee-explorer">
      <div className="fee-explorer-head">
        <div>
          <h3>A sample year</h3>
          <p>$1,000 over twelve months. The fee only grows above the last high.</p>
        </div>
        <span className="sample-badge">Sample</span>
      </div>
      <div className="fee-readout" aria-live="polite">
        <div>
          <span>Month</span>
          <strong>{month}</strong>
        </div>
        <div>
          <span>Vault value</span>
          <strong>${values[month].toLocaleString("en-US")}</strong>
        </div>
        <div>
          <span>Last high</span>
          <strong>${high.toLocaleString("en-US")}</strong>
        </div>
        <div>
          <span>Fees paid</span>
          <strong>${fee.toFixed(0)}</strong>
        </div>
      </div>
      <svg
        className="fee-chart"
        viewBox="0 0 544 236"
        role="img"
        aria-label="Sample vault value over twelve months, with fees measured above the last high"
      >
        <defs>
          <linearGradient id="fee-fill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#1178f8" stopOpacity=".15" />
            <stop offset="1" stopColor="#1178f8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[60, 125, 190].map((y) => (
          <line key={y} x1="32" x2="512" y1={y} y2={y} stroke="#e6edf2" />
        ))}
        <polygon points={`32,210 ${points} 512,210`} fill="url(#fee-fill)" />
        <polyline
          points={highPoints}
          fill="none"
          stroke="#a3b3c1"
          strokeDasharray="5 5"
          strokeWidth="1.5"
        />
        <polyline
          points={points}
          fill="none"
          stroke="#1178f8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1={32 + month * 40}
          x2={32 + month * 40}
          y1="25"
          y2="210"
          stroke="#1178f8"
          strokeOpacity=".25"
        />
        <circle
          cx={32 + month * 40}
          cy={190 - (values[month] - 1000) * 0.43}
          r="5"
          fill="#1178f8"
          stroke="white"
          strokeWidth="3"
        />
        <g fill="#68747c" fontSize="11">
          <text x="32" y="231">
            Start
          </text>
          <text x="248" y="231">
            6 months
          </text>
          <text x="459" y="231">
            12 months
          </text>
        </g>
      </svg>
      <label htmlFor="fee-month" className="sr-only">
        Explore sample year by month
      </label>
      <input
        id="fee-month"
        type="range"
        min="0"
        max="12"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
      />
      <div className="chart-legend">
        <span>
          <i />
          Vault value
        </span>
        <span>
          <i />
          Last high, where fees are measured from
        </span>
      </div>
      <p className="sample-note">Sample figures, not a forecast.</p>
    </div>
  );
}
