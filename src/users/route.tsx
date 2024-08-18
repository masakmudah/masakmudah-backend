import { OpenAPIHono } from "@hono/zod-openapi";
import * as userService from "./service";
import { QueryUserSchema, DetailUserSchema, UserSchema } from "./schema";
import { z } from "zod";

const API_TAG = ["Users"];

const usersRoute = new OpenAPIHono();

// GET ALL USERS
usersRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all users",
    request: {
      query: QueryUserSchema,
    },
    responses: {
      200: {
        description: "List of users",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const data = await userService.getAll(
      c.req.query() as z.infer<typeof QueryUserSchema>
    );

    return c.json({
      message: "Success",
      data,
    });
  }
);

usersRoute.openapi(
  {
    method: "get",
    path: "/{username}",
    description: "Get detail user by username ",
    request: {
      params: DetailUserSchema,
    },
    responses: {
      200: {
        description: "Successfully get user details",
      },
      404: {
        description: "User not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const usernameParam = c.req.param("username")!;
    const data = await userService.get(usernameParam);

    if (!data) {
      return c.json({ message: "User not found" }, 404);
    }

    return c.json({
      message: "Susscessfully get user detail",
      data,
    });
  }
);

usersRoute.openapi(
  {
    method: "put",
    path: "/{username}",
    description: "Update user by username ",
    body: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
    responses: {
      200: {
        description: "Successfully update user",
      },
      404: {
        description: "User not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const usernameParam = c.req.param("username")!;
    const body = await c.req.json();

    const data = await userService.get(usernameParam);

    if (!data) {
      return c.json({ message: "User not found" }, 404);
    }

    const result = await userService.updateUser(usernameParam, body);

    return c.json({
      message: "Susscessfully update user",
      result,
    });
  }
);

usersRoute.openapi(
  {
    method: "delete",
    path: "/{username}",
    description: "Delete detail user by username ",
    request: {
      params: DetailUserSchema,
    },
    responses: {
      200: {
        description: "Successfully delete user",
      },
      404: {
        description: "User not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const usernameParam = c.req.param("username")!;
    const data = await userService.get(usernameParam);
    if (!data) {
      return c.json({ message: "User not found" }, 404);
    }

    const result = await userService.deleteUser(data.id);

    return c.json({
      message: "Susscessfully delete user",
      result,
    });
  }
);

export { usersRoute };
