/*
  Warnings:

  - Changed the type of `sizeValue` on the `properties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "sizeValue",
ADD COLUMN     "sizeValue" INTEGER NOT NULL;
