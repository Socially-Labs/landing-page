import type { Rank } from "@/lib/sample-data";
import { cn } from "@/lib/cn";

const marks: Record<Rank, string> = {
  "New Captain": "I",
  "Proven Captain": "II",
  Admiral: "✦",
};

/** A brass rank badge: a double ring around the rank's mark. */
export function Insignia({ rank, className }: { rank: Rank; className?: string }) {
  return (
    <span
      title={rank}
      className={cn(
        "inline-grid size-6 flex-none place-items-center rounded-full border border-brass/70 font-display text-[0.7rem] leading-none font-semibold text-brass shadow-[inset_0_0_0_2px_rgb(201_166_107/0.18)]",
        className,
      )}
    >
      <span aria-hidden>{marks[rank]}</span>
      <span className="sr-only">{rank}</span>
    </span>
  );
}
