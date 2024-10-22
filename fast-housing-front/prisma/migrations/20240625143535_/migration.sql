/*
  Warnings:

  - Changed the type of `accommodationType` on the `properties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AccommodationEnum" AS ENUM ('APARTMENT', 'HOUSE', 'VILLA', 'HOTEL', 'RESORT', 'MOTEL', 'HOSTEL');

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "accommodationType",
ADD COLUMN     "accommodationType" "AccommodationEnum" NOT NULL;

-- DropEnum
DROP TYPE "AccommodationType";
