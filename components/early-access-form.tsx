"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/visuals";
import { isValidEmail } from "@/lib/waitlist";

type State = {
  status: "idle" | "pending" | "success" | "error";
  message?: string;
};

export function EarlyAccessForm() {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<State>({ status: "idle" });
  const pending = state.status === "pending";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    if (!isValidEmail(email)) {
      setState({
        status: "error",
        message: "Please enter a valid email address.",
      });
      input.current?.focus();
      return;
    }
    setState({ status: "pending" });
    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: data.get("website") }),
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) {
        setState({
          status: "error",
          message:
            response.status === 503
              ? "Signups are opening soon. Please try again later."
              : "We couldn’t save your email. Please try again.",
        });
        return;
      }
      setState({ status: "success" });
    } catch {
      setState({
        status: "error",
        message: "We couldn’t connect. Please try again.",
      });
    }
  }

  return (
    <div className="early-access">
      {state.status === "success" ? (
        <div className="early-access-success" role="status">
          <Icon name="compass" />
          <span>You’re on the list. Welcome aboard.</span>
        </div>
      ) : (
        <form
          className="early-access-form"
          onSubmit={submit}
          noValidate
          aria-busy={pending}
        >
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            ref={input}
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
            disabled={pending}
            aria-invalid={state.status === "error"}
            aria-describedby={`${id}-status`}
            onChange={() => {
              if (state.status === "error") setState({ status: "idle" });
            }}
          />
          <div className="waitlist-trap" aria-hidden="true">
            <label htmlFor={`${id}-website`}>Leave this blank</label>
            <input
              id={`${id}-website`}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <button type="submit" disabled={pending}>
            {pending ? "Joining…" : "Get early access"}
            <Icon name="arrow" />
          </button>
        </form>
      )}
      <p
        id={`${id}-status`}
        className={`early-access-caption ${state.status === "error" ? "form-error" : ""}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {state.status === "error"
          ? state.message
          : state.status === "success"
            ? "We’ll be in touch when the first vaults open."
            : "Get early access to the first vaults."}
      </p>
    </div>
  );
}
