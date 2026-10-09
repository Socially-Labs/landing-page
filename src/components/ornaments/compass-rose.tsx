const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);
const POINTS: [string, number, number][] = [
  ["N", 0, -226],
  ["E", 226, 0],
  ["S", 0, 226],
  ["W", -226, 0],
];

/** An engraved compass rose in line work. Colour it with `text-*`. */
export function CompassRose({ className }: { className?: string }) {
  return (
    <svg viewBox="-250 -250 500 500" fill="none" aria-hidden className={className}>
      <circle r="210" stroke="currentColor" strokeOpacity="0.55" strokeWidth="0.9" />
      <circle r="197" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.6" />
      <circle
        r="150"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="0.6"
        strokeDasharray="2 7"
      />
      <circle r="64" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.8" />
      {TICKS.map((degrees) => {
        const major = degrees % 30 === 0;
        return (
          <line
            key={degrees}
            x1="0"
            y1="-197"
            x2="0"
            y2={major ? -181 : -189}
            transform={`rotate(${degrees})`}
            stroke="currentColor"
            strokeOpacity={major ? 0.75 : 0.4}
            strokeWidth={major ? 1.2 : 0.7}
          />
        );
      })}
      <g transform="rotate(45)">
        <path
          d="M0 -122 L15 0 L0 122 L-15 0 Z M-122 0 L0 15 L122 0 L0 -15 Z"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="0.8"
        />
      </g>
      <path
        d="M0 -178 L22 0 L0 178 L-22 0 Z M-178 0 L0 22 L178 0 L0 -22 Z"
        fill="currentColor"
        fillOpacity="0.06"
        stroke="currentColor"
        strokeOpacity="0.75"
        strokeWidth="1"
      />
      <path
        d="M0 -178 L22 0 L0 0 Z M178 0 L0 22 L0 0 Z M0 178 L-22 0 L0 0 Z M-178 0 L0 -22 L0 0 Z"
        fill="currentColor"
        fillOpacity="0.24"
      />
      <circle r="5" fill="currentColor" fillOpacity="0.85" />
      {POINTS.map(([label, x, y]) => (
        <text
          key={label}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          fillOpacity="0.85"
          fontSize="20"
          fontFamily="var(--font-caps), Georgia, serif"
          fontWeight="600"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
