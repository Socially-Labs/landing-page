import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A phone-shaped frame for app screenshots. Set its height; the width follows the screen ratio. */
export function PhoneFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative aspect-[390/844] overflow-hidden rounded-[44px] border-[7px] border-[#0b1626] bg-navy shadow-[0_0_0_1px_rgb(201_166_107/0.28),0_40px_90px_rgb(0_0_0/0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
