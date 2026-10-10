import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* The X mark from Simple Icons (CC0). It inherits the text colour. */

export function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

/** A ship's porthole: brass rim with four bolts around a pale sea-blue glass. */
export function Porthole({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-14 flex-none place-items-center rounded-full bg-[linear-gradient(160deg,#f7fafd,#d7e6f4)] text-ink shadow-[inset_0_2px_6px_rgb(24_43_67/0.12)] ring-[3px] ring-brass",
        className,
      )}
    >
      {[
        "-top-[4.5px] left-1/2 -translate-x-1/2",
        "-bottom-[4.5px] left-1/2 -translate-x-1/2",
        "top-1/2 -left-[4.5px] -translate-y-1/2",
        "top-1/2 -right-[4.5px] -translate-y-1/2",
      ].map((position) => (
        <span
          key={position}
          aria-hidden
          className={cn("absolute size-1.5 rounded-full bg-brass-deep", position)}
        />
      ))}
      {children}
    </span>
  );
}
