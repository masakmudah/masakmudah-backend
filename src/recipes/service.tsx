import { z } from "zod";
import { QueryRecipeSchema, SearchByCategorySchema } from "./schema";
import { prisma } from "../lib/prisma";

export async function getAll(query: z.infer<typeof QueryRecipeSchema>) {
  const allRecipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      imageURL: true,
      duration: true,
      ingredients: {
        select: {
          id: true,
          quantity: true,
          measurement: true,
          name: true,
          sequence: true,
        },
        orderBy: {
          sequence: "asc",
        },
      },
      instructions: {
        select: {
          id: true,
          text: true,
          sequence: true,
        },
        orderBy: {
          sequence: "asc",
        },
      },
      categories: {
        select: {
          categories: {
            select: {
              id: true,
              category: true,
            },
          },
        },
        orderBy: {
          categories: {
            category: "asc",
          },
        },
      },
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          email: true,
        },
      },
    },
    where: {
      OR: [
        {
          name: {
            contains: query?.search,
            mode: "insensitive",
          },
        },
        {
          ingredients: {
            some: {
              name: {
                contains: query?.search,
                mode: "insensitive",
              },
            },
          },
        },
        {
          instructions: {
            some: {
              text: {
                contains: query?.search,
                mode: "insensitive",
              },
            },
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

export async function getAllByCategoryId(
  query: z.infer<typeof SearchByCategorySchema>
) {
  let categoryIds: string[] = [];
  if (query?.categoryId !== null) {
    categoryIds.push(query?.categoryId);
  }

  const allRecipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      imageURL: true,
      duration: true,
      ingredients: {
        select: {
          id: true,
          quantity: true,
          measurement: true,
          name: true,
          sequence: true,
        },
        orderBy: {
          sequence: "asc",
        },
      },
      instructions: {
        select: {
          id: true,
          text: true,
          sequence: true,
        },
        orderBy: {
          sequence: "asc",
        },
      },
      categories: {
        select: {
          categories: {
            select: {
              id: true,
              category: true,
            },
          },
        },
        orderBy: {
          categories: {
            category: "asc",
          },
        },
      },
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          email: true,
        },
      },
    },
    where: {
      categories: {
        some: { categoryId: { in: categoryIds } },
      },
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
      ingredients: {
        select: {
          id: true,
          name: true,
          measurement: true,
          quantity: true,
          sequence: true,
        },
        orderBy: {
          sequence: "asc",
        },
      },
      instructions: {
        select: {
          id: true,
          text: true,
          sequence: true,
        },
        orderBy: {
          sequence: "asc",
        },
      },
      categories: {
        select: {
          categories: {
            select: {
              id: true,
              category: true,
            },
          },
        },
        orderBy: {
          categories: {
            category: "asc",
          },
        },
      },
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          email: true,
        },
      },
    },
  });

  return recipe;
}
