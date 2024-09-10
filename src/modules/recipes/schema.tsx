// import { z } from "zod";
import { z } from "@hono/zod-openapi";

export const QueryRecipeSchema = z.object({
  q: z.string().optional(),
});

export const RecipeByCategorySlugSchema = z.object({
  categorySlug: z.string(),
});

export const RecipeByUsernameSchema = z.object({
  username: z.string(),
});

export const DetailRecipeSchema = z.object({
  slug: z.string().min(1),
});

export const CreateRecipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  cookingTime: z.string().optional(),
  slug: z.string().optional(),
  imageURL: z.string().optional(),
  instructions: z.string().optional(),
  userId: z.string(),
  categoryId: z.string(),
});

export const RecipeByIdSchema = z.object({
  id: z.string().min(1),
});
