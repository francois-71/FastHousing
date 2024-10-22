/*
  Warnings:

  - You are about to drop the `bookings` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PropertyCategoryEnum" AS ENUM ('APARTMENT', 'HOUSE', 'VILLA', 'HOTEL', 'RESORT', 'MOTEL', 'HOSTEL');

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_property_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "bookings";
