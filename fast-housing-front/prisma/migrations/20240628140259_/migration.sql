/*
  Warnings:

  - The `Role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('USER', 'ADMIN', 'HOST');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "Role",
ADD COLUMN     "Role" "RoleEnum" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "Role";
