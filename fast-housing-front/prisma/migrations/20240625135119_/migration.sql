/*
  Warnings:

  - You are about to drop the `_CategoryToProperty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToProperty" DROP CONSTRAINT "_CategoryToProperty_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProperty" DROP CONSTRAINT "_CategoryToProperty_B_fkey";

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "categories" "PropertyCategoryEnum"[];

-- DropTable
DROP TABLE "_CategoryToProperty";

-- DropTable
DROP TABLE "categories";
