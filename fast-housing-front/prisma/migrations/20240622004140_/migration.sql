/*
  Warnings:

  - You are about to drop the column `currencyId` on the `properties` table. All the data in the column will be lost.
  - Added the required column `currency` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_currencyId_fkey";

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "currencyId",
ADD COLUMN     "currency" TEXT NOT NULL;
