import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { checkUserToken } from "../midleware/cekUserToken";
import { HonoApp } from "..";

const app = new Hono<HonoApp>();

app.get("/", async (c) => {
  try {
    const allRecipes = await prisma.recipes.findMany({
      where: {},
      orderBy: { createdAt: "desc" },
      include: {
        categoryRecipes: {
          include: { categories: true },
        },
      },
    });
    return c.json(
      {
        success: true,
        message: "List data Recipes",
        data: allRecipes,
      },
      200
    );
  } catch (error) {
    console.error(`Error getting recipes: ${error}`);
    return c.json({ success: false, message: "Failed to fetch recipes" }, 500);
  }
});

app.get("/:slug", async (c) => {
  try {
    const slugParam = c.req.param("slug");

    if (!slugParam) {
      return c.json({ message: "Recipe slug needed" }, 400);
    }

    const recipe = await prisma.recipes.findFirst({
      where: { slug: slugParam },
      include: {
        categoryRecipes: { include: { categories: true } },
        ingredients: {
          orderBy: {
            sequence: "asc",
          },
        },
        instructions: {
          orderBy: {
            sequence: "asc",
          },
        },
      },
    });

    if (!recipe) {
      return c.json({ message: "Recipe doesn't exist!" }, 404);
    }

    return c.json({
      success: true,
      message: `Recipe ${recipe.slug}`,
      data: recipe,
    });
  } catch (err: any) {
    console.log(`Error retrieving recipe: ${err.message}`);
    return c.json({ message: "Failed to retrieve recipe" }, 500);
  }
});

app.post(
  "/create",
  checkUserToken(),
  zValidator(
    "json",
    z.object({
      recipe: z.string(),
      description: z.string(),
      imageURL: z.string().url(),
      slug: z.string(),
      ingredients: z.string(),
      cookingIntructions: z.string(),
      userId: z.string(),
    })
  ),
  async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");
    try {
      const newRecipe = await prisma.recipes.create({
        data: {
          recipe: body.recipe,
          description: body.description,
          imageURL: body.imageURL,
          slug: body.slug,
          userId: body.userId,
        },
      });
      return c.json(
        {
          success: true,
          message: "New recipe created successfully",
          newRecipe: {
            recipe: newRecipe.recipe,
          },
        },
        201
      );
    } catch (error) {
      console.error(`Error creating recipe: ${error}`);
      return c.json({ message: "Cannot create recipe." }, 400);
    }
  }
);

export const recipesRoute = app;
