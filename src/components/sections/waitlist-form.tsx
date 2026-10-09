"use client";

import { motion } from "motion/react";
import { useActionState, useState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";
import { cn } from "@/lib/cn";

const roles = [
  { value: "crew", label: "Join as Crew" },
  { value: "captain", label: "Apply as Captain" },
] as const;

export function WaitlistForm() {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, {
    status: "idle",
  });
  const [role, setRole] = useState<"crew" | "captain">("crew");

  if (state.status === "joined") {
    return (
      <motion.p
        role="status"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-full px-6 py-4 text-on-navy glass-dark"
      >
        {state.role === "captain"
          ? "Thanks. We’ll be in touch about Captain access."
          : "You’re on the list. We’ll email you when the first vaults open."}
      </motion.p>
    );
  }

  const error = state.status === "error" ? state.message : null;

  return (
    <form action={action} className="mt-4 flex w-full max-w-xl flex-col gap-3 text-left">
      <fieldset className="flex justify-center gap-2">
        <legend className="sr-only">I want to</legend>
        {roles.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-on-navy",
              role === option.value
                ? "border-on-navy bg-on-navy text-ink"
                : "border-on-navy/25 text-on-navy hover:bg-on-navy/10",
            )}
          >
            <input
              type="radio"
              name="role"
              value={option.value}
              checked={role === option.value}
              onChange={() => setRole(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <label
        htmlFor="waitlist-email"
        className="pl-5 text-[0.8125rem] font-medium text-on-navy-muted"
      >
        Email address
      </label>
      <div className="flex flex-col gap-2 rounded-[28px] p-1.5 glass-dark sm:flex-row sm:rounded-full">
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby="waitlist-message"
          className="h-13 min-w-0 flex-1 rounded-full bg-transparent px-4 text-base text-on-navy placeholder:text-on-navy-muted/70 focus-visible:outline-2 focus-visible:outline-on-navy"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-13 rounded-full bg-on-navy px-6 font-semibold text-ink transition-opacity disabled:opacity-70"
        >
          {pending ? "Saving…" : role === "captain" ? "Apply as Captain" : "Reserve my berth"}
        </button>
      </div>
      <p
        id="waitlist-message"
        aria-live="polite"
        className={cn("pl-5 text-[0.8125rem]", error ? "text-coral-glow" : "text-on-navy-muted")}
      >
        {error ?? "We’ll email you when the first vaults open."}
      </p>
    </form>
  );
}
