import { OpenAPIHono } from "@hono/zod-openapi";
import * as categoryService from "./service";
import {
  QueryCategorySchema,
  DetailCategorySchema,
  CategorySchema,
  CategoryByIdSchema,
} from "./schema";
import { z } from "zod";

const API_TAG = ["Categories"];

const categoriesRoute = new OpenAPIHono();

// GET ALL CATEGORIES
categoriesRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all categories",
    request: {
      query: QueryCategorySchema,
    },
    responses: {
      200: {
        description: "List of categories",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const data = await categoryService.getAll(
      c.req.query() as z.infer<typeof QueryCategorySchema>
    );

    return c.json({
      message: "Success",
      data,
    });
  }
);

categoriesRoute.openapi(
  {
    method: "get",
    path: "/{category}",
    description: "Get detail category by category ",
    request: {
      params: CategorySchema,
    },
    responses: {
      200: {
        description: "Successfully get category",
      },
      404: {
        description: "category not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const categoryParam = c.req.param("category")!;
    const data = await categoryService.get(categoryParam);

    if (!data) {
      return c.json({ message: "Category not found" }, 404);
    }

    return c.json({
      message: "Susscessfully get category detail",
      data,
    });
  }
);

categoriesRoute.openapi(
  {
    method: "get",
    path: "/{id}",
    description: "Get detail category by id ",
    request: {
      params: CategoryByIdSchema,
    },
    responses: {
      200: {
        description: "Successfully get category details",
      },
      404: {
        description: "category not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const idParam = c.req.param("id")!;
    const data = await categoryService.get(idParam);

    if (!data) {
      return c.json({ message: "Category not found" }, 404);
    }

    return c.json({
      message: "Susscessfully get category detail",
      data,
    });
  }
);

categoriesRoute.openapi(
  {
    method: "put",
    path: "/{id}",
    description: "Update category by id ",
    request: {
      body: {
        content: {
          "application/json": {
            schema: CategoryByIdSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Successfully update category",
      },
      404: {
        description: "Category not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const idParam = c.req.param("id")!;
    const body = await c.req.json();

    const data = await categoryService.get(idParam);

    if (!data) {
      return c.json({ message: "Category not found" }, 404);
    }

    const result = await categoryService.updateCategory(idParam, body);

    return c.json({
      message: "Susscessfully update category",
      result,
    });
  }
);

categoriesRoute.openapi(
  {
    method: "delete",
    path: "/{id}",
    description: "Delete detail category by id ",
    request: {
      params: CategoryByIdSchema,
    },
    responses: {
      200: {
        description: "Successfully delete category",
      },
      404: {
        description: "Category not found",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const idParam = c.req.param("id")!;
    const data = await categoryService.get(idParam);
    if (!data) {
      return c.json({ message: "Category not found" }, 404);
    }

    const result = await categoryService.deleteCategory(data.id);

    return c.json({
      message: "Susscessfully delete category",
      result,
    });
  }
);

export { categoriesRoute };
