import { isValidEmail } from "@/lib/waitlist";
import { getPrisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const reply = (status: number) =>
    Response.json({ ok: status === 200 }, { status, headers });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply(403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply(415);
  if (Number(request.headers.get("content-length")) > 2048) return reply(413);
  let body: { email?: unknown; website?: unknown };
  try {
    const text = await request.text();
    if (text.length > 2048) return reply(413);
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return reply(400);
    body = parsed;
  } catch {
    return reply(400);
  }
  if (body.website) return reply(200);
  const email = typeof body.email === "string" ? body.email.trim() : body.email;
  if (!isValidEmail(email)) return reply(400);

  // Only acknowledge a signup after Postgres commits it. Duplicate addresses
  // return the same response without revealing who has already signed up.
  if (!process.env.DATABASE_URL) return reply(503);
  try {
    const prisma = getPrisma();
    if (!prisma) return reply(503);
    await prisma.earlyAccessSignup.createMany({
      data: [{ email: email.toLowerCase(), source: "mobile-landing" }],
      skipDuplicates: true,
    });
    return reply(200);
  } catch {
    return reply(503);
  }
}
