import { z } from "zod";
import {
  QueryCategorySchema,
  CategorySchema,
  CategoryByIdSchema,
} from "./schema";
import { prisma } from "../lib/prisma";

export async function getAll(q: z.infer<typeof QueryCategorySchema>) {
  if (JSON.stringify(q) === "{}") {
    return await prisma.category.findMany({
      select: {
        id: true,
        category: true,
        createdAt: true,
        updatedAt: true,
        categoryRecipes: true,
      },
    });
  }

  return await prisma.category.findMany({
    select: {
      id: true,
      category: true,
      createdAt: true,
      updatedAt: true,
      categoryRecipes: true,
    },
    where: {
      OR: [
        {
          category: {
            contains: q?.search,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      category: "asc",
    },
  });
}

export async function getCategory(category: string) {
  const categoryParam = await prisma.category.findFirst({
    where: { category },
    select: {
      id: true,
      category: true,
      createdAt: true,
      updatedAt: true,
      categoryRecipes: true,
    },
  });

  return categoryParam;
}

export async function getCategoryById(id: string) {
  const categoryById = await prisma.category.findUnique({
    where: { id: id },
    select: {
      id: true,
      category: true,
      createdAt: true,
      updatedAt: true,
      categoryRecipes: true,
    },
  });

  return categoryById;
}

export async function deleteCategory(id: string) {
  const deleteCategory = await prisma.category.delete({
    where: { id: id },
  });

  return deleteCategory;
}

export async function updateCategory(
  id: string,
  body: z.infer<typeof CategorySchema>
) {
  return await prisma.category.update({
    where: { id },
    data: {
      category: body.category,
    },
  });
}
