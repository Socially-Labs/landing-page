import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow: string;
  /** Wrap the accent phrase in <em> to set it in brass italic. */
  title: ReactNode;
  lede?: ReactNode;
  /** `dark` for navy sections, `light` for pearl ones. */
  tone?: "dark" | "light";
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "dark",
  align = "start",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className={cn("flex items-center gap-3 eyebrow", dark ? "text-brass" : "text-brass-deep")}>
        <span aria-hidden className="h-px w-8 bg-current opacity-60" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "max-w-[18ch] font-display text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.01em] [&_em]:font-medium [&_em]:italic",
          dark ? "text-foam [&_em]:text-brass-light" : "text-ink [&_em]:text-brass-deep",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className={cn("max-w-[34rem] text-lg/relaxed", dark ? "text-mist" : "text-ink-soft")}>
          {lede}
        </p>
      )}
    </Reveal>
  );
}
