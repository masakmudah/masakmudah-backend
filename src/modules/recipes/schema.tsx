import { z } from "zod";
import { OpenAPIHono } from "@hono/zod-openapi";

export const QueryRecipeSchema = z.object({
  q: z.string().optional(),
});

export const RecipeByCategorySlugSchema = z.object({
  categorySlug: z.string(),
});

export const DetailRecipeSchema = z.object({
  slug: z.string().min(1),
});

export const CreateRecipeSchema = z.object({
  name: z.string().min(5).openapi({ example: "Resep Cah Kangkung Seafood" }),
  description: z.string().min(5),
  duration: z.string().optional().openapi({ example: " 30 Menit" }),
  slug: z.string().min(5).openapi({ example: "cah-kangkung-seafood" }),
  imageURL: z.string().min(5).openapi({ example: "http://localhost:3000" }),
  instructions: z.string().openapi({ example: "Cara memasak cah kangkung" }),
});
