import { OpenAPIHono, z } from "@hono/zod-openapi";
import { LoginSchema, RegisterSchema } from "./schema";
import * as authService from "./service";
import { prisma } from "../../lib/prisma";
import { checkUserToken } from "../../middleware/check-user-token";

type Bindings = {
  TOKEN: string;
};

type Variables = {
  user: {
    id: string;
  };
};

export type HonoApp = { Bindings: Bindings; Variables: Variables };

const apiTags = ["Auth"];

export const authRoute = new OpenAPIHono<HonoApp>();

authRoute.openapi(
  {
    method: "post",
    path: "/register",
    description: "Register a new user",
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
        description: "Successful registration",
      },
      400: {
        description: "Username already exists",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    try {
      const { data } = await authService.register(await c.req.json());

      return c.json({
        message: "Success",
        data,
      });
    } catch (error) {
      return c.json(
        {
          message: (error as Error).message,
        },
        400
      );
    }
  }
);

authRoute.openapi(
  {
    method: "post",
    path: "/login",
    description: "Login with username and password",
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
      400: {
        description: "Username or password is incorrect",
      },
    },
    tags: apiTags,
  },
  async (c) => {
    try {
      const token = await authService.login(await c.req.json());

      return c.json({
        message: "Success",
        token,
      });
    } catch (error) {
      return c.json(
        {
          message: (error as Error).message,
        },
        400
      );
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
    tags: apiTags,
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
        imageURL: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        // savedRecipes: {
        //   select: {
        //     recipes: {
        //       select: {
        //         name: true,
        //         imageURL: true,
        //         slug: true,
        //       },
        //     },
        //   },
        // },
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
    tags: apiTags,
  },
  async (c) => {
    return c.json({
      message: "Logout successful",
    });
  }
);
