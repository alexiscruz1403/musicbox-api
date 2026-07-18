-- Fase 2/3 (docs/fase-2-features.md, docs/fase-3-features.md): denormalized
-- reviewCount counters on Artist/Album/Track, kept in sync by ReviewsRepository
-- (create/soft-delete) and ModerationRepository (hide) instead of a live
-- Review.groupBy on every catalog read.

-- AlterTable
ALTER TABLE "artists" ADD COLUMN "reviewCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "albums" ADD COLUMN "reviewCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "tracks" ADD COLUMN "reviewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex (Fase 5, docs/fase-5-features.md: trending rank-change feature
-- makes TrendingSnapshot a genuinely read table for the first time)
CREATE INDEX "trending_snapshots_snapshotAt_idx" ON "trending_snapshots"("snapshotAt");

-- Backfill: reviewCount must reflect pre-existing ACTIVE reviews, not start
-- every row at 0 (which would make the counter invisible for a review until
-- it's deleted/recreated). Only counts status='ACTIVE' AND deletedAt IS NULL,
-- matching the same set of reviews the app-level increment/decrement logic
-- maintains going forward (HIDDEN/DELETED reviews never count).

UPDATE "albums" a SET "reviewCount" = sub.cnt FROM (
  SELECT "albumId", COUNT(*) AS cnt FROM "reviews"
  WHERE "type" = 'ALBUM' AND "status" = 'ACTIVE' AND "deletedAt" IS NULL
  GROUP BY "albumId"
) sub WHERE a.id = sub."albumId";

UPDATE "tracks" t SET "reviewCount" = sub.cnt FROM (
  SELECT "trackId", COUNT(*) AS cnt FROM "reviews"
  WHERE "type" = 'TRACK' AND "status" = 'ACTIVE' AND "deletedAt" IS NULL
  GROUP BY "trackId"
) sub WHERE t.id = sub."trackId";

WITH artist_counts AS (
  SELECT artist_id, SUM(cnt) AS cnt FROM (
    SELECT a."artistId" AS artist_id, COUNT(*) AS cnt FROM "reviews" r
      JOIN "albums" a ON a.id = r."albumId"
      WHERE r."type" = 'ALBUM' AND r."status" = 'ACTIVE' AND r."deletedAt" IS NULL
      GROUP BY a."artistId"
    UNION ALL
    SELECT t."artistId" AS artist_id, COUNT(*) AS cnt FROM "reviews" r
      JOIN "tracks" t ON t.id = r."trackId"
      WHERE r."type" = 'TRACK' AND r."status" = 'ACTIVE' AND r."deletedAt" IS NULL
      GROUP BY t."artistId"
  ) x GROUP BY artist_id
)
UPDATE "artists" ar SET "reviewCount" = artist_counts.cnt
FROM artist_counts WHERE ar.id = artist_counts.artist_id;
