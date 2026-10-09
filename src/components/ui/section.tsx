import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Light grounds only; consecutive sections alternate between them. */
const tones = {
  white: "bg-white text-ink",
  pearl: "bg-pearl text-ink",
  ice: "bg-ice text-ink",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & { tone?: keyof typeof tones };

export function Section({ tone = "white", className, ...props }: SectionProps) {
  return <section className={cn(tones[tone], className)} {...props} />;
}
