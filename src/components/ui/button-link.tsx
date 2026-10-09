"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-linear-to-b from-helm to-helm-deep text-on-navy shadow-[0_14px_30px_rgb(24_43_67/0.25)]",
  glass: "glass text-ink",
  light: "bg-on-navy text-ink",
};

const sizes = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

type ButtonLinkProps = HTMLMotionProps<"a"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** A link styled as a button, with the app's press feedback: a 2.5% squeeze and a spring back. */
export function ButtonLink({
  variant = "primary",
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
        "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
