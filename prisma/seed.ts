import { categories } from "../src/data/categories";
import { recipes } from "../src/data/recipes";
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
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
