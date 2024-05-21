/*
  Warnings:

  - You are about to drop the column `isMain` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "countries" ALTER COLUMN "hasTranslation" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user_countries" ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isMain",
ADD COLUMN     "institution" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "isAdmin" DROP DEFAULT;
