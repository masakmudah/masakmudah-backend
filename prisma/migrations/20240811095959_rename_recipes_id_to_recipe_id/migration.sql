/*
  Warnings:

  - You are about to drop the column `cookingIntructions` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the column `recipesId` on the `SavedRecipes` table. All the data in the column will be lost.
  - Added the required column `recipeId` to the `SavedRecipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SavedRecipes" DROP CONSTRAINT "SavedRecipes_recipesId_fkey";

-- AlterTable
ALTER TABLE "Recipes" DROP COLUMN "cookingIntructions";

-- AlterTable
ALTER TABLE "SavedRecipes" DROP COLUMN "recipesId",
ADD COLUMN     "recipeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SavedRecipes" ADD CONSTRAINT "SavedRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
