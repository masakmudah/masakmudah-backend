import { z } from "zod";
import { LoginSchema, RegisterSchema } from "./auth-schema";
import { prisma } from "../../lib/prisma";
import { verifyPassword } from "../../lib/password";
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

  return { success: true, user: newUser };
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
function hashPassword(password: string): any {
  throw new Error("Function not implemented.");
}