-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'MODERATION';

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_actorId_fkey";

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "actorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewedById" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "acceptedReportsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "consentedAt" TIMESTAMP(3),
ADD COLUMN     "penalizedUntil" TIMESTAMP(3),
ADD COLUMN     "penaltyLevel" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
