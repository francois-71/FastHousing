/*
  Warnings:

  - The `categories` column on the `properties` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `accommodationType` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccommodationType" AS ENUM ('APARTMENT', 'HOUSE', 'VILLA', 'HOTEL', 'RESORT', 'MOTEL', 'HOSTEL');

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "accommodationType" "AccommodationType" NOT NULL,
DROP COLUMN "categories",
ADD COLUMN     "categories" TEXT[];

-- DropEnum
DROP TYPE "PropertyCategoryEnum";
