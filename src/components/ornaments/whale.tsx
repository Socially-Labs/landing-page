import { useId, type Ref } from "react";

/*
 * A humpback in profile, facing right, drawn on a 480 × 240 box whose centre is the centre of
 * the body, so it can be turned about its middle. Countershaded navy over a pale throat, with
 * ridged throat pleats, knobbed rostrum, a long knobbed pectoral fin and serrated flukes.
 */

/** Points the fin and the flukes swing about, in the drawing's units. */
export const WHALE_FIN_PIVOT = [350, 135] as const;
export const WHALE_FLUKE_PIVOT = [72, 104] as const;
/** Where the snout and the fluke tips sit, as fractions of the box from its centre. */
export const WHALE_NOSE = 0.44;
export const WHALE_TAIL = -0.46;

const BODY =
  "M452 105 C451.5 103.1 449.3 100.6 446 98.5 C442.7 96.4 437.7 94.4 432 92.5 C426.3 90.6 419 88.8 412 87 C405 85.3 397.3 83.5 390 82 C382.7 80.5 374.7 79.2 368 78 C361.3 76.8 355 75.7 350 75 C345 74.3 342 74.1 338 74 C334 73.9 331.7 74.6 326 74.2 C320.3 73.8 312 72.6 304 71.5 C296 70.4 286.7 68.6 278 67.5 C269.3 66.4 260.3 65.5 252 65 C243.7 64.5 235.7 64.3 228 64.5 C220.3 64.7 213 65.2 206 66 C199 66.8 192.7 68.1 186 69.5 C179.3 70.9 173 72.7 166 74.5 C159 76.3 151.3 78.5 144 80.5 C136.7 82.5 129 84.6 122 86.5 C115 88.4 108 90.4 102 92 C96 93.6 91 94.8 86 96 C81 97.2 76 98.2 72 99 C68 99.8 64.7 99.9 62 100.8 C59.3 101.7 56 103.2 56 104.5 C56 105.8 59 107.4 62 108.5 C65 109.6 69.3 109.8 74 111 C78.7 112.2 84 113.7 90 115.5 C96 117.3 102.7 119.6 110 122 C117.3 124.4 125.7 127.3 134 130 C142.3 132.8 151 135.8 160 138.5 C169 141.2 178.3 143.8 188 146 C197.7 148.3 207.7 150.3 218 152 C228.3 153.7 239.7 155.1 250 156 C260.3 156.9 270.3 157.5 280 157.5 C289.7 157.5 299 157 308 156 C317 155 325.7 153.4 334 151.5 C342.3 149.6 350 147.2 358 144.5 C366 141.8 374.3 138.5 382 135.5 C389.7 132.5 397 129.3 404 126.5 C411 123.7 418 120.8 424 118.5 C430 116.3 435.8 114.4 440 113 C444.2 111.6 447 111.3 449 110 C451 108.7 452.5 106.9 452 105 Z";

/** The small knobs along the ridge of the tail stock */
const KNUCKLES = [
  "M157.5 77.2 Q154 74.6 150.5 79.1 Z",
  "M139.1 82.2 Q136 79.9 132.9 83.9 Z",
  "M121.7 87 Q119 85 116.3 88.5 Z",
  "M105.3 91.5 Q103 89.8 100.7 92.7 Z",
];

const DORSAL =
  "M218 65.2 C209 64.2 201 60.6 195.4 55.6 C193.4 53.9 191.2 54.4 190.9 57.1 C190.4 61.2 188.6 65.4 184 69.6 Z";

/** Leading edges and the serrated trailing edge, open at the root so no seam shows */
const FLUKE_EDGE =
  "M74 99.5 C62 93 52 74 39 57 C31 47 21 41 12 38 L14.1 42.4 L17 46.2 L18.7 50.9 L21.8 54.9 L22.7 60 L26.3 63.9 L27.4 69.1 L30.6 73.4 L31.4 78.9 L34.7 83.4 L35.7 88.8 L38.4 93.7 L39.5 99.3 L42 104.5 L39.9 110.2 L39.1 116 L36.4 121 L36.1 126.6 L33.5 131.3 L33.1 136.5 L30.5 140.8 L29.9 145.6 L27.3 149.4 L26.7 153.8 L24 157.2 L23.4 161.3 L21.2 164.5 L20 168 C29 161 41 149 51 134 C59 122 65 113 74 109.5";
const FLUKES = `${FLUKE_EDGE} C76 106.5 76 102.5 74 99.5 Z`;

