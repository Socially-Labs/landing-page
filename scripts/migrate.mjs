import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is required. Set it in .env.local or your production environment.",
  );
  process.exit(1);
}
const require = createRequire(import.meta.url);
const result = spawnSync(
  process.execPath,
  [require.resolve("prisma/build/index.js"), "migrate", "deploy"],
  {
    env: process.env,
    encoding: "utf8",
  },
);
if (result.status !== 0) {
  console.error(
    "Prisma migration failed. Check database connectivity and migration permissions. Connection details were not logged.",
  );
  process.exit(result.status ?? 1);
}
console.log("Prisma database migrations applied successfully.");
