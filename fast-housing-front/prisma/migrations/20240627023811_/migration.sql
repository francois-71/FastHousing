/*
  Warnings:

  - Made the column `coverImageURL` on table `properties` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "coverImage" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "properties" ALTER COLUMN "coverImageURL" SET NOT NULL;
