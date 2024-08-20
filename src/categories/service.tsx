import { z } from "zod";
import { QueryCategorySchema, CategorySchema } from "./schema";
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

export async function get(id: string) {
  const category = await prisma.category.findFirst({
    where: { id: id },
    select: {
      id: true,
      category: true,
      createdAt: true,
      updatedAt: true,
      categoryRecipes: true,
    },
  });

  return category;
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
    where: { id: id },
    data: {
      category: body.category,
    },
  });
}
