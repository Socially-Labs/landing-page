import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A phone-shaped frame for app screenshots. Set its height; the width follows the screen ratio. */
export function PhoneFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative aspect-[390/844] overflow-hidden rounded-[46px] border-7 border-tray bg-sky shadow-[0_44px_90px_rgb(24_43_67/0.3)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
