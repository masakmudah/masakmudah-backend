import { z } from "zod";
import { CreateSavedRecipeSchema } from "./schema";
import { prisma } from "../../lib/prisma";

export async function getAll(usernameParam: string) {
  const allRecipes = await prisma.savedRecipe.findMany({
    select: {
      id: true,
      userId: true,
      recipeId: true,
      createdAt: true,
      updatedAt: true,
      recipes: {
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
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    where: {
      user: {
        username: usernameParam,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return allRecipes;
}

export const create = async (body: z.infer<typeof CreateSavedRecipeSchema>) => {
  try {
    const { userId, recipeId } = body;

    const newSavedRecipe = await prisma.savedRecipe.create({
      data: {
        userId,
        recipeId,
      },
    });

    return newSavedRecipe;
  } catch (error) {
    console.error("Error creating saved recipe:", error);
    throw error;
  }
};

export async function getSavedRecipeById(id: string) {
  const savedRecipeById = await prisma.savedRecipe.findUnique({
    where: { id: id },
    select: {
      id: true,
      userId: true,
      recipeId: true,
      createdAt: true,
      updatedAt: true,
      recipes: {
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
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return savedRecipeById;
}

export async function checkRecipeExist(userId: string, recipeId: string) {
  const savedRecipeResult = await prisma.savedRecipe.findMany({
    where: {
      AND: [{ userId: userId }, { recipeId: recipeId }],
    },
    select: {
      id: true,
      userId: true,
      recipeId: true,
      createdAt: true,
      updatedAt: true,
      recipes: {
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
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return savedRecipeResult.length == 1 ? true : false;
}

export async function deleteSavedRecipe(id: string) {
  const deleteSavedRecipe = await prisma.savedRecipe.delete({
    where: { id: id },
  });

  return deleteSavedRecipe;
}
