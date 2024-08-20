import { z } from "zod";

export const QueryCategorySchema = z.object({
  q: z.string().optional(),
});

export const DetailCategorySchema = z.object({
  name: z.string().min(1),
});
export const CategorySchema = z.object({
  name: z.string().min(5).openapi({ example: "daging sapi" }),
  slug: z.string().min(1).openapi({ example: "daging" }),
});

export const CategorySlugSchema = z.object({
  categorySlug: z.string().min(1),
});

export const CategoryByIdSchema = z.object({
  id: z.string().min(1),
});
