import { z } from "zod";
import { OpenAPIHono } from "@hono/zod-openapi";
import { LoginSchema, RegisterSchema } from "./auth-schema";
import { prisma } from "../../lib/prisma";
import { hashPassword, verifyPassword } from "../../lib/password";
import { createToken } from "../../lib/jwt";

export async function register(body: z.infer<typeof RegisterSchema>) {
  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (user) {
    throw new Error("Username already exists");
  }

  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      fullname: body.fullname,
      password: {
        create: {
          hash: await hashPassword(body.password),
        },
      },
      email: body.email,
    },
  });
  
  const token = await createToken(newUser.id);

  return { success: true, user: newUser, token: token, message: "Success" };
}

export async function login(body: z.infer<typeof LoginSchema>) {
  const user = await prisma.user.findUnique({
    where: { username: body.username },
    include: { password: true },
  });

  if (!user?.password) {
    throw new Error("Username or password is incorrect");
  }

  if (!(await verifyPassword(user.password.hash, body.password))) {
    throw new Error("Username or password is incorrect");
  }

  return await createToken(user.id);
}
