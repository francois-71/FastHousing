/*
  Warnings:

  - You are about to drop the column `signedImageUrl` on the `properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "signedImageUrl",
ADD COLUMN     "coverImageURL" TEXT;
