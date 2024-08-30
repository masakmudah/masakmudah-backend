import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../lib/prisma";

import { checkUserToken } from "../middleware/check-user-token";

type Bindings = {
  TOKEN: string;
};

type Variables = {
  user: {
    id: string;
  };
};

export type HonoApp = { Bindings: Bindings; Variables: Variables };

// const app = new Hono<HonoApp>();

const API_TAG = ["Account"];

const accountRoute = new OpenAPIHono();

accountRoute.openapi(
  {
    method: "get",
    path: "/",
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

    return c.json(userData);
  }
);

export { accountRoute };
