/*
  Warnings:

  - You are about to drop the column `displayUrl` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `storedUrl` on the `images` table. All the data in the column will be lost.
  - Added the required column `url` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "displayUrl",
DROP COLUMN "storedUrl",
ADD COLUMN     "url" TEXT NOT NULL;
