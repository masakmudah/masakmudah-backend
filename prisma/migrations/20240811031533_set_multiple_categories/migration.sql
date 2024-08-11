/*
  Warnings:

  - You are about to drop the column `name` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `Categories` table. All the data in the column will be lost.
  - Added the required column `category` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_recipeId_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "name",
DROP COLUMN "recipeId",
ADD COLUMN     "category" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CategoryRecipes" (
    "id" TEXT NOT NULL,
    "recipesId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryRecipes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoryRecipes" ADD CONSTRAINT "CategoryRecipes_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryRecipes" ADD CONSTRAINT "CategoryRecipes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
