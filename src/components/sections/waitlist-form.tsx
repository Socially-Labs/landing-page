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
        className="rounded-full border border-brass/40 bg-navy/70 px-6 py-4 text-foam"
      >
        {state.role === "captain"
          ? "Thanks. We’ll be in touch about Captain access."
          : "You’re on the list. We’ll email you when the first vaults open."}
      </motion.p>
    );
  }

  const error = state.status === "error" ? state.message : null;

  return (
    <form action={action} className="flex w-full max-w-xl flex-col gap-3 text-left">
      <fieldset className="flex justify-center gap-2">
        <legend className="sr-only">I want to</legend>
        {roles.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex min-h-11 cursor-pointer items-center rounded-full border px-5 text-sm font-semibold transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brass-light",
              role === option.value
                ? "border-brass bg-brass/15 text-brass-light"
                : "border-foam/20 text-mist hover:border-foam/40",
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

      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 rounded-[28px] border border-foam/15 bg-navy/70 p-1.5 backdrop-blur-xl sm:flex-row sm:rounded-full">
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby="waitlist-message"
          className="h-13 min-w-0 flex-1 rounded-full bg-transparent px-5 text-base text-foam placeholder:text-haze focus-visible:outline-2 focus-visible:outline-brass-light"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-13 rounded-full btn-brass px-7 font-semibold transition-opacity disabled:opacity-70"
        >
          {pending ? "Saving…" : role === "captain" ? "Apply as Captain" : "Reserve my berth"}
        </button>
      </div>
      <p
        id="waitlist-message"
        aria-live="polite"
        className={cn("text-center text-[0.8125rem]", error ? "text-coral-glow" : "text-haze")}
      >
        {error ?? "One email when the first vaults open. Nothing else."}
      </p>
    </form>
  );
}
