-- Fase 3 (Reviews): DB-level invariants that Prisma's schema DSL cannot express
-- (partial unique indexes, partial CHECK constraint, partial read indexes).
-- schema.prisma is intentionally left unchanged; the application layer must
-- still validate type/trackId/albumId consistency defensively before insert.

-- CHECK constraint: exactly one of trackId/albumId set, matching `type`
ALTER TABLE "reviews"
  ADD CONSTRAINT "reviews_type_target_check"
  CHECK (
    ("type" = 'TRACK' AND "trackId" IS NOT NULL AND "albumId" IS NULL)
    OR
    ("type" = 'ALBUM' AND "albumId" IS NOT NULL AND "trackId" IS NULL)
  );

-- One active review per user per track
CREATE UNIQUE INDEX "reviews_user_track_unique"
  ON "reviews" ("userId", "trackId")
  WHERE "type" = 'TRACK' AND "deletedAt" IS NULL;

-- One active review per user per album
CREATE UNIQUE INDEX "reviews_user_album_unique"
  ON "reviews" ("userId", "albumId")
  WHERE "type" = 'ALBUM' AND "deletedAt" IS NULL;

-- Read-performance indexes for album/track review listing endpoints
CREATE INDEX "reviews_album_idx"
  ON "reviews" ("albumId")
  WHERE "type" = 'ALBUM' AND "deletedAt" IS NULL;

CREATE INDEX "reviews_track_idx"
  ON "reviews" ("trackId")
  WHERE "type" = 'TRACK' AND "deletedAt" IS NULL;

-- Feed index (users I follow, chronological) — used starting Fase 4
CREATE INDEX "reviews_user_created_idx"
  ON "reviews" ("userId", "createdAt" DESC)
  WHERE "deletedAt" IS NULL AND "status" = 'ACTIVE';

-- Trending index (count/order by type+recency) — used starting Fase 5
CREATE INDEX "reviews_type_created_idx"
  ON "reviews" ("type", "createdAt" DESC)
  WHERE "deletedAt" IS NULL AND "status" = 'ACTIVE';
