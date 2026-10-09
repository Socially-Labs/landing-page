"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";

const variants = {
  /** Primary on any background: polished brass */
  brass: "btn-brass",
  /** Secondary on navy */
  ghost: "border border-foam/25 text-foam hover:border-foam/50 hover:bg-foam/5",
  /** Primary on pearl */
  ink: "bg-ink text-foam hover:bg-navy",
  /** Secondary on pearl */
  "ghost-ink": "border border-ink/25 text-ink hover:border-ink/50 hover:bg-ink/5",
};

const sizes = {
  sm: "h-10 px-4.5 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

type ButtonLinkProps = HTMLMotionProps<"a"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** A link styled as a button, with the app's press feedback: a 2.5% squeeze and a spring back. */
export function ButtonLink({
  variant = "brass",
  size = "lg",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <motion.a
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: "spring", damping: 24, stiffness: 420, mass: 0.6 }}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
