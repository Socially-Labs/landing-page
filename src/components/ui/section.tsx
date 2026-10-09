import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** `dark` gives the section a navy band for light text. */
  tone?: "light" | "dark";
};

export function Section({ tone = "light", className, ...props }: SectionProps) {
  return <section className={cn(tone === "dark" && "bg-deep", className)} {...props} />;
}
