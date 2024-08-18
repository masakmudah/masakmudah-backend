import { z } from "zod";

export const QueryRecipeSchema = z.object({
  search: z.string().optional().openapi({ example: "go" }),
});

export const SearchByCategorySchema = z.object({
  categoryId: z.string().openapi({ example: "uuflc5ng06nqxge861rtpq4s" }),
});

export const DetailRecipeSchema = z.object({
  slug: z.string().min(1).openapi({ example: "nasi-goreng" }),
});
