/*
  Warnings:

  - Changed the type of `currency` on the `properties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "currency",
ADD COLUMN     "currency" "CurrencyEnum" NOT NULL;