-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'ES');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'EN';
