import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { checkUserToken } from "../midleware/cek-user-token";

import { HonoApp } from "..";

const app = new Hono<HonoApp>();

app.get("/", async (c) => {
  try {
    const dataCategories = await prisma.categories.findMany({
      select: {
        id: true,
        category: true,
        categoryRecipes: true,
        updatedAt: true,
      },
    });
    return c.json({
      satatus: true,
      message: "Data Categories",
      dataCategories,
    });
  } catch (error) {
    console.error(`Error getting categories: ${error}`);
    return c.json(
      { success: false, message: "Failed to fetch categories" },
      500
    );
  }
});

app.get("/:categories", async (c) => {
  try {
    const categoryParam = c.req.param("categories");
    const categories = await prisma.categories.findMany({
      where: { category: categoryParam },
      select: {
        id: true,
        category: true,
        categoryRecipes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return c.json(categories);
  } catch (error) {
    console.error("Failed to retrieve categories:", error);
    return c.json({ message: "Cannot retrieve categories." }, 400);
  }
});

app.post(
  "/create",
  checkUserToken(),
  zValidator(
    "json",
    z.object({
      category: z.string(),
    })
  ),
  async (c) => {
    const user = c.get("user");
    const body = c.req.valid("json");
    try {
      const newCategory = await prisma.categories.create({
        data: {
          category: body.category,
        },
      });

      return c.json(
        {
          success: true,
          message: "New categories created successfully",
          newCategory: {
            category: newCategory.category,
          },
        },
        201
      );
    } catch (error) {
      console.error(`Error creating category: ${error}`);
      return c.json({ message: "Cannot create Category." }, 400);
    }
  }
);

app.delete("/:id", checkUserToken(), async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    if (!id) {
      return c.json({ message: `Categori not found`, Status: 404 });
    }

    const newCategory = await prisma.categories.delete({
      where: { id },
    });

    return c.json({
      status: true,
      message: `Categery with ${id} deleted`,
    });
  } catch (error) {
    console.error(`Error Category : ${error}`);
  }
});

app.put(
  "/:id",
  checkUserToken(),
  zValidator(
    "json",
    z.object({
      category: z.string().optional(),
    })
  ),
  async (c) => {
    try {
      const id = c.req.param("id");

      if (!id) {
        return c.json({ message: "Category ID not provided", status: 400 });
      }

      const body = c.req.valid("json");

      if (!body.category) {
        return c.json({ message: "No update data provided", status: 400 });
      }

      const updatedCategory = await prisma.categories.update({
        where: { id },
        data: {
          category: body.category,
        },
      });

      return c.json(updatedCategory);
    } catch (error) {
      console.error(
        `Error updating category: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      return c.json({ message: "Error updating category", status: 500 });
    }
  }
);

export const categories = app;
