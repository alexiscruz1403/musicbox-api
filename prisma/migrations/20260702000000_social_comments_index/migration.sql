-- Fase 4 (Social): read-performance index for the comment-listing endpoint
-- (GET /v1/reviews/:id/comments). schema.prisma is intentionally left
-- unchanged — Comment already exists; this only adds an index, mirroring
-- the partial-index style established in 20260701000000_review_constraints.

CREATE INDEX "comments_review_created_idx"
  ON "comments" ("reviewId", "createdAt" DESC)
  WHERE "deletedAt" IS NULL AND "status" = 'ACTIVE';
