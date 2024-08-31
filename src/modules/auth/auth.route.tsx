import { OpenAPIHono, z } from "@hono/zod-openapi";
import { LoginSchema, RegisterSchema } from "./auth-schema";
import * as authService from "./auth-login";

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
    try
    {
      const token = await authService.register(await c.req.json());
      await authService.register(await c.req.json());

      return c.json({
        message: "Success",
        data: {
          token,
        },
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
        data: {
          token,
        },
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
