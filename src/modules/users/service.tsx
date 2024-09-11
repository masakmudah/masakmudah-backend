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
        email: true,
        imageURL: true,
        description: true,
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
      email: true,
      imageURL: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      OR: [
        {
          username: {
            contains: query?.q,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query?.q,
            mode: "insensitive",
          },
        },
        {
          fullname: {
            contains: query?.q,
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
      imageURL: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}

export async function updateUser(id: string, body: z.infer<typeof UserSchema>) {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      fullname: body.fullname,
      description: body.description,
    },
  });
  return updatedUser;
}

export async function getUserById(id: string) {
  const userById = await prisma.user.findUnique({
    where: { id },
  });

  return userById;
}
