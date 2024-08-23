import { Category } from "@prisma/client";

type redefinedCategory = Omit<Category, "createdAt" | "updatedAt">;

export const generateRandomCategoryIds = (categories: redefinedCategory[]) => {
  const numberOfCategories = Math.floor(Math.random() * categories.length) + 1;
  const selectedCategories = new Set<string>();

  while (selectedCategories.size < numberOfCategories) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    selectedCategories.add(categories[randomIndex].id);
  }

  return Array.from(selectedCategories);
};
