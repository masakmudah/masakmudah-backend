import { z } from "zod";

export const SavedRecipeByUsernameSchema = z.object({
  username: z.string().min(1),
});

export const CreateSavedRecipeSchema = z.object({
  userId: z.string().min(1),
  recipeId: z.string().min(1),
});

export const SavedRecipesByIdSchema = z.object({
  id: z.string().min(1),
});
