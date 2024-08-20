import { z } from "zod";

export const QueryUserSchema = z.object({
  search: z.string().optional(),
});

export const DetailUserSchema = z.object({
  username: z.string().min(1),
});

export const UserSchema = z.object({
  fullname: z.string().min(1),
  email: z.string().min(1),
});
