import { z } from "zod";
import { CategorySchema, QueryCategorySchema } from "./schema";
import { prisma } from "../../lib/prisma";

export async function getAll(q: z.infer<typeof QueryCategorySchema>) {
  if (JSON.stringify(q) === "{}") {
    return await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        recipes: true,
      },
    });
  }

  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      recipes: true,
    },
    where: {
      OR: [
        {
          name: {
            contains: q?.q,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCategory(categorySlug: string) {
  const categoryParam = await prisma.category.findFirst({
    where: { slug: categorySlug },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      recipes: true,
    },
  });

  return categoryParam;
}

export async function getCategoryById(id: string) {
  const categoryById = await prisma.category.findUnique({
    where: { id: id },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      recipes: true,
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
      name: body.name,
    },
  });
}

export const create = async (body: z.infer<typeof CategorySchema>) => {
  try {
    const { name } = body;
    const { slug } = body;

    const newCategory = await prisma.category.create({
      data: {
        name,
        slug,
      },
    });
    return newCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
