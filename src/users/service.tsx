import { z } from "zod";
import { QueryUserSchema } from "./schema";
import { prisma } from "../lib/prisma";

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

export async function get(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
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
