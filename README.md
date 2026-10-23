# Socially mobile landing page

Next.js App Router, TypeScript, Tailwind CSS, pnpm, Prisma, PostgreSQL. Implements the Human Crew design with early-access email signup. The product has not launched; no store downloads are advertised.

## Local development

```sh
pnpm install
cp .env.example .env.local
# Set DATABASE_URL in .env.local to your PostgreSQL connection URL.
pnpm db:migrate
pnpm dev
```

## Production

Set **DATABASE_URL** in the host environment, retaining your provider’s SSL parameters (for example `sslmode=require`). Never use a NEXT_PUBLIC_ prefix for this secret.

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

`pnpm start` applies pending database migrations, then starts Next.js. It fails if migration fails. Only DATABASE_URL is needed. The database role needs permission to create tables and insert/select rows. For platforms that manage the Next.js server themselves, such as Vercel, run `pnpm db:migrate` against the production database before serving traffic.

## Database

- `pnpm db:migrate`: run Prisma `migrate deploy` using `prisma/schema.prisma` and `prisma/migrations`. Prisma tracks applied migrations; add new migrations instead of editing applied ones.
- `pnpm db:check`: verify inserting and deduplicating a generated test email, then roll back the test row.
- Table: `early_access_signups` (`id`, normalized unique `email`, `source`, `created_at`).
- Emails are trimmed and lowercased; repeated submissions return the same success without creating duplicate rows.
- Signup API: `POST /api/early-access`, JSON `{ "email": "you@example.com" }`.
- Browser validation, pending/success/error states, same-origin enforcement, a honeypot, request size limits, and database query timeouts are included.
- No fake success: missing database configuration or failed persistence returns a service-unavailable response. Credentials and email addresses are not logged.

Checks: `pnpm test`, `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`. `pnpm build` generates Prisma Client automatically; `pnpm db:generate` can also run it separately. Schema and constraint tests use isolated PGlite Postgres. A real database URL is needed for migrations and the live database smoke check. Builds do not require database access.

## Design

Actual Socially logo, local Inter and Cormorant Garamond fonts, coastal scenes, and app screenshots come from the APK. All screenshot figures remain labelled sample data. The page covers discovery, investment previews, Crew portfolios, Captain tools, FAQ, and early access.

`public/images/crew-portraits.png` is a generated four-portrait sheet. CSS frames its quadrants as decorative community cards, not testimonials. Built-in imagegen prompt: four fictional adults, candid sunny Mediterranean coastal portraits in a 2×2 grid, natural navy/off-white casual clothing, pale sky-blue backgrounds, no text or logos.

FAQ uses native details/summary. Motion respects reduced-motion preferences. `/privacy` describes this website and its email collection; `/terms` explains the preview and risks. These do not replace the app’s policies. No wallet interaction, analytics, external font request, or outbound email sending is included.
