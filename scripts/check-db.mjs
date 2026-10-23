import nextEnv from "@next/env";
import pg from "pg";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL) {
  console.error("Set DATABASE_URL and run pnpm db:migrate first.");
  process.exit(1);
}
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10_000,
  query_timeout: 10_000,
});
let connected = false;
try {
  await client.connect();
  connected = true;
  await client.query("BEGIN");
  const email = `smoke-${randomUUID()}@example.test`;
  const insert =
    "INSERT INTO early_access_signups (email) VALUES ($1) ON CONFLICT (email) DO NOTHING";
  await client.query(insert, [email]);
  await client.query(insert, [email]);
  const result = await client.query(
    "SELECT count(*)::int AS count FROM early_access_signups WHERE email = $1",
    [email],
  );
  assert.equal(result.rows[0].count, 1);
  await client.query("ROLLBACK");
  console.log(
    "Database check passed: insert and deduplication work; test signup rolled back.",
  );
} catch {
  if (connected) await client.query("ROLLBACK").catch(() => {});
  console.error(
    "Database check failed. Verify connectivity and run pnpm db:migrate.",
  );
  process.exitCode = 1;
} finally {
  await client.end();
}
