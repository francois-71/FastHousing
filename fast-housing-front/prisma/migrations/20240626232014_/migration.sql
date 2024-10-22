/*
  Warnings:

  - You are about to drop the column `url` on the `images` table. All the data in the column will be lost.
  - Added the required column `displayUrl` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storedUrl` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "url",
ADD COLUMN     "displayUrl" TEXT NOT NULL,
ADD COLUMN     "storedUrl" TEXT NOT NULL;
