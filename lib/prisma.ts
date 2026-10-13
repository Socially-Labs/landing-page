import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalDatabase = globalThis as typeof globalThis & {
  sociallyPrisma?: PrismaClient;
};

export function getPrisma() {
  if (!process.env.DATABASE_URL) return null;
  globalDatabase.sociallyPrisma ??= new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 10_000,
      query_timeout: 10_000,
    }),
    // Do not send query parameters (email addresses) or credentials to logs.
    log: [],
  });
  return globalDatabase.sociallyPrisma;
}