/** The near pectoral fin, a third of the body long, with the knobs on its leading edge */
const FIN =
  "M355.1 132.9 C351.1 131.8 333.5 135.1 325 138 C316.4 140.9 310.9 146.5 303.8 150.5 C296.7 154.5 289.6 158.5 282.3 162.2 C275.1 165.9 267.7 169.4 260.3 172.7 C252.9 176 247 178.4 237.9 182 C228.7 185.6 210 192.3 205.5 194.2 C201.1 196.1 209.3 193.6 211 193.5 C212.8 193.3 214.5 193.4 216.3 193.4 C218 193.3 219.7 193.3 221.4 193.2 C223.1 193 224.7 192.7 226.3 192.3 C228 192 229.4 191.3 231.1 191.1 C232.8 190.9 234.6 191.2 236.3 191.1 C238 191 239.7 190.8 241.3 190.5 C243 190.2 244.5 189.6 246.1 189.2 C247.7 188.9 249.3 188.4 250.9 188.2 C252.6 188 254.4 188.1 256 187.8 C257.7 187.6 259.3 187.2 260.8 186.7 C262.4 186.3 263.8 185.4 265.4 185 C266.9 184.5 268.7 184.4 270.3 184.2 C271.9 183.9 273.6 183.7 275.2 183.3 C276.8 182.9 278.3 182.3 279.8 181.6 C281.3 181 282.6 180 284.1 179.5 C285.7 179 287.5 179.1 289.1 178.7 C290.7 178.4 292.3 177.9 293.7 177.3 C295.2 176.7 296.6 175.7 298.1 175 C299.5 174.3 301 173.6 302.5 173 C304.1 172.5 305.7 172.3 307.3 171.8 C308.8 171.2 310.3 170.5 311.7 169.7 C313.1 168.9 314.3 167.6 315.7 166.8 C317.2 166.1 318.8 165.7 320.3 165.2 C321.8 164.6 323.4 164.1 324.8 163.4 C326.3 162.7 327.7 161.7 329 160.7 C330.3 159.7 331.6 158.4 332.9 157.4 C334.2 156.4 335.7 155.6 337 154.5 C338.3 153.5 339.6 152.3 340.9 151.2 C342.2 150.1 343.4 148.9 344.7 147.8 C346 146.7 346.9 146.9 348.6 144.4 C350.3 141.9 359 134 355.1 132.9 Z";
const FIN_RIB =
  "M335.7 141.1 C331.6 143.5 319.6 151 311.3 155.6 C303.1 160.1 294.8 164.4 286.3 168.2 C277.7 172.1 269.1 175.5 260.2 178.6 C251.4 181.7 237.9 185.5 233.4 186.9";

/** Throat pleats: they meet at the chin and open out toward the navel */
const PLEATS = [
  "M434 112.8 C430.1 114.1 418.3 118 410.4 120.8 C402.5 123.6 394.6 126.8 386.8 129.6 C378.9 132.4 371 135.2 363.1 137.8 C355.3 140.3 347.4 143 339.5 145 C331.6 147 323.8 148.6 315.9 149.7 C308 150.9 300.1 151.5 292.3 151.9 C284.4 152.4 276.5 152.6 268.6 152.6 C260.8 152.6 248.9 152.1 245 152",
  "M427 114 C423 115.3 410.9 119.1 402.9 121.6 C394.8 124.2 386.8 127 378.7 129.5 C370.7 132 362.6 134.6 354.6 136.9 C346.5 139.2 338.5 141.8 330.4 143.5 C322.4 145.3 314.3 146.5 306.3 147.5 C298.2 148.5 290.2 149.1 282.1 149.6 C274.1 150.2 262 150.6 258 150.8",
  "M420 115.6 C415.9 116.7 403.4 120.1 395.2 122.3 C386.9 124.4 378.6 126.4 370.3 128.7 C362.1 131 353.8 133.7 345.5 135.8 C337.2 138 328.9 140 320.7 141.5 C312.4 143 304.1 143.8 295.8 145.1 C287.6 146.4 275.1 148.5 271 149.2",
  "M413 117.3 C408.7 118.1 395.8 120.7 387.2 122.4 C378.6 124.1 370 125.1 361.4 127.2 C352.8 129.3 344.2 133 335.6 135 C327 137.1 318.4 137.7 309.8 139.7 C301.2 141.7 288.3 146 284 147.2",
  "M406 119 C402.4 119.3 391.5 120.5 384.2 121.2 C376.9 121.9 369.7 121.7 362.4 123.2 C355.1 124.6 347.9 128 340.6 129.9 C333.3 131.8 326.1 132 318.8 134.4 C311.5 136.8 300.6 142.6 297 144.3",
  "M399 120.7 C395.3 120.5 384.2 119.4 376.8 119.6 C369.3 119.9 361.9 120.7 354.5 122.1 C347.1 123.6 339.7 125.2 332.3 128.4 C324.8 131.6 313.7 139 310 141.1",
];

