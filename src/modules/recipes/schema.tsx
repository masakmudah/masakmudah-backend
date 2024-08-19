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

export const CreateRecipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  duration: z.string().min(1).optional(),
  imageURL: z.string().url().optional(),

  ingredients: z
    .array(
      z.object({
        name: z.string().min(1),
        quantity: z.number().min(1),
        measurement: z.string().min(1),
      })
    )
    .optional(),

  instructions: z
    .array(
      z.object({
        instruction: z.string().min(1),
        sequence: z.number().min(1).optional(),
      })
    )
    .optional(),

  categories: z.array(z.string().min(1)).optional(),
});
