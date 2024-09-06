import { recipes } from "./data/recipes";
import { users } from "./data/users";
import { prisma } from "../src/lib/prisma";
import { hashPassword } from "../src/lib/password";
import { categories } from "./data/categories";
import { generateUniqueSlug } from "../src/utils/generate-slug";

const PROFILE_PREFIX_URL = "https://api.dicebear.com/9.x/thumbs/svg?seed=";

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
        imageURL: PROFILE_PREFIX_URL + user.username,
      },
      create: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        imageURL: PROFILE_PREFIX_URL + user.username,
        password: {
          create: {
            hash: await hashPassword(user.password),
          },
        },
      },
    });

    console.log(`User with id ${newUser.id} created`);
  }

  for (let category of categories) {
    const newCategory = await prisma.category.upsert({
      where: {
        id: category.id,
      },
      update: {
        name: category.name,
      },
      create: {
        id: category.id,
        name: category.name,
        slug: category.slug,
      },
    });

    console.log(newCategory);
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
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        imageURL: recipe.imageURL,
        cookingTime: recipe.cookingTime,
        userId: recipe.userId,
        slug: recipeSlug,
        instructions: recipe.instructions,
        ingredientItems: {
          create: ingredientItems,
        },
        categories: {
          connect: recipe.categoryIds.map((categoryId) => ({
            id: categoryId,
          })),
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
