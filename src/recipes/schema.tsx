import { z } from "zod";

export const QueryRecipeSchema = z.object({
  search: z.string().optional(),
});

export const SearchByCategorySchema = z.object({
  categoryId: z.string(),
});

export const DetailRecipeSchema = z.object({
  slug: z.string().min(1),
});
