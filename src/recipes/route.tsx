import { OpenAPIHono } from "@hono/zod-openapi";
import * as recipeService from "./service";
import {
  QueryRecipeSchema,
  SearchByCategorySchema,
  DetailRecipeSchema,
} from "./schema";
import { z } from "zod";

const API_TAG = ["Recipes"];

const recipesRoute = new OpenAPIHono();

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

export { recipesRoute };
