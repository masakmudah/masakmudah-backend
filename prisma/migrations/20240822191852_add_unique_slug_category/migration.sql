/*
  Warnings:

  - You are about to drop the column `duration` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `_IngredientItemToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipeId` to the `IngredientItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `IngredientItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_IngredientItemToRecipe" DROP CONSTRAINT "_IngredientItemToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientItemToRecipe" DROP CONSTRAINT "_IngredientItemToRecipe_B_fkey";

-- DropIndex
DROP INDEX "Password_userId_key";

-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "slug" DROP DEFAULT;

-- AlterTable
ALTER TABLE "IngredientItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "recipeId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "duration",
ADD COLUMN     "cookingTime" TEXT;

-- DropTable
DROP TABLE "_IngredientItemToRecipe";

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- AddForeignKey
ALTER TABLE "IngredientItem" ADD CONSTRAINT "IngredientItem_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
