import { z } from "zod";

export const QueryUserSchema = z.object({
  search: z.string().optional(),
});

export const DetailUserSchema = z.object({
  username: z.string().min(1).openapi({ example: "sidiq99" }),
});

export const UserSchema = z.object({
  fullname: z.string().optional(),
  email: z.string().optional(),
});
