/*
  Warnings:

  - You are about to alter the column `slug` on the `Recipes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[slug]` on the table `Recipes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Recipes" ALTER COLUMN "slug" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Recipes_slug_key" ON "Recipes"("slug");
