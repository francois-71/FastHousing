/*
  Warnings:

  - You are about to drop the column `fileName` on the `images` table. All the data in the column will be lost.
  - Added the required column `filename` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "fileName",
ADD COLUMN     "filename" TEXT NOT NULL;
