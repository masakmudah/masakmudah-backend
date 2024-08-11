/*
  Warnings:

  - You are about to drop the column `recipesId` on the `CategoryRecipes` table. All the data in the column will be lost.
  - Added the required column `recipeId` to the `CategoryRecipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoryRecipes" DROP CONSTRAINT "CategoryRecipes_recipesId_fkey";

-- AlterTable
ALTER TABLE "CategoryRecipes" DROP COLUMN "recipesId",
ADD COLUMN     "recipeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CategoryRecipes" ADD CONSTRAINT "CategoryRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
