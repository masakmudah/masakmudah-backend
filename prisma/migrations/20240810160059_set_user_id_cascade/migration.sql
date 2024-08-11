-- DropForeignKey
ALTER TABLE "Recipes" DROP CONSTRAINT "Recipes_userId_fkey";

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
