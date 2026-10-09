import { useId } from "react";
import { cn } from "@/lib/cn";
import { EmblemMark } from "./emblem-mark";

const BLOB =
  "M49.8 0.0 L49.5 3.2 L48.1 6.3 L46.6 9.3 L45.5 12.2 L44.7 15.2 L43.6 18.1 L41.9 20.7 L39.7 22.9 L37.5 25.0 L35.7 27.4 L34.1 29.9 L32.4 32.4 L29.9 34.1 L26.9 35.0 L23.6 35.3 L20.8 36.1 L18.7 38.0 L17.1 41.2 L15.3 44.9 L12.9 48.0 L9.9 49.5 L6.5 49.6 L3.2 48.7 L0.0 47.9 L-3.1 47.3 L-6.2 47.0 L-9.3 47.0 L-12.7 47.4 L-16.2 47.6 L-19.4 46.8 L-22.0 44.6 L-24.2 42.0 L-26.4 39.5 L-28.3 36.8 L-29.6 33.8 L-30.8 30.8 L-32.4 28.4 L-35.0 26.8 L-38.5 25.7 L-42.1 24.3 L-45.0 22.2 L-46.5 19.3 L-46.9 15.9 L-46.8 12.5 L-46.6 9.3 L-46.4 6.1 L-45.6 3.0 L-44.3 0.0 L-42.6 -2.8 L-41.4 -5.5 L-41.3 -8.2 L-42.2 -11.3 L-43.3 -14.7 L-43.5 -18.0 L-42.3 -20.9 L-40.0 -23.1 L-37.4 -25.0 L-35.5 -27.2 L-34.4 -30.2 L-34.0 -34.0 L-33.8 -38.5 L-32.9 -42.8 L-30.0 -44.9 L-25.6 -44.3 L-21.4 -43.4 L-18.0 -43.4 L-14.8 -43.6 L-11.6 -43.2 L-8.4 -42.1 L-5.4 -41.0 L-2.7 -40.8 L-0.0 -42.1 L2.9 -44.4 L6.1 -46.6 L9.5 -47.6 L12.6 -46.9 L15.3 -45.0 L17.8 -42.9 L20.4 -41.5 L23.4 -40.6 L26.6 -39.7 L29.4 -38.3 L31.7 -36.1 L33.4 -33.4 L35.0 -30.7 L36.7 -28.2 L38.3 -25.6 L39.4 -22.7 L39.5 -19.5 L39.1 -16.2 L38.8 -13.2 L39.8 -10.7 L42.2 -8.4 L45.5 -6.0 L48.4 -3.2 Z";

/** A red wax seal pressed with the Socially emblem, with its motto around the rim. */
export function WaxSeal({ motto, className }: { motto: string; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const wax = `${uid}-wax`;
  const rim = `${uid}-rim`;

  return (
    <div aria-hidden className={cn("relative", className)}>
      <svg viewBox="-55 -55 110 110" className="size-full overflow-visible">
        <defs>
          <radialGradient id={wax} cx="0.4" cy="0.35" r="0.75">
            <stop offset="0" stopColor="#c45460" />
            <stop offset="0.55" stopColor="#9b2f3b" />
            <stop offset="1" stopColor="#6c1a24" />
          </radialGradient>
          <path id={rim} d="M0 -27 A27 27 0 1 1 -0.01 -27" />
        </defs>
        <path
          d={BLOB}
          fill={`url(#${wax})`}
          style={{ filter: "drop-shadow(0 3px 4px rgb(108 26 36 / 0.35))" }}
        />
        {/* The pressed disc: a dark groove with a lit lower edge */}
        <circle r="35" fill="#8a2833" />
        <circle r="35" fill="none" stroke="#5c141d" strokeWidth="2.2" />
        <circle r="36.6" fill="none" stroke="#d9757f" strokeOpacity="0.45" strokeWidth="0.8" />
        <circle r="20" fill="none" stroke="#5c141d" strokeOpacity="0.6" strokeWidth="0.8" />
        <text
          fill="#e7a2a9"
          fillOpacity="0.85"
          fontSize="6.4"
          fontWeight="600"
          letterSpacing="1.6"
          fontFamily="var(--font-inter), sans-serif"
        >
          <textPath href={`#${rim}`} startOffset="0">
            {motto}
          </textPath>
        </text>
      </svg>
      <EmblemMark className="absolute top-1/2 left-1/2 size-[34%] -translate-x-1/2 -translate-y-1/2 bg-[#4f1018]" />
    </div>
  );
}
