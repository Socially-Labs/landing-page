import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow: string;
  /** Wrap the accent phrase in <em> to set it in brass italic. */
  title: ReactNode;
  lede?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="flex items-center gap-3 eyebrow text-brass-deep">
        <span aria-hidden className="h-px w-6 bg-brass" />
        {eyebrow}
      </p>
      <h2 className="max-w-[20ch] font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1.08] tracking-[-0.01em] text-ink [&_em]:text-brass-deep">
        {title}
      </h2>
      {lede && <p className="max-w-[32rem] text-[1.0625rem]/relaxed text-ink-soft">{lede}</p>}
    </Reveal>
  );
}
