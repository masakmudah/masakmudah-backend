import { z } from "zod";

export const QueryUserSchema = z.object({
  q: z.string().optional(),
});

export const DetailUserSchema = z.object({
  username: z.string().min(1),
});

export const RecipeByUsernameSchema = z.object({
  username: z.string(),
});

export const UserByIdSchema = z.object({
  id: z.string().min(1),
});

export const UserSchema = z.object({
  fullname: z.string().min(1).max(100).trim(),
});
