import { z } from "zod";
import {
  CreateRecipeSchema,
  QueryRecipeSchema,
  RecipeByCategorySlugSchema,
} from "./schema";
import { prisma } from "../../lib/prisma";

export async function getAll(query: z.infer<typeof QueryRecipeSchema>) {
  const qParam = query?.q === undefined ? "" : query?.q;
  const allRecipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      imageURL: true,
      duration: true,
      ingredientItems: true,
      instructions: true,
      categories: true,
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          email: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    where: {
      OR: [
        {
          name: {
            contains: qParam,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      name: "asc",
    },
  });

  return allRecipes;
}

export async function getAllByCategorySlug(
  query: z.infer<typeof RecipeByCategorySlugSchema>
) {
  let categorySlugs: string[] = [];
  if (query?.categorySlug !== null) {
    categorySlugs.push(query?.categorySlug);
  }

  const allRecipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      imageURL: true,
      duration: true,
      ingredientItems: true,
      instructions: true,
      categories: true,
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          email: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    where: {
      categories: { slug: { in: categorySlugs } },
    },
    orderBy: {
      name: "asc",
    },
  });

  return allRecipes;
}

export async function get(slugParam: string) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      slug: slugParam,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      imageURL: true,
      duration: true,
      ingredientItems: true,
      instructions: true,
      categories: true,
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          email: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  return recipe;
}

export async function create(body: z.infer<typeof CreateRecipeSchema>) {
  const newRecipe = await prisma.recipe.create({
    data: {
      ...body,
    },
  });
  return newRecipe;
}
