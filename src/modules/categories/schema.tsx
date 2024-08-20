import { z } from "zod";

export const QueryCategorySchema = z.object({
  search: z.string().optional(),
});

export const DetailCategorySchema = z.object({
  category: z.string().min(1),
});

export const CategorySchema = z.object({
  category: z.string().min(1),
});

export const CategoryByIdSchema = z.object({
  id: z.string().min(1),
});
