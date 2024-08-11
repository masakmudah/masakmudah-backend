import { categoryRecipes } from "../src/data/category-recipes";
import { categories } from "../src/data/categories";
import { recipes } from "../src/data/recipes";
import { ingredients } from "../src/data/ingredients";
import { instructions } from "../src/data/instructions";
import { prisma } from "../src/lib/prisma";

async function seed() {
  for (let recipe of recipes) {
    const newRecipesSeed = await prisma.recipes.upsert({
      where: {
        slug: recipe.slug, // Menggunakan slug sebagai nilai unik
      },
      update: recipe,
      create: recipe,
    });
    console.log(`Recipe : ${newRecipesSeed.slug}`);
  }

  for (let category of categories) {
    const newCategoriesSeed = await prisma.categories.upsert({
      where: {
        id: category.id, // Menggunakan id sebagai nilai unik
      },
      update: category,
      create: category,
    });
    console.log(`Category : ${newCategoriesSeed.category}`);
  }

  for (let catRecipe of categoryRecipes) {
    const newCatRecipesSeed = await prisma.categoryRecipes.upsert({
      where: {
        id: catRecipe.id, // Menggunakan id sebagai nilai unik
      },
      update: catRecipe,
      create: catRecipe,
    });
    console.log(
      `Category Recipe : ${newCatRecipesSeed.categoryId} for ${newCatRecipesSeed.recipeId}`
    );
  }

  for (let ingredient of ingredients) {
    const newIngredientSeed = await prisma.ingredients.upsert({
      where: {
        id: ingredient.id, // Menggunakan id sebagai nilai unik
      },
      update: ingredient,
      create: ingredient,
    });
    console.log(
      `New ingredient : ${ingredient.count} ${ingredient.measure} ${ingredient.ingredient} `
    );
  }

  for (let instruction of instructions) {
    const newInstructionSeed = await prisma.instructions.upsert({
      where: {
        id: instruction.id, // Menggunakan id sebagai nilai unik
      },
      update: instruction,
      create: instruction,
    });
    console.log(
      `New instruction : ${instruction.recipeId} ${instruction.instruction}`
    );
  }
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
