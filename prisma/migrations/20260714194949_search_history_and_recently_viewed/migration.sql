-- CreateEnum
CREATE TYPE "CatalogResourceType" AS ENUM ('ARTIST', 'ALBUM', 'TRACK');

-- CreateTable
CREATE TABLE "catalog_search_history" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "type" "CatalogResourceType" NOT NULL,
    "searchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "catalog_search_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_search_history" (
    "id" TEXT NOT NULL,
    "searcherId" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "searchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_search_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recently_viewed_items" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resourceType" "CatalogResourceType" NOT NULL,
    "deezerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artistName" TEXT,
    "coverUrl" TEXT,
    "albumsCount" INTEGER,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recently_viewed_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "catalog_search_history_userId_query_type_key" ON "catalog_search_history"("userId", "query", "type");

-- CreateIndex
CREATE UNIQUE INDEX "user_search_history_searcherId_query_key" ON "user_search_history"("searcherId", "query");

-- CreateIndex
CREATE UNIQUE INDEX "recently_viewed_items_userId_resourceType_deezerId_key" ON "recently_viewed_items"("userId", "resourceType", "deezerId");

-- AddForeignKey
ALTER TABLE "catalog_search_history" ADD CONSTRAINT "catalog_search_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_search_history" ADD CONSTRAINT "user_search_history_searcherId_fkey" FOREIGN KEY ("searcherId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recently_viewed_items" ADD CONSTRAINT "recently_viewed_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
