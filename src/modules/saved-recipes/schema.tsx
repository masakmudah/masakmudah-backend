import { z } from "zod";

export const CreateSavedRecipeSchema = z.object({
  userId: z.string(),
  recipeId: z.string().min(1),
});

export const savedRecipesByIdSchema = z.object({
  id: z.string().min(1),
});
