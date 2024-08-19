import { z } from "zod";
import { QueryUserSchema, UserSchema } from "./schema";
import { prisma } from "../../lib/prisma";

export async function getAll(query: z.infer<typeof QueryUserSchema>) {
  if (JSON.stringify(query) === "{}") {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        fullname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      fullname: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      OR: [
        {
          username: {
            contains: query?.search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query?.search,
            mode: "insensitive",
          },
        },
        {
          fullname: {
            contains: query?.search,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      fullname: "asc",
    },
  });
}

export async function get(username: string) {
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: {
      id: true,
      username: true,
      fullname: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}

export async function deleteUser(id: string) {
  const deletePassword = await prisma.password.deleteMany({
    where: { userId: id },
  });

  const deleteUser = await prisma.user.deleteMany({
    where: { id: id },
  });

  return deleteUser;
}

export async function updateUser(
  username: string,
  body: z.infer<typeof UserSchema>
) {
  return await prisma.user.update({
    where: { username: username },
    data: {
      fullname: body.fullname,
      email: body.email,
    },
  });
}
