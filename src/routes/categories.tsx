import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { checkUserToken } from "../midleware/cekUserToken";

import { HonoApp } from "..";

const app = new Hono<HonoApp>();

app.get("/", async (c) => {
  try {
    return c.json(
      {
        success: true,
        message: "List data Categories",
        data: [
          {
            id: "cat-1",
            category: "Ayam",
            createdAt: "2024-08-10T11:02:49.177Z",
            updatedAt: "2024-08-10T11:02:49.177Z",
          },
          {
            id: "cat-2",
            category: "Sayuran",
            createdAt: "2024-08-10T11:02:49.177Z",
            updatedAt: "2024-08-10T11:02:49.177Z",
          },
          {
            id: "cat-3",
            category: "Sapi",
            createdAt: "2024-08-10T11:02:49.177Z",
            updatedAt: "2024-08-10T11:02:49.177Z",
          },
          {
            id: "cat-4",
            category: "Seafood",
            createdAt: "2024-08-10T11:02:49.177Z",
            updatedAt: "2024-08-10T11:02:49.177Z",
          },
        ],
      },
      200
    );
  } catch (error) {
    console.error(`Error getting categories: ${error}`);
    return c.json(
      { success: false, message: "Failed to fetch categories" },
      500
    );
  }
});

app.get("/allCategories", async (c) => {
  try {
    const categories = await prisma.categories.findMany({
      select: {
        id: true,
        category: true,
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

    const newCategory = await prisma.categories.update({
      where: { id },
      data: {
        category: String(body.category),
      },
    });

    return c.json(newCategory);
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
