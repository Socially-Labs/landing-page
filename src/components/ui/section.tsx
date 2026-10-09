import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const tones = {
  deep: "bg-deep text-foam",
  abyss: "bg-abyss text-foam",
  pearl: "bg-pearl text-ink",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & { tone?: keyof typeof tones };

export function Section({ tone = "deep", className, ...props }: SectionProps) {
  return <section className={cn(tones[tone], className)} {...props} />;
}
