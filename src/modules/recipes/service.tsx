import { z } from "zod";
import {
  CreateRecipeSchema,
  QueryRecipeSchema,
  RecipeByCategorySlugSchema,
  RecipeByUsernameSchema,
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

recipesRoute.openapi(
  {
    method: "get",
    path: "/username/{username}",
    description: "Get all recipes by username",
    request: {
      query: RecipeByUsernameSchema,
    },
    responses: {
      200: {
        description: "List of recipes by username",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const data = await recipeService.getAllByUsername(
      c.req.query() as z.infer<typeof RecipeByUsernameSchema>
    );

    return c.json({
      message: "Success",
      data,
    });
  }
);

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
      },
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

export const create = async (body: z.infer<typeof CreateRecipeSchema>) => {
  try {
    const {
      name,
      description,
      instructions,
      cookingTime,
      userId,
      categoryId,
      // ingredients,
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
        // ingredientItems: {
        //   create: ingredients || [], // Create related ingredient items if provided
        // },
      },
    });

    return newRecipe;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};
