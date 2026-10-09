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
        className="rounded-full bg-white px-6 py-4 text-ink shadow-soft ring-1 ring-brass/40"
      >
        {state.role === "captain"
          ? "Thanks. We’ll be in touch about Captain access."
          : "You’re on the list. We’ll email you when the first vaults open."}
      </motion.p>
    );
  }

  const error = state.status === "error" ? state.message : null;

  return (
    <form action={action} className="flex w-full max-w-lg flex-col gap-3 text-left">
      <fieldset className="flex justify-center gap-2">
        <legend className="sr-only">I want to</legend>
        {roles.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex min-h-10 cursor-pointer items-center rounded-full px-4.5 text-sm font-semibold ring-1 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-steel",
              role === option.value
                ? "bg-white text-ink ring-brass"
                : "bg-white/60 text-muted ring-line hover:text-ink",
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
      <div className="flex flex-col gap-2 rounded-[26px] bg-white p-1.5 shadow-soft ring-1 ring-line sm:flex-row sm:rounded-full">
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby="waitlist-message"
          className="h-12 min-w-0 flex-1 rounded-full bg-transparent px-5 text-base text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-steel"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-12 rounded-full btn-brass px-6 font-semibold transition-opacity disabled:opacity-70"
        >
          {pending ? "Saving…" : role === "captain" ? "Apply as Captain" : "Reserve my berth"}
        </button>
      </div>
      <p
        id="waitlist-message"
        aria-live="polite"
        className={cn("text-center text-[0.8125rem]", error ? "text-coral" : "text-muted")}
      >
        {error ?? "One email when the first vaults open. Nothing else."}
      </p>
    </form>
  );
}
