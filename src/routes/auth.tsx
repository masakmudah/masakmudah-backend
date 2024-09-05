import { OpenAPIHono } from "@hono/zod-openapi";
import { z } from "zod";

import { prisma } from "../lib/prisma";
import { verifyPassword } from "../lib/password";

import { createToken } from "../lib/jwt";
import { checkUserToken } from "../middleware/check-user-token";
import { hashPassword } from "../lib/password";

type Bindings = {
  TOKEN: string;
};

type Variables = {
  user: {
    id: string;
  };
};

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const RegisterSchema = z.object({
  username: z.string(),
  email: z.string(),
  fullname: z.string(),
  password: z.string(),
});

export type HonoApp = { Bindings: Bindings; Variables: Variables };

const API_TAG = ["Auth"];

const authRoute = new OpenAPIHono();

authRoute.openapi(
  {
    method: "post",
    path: "/login",
    description: "Login user",
    request: {
      body: {
        content: {
          "application/json": {
            schema: LoginSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Login successful",
      },
    },
    tags: API_TAG,
  },
  async (c, next) => {
    const body = c.req.valid("json");

    const foundUser = await prisma.user.findUnique({
      where: { username: body.username },
      include: { password: { select: { hash: true } } },
    });

    if (!foundUser) {
      c.status(404);
      return c.json({ message: "Cannot login because user not found" });
    }

    if (!foundUser?.password?.hash) {
      c.status(400);
      return c.json({
        message: "Cannot login because user doesn't have a password",
      });
    }

    const validPassword = await verifyPassword(
      foundUser.password.hash,
      body.password
    );

    if (!validPassword) {
      c.status(400);
      return c.json({
        message: "Password incorrect",
      });
    }

    const token = await createToken(foundUser.id);

    if (!token) {
      c.status(400);
      return c.json({ message: "Token failed to create" });
    }

    return c.json({
      message: "Login successful",
      token,
    });
  }
);

authRoute.openapi(
  {
    method: "post",
    path: "/register",
    description: "Register user",
    request: {
      body: {
        content: {
          "application/json": {
            schema: RegisterSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Register successful",
      },
    },
    tags: API_TAG,
  },
  async (c, next) => {
    const body = c.req.valid("json");

    try {
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

      return c.json({
        message: "Register new user successful",
        newUser: {
          username: newUser.username,
        },
      });
    } catch (error) {
      c.status(400);
      return c.json({ message: "Cannot register user." });
    }
  }
);

authRoute.openapi(
  {
    method: "get",
    path: "/me",
    description: "User Account Detail",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    responses: {
      200: {
        description: "User Account Detail",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const user = c.get("user");
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return c.json({
      message: "User data",
      user: userData,
    });
  }
);

authRoute.openapi(
  {
    method: "get",
    path: "/logout",
    description: "Logout",
    responses: {
      200: {
        description: "Logout successful",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    return c.json({
      message: "Logout successful",
    });
  }
);

export { authRoute };
