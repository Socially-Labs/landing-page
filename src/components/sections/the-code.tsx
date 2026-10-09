import { Check, X } from "lucide-react";
import { SkyScene } from "@/components/sky/sky-scene";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { scenes } from "./scenes";

const can = [
  "Trade the vault on approved venues, starting with Jupiter",
  "Use separate keys for phone, bot and AI, each with its own limits",
  "Post trade calls and updates to the Crew",
  "Earn 10% of new profit, paid in vault shares",
];

const never = [
  "Withdraw Crew funds",
  "Send vault assets to any wallet, their own included",
  "Loosen risk rules without a public timelock",
  "Use an unapproved program or skip the price check",
];

function RuleList({ title, items, allowed }: { title: string; items: string[]; allowed: boolean }) {
  const Icon = allowed ? Check : X;
  return (
    <div className="flex flex-col gap-3.5 rounded-[20px] border border-on-navy/15 bg-on-navy/5 p-5">
      <p className="eyebrow text-on-navy-muted">{title}</p>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[0.96875rem]/snug">
            <span
              aria-hidden
              className={cn(
                "grid size-6 flex-none place-items-center rounded-full",
                allowed ? "bg-mint-glow/15 text-mint-glow" : "bg-coral-glow/15 text-coral-glow",
              )}
            >
              <Icon className="size-3.5" strokeWidth={3} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The sky seen through a marble arch: the wall is painted by the arch's own spread shadow. */
export function TheCode() {
  return (
    <SkyScene id="safety" scene={scenes.code} className="relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 pt-20 md:px-12 md:pt-28">
        <div className="relative mx-auto max-w-[1180px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-t-[9999px] shadow-[0_0_0_200vmax_var(--color-wall),inset_0_0_0_14px_var(--color-tray),inset_0_0_0_15px_rgb(24_43_67/0.08),inset_0_40px_80px_rgb(24_43_67/0.12)]"
          />
          <div className="relative flex flex-col items-center gap-10 px-4 pt-[clamp(7rem,16vw,12rem)] pb-24 md:px-16">
            <SectionHeading
              align="center"
              eyebrow="The Code"
              title="Even pirates follow the Code. Ours runs on Solana."
            />
            <Reveal className="w-full max-w-[920px] rounded-[28px] p-5 navy-plate md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <RuleList title="The Captain can" items={can} allowed />
                <RuleList title="The Captain can never" items={never} allowed={false} />
              </div>
              <p className="mt-6 text-center text-sm text-on-navy-muted">
                The Socially program on Solana enforces these rules. The app, the backend and the
                Captain’s keys can’t override them.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="relative h-16 border-t border-ink/10 bg-linear-to-b from-tray to-[#e4eaf2] shadow-[0_-10px_30px_rgb(24_43_67/0.08)]"
      />
    </SkyScene>
  );
}
