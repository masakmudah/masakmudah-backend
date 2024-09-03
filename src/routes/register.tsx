import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/password";
import { createToken } from "../lib/jwt";

const app = new Hono();

app.post(
  "/",
  zValidator(
    "json",
    z.object({
      username: z.string(),
      email: z.string().email(),
      fullname: z.string(),
      password: z.string(),
    })
  ),
  async (c) => {
    const body = c.req.valid("json");

    try {
      // Check if user exist
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username: body.username,
            },
            {
              email: body.email,
            },
          ],
        },
      });

      if (existingUser) {
        return c.json({
          message: "User already registered",
        });
      }

      const newUser = await prisma.user.create({
        data: {
          username: body.username,
          email: body.email,
          fullname: body.fullname,
          password: {
            create: {
              hash: await hashPassword(body.password),
            },
          },
        },
      });

      // Create token
      const token = await createToken(newUser.id);

      return c.json({
        message: "Register new user successful",
        data: {
          username: newUser.username,
          token,
        },
      });
    } catch (error) {
      return c.json({ message: "Cannot register user." }, 500);
    }
  }
);

export const registerRoute = app;
