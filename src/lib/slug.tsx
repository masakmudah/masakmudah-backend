import slugify from "slugify";
import { prisma } from "./prisma";

function randomId() {
  return Math.random().toString(36).slice(2, 7);
}

export async function generateRecipeSlug(recipeName: string) {
  let recipeSlug = slugify(recipeName);

  const recipe = await prisma.recipe.findUnique({
    where: {
      slug: recipeSlug,
    },
  });

  return !recipe ? recipeSlug : recipeSlug + "-" + randomId();
}

export async function generateCategorySlug(categoryName: string) {
  let categorySlug = slugify(categoryName);

  const category = await prisma.category.findUnique({
    where: {
      slug: categorySlug,
    },
  });

  return !category ? categorySlug : categorySlug + "-" + randomId();
}
