import { useId } from "react";

const SPOKES = Array.from({ length: 8 }, (_, i) => i * 45);
const RIVETS = Array.from({ length: 16 }, (_, i) => i * 22.5);

/** Circle as a path, for even-odd rings. `sweep` flips the winding. */
function ring(r: number, sweep: 0 | 1) {
  return `M${r} 0 A${r} ${r} 0 1 ${sweep} ${-r} 0 A${r} ${r} 0 1 ${sweep} ${r} 0 Z`;
}

/**
 * A ship's helm in turned wood and brass: eight spokes with handles, a banded rim and a brass
 * hub with a white face. The face is left empty for content laid over it.
 */
export function ShipsWheel({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const wood = `${id}-wood`;
  const rimWood = `${id}-rim`;
  const hubWood = `${id}-hub`;
  const brass = `${id}-brass`;
  const shadow = `${id}-shadow`;

  return (
    <svg viewBox="-300 -300 600 600" aria-hidden className={className}>
      <defs>
        {/* Across a handle's width, so each one reads as a turned cylinder */}
        <linearGradient id={wood} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5e3a20" />
          <stop offset="0.35" stopColor="#9a6a40" />
          <stop offset="0.52" stopColor="#c4925f" />
          <stop offset="0.7" stopColor="#8d5f37" />
          <stop offset="1" stopColor="#56341c" />
        </linearGradient>
        <radialGradient id={rimWood} cx="0" cy="0" r="218" gradientUnits="userSpaceOnUse">
          <stop offset="0.86" stopColor="#6f4626" />
          <stop offset="0.92" stopColor="#b98657" />
          <stop offset="0.96" stopColor="#9c6b40" />
          <stop offset="1" stopColor="#64401f" />
        </radialGradient>
        <radialGradient id={hubWood} cx="0" cy="-30" r="130" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b98657" />
          <stop offset="1" stopColor="#5e3a20" />
        </radialGradient>
        <linearGradient id={brass} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2dfb2" />
          <stop offset="0.5" stopColor="#c9a66b" />
          <stop offset="1" stopColor="#94733f" />
        </linearGradient>
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#182B43" floodOpacity="0.18" />
        </filter>
      </defs>

      <g filter={`url(#${shadow})`}>
        {SPOKES.map((angle) => (
          <path
            key={`spoke-${angle}`}
            d="M-9 -104 L9 -104 L6.5 -196 L-6.5 -196 Z"
            transform={`rotate(${angle})`}
            fill={`url(#${wood})`}
          />
        ))}

        <path d={`${ring(216, 1)} ${ring(188, 0)}`} fillRule="evenodd" fill={`url(#${rimWood})`} />
        <circle r="202" fill="none" stroke="#4a2c16" strokeOpacity="0.22" strokeWidth="1" />
        <circle r="216" fill="none" stroke={`url(#${brass})`} strokeWidth="3.5" />
        <circle r="188" fill="none" stroke={`url(#${brass})`} strokeWidth="3.5" />

        {SPOKES.map((angle) => (
          <g key={`handle-${angle}`} transform={`rotate(${angle})`}>
            <circle cy="-202" r="6.5" fill={`url(#${brass})`} stroke="#8a6834" strokeWidth="0.8" />
            <g fill={`url(#${wood})`} stroke="#4a2c16" strokeOpacity="0.3" strokeWidth="0.8">
              <rect x="-9" y="-229" width="18" height="12" rx="3" />
              <ellipse cy="-234" rx="12" ry="5.5" />
              <path d="M-6 -238 L6 -238 L5 -252 L-5 -252 Z" />
              <ellipse cy="-270" rx="11.5" ry="19" />
              <circle cy="-292" r="6" />
            </g>
          </g>
        ))}

        <circle r="116" fill={`url(#${hubWood})`} />
        <circle r="116" fill="none" stroke={`url(#${brass})`} strokeWidth="3" />
        <circle r="102" fill={`url(#${brass})`} />
        {RIVETS.map((angle) => (
          <circle
            key={`rivet-${angle}`}
            cy="-96"
            r="2.2"
            transform={`rotate(${angle})`}
            fill="#8a6834"
          />
        ))}
        <circle r="90" fill="#ffffff" />
        <circle r="90" fill="none" stroke="#8a6834" strokeOpacity="0.35" strokeWidth="1" />
      </g>
    </svg>
  );
}
