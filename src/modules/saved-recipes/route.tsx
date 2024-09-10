import { OpenAPIHono } from "@hono/zod-openapi";
import * as savedRecipeService from "./service";
import { CreateSavedRecipeSchema, savedRecipesByIdSchema } from "./schema";
import { z } from "zod";
import { checkUserToken } from "../../middleware/check-user-token";

const API_TAG = ["Saved Recipes"];

const savedRecipesRoute = new OpenAPIHono();

savedRecipesRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

// GET ALL SAVED RECIPES
savedRecipesRoute.openapi(
  {
    method: "get",
    path: "/{username}",
    description: "Get all saved recipes",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    responses: {
      200: {
        description: "List of saved recipes",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const username = c.req.param("username")!;
    const data = await savedRecipeService.getAll(username);

    return c.json({
      message: "Success",
      data,
    });
  }
);

//POST add saved recipe
savedRecipesRoute.openapi(
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
            schema: CreateSavedRecipeSchema,
          },
        },
      },
    },
    description: "Create new recipe",
    responses: {
      201: {
        description: "Successfully create new saved recipe.",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const body: z.infer<typeof CreateSavedRecipeSchema> = await c.req.json();
    const data = await savedRecipeService.checkRecipeExist(
      body.userId,
      body.recipeId
    );
    if (data) {
      return c.json({ message: "Saved recipe already exist" }, 404);
    }

    const newSavedRecipe = await savedRecipeService.create(body);

    return c.json(
      {
        code: 201,
        status: "success",
        data: newSavedRecipe,
      },
      201
    );
  }
);

savedRecipesRoute.openapi(
  {
    method: "delete",
    path: "/{id}",
    description: "Delete saved recipe by id ",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    request: {
      params: savedRecipesByIdSchema,
    },
    responses: {
      200: {
        description: "Successfully delete saved recipe",
      },
      404: {
        description: "Saved recipe not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const idParam = c.req.param("id")!;
    const data = await savedRecipeService.getSavedRecipeById(idParam);
    if (!data) {
      return c.json({ message: "Saved recipe not found" }, 404);
    }

    const result = await savedRecipeService.deleteSavedRecipe(data.id);

    return c.json({
      message: "Sucessfully delete saved recipe",
      result,
    });
  }
);

export { savedRecipesRoute };