/** Tubercles on the rostrum and chin: [x, y, r] */
const KNOBS = [
  [440, 100.1, 1.5],
  [432, 98, 1.4],
  [424, 94.5, 1.4],
  [416, 93.6, 1.4],
  [408, 90.3, 1.3],
  [400, 89.8, 1.3],
  [392, 86.7, 1.3],
  [384, 86.4, 1.2],
  [376, 83.7, 1.2],
  [434, 103.9, 1.2],
  [424.5, 102.1, 1.2],
  [415, 98.3, 1.2],
  [405.5, 97.2, 1.2],
  [396, 93.9, 1.2],
  [386.5, 93.1, 1.2],
  [442, 108.9, 1.3],
  [434, 110.2, 1.3],
  [426, 114.4, 1.3],
  [418, 116, 1.3],
];

const SHEEN =
  "M390 85.6 C383.3 84.4 360.7 79.9 350 78.6 C339.3 77.3 338 79.1 326 77.8 C314 76.6 294.3 72.7 278 71.1 C261.7 69.5 243.3 67.8 228 68.1 C212.7 68.4 200 70.4 186 73.1 C172 75.8 158 80.4 144 84.1 C130 87.9 109 93.7 102 95.6";
const MOUTH = "M450 106.6 C428 108.6 398 109.8 378 111 C368 111.8 361 114.4 356.5 119.5";

type WhaleProps = {
  className?: string;
  /** Fin swing in degrees; negative spreads it away from the body. */
  fin?: number;
  /** Fluke swing in degrees; positive lifts the tail. */
  flukes?: number;
  /** For posing the fin and flukes frame by frame without re-rendering. */
  finRef?: Ref<SVGGElement>;
  flukesRef?: Ref<SVGGElement>;
};

/** A humpback whale in profile, facing right. Decorative. */
export function Whale({ className, fin = 0, flukes = 0, finRef, flukesRef }: WhaleProps) {
  const id = useId().replace(/:/g, "");
  const skin = `${id}-skin`;
  const tail = `${id}-tail`;
  const flipper = `${id}-flipper`;
  const sheen = `${id}-sheen`;

  return (
    <svg viewBox="0 -10 480 240" overflow="visible" aria-hidden className={className}>
      <defs>
        {/* Countershading: deep navy back, steel flank, pale throat */}
        <linearGradient id={skin} x1="0" y1="64" x2="0" y2="158" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#13233a" />
          <stop offset="0.4" stopColor="#233f5e" />
          <stop offset="0.62" stopColor="#4d6f92" />
          <stop offset="0.82" stopColor="#aec3d8" />
          <stop offset="1" stopColor="#e9f0f7" />
        </linearGradient>
        <linearGradient id={tail} x1="0" y1="38" x2="0" y2="168" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#132339" />
          <stop offset="0.5" stopColor="#22405f" />
          <stop offset="1" stopColor="#3f6286" />
        </linearGradient>
        <linearGradient id={flipper} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9db5cc" />
          <stop offset="0.3" stopColor="#d4e0ec" />
          <stop offset="1" stopColor="#f4f8fb" />
        </linearGradient>
        <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={DORSAL} fill="#172a42" />
      {KNUCKLES.map((d) => (
        <path key={d} d={d} fill="#172a42" />
      ))}
      <path
        d={BODY}
        fill={`url(#${skin})`}
        stroke="#182b43"
        strokeOpacity="0.4"
        strokeWidth="0.7"
      />

      <g
        ref={flukesRef}
        transform={`rotate(${flukes} ${WHALE_FLUKE_PIVOT[0]} ${WHALE_FLUKE_PIVOT[1]})`}
      >
        <path d={FLUKES} fill={`url(#${tail})`} />
        <path
          d={FLUKE_EDGE}
          fill="none"
          stroke="#182b43"
          strokeOpacity="0.35"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      </g>

      <g fill="none" strokeLinecap="round">
        {PLEATS.map((d) => (
          <g key={d}>
            <path d={d} stroke="#1b304c" strokeOpacity="0.26" strokeWidth="0.8" />
            <path
              d={d}
              transform="translate(0 1.1)"
              stroke="#ffffff"
              strokeOpacity="0.5"
              strokeWidth="0.6"
            />
          </g>
        ))}
        <path d={SHEEN} stroke={`url(#${sheen})`} strokeWidth="1.6" />
        <path d={MOUTH} stroke="#13233a" strokeOpacity="0.55" strokeWidth="0.9" />
        <path
          d="M349.1 110.6 Q352.5 108.4 355.9 110.7"
          stroke="#aec3d8"
          strokeOpacity="0.55"
          strokeWidth="0.6"
        />
      </g>

      {KNOBS.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#8aa5c0" fillOpacity="0.5" />
      ))}
      <ellipse cx="352.5" cy="113.2" rx="2" ry="1.5" fill="#0e1a2b" />

      <g ref={finRef} transform={`rotate(${fin} ${WHALE_FIN_PIVOT[0]} ${WHALE_FIN_PIVOT[1]})`}>
        <path
          d={FIN}
          fill={`url(#${flipper})`}
          stroke="#182b43"
          strokeOpacity="0.42"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <path
          d={FIN_RIB}
          fill="none"
          stroke="#45698c"
          strokeOpacity="0.22"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
