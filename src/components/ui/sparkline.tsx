import { useId } from "react";
import { cn } from "@/lib/cn";

/** A small trend line scaled to its own range. Colour it with `text-*`. */
export function Sparkline({
  values,
  className,
  area = false,
}: {
  values: number[];
  className?: string;
  area?: boolean;
}) {
  const id = useId();
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((value, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 30 - ((value - min) / span) * 28;
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  });
  const line = `M${points.join(" L")}`;

  return (
    <svg
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("overflow-visible", className)}
    >
      {area && (
        <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${line} L100 32 L0 32 Z`} fill={`url(#${id})`} />
        </>
      )}
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
