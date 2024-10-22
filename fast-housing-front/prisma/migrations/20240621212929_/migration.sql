/*
  Warnings:

  - You are about to drop the column `signedUrl` on the `images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "signedUrl";

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "signedImageUrl" TEXT;
