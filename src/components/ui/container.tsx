import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-12 xl:px-24", className)}>
      {children}
    </div>
  );
}
