-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hashedPassword" TEXT,
ALTER COLUMN "Role" DROP NOT NULL;
