import { useId } from "react";

const EIGHT = [0, 45, 90, 135, 180, 225, 270, 315];

/* Shapes for the spoke pointing up; the others are the same shape rotated. Units are the
   1000×1000 viewBox centred on the hub. */
const SPOKE =
  "M13 -172 L13 -180 L17 -184 L17 -194 L10 -198 L10 -206 L11.5 -214 L13.5 -222 L15 -230 L16 -240 L15.5 -250 L14 -262 L11 -270 L9 -278 L9 -286 L14 -290 L14 -298 L12 -304 L-12 -304 L-14 -298 L-14 -290 L-9 -286 L-9 -278 L-11 -270 L-14 -262 L-15.5 -250 L-16 -240 L-15 -230 L-13.5 -222 L-11.5 -214 L-10 -206 L-10 -198 L-17 -194 L-17 -184 L-13 -180 L-13 -172 Z";
const HANDLE =
  "M16 -354 L16 -366 L19 -370 L19 -378 L10 -382 L9.5 -392 L13 -402 L18 -414 L20 -426 L19 -438 L15 -448 L10 -456 L9 -462 L12 -466 L14.5 -470 L15.5 -476 L14 -482 L11 -486 L6.5 -489 L0 -490 L-6.5 -489 L-11 -486 L-14 -482 L-15.5 -476 L-14.5 -470 L-12 -466 L-9 -462 L-10 -456 L-15 -448 L-19 -438 L-20 -426 L-18 -414 L-13 -402 L-9.5 -392 L-10 -382 L-19 -378 L-19 -370 L-16 -366 L-16 -354 Z";
const PLATE =
  "M-43.63 -355.33 A358 358 0 0 1 43.63 -355.33 L36.56 -297.77 A300 300 0 0 0 -36.56 -297.77 Z";
const RIM =
  "M354 0 A354 354 0 1 1 -354 0 A354 354 0 1 1 354 0 Z M304 0 A304 304 0 1 0 -304 0 A304 304 0 1 0 304 0 Z";

/* Compass rose: eight long and eight short points, each split into a lit and a shaded half. */
const SHORT_LIT =
  "M29.8 -72.1 L-3 -23.2 L0 0 Z M72.1 -29.8 L14.3 -18.6 L0 0 Z M72.1 29.8 L23.2 -3 L0 0 Z M29.8 72.1 L18.6 14.3 L0 0 Z M-29.8 72.1 L3 23.2 L0 0 Z M-72.1 29.8 L-14.3 18.6 L0 0 Z M-72.1 -29.8 L-23.2 3 L0 0 Z M-29.8 -72.1 L-18.6 -14.3 L0 0 Z";
const SHORT_SHADE =
  "M29.8 -72.1 L18.6 -14.3 L0 0 Z M72.1 -29.8 L23.2 3 L0 0 Z M72.1 29.8 L14.3 18.6 L0 0 Z M29.8 72.1 L-3 23.2 L0 0 Z M-29.8 72.1 L-18.6 14.3 L0 0 Z M-72.1 29.8 L-23.2 -3 L0 0 Z M-72.1 -29.8 L-14.3 -18.6 L0 0 Z M-29.8 -72.1 L3 -23.2 L0 0 Z";
const LONG_LIT =
  "M82 -82 L10.7 -32 L0 0 Z M116 0 L30.2 -15.1 L0 0 Z M82 82 L32 10.7 L0 0 Z M0 116 L15.1 30.2 L0 0 Z M-82 82 L-10.7 32 L0 0 Z M-116 0 L-30.2 15.1 L0 0 Z M-82 -82 L-32 -10.7 L0 0 Z";
const LONG_SHADE =
  "M82 -82 L32 -10.7 L0 0 Z M116 0 L30.2 15.1 L0 0 Z M82 82 L10.7 32 L0 0 Z M0 116 L-15.1 30.2 L0 0 Z M-82 82 L-32 10.7 L0 0 Z M-116 0 L-30.2 -15.1 L0 0 Z M-82 -82 L-10.7 -32 L0 0 Z";

/** Gradient ids unique to this instance, so two wheels on a page never share fills. */
function useRefs() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (name: string) => ({ id: `${uid}-${name}`, url: `url(#${uid}-${name})` });
}

/**
 * The turning part of a ship's helm: eight turned spokes and handles, a carved rim with brass
 * bands, plates and studs, and a riveted hub. The hub's face is left open for `WheelCompass`,
 * which sits on top and stays still while this turns.
 */
