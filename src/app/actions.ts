"use server";

export type WaitlistState =
  | { status: "idle" }
  | { status: "joined"; role: "crew" | "captain" }
  | { status: "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinWaitlist(
  _previous: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim();
  const role = formData.get("role") === "captain" ? "captain" : "crew";

  if (!EMAIL.test(email)) {
    return { status: "error", message: "Enter an email address, like name@example.com." };
  }

  // TODO: store the signup (email list provider or database). Nothing is saved yet.
  return { status: "joined", role };
}
