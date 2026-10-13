import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  down: "M12 4v16m-6-6 6 6 6-6",
  plus: "M12 5v14M5 12h14",
  trend: "m3 17 6-6 4 4 8-10m-6 0h6v6",
  chart: "M5 20V10m7 10V4m7 16v-7",
  shield: "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6",
  pie: "M10 3a9 9 0 1 0 11 11H10V3Zm4-1v8h8a9 9 0 0 0-8-8Z",
  people:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.9M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8m8 .1a4 4 0 0 1 0 7.8",
  activity: "M3 12h4l3-8 4 16 3-8h4",
  vault:
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm7 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8m0 2v4m-2-2h4M6 7v3m0 4v3",
  coins:
    "M12 3c5 0 9 2 9 4s-4 4-9 4-9-2-9-4 4-4 9-4Zm-9 4v5c0 2 4 4 9 4s9-2 9-4V7M3 12v5c0 2 4 4 9 4s9-2 9-4v-5",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20m0-11v6m0-10v.01",
  compass: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20m4-16-2 8-8 2 2-8 8-2Z",
};
export type IconName = keyof typeof paths;
export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="icon"
    >
      <path d={paths[name]} />
    </svg>
  );
}
export function Brand({ small = false }: { small?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Socially home"
      className={`brand ${small ? "brand-small" : ""}`}
    >
      <Image src="/images/logo.png" alt="" width={64} height={64} />
      <span>
        <span className="wordmark">SOCIALLY</span>
        <span className="brand-tagline">JOIN THE VOYAGE</span>
      </span>
    </Link>
  );
}
export function Phone({
  screen,
  priority = false,
  className = "",
}: {
  screen: "discover" | "investment" | "crew-home" | "captain-home";
  priority?: boolean;
  className?: string;
}) {
  const titles = {
    discover:
      "Discover Captains and review strategies. Socially app, sample data.",
    investment:
      "Review USDC and estimated shares. Investment preview; no funds move.",
    "crew-home": "Crew portfolio with allocations and returns. Sample data.",
    "captain-home":
      "Captain dashboard with vault and Crew management. Sample data.",
  };
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">
        <Image
          src={`/images/${screen}.webp`}
          alt={titles[screen]}
          width={780}
          height={1688}
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 320px"
          preload={priority}
          className="screen-image"
        />
        <span className="phone-camera" />
      </div>
      <span className="phone-button" />
      <span className="phone-button phone-button-lower" />
    </div>
  );
}
export function Portrait({
  person,
  className = "",
}: {
  person: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`portrait portrait-${person} ${className}`}
    />
  );
}
export function PortraitCluster({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`portrait-cluster ${compact ? "cluster-compact" : ""}`}
      aria-hidden="true"
    >
      <svg className="connection-lines" viewBox="0 0 600 660" fill="none">
        <path d="M150 140C-30 240 90 550 320 570S640 450 510 150 250 120 150 140Z" />
        <circle cx="93" cy="329" r="5" />
        <circle cx="503" cy="143" r="5" />
        <circle cx="389" cy="562" r="5" />
      </svg>
      {[0, 1, 2, 3].map((p) => (
        <Portrait key={p} person={p} className={`cluster-card card-${p}`} />
      ))}
    </div>
  );
}
export function Feature({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="feature">
      <span className="feature-icon">
        <Icon name={icon} />
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
