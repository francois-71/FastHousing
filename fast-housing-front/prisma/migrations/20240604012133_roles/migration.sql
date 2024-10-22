/*
  Warnings:

  - You are about to drop the column `amenities` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `properties` table. All the data in the column will be lost.
  - The `category` column on the `properties` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `price` on the `properties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rating` on the `properties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rooms` on the `properties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'HOST');

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "amenities",
DROP COLUMN "email",
DROP COLUMN "phone",
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL,
DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" TEXT[],
DROP COLUMN "rooms",
ADD COLUMN     "rooms" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "property_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToProperty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProperty_AB_unique" ON "_CategoryToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProperty_B_index" ON "_CategoryToProperty"("B");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProperty" ADD CONSTRAINT "_CategoryToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProperty" ADD CONSTRAINT "_CategoryToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
