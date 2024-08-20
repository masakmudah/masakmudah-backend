import { z } from "zod";

export const QueryRecipeSchema = z.object({
  q: z.string().optional(),
});

export const RecipeByCategorySlugSchema = z.object({
  categorySlug: z.string(),
});

export const DetailRecipeSchema = z.object({
  slug: z.string().min(1),
});
