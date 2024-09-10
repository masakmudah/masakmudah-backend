import { OpenAPIHono } from "@hono/zod-openapi";
import * as userService from "./service";
import * as recipeService from "../recipes/service";
import {
  QueryUserSchema,
  DetailUserSchema,
  RecipeByUsernameSchema,
  UserByIdSchema,
  UserSchema,
} from "./schema";
import { z } from "zod";
import { checkUserToken } from "../../middleware/check-user-token";
import { getUserById, updateUser } from "./service";

const API_TAG = ["Users"];

const usersRoute = new OpenAPIHono();

usersRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all users",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
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
    method: "get",
    path: "/{username}/recipes",
    description: "Get all user recipes by username",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    request: {
      params: RecipeByUsernameSchema,
    },
    responses: {
      200: {
        description: "List user recipes by username",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const usernameParam = c.req.param("username")!;
    const data = await recipeService.getAllByUsername(usernameParam);

    return c.json({
      message: "Success",
      data,
    });
  }
);

usersRoute.openapi(
  {
    method: "put",
    path: "/{id}",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    request: {
      params: UserByIdSchema,
      body: {
        content: {
          "application/json": {
            schema: UserSchema,
          },
        },
      },
    },
    description: "Update user by id.",
    responses: {
      201: {
        description: "Successfully updated user.",
      },
      404: {
        description: "User not found.",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const userById = await getUserById(id);

    if (!userById) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "User not found.",
        },
        404
      );
    }

    const body: z.infer<typeof UserSchema> = await c.req.json();
    const updatedUser = await updateUser(id, body);

    return c.json(
      {
        code: 201,
        status: "success",
        updatedUser,
      },
      201
    );
  }
);

export { usersRoute };
