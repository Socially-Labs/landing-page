import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** `sky` for navy text on a bright sky, `night` for light text on storm, dusk and night. */
  tone?: "sky" | "night";
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "sky",
  align = "start",
  className,
}: SectionHeadingProps) {
  const night = tone === "night";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className={cn("eyebrow", night ? "text-on-navy-muted" : "text-steel-deep")}>{eyebrow}</p>
      <h2
        className={cn(
          "max-w-[20ch] font-display text-[clamp(2.5rem,4.6vw,4rem)] leading-[1.02] font-semibold",
          night ? "text-on-navy" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "max-w-[36rem] text-lg/relaxed",
            night ? "text-on-navy-soft" : "text-ink-soft",
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
