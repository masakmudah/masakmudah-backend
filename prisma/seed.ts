import { categoryRecipes } from "../src/data/category-recipes";
import { categories } from "../src/data/categories";
import { recipes } from "../src/data/recipes";
import { ingredients } from "../src/data/ingredients";
import { instructions } from "../src/data/instructions";
import { savedRecipes } from "../src/data/saved-recipes";
import { prisma } from "../src/lib/prisma";

import { passwords } from "../src/data/passwords";
import { users } from "../src/data/users";

async function seed() {
  // Seed users
  for (let user of users) {
    const newUserSeed = await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
    console.log(`User: ${newUserSeed.username}`);
  }

  // Seed passwords
  for (let password of passwords) {
    const newPasswordSeed = await prisma.password.upsert({
      where: { id: password.id },
      update: {
        hash: password.hash,
        user: {
          connect: { id: password.userId },
        },
      },
      create: {
        id: password.id,
        hash: password.hash,
        user: {
          connect: { id: password.userId },
        },
      },
    });
    console.log(`Password for userId: ${newPasswordSeed.userId}`);
  }

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

  for (let categoryRecipe of categoryRecipes) {
    const newCatRecipesSeed = await prisma.categoryRecipes.upsert({
      where: {
        id: categoryRecipe.id, // Menggunakan id sebagai nilai unik
      },
      update: categoryRecipe,
      create: categoryRecipe,
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
      `New ingredient : ${newIngredientSeed.count} ${newIngredientSeed.measure} ${newIngredientSeed.ingredient} `
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
      `New instruction : ${newInstructionSeed.recipeId} ${newInstructionSeed.instruction}`
    );
  }

  for (let savedRecipe of savedRecipes) {
    const newSavedRecipeSeed = await prisma.savedRecipes.upsert({
      where: {
        id: savedRecipe.id, // Menggunakan id sebagai nilai unik
      },
      update: savedRecipe,
      create: savedRecipe,
    });
    console.log(
      `Category Recipe : ${newSavedRecipeSeed.recipeId} for ${newSavedRecipeSeed.userId}`
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
