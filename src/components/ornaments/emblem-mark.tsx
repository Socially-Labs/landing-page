import { cn } from "@/lib/cn";

/** The Socially pirate emblem as an engraved silhouette, coloured by its background class. */
export function EmblemMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("bg-brass", className)}
      style={{
        maskImage: "url(/brand/emblem.svg)",
        WebkitMaskImage: "url(/brand/emblem.svg)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
