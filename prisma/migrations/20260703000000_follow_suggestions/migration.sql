-- Follow Suggestions: new dedicated snapshot table, separate from
-- recommendation_snapshots (Fase 6, content-based recs on Deezer catalog
-- items — different feature, different payload shape). This one stores up
-- to 5 suggested User ids per user, recomputed on qualifying events
-- (review.created, reaction LIKE added/changed) or lazily on first read if
-- no snapshot exists yet.

CREATE TABLE "follow_suggestion_snapshots" (
    "userId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_suggestion_snapshots_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "follow_suggestion_snapshots" ADD CONSTRAINT "follow_suggestion_snapshots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
