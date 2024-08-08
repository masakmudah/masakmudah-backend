-- CreateTable
CREATE TABLE "SavedRecipes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recipesId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedRecipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipes" (
    "id" TEXT NOT NULL,
    "recipe" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "cookingIntructions" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedRecipes" ADD CONSTRAINT "SavedRecipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedRecipes" ADD CONSTRAINT "SavedRecipes_recipesId_fkey" FOREIGN KEY ("recipesId") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
