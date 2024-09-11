import { z } from "zod";
import {
  CreateRecipeSchema,
  QueryRecipeSchema,
  RecipeByCategorySlugSchema,
} from "./schema";
import { prisma } from "../../lib/prisma";
import { generateUniqueSlug } from "../../utils/generate-slug";

export async function getAll(query: z.infer<typeof QueryRecipeSchema>) {
  const qParam = query?.q === undefined ? "" : query?.q;
  const allRecipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      imageURL: true,
      cookingTime: true,
      ingredientItems: {
        include: {
          ingredient: true,
        },
      },
      instructions: true,
      categories: true,
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          email: true,
          imageURL: true,
          description: true,
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
  });

  const showRandomRecipes = allRecipes.sort(() => Math.random() - 0.5);
  return showRandomRecipes;
}

export async function getAllByCategorySlug(slug: string) {
  let categorySlugs: string[] = [];
  if (slug !== null) {
    categorySlugs.push(slug);
  }

  const allRecipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      imageURL: true,
      cookingTime: true,
      ingredientItems: {
        include: {
          ingredient: true,
        },
      },
      instructions: true,
      categories: true,
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          email: true,
          imageURL: true,
          description: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    where: {
      categories: {
        some: {
          slug: { in: categorySlugs },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return allRecipes;
}

export async function getAllByUsername(usernameParam: string) {
  const allRecipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      imageURL: true,
      cookingTime: true,
      ingredientItems: {
        include: {
          ingredient: true,
        },
      },
      instructions: true,
      categories: true,
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          email: true,
          imageURL: true,
          description: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    where: {
      user: {
        username: usernameParam,
      },
    },
    orderBy: [
      {
        updatedAt: "desc",
      },
      {
        name: "asc",
      },
    ],
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
      cookingTime: true,
      ingredientItems: {
        include: {
          ingredient: true,
        },
        orderBy: {
          sequence: "asc",
        },
      },
      instructions: true,
      categories: true,
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          email: true,
          imageURL: true,
          description: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  return recipe;
}

export const create = async (body: z.infer<typeof CreateRecipeSchema>) => {
  try {
    const {
      name,
      description,
      instructions,
      cookingTime,
      userId,
      categoryId,
      ingredientItems,
    } = body;

    const slug = await generateUniqueSlug(body.name);
    const imageURL = body.imageURL !== undefined ? body.imageURL : "";
    console.log(slug);
    const newRecipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageURL,
        slug,
        instructions,
        cookingTime,
        user: {
          connect: { id: userId }, // Ensure the recipe is associated with a user
        },
        categories: {
          connect: { id: categoryId },
        },
        ingredientItems: {
          create: ingredientItems.map((ingredientItem) => ({
            sequence: ingredientItem.sequence,
            quantity: ingredientItem.quantity,
            measurement: ingredientItem.measurement,
            ingredient: {
              connectOrCreate: {
                where: {
                  slug: ingredientItem.ingredient.name
                    .toLowerCase()
                    .replace(/\s+/g, "-"),
                },
                create: {
                  name: ingredientItem.ingredient.name,
                  slug: ingredientItem.ingredient.name
                    .toLowerCase()
                    .replace(/\s+/g, "-"),
                },
              },
            },
          })),
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        imageURL: true,
        cookingTime: true,
        ingredientItems: {
          include: {
            ingredient: true,
          },
          orderBy: {
            sequence: "asc",
          },
        },
        instructions: true,
        categories: true,
        user: {
          select: {
            id: true,
            username: true,
            fullname: true,
            email: true,
            imageURL: true,
            description: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return newRecipe;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

export async function getRecipeById(id: string) {
  const recipeById = await prisma.recipe.findUnique({
    where: { id },
  });

  return recipeById;
}

export async function deleteRecipe(id: string) {
  const deleteRecipe = await prisma.recipe.delete({
    where: { id },
  });

  return deleteRecipe;
}
