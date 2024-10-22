/*
  Warnings:

  - You are about to drop the column `size` on the `properties` table. All the data in the column will be lost.
  - Added the required column `sizeMetric` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeValue` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SizeMetricsEnum" AS ENUM ('SQM', 'SQFT');

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "size",
ADD COLUMN     "sizeMetric" "SizeMetricsEnum" NOT NULL,
ADD COLUMN     "sizeValue" TEXT NOT NULL;
