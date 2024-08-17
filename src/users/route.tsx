import { OpenAPIHono } from "@hono/zod-openapi";
import * as userService from "./service";
import { QueryUserSchema, DetailUserSchema } from "./schema";
import { z } from "zod";

const API_TAG = ["Users"];

const userRoute = new OpenAPIHono();

// GET ALL USERS
userRoute.openapi(
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

userRoute.openapi(
  {
    method: "get",
    path: "/{id}",
    description: "Get detail user by id ",
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
    const idParam = c.req.param("id")!;
    console.log(idParam);

    const data = await userService.get(idParam);
    console.log(data);

    if (!data) {
      return c.json({ message: "User not found" }, 404);
    }

    return c.json({
      message: "Susscessfully get user detail",
      data,
    });
  }
);

export { userRoute };
