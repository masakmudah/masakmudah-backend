// import { z } from "zod";
import { z } from "@hono/zod-openapi";
import { ingredients } from "../../../prisma/data/ingredients";

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
  instructions: z.array(
    z.object({
      step: z.number(),
      text: z.string(),
    })
  ),
  ingredientItems: z.array(
    z.object({
      quantity: z.number(),
      measurement: z.string(),
      sequence: z.number(),
      ingredient: z.object({
        name: z.string(),
      }),
    })
  ),
  userId: z.string(),
  categoryId: z.string(),
});
