-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "actorCount" INTEGER;

-- CreateTable
CREATE TABLE "trending_snapshots" (
    "id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "snapshotAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trending_snapshots_pkey" PRIMARY KEY ("id")
);
