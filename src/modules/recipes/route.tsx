import { OpenAPIHono } from "@hono/zod-openapi";
import * as recipeService from "./service";
import {
  QueryRecipeSchema,
  RecipeByCategorySlugSchema,
  RecipeByUsernameSchema,
  DetailRecipeSchema,
  CreateRecipeSchema,
  RecipeByIdSchema,
} from "./schema";
import { z } from "zod";
import { checkUserToken } from "../../middleware/check-user-token";

const API_TAG = ["Recipes"];

const recipesRoute = new OpenAPIHono();

recipesRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

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

//GET Category Slug
recipesRoute.openapi(
  {
    method: "get",
    path: "/category/{categorySlug}",
    description: "Get all recipes by categoryId",
    request: {
      query: RecipeByCategorySlugSchema,
    },
    responses: {
      200: {
        description: "List of recipes by categoryId",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const data = await recipeService.getAllByCategorySlug(
      c.req.query() as z.infer<typeof RecipeByCategorySlugSchema>
    );

    return c.json({
      message: "Success",
      data,
    });
  }
);

//GET Recipe by Username
recipesRoute.openapi(
  {
    method: "get",
    path: "/username/{username}",
    description: "Get all recipes by username",
    request: {
      params: RecipeByUsernameSchema,
    },
    responses: {
      200: {
        description: "List of recipes by username",
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

//GET slug
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

//POST create recipe

recipesRoute.openapi(
  {
    method: "post",
    path: "/",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateRecipeSchema,
          },
        },
      },
    },
    description: "Create new recipe",
    responses: {
      201: {
        description: "Successfully create new recipe.",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const body: z.infer<typeof CreateRecipeSchema> = await c.req.json();
    const newRecipe = await recipeService.create(body);

    return c.json(
      {
        code: 201,
        status: "success",
        data: newRecipe,
      },
      201
    );
  }
);

recipesRoute.openapi(
  {
    method: "delete",
    path: "/{id}",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    description: "Delete recipe by id ",
    request: {
      params: RecipeByIdSchema,
    },
    responses: {
      200: {
        description: "Successfully delete recipe",
      },
      404: {
        description: "Recipe not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const idParam = c.req.param("id")!;
    const data = await recipeService.getRecipeById(idParam);
    if (!data) {
      return c.json({ message: "Recipe not found" }, 404);
    }

    const result = await recipeService.deleteRecipe(data.id);

    return c.json({
      message: "Susscessfully delete recipe",
      result,
    });
  }
);

export { recipesRoute };
