/*
  Warnings:

  - Added the required column `capital` to the `countries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `countries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "capital" TEXT NOT NULL,
ADD COLUMN     "countryCardsStep" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "countryCardsTranslatedStep" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hasTranslation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "indicatorsStep" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "translationStep" INTEGER NOT NULL DEFAULT 0;
