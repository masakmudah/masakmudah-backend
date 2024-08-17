import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { checkUserToken } from "../midleware/cek-user-token";
import { HonoApp } from "..";

const app = new Hono<HonoApp>();

app.get("/", async (c) => {
  try {
    const allRecipes = await prisma.recipes.findMany({
      select: {
        id: true,
        recipe: true,
        slug: true,
        description: true,
        imageURL: true,
        duration: true,
        ingredients: true,
        instructions: {
          select: {
            instruction: true,
          },
        },

        categoryRecipes: {
          select: {
            categories: {
              select: {
                category: true,
              },
            },
          },
        },
        createdAt: true,
        user: true,
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

    const recipe = await prisma.recipes.findUnique({
      where: {
        slug: slugParam,
      },
      select: {
        id: true,
        recipe: true,
        slug: true,
        description: true,
        imageURL: true,
        duration: true,
        ingredients: {
          select: {
            ingredient: true,
            measure: true,
            count: true,
            sequence: true,
          },
        },
        instructions: {
          select: {
            instruction: true,
            sequence: true,
          },
        },
        categoryRecipes: {
          select: {
            categories: true,
          },
        },
        createdAt: true,
        user: true,
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
      duration: z.string().optional(),
      imageURL: z.string().url(),
      slug: z.string(),
      ingredients: z.array(
        z.object({
          ingredient: z.string(),
          count: z.number(),
          measure: z.string(),
          sequence: z.number().optional().default(0),
        })
      ),
      instructions: z.array(
        z.object({
          instruction: z.string(),
          sequence: z.number().optional().default(0),
        })
      ),
      categories: z.array(z.string()),
    })
  ),
  async (c) => {
    const user = c.get("user");

    try {
      const body = c.req.valid("json");

      const categoryIds: string[] = [];
      for (const categoryName of body.categories) {
        let category = await prisma.categories.findFirst({
          where: { category: categoryName },
        });

        if (!category) {
          category = await prisma.categories.create({
            data: { category: categoryName },
          });
        }

        categoryIds.push(category.id);
      }

      const newRecipe = await prisma.recipes.create({
        data: {
          recipe: body.recipe,
          description: body.description,
          duration: body.duration,
          imageURL: body.imageURL,
          slug: body.slug,
          userId: user.id,
          ingredients: {
            create: body.ingredients.map((ing) => ({
              ingredient: ing.ingredient,
              count: ing.count,
              measure: ing.measure,
              sequence: ing.sequence,
            })),
          },
          instructions: {
            create: body.instructions.map((instr) => ({
              instruction: instr.instruction,
              sequence: instr.sequence,
            })),
          },
          categoryRecipes: {
            create: categoryIds.map((categoryId) => ({
              categoryId: categoryId,
            })),
          },
        },
        include: {
          ingredients: true,
          instructions: true,
          categoryRecipes: true,
        },
      });

      return c.json(
        {
          success: true,
          message: "New recipe created successfully",
          newRecipe: {
            recipe: newRecipe.recipe,
            ingredients: newRecipe.ingredients,
            instructions: newRecipe.instructions,
            categories: newRecipe.categoryRecipes.map((cr) => cr.categoryId),
          },
        },
        201
      );
    } catch (error) {
      console.error(`Error creating recipe`);
      return c.json(
        {
          success: false,
          message: `Cannot create recipe`,
        },
        400
      );
    }
  }
);

export const recipesRoute = app;
