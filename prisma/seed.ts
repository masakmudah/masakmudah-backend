import { categoryRecipes } from "../src/data/category-recipes";
import { categories } from "../src/data/categories";
import { recipes } from "../src/data/recipes";
import { ingredients } from "../src/data/ingredients";
import { instructions } from "../src/data/instructions";
import { savedRecipes } from "../src/data/saved-recipes";
import { prisma } from "../src/lib/prisma";
import { users } from "../src/data/users";
import { hashPassword } from "../src/lib/password";
import slugify from "slugify";

// const recipeExample = {
//   name: "Nasi Goreng",
//   slug: "nasi-goreng",
//   description: "Resep nasi goreng spesial.",
//   duration: "30 menit",
//   imageURL:
//     "https://img-global.cpcdn.com/recipes/9b66747d60cbff8e/640x640sq70/photo.webp",
//   ingredients: [
//     {
//       name: "Nasi",
//       quantity: 1,
//       measurement: "piring",
//       sequence: 1,
//     },
//   ],
// };

async function seed() {
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

  // for (let recipe of recipes) {
  //   const newRecipesSeed = await prisma.recipe.upsert({
  //     where: { slug: recipe.slug },
  //     update: recipe,
  //     create: recipe,
  //   });

  //   console.log(`Recipe: ${newRecipesSeed.slug}`);
  // }

  // for (let category of categories) {
  //   const newCategoriesSeed = await prisma.category.upsert({
  //     where: {
  //       id: category.id, // Menggunakan id sebagai nilai unik
  //     },
  //     update: category,
  //     create: category,
  //   });
  //   console.log(`Category : ${newCategoriesSeed.category}`);
  // }

  // for (let catRecipe of categoryRecipes) {
  //   const newCatRecipesSeed = await prisma.categoryRecipe.upsert({
  //     where: {
  //       id: catRecipe.id, // Menggunakan id sebagai nilai unik
  //     },
  //     update: catRecipe,
  //     create: catRecipe,
  //   });
  //   console.log(
  //     `Category Recipe : ${newCatRecipesSeed.categoryId} for ${newCatRecipesSeed.recipeId}`
  //   );
  // }

  // for (let instruction of instructions) {
  //   const newInstructionSeed = await prisma.instruction.upsert({
  //     where: {
  //       id: instruction.id, // Menggunakan id sebagai nilai unik
  //     },
  //     update: instruction,
  //     create: instruction,
  //   });
  //   console.log(
  //     `New instruction : ${instruction.recipeId} ${instruction.text}`
  //   );
  // }

  // for (let savedRecipe of savedRecipes) {
  //   const newSavedRecipeSeed = await prisma.savedRecipe.upsert({
  //     where: {
  //       id: savedRecipe.id, // Menggunakan id sebagai nilai unik
  //     },
  //     update: savedRecipe,
  //     create: savedRecipe,
  //   });
  //   console.log(
  //     `Category Recipe : ${newSavedRecipeSeed.recipeId} for ${newSavedRecipeSeed.userId}`
  //   );
  // }
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
