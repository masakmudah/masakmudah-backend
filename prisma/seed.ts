import { recipes } from "./data/recipes";
import { users } from "./data/users";
import { prisma } from "../src/lib/prisma";
import { hashPassword } from "../src/lib/password";
import { generateUniqueSlug } from "../src/utils/generate-slug";

async function seed() {
  // Seeding user data
  for (let user of users) {
    const newUser = await prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: {
        email: user.email,
        username: user.username,
        fullname: user.fullname,
      },
      create: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        password: {
          create: {
            hash: await hashPassword(user.password),
          },
        },
      },
    });

    console.log(`User with id ${newUser.id} created`);
  }

  // Seeding recipe data
  for (let recipe of recipes) {
    const recipeSlug = await generateUniqueSlug(recipe.name);

    const ingredientItems = await Promise.all(
      recipe.ingredientItems.map(async (ingredientItem) => ({
        quantity: ingredientItem.quantity,
        measurement: ingredientItem.measurement,
        sequence: ingredientItem.sequence,
        ingredient: {
          connectOrCreate: {
            where: {
              slug: ingredientItem.ingredient.slug,
            },
            create: {
              name: ingredientItem.ingredient.name,
              slug: ingredientItem.ingredient.slug,
            },
          },
        },
      }))
    );

    const newRecipe = await prisma.recipe.upsert({
      where: {
        id: recipe.id,
      },
      update: {
        name: recipe.name,
        description: recipe.description,
        imageURL: recipe.imageURL,
        cookingTime: recipe.cookingTime,
        userId: recipe.userId,
        slug: recipeSlug,
      },
      create: {
        name: recipe.name,
        description: recipe.description,
        imageURL: recipe.imageURL,
        cookingTime: recipe.cookingTime,
        userId: recipe.userId,
        slug: recipeSlug,
        instructions: "json",
        ingredientItems: {
          create: ingredientItems,
        },
      },
    });

    console.log("Recipe created", newRecipe);
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
