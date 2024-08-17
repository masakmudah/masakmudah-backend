import { z } from "zod";

export const QueryUserSchema = z.object({
  search: z.string().optional(),
});

export const DetailUserSchema = z.object({
  id: z.string().min(1).openapi({ example: "uN1QueU53rID" }),
});
