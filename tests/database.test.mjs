import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

test("early-access migration and persistence constraints", async (t) => {
  const db = new PGlite();
  const migration = await readFile(
    new URL(
      "../prisma/migrations/20261013000100_early_access/migration.sql",
      import.meta.url,
    ),
    "utf8",
  );
  try {
    await t.test("migration creates the signup table", async () => {
      await db.exec(migration);
      const result = await db.query(
        "SELECT count(*)::int AS count FROM early_access_signups",
      );
      assert.equal(result.rows[0].count, 0);
    });
    await t.test(
      "duplicate signups create only one timestamped row",
      async () => {
        const insert =
          "INSERT INTO early_access_signups (email, source) VALUES ($1, 'mobile-landing') ON CONFLICT (email) DO NOTHING";
        await db.query(insert, ["crew@example.test"]);
        await db.query(insert, ["crew@example.test"]);
        const result = await db.query(
          "SELECT email, source, created_at FROM early_access_signups",
        );
        assert.equal(result.rows.length, 1);
        assert.equal(result.rows[0].email, "crew@example.test");
        assert.equal(result.rows[0].source, "mobile-landing");
        assert.ok(result.rows[0].created_at);
      },
    );
    await t.test(
      "database rejects unnormalized or oversized addresses",
      async () => {
        for (const email of [
          " CREW@example.test ",
          "Crew@example.test",
          "a".repeat(255),
        ]) {
          await assert.rejects(
            db.query("INSERT INTO early_access_signups (email) VALUES ($1)", [
              email,
            ]),
            (error) => error.code === "23514",
          );
        }
      },
    );
    await t.test(
      "failed transactions do not leave a signup behind",
      async () => {
        await assert.rejects(
          db.transaction(async (tx) => {
            await tx.query(
              "INSERT INTO early_access_signups (email) VALUES ($1)",
              ["rollback@example.test"],
            );
            throw new Error("rollback");
          }),
          /rollback/,
        );
        const result = await db.query(
          "SELECT count(*)::int AS count FROM early_access_signups WHERE email = $1",
          ["rollback@example.test"],
        );
        assert.equal(result.rows[0].count, 0);
      },
    );
  } finally {
    await db.close();
  }
});
