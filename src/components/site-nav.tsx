"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#captains", label: "Captains" },
  { href: "#safety", label: "Safety" },
  { href: "#fees", label: "Fees" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-4 top-4 z-30 md:inset-x-12 md:top-7">
      <nav
        aria-label="Main"
        className="flex h-16 items-center justify-between gap-6 rounded-full pr-2 pl-4 shadow-soft glass"
      >
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo.webp"
            alt=""
            width={34}
            height={34}
            className="size-[34px] rounded-[9px]"
          />
          <span className="font-display text-xl font-semibold tracking-[0.16em]">SOCIALLY</span>
        </a>

        <ul className="hidden items-center gap-1 text-[0.9375rem] font-medium text-ink-soft md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-3 transition-colors hover:bg-white/60 hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink href="#berth" size="md" className="hidden sm:inline-flex">
            Reserve a berth
          </ButtonLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full bg-ink text-on-navy md:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="mt-2 rounded-card p-2 shadow-lift glass md:hidden"
          >
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-control px-4 py-3.5 text-base font-medium hover:bg-white/70"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ButtonLink href="#berth" onClick={() => setOpen(false)} className="mt-1 w-full">
              Reserve a berth
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
