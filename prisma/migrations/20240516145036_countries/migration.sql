-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_countries" (
    "userId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "user_countries_pkey" PRIMARY KEY ("userId","countryId")
);

-- AddForeignKey
ALTER TABLE "user_countries" ADD CONSTRAINT "user_countries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_countries" ADD CONSTRAINT "user_countries_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
