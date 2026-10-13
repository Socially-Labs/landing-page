import nextEnv from "@next/env";
import { defineConfig } from "prisma/config";

nextEnv.loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  // Generating/building the client needs no live database. Migrations require
  // DATABASE_URL, checked by scripts/migrate.mjs before Prisma is invoked.
  datasource: { url: process.env.DATABASE_URL ?? "" },
});
