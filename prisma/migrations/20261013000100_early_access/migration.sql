CREATE TABLE "early_access_signups" (
  "id" BIGSERIAL NOT NULL,
  "email" TEXT NOT NULL,
  "source" TEXT NOT NULL DEFAULT 'mobile-landing',
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "early_access_signups_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "early_access_email_normalized" CHECK ("email" = lower(btrim("email"))),
  CONSTRAINT "early_access_email_length" CHECK (length("email") BETWEEN 3 AND 254)
);

CREATE UNIQUE INDEX "early_access_signups_email_key" ON "early_access_signups"("email");