export function ShipsWheel({ className }: { className?: string }) {
  const ref = useRefs();
  const turn = ref("turn");
  const rim = ref("rim");
  const hub = ref("hub");
  const brass = ref("brass");
  const brassX = ref("brass-x");

  return (
    <svg viewBox="-500 -500 1000 1000" aria-hidden className={className} overflow="visible">
      <defs>
        {/* Across a spoke's width, so each one reads as turned wood */}
        <linearGradient id={turn.id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3f2513" />
          <stop offset="0.3" stopColor="#7d4f2c" />
          <stop offset="0.5" stopColor="#bd8857" />
          <stop offset="0.64" stopColor="#93623a" />
          <stop offset="1" stopColor="#3a2211" />
        </linearGradient>
        <radialGradient id={rim.id} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.855" stopColor="#4a2c16" />
          <stop offset="0.885" stopColor="#8a5a32" />
          <stop offset="0.93" stopColor="#b47f4e" />
          <stop offset="0.97" stopColor="#7a4c29" />
          <stop offset="1" stopColor="#3f2513" />
        </radialGradient>
        <radialGradient id={hub.id} cx="0.42" cy="0.38" r="0.62">
          <stop offset="0" stopColor="#a8774a" />
          <stop offset="0.6" stopColor="#5e3a1e" />
          <stop offset="1" stopColor="#3f2513" />
        </radialGradient>
        <linearGradient id={brass.id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4e3b8" />
          <stop offset="0.4" stopColor="#d4b47a" />
          <stop offset="0.75" stopColor="#b08a4f" />
          <stop offset="1" stopColor="#7d5e2e" />
        </linearGradient>
        <linearGradient id={brassX.id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7d5e2e" />
          <stop offset="0.45" stopColor="#ecd6a5" />
          <stop offset="0.7" stopColor="#b08a4f" />
          <stop offset="1" stopColor="#6b4e22" />
        </linearGradient>
      </defs>

      {EIGHT.map((angle) => (
        <g key={`spoke-${angle}`} transform={`rotate(${angle})`}>
          <path d={SPOKE} fill={turn.url} stroke="#2e1a0c" strokeOpacity="0.35" strokeWidth="0.8" />
          <rect x="-17.5" y="-195" width="35" height="11" rx="2" fill={brassX.url} />
          <rect x="-14.5" y="-299" width="29" height="8" rx="1.5" fill={brassX.url} />
        </g>
      ))}

      <path d={RIM} fill={rim.url} fillRule="evenodd" />
      {/* Grain, grooves and a carved centre line */}
      <g fill="none" stroke="#2e1a0c">
        <circle r="320" strokeOpacity="0.2" strokeDasharray="140 60 90 120 200 80" />
        <circle r="338" strokeOpacity="0.2" strokeDasharray="220 90 60 140 110 70" />
        <circle r="312" strokeOpacity="0.45" strokeWidth="1.4" />
        <circle r="346" strokeOpacity="0.45" strokeWidth="1.4" />
        <circle r="329" strokeOpacity="0.3" strokeWidth="2" />
      </g>
      <circle r="314" fill="none" stroke="#d6a676" strokeOpacity="0.3" />

      {EIGHT.map((angle) => (
        <g key={`handle-${angle}`} transform={`rotate(${angle})`}>
          <path
            d={HANDLE}
            fill={turn.url}
            stroke="#2e1a0c"
            strokeOpacity="0.35"
            strokeWidth="0.8"
          />
          <rect x="-19.5" y="-379" width="39" height="9" rx="2" fill={brassX.url} />
          <ellipse cx="-5" cy="-428" rx="3" ry="16" fill="#f3d9b0" opacity="0.28" />
          <ellipse cx="-4.5" cy="-476" rx="2.4" ry="7" fill="#f3d9b0" opacity="0.28" />
        </g>
      ))}

      <circle r="304" fill="none" stroke={brass.url} strokeWidth="6" />
      <circle r="354" fill="none" stroke={brass.url} strokeWidth="7" />

      {EIGHT.map((angle) => (
        <g key={`plate-${angle}`} transform={`rotate(${angle})`}>
          <path d={PLATE} fill={brassX.url} stroke="#6b4e22" strokeWidth="1.2" />
          <g fill="none" stroke="#6b4e22" strokeOpacity="0.45">
            <path d="M-38.6 -314.1 A316 316 0 0 1 38.6 -314.1" />
            <path d="M-41.4 -337.5 A340 340 0 0 1 41.4 -337.5" />
          </g>
          <circle cy="-329" r="7.5" fill="#8a6834" stroke="#5c4220" />
          <circle cx="-1.8" cy="-330.8" r="3.2" fill="#f4e3b8" />
          <circle cx="-26.96" cy="-327.9" r="3.4" fill="#6b4e22" />
          <circle cx="26.96" cy="-327.9" r="3.4" fill="#6b4e22" />
        </g>
      ))}

      {EIGHT.map((angle) => (
        <g key={`stud-${angle}`} transform={`rotate(${angle + 22.5})`}>
          <circle cy="-329" r="5.5" fill="#8a6834" stroke="#5c4220" />
          <circle cx="-1.4" cy="-330.6" r="2.3" fill="#f4e3b8" />
        </g>
      ))}

      <circle r="172" fill={hub.url} />
      <circle
        r="165"
        fill="none"
        stroke="#2e1a0c"
        strokeOpacity="0.2"
        strokeDasharray="60 40 120 30"
      />
      <circle
        r="161"
        fill="none"
        stroke="#c9a66b"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="0 42.15"
      />
      <circle r="172" fill="none" stroke={brass.url} strokeWidth="5" />
    </svg>
  );
}

/** The compass card in the wheel's hub. It keeps north up while the wheel turns around it. */
export function WheelCompass({ className }: { className?: string }) {
  const ref = useRefs();
  const brass = ref("card-brass");
  const face = ref("card-face");

  return (
    <svg viewBox="-500 -500 1000 1000" aria-hidden className={className}>
      <defs>
        <linearGradient id={brass.id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4e3b8" />
          <stop offset="0.4" stopColor="#d6b67c" />
          <stop offset="0.75" stopColor="#b08a4f" />
          <stop offset="1" stopColor="#84652f" />
        </linearGradient>
        <radialGradient id={face.id} cx="0.5" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#fffbf2" />
          <stop offset="0.7" stopColor="#f6ecd6" />
          <stop offset="1" stopColor="#e9d9b6" />
        </radialGradient>
      </defs>

      <circle r="150" fill={brass.url} stroke="#6b4e22" strokeWidth="1.5" />
      <circle r="134" fill={face.url} stroke="#7d5e2e" strokeWidth="1.5" />

      <g
        fontFamily="var(--font-instrument), Georgia, serif"
        fontSize="16"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {(["N", "E", "S", "W"] as const).map((letter, index) => (
          <text
            key={letter}
            y="-142"
            transform={`rotate(${index * 90})`}
            fill={letter === "N" ? "#182b43" : "#3d2b14"}
          >
            {letter}
          </text>
        ))}
      </g>
      {[45, 135, 225, 315].map((angle) => (
        <path
          key={angle}
          d="M0 -146.5 L3.2 -142 L0 -137.5 L-3.2 -142 Z"
          transform={`rotate(${angle})`}
          fill="#5c4220"
        />
      ))}

      <g fill="none">
        <circle
          r="126"
          stroke="#8a6834"
          strokeOpacity="0.75"
          strokeWidth="8"
          strokeDasharray="1 9.996"
          strokeDashoffset="0.5"
        />
        <circle
          r="123"
          stroke="#5c4220"
          strokeWidth="14"
          strokeDasharray="2.6 94"
          strokeDashoffset="1.3"
        />
        <circle r="116" stroke="#8a6834" strokeOpacity="0.3" />
        <circle r="60" stroke="#8a6834" strokeOpacity="0.45" />
      </g>

      <g stroke="#6b4e22" strokeOpacity="0.5" strokeWidth="0.6" strokeLinejoin="round">
        <path d={SHORT_LIT} fill="#f1e3c2" />
        <path d={SHORT_SHADE} fill="#b8955a" />
        <path d={LONG_LIT} fill="#e3c78e" />
        <path d={LONG_SHADE} fill="#8a6834" />
        {/* North in navy, so the card reads at a glance */}
        <path d="M0 -116 L-15.1 -30.2 L0 0 Z" fill="#3a5a80" />
        <path d="M0 -116 L15.1 -30.2 L0 0 Z" fill="#182b43" />
      </g>
      <circle r="20" fill={brass.url} stroke="#6b4e22" />
      <circle r="9" fill="#5c4220" />
      <circle cx="-2" cy="-2" r="3" fill="#f4e3b8" />
    </svg>
  );
}
