import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A phone-shaped frame with a pale bezel. Set its height; the width follows the screen ratio. */
export function PhoneFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative aspect-[390/844] overflow-hidden rounded-[44px] border-[7px] border-white bg-pearl shadow-[0_0_0_1px_rgb(24_43_67/0.1),0_40px_90px_rgb(24_43_67/0.18)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
