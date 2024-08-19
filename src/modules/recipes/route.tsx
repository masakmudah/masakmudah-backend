import { OpenAPIHono } from "@hono/zod-openapi";
import * as recipeService from "./service";
import {
  QueryRecipeSchema,
  SearchByCategorySchema,
  DetailRecipeSchema,
  CreateRecipeSchema,
} from "./schema";
import { z } from "zod";
import {
  AuthBearerEnv,
  checkUserToken,
} from "../../midleware/check-user-token";
import { Prisma } from "@prisma/client";

const API_TAG = ["Recipes"];

const recipesRoute = new OpenAPIHono<AuthBearerEnv>();

// GET ALL RECIPES
recipesRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all recipes",
    request: {
      query: QueryRecipeSchema,
    },
    responses: {
      200: {
        description: "List of recipes",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const data = await recipeService.getAll(
      c.req.query() as z.infer<typeof QueryRecipeSchema>
    );

    return c.json({
      message: "Success",
      data,
    });
  }
);

recipesRoute.openapi(
  {
    method: "get",
    path: "/category",
    description: "Get all recipes by categoryId",
    request: {
      query: SearchByCategorySchema,
    },
    responses: {
      200: {
        description: "List of recipes by categoryId",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const data = await recipeService.getAllByCategoryId(
      c.req.query() as z.infer<typeof SearchByCategorySchema>
    );

    return c.json({
      message: "Success",
      data,
    });
  }
);

recipesRoute.openapi(
  {
    method: "get",
    path: "/{slug}",
    description: "Get detail recipe by id ",
    request: {
      params: DetailRecipeSchema,
    },
    responses: {
      200: {
        description: "Successfully get recipe details",
      },
      404: {
        description: "Recipe not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const slugParam = c.req.param("slug")!;
    const data = await recipeService.get(slugParam);

    if (!data) {
      return c.json({ message: "Recipe not found" }, 404);
    }

    return c.json({
      message: "Susscessfully get recipe detail",
      data,
    });
  }
);

recipesRoute.openapi(
  {
    method: "post",
    path: "/",
    middleware: checkUserToken,
    description: "Create a new recipe",
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateRecipeSchema,
          },
        },
      },
    },
    security: [{ AuthorizationBearer: [] }],
    responses: {
      200: { description: "Successfully saved a place" },
    },
    tags: API_TAG,
  },
  async (c) => {
    const user = c.get("user");

    try {
      // FIXME: Create a recipe
      // "Nasi goreng" -> "nasi-goreng-a2b3oe2i"
      const data = await recipeService.create(await c.req.json(), user.id);

      return c.json({
        message: "Success",
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle unique constraint violation
        if (error.code === "P2002") {
          return c.json({ message: "The recipe might already created" }, 400);
        }
      }
      return c.json({ message: (error as Error).message }, 400);
    }
  }
);

export { recipesRoute };
