"use client";

import { motion } from "motion/react";
import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";
import { cn } from "@/lib/cn";

export function WaitlistForm() {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, {
    status: "idle",
  });

  if (state.status === "joined") {
    return (
      <motion.p
        role="status"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-full bg-white px-6 py-4 text-ink shadow-soft ring-1 ring-brass/40"
      >
        You’re on the list. We’ll email you when the first vaults open.
      </motion.p>
    );
  }

  const error = state.status === "error" ? state.message : null;

  return (
    <form action={action} className="flex w-full max-w-lg flex-col gap-3">
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
          {pending ? "Saving…" : "Join the waitlist"}
        </button>
      </div>
      <p
        id="waitlist-message"
        aria-live="polite"
        className={cn("px-5 text-[0.8125rem]", error ? "text-coral" : "text-ink-soft")}
      >
        {error ?? "One email when we launch. Nothing else."}
      </p>
    </form>
  );
}
