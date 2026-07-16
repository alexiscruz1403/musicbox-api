-- Dedupe existing rows before tightening the unique constraint: keep only
-- the most-recently-searched row per (userId, query), since `type` no
-- longer differentiates catalog search history entries.
DELETE FROM "catalog_search_history" a
USING "catalog_search_history" b
WHERE a."userId" = b."userId"
  AND a."query" = b."query"
  AND (
    a."searchedAt" < b."searchedAt"
    OR (a."searchedAt" = b."searchedAt" AND a."id" > b."id")
  );

-- DropIndex
DROP INDEX "catalog_search_history_userId_query_type_key";

-- AlterTable
ALTER TABLE "catalog_search_history" DROP COLUMN "type";

-- CreateIndex
CREATE UNIQUE INDEX "catalog_search_history_userId_query_key" ON "catalog_search_history"("userId", "query");
