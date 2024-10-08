import { OpenAPIHono } from "@hono/zod-openapi";
import * as categoryService from "./service";
import {
  QueryCategorySchema,
  DetailCategorySchema,
  CategorySlugSchema,
  CategoryByIdSchema,
  CategorySchema,
} from "./schema";
import { z } from "zod";
import { checkUserToken } from "../../middleware/check-user-token";
const API_TAG = ["Categories"];

const categoriesRoute = new OpenAPIHono();

categoriesRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

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
    path: "/{slug}",
    description: "Get detail category by slug ",
    request: {
      params: CategorySlugSchema,
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
    const categoryParam = c.req.param("slug")!;
    const data = await categoryService.getCategory(categoryParam);

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
    const data = await categoryService.getCategoryById(idParam);

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
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
    request: {
      params: CategoryByIdSchema,
      body: {
        content: {
          "application/json": {
            schema: CategorySchema,
          },
        },
      },
    },
    description: "Update category by id.",
    responses: {
      201: {
        description: "Successfully update category.",
      },
      404: {
        description: "Category not found.",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const id = c.req.param("id")!;

    const categoryById = await categoryService.getCategoryById(id);

    if (!categoryById) {
      return c.json(
        {
          code: 404,
          status: "error",
          message: "Category not found.",
        },
        404
      );
    }

    const body: z.infer<typeof CategorySchema> = await c.req.json();
    const updatedCategory = await categoryService.updateCategory(id, body);

    return c.json(
      {
        code: 201,
        status: "success",
        updatedCategory,
      },
      201
    );
  }
);

categoriesRoute.openapi(
  {
    method: "delete",
    path: "/{id}",
    middleware: checkUserToken(),
    security: [
      {
        AuthorizationBearer: [],
      },
    ],
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
    const data = await categoryService.getCategoryById(idParam);
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

categoriesRoute.openapi(
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
            schema: CategorySchema,
          },
        },
      },
    },
    description: "Create new category",
    responses: {
      201: {
        description: "Successfully create new category.",
      },
    },
    tags: API_TAG,
  },
  async (c) => {
    const body: z.infer<typeof CategorySchema> = await c.req.json();
    const newCategory = await categoryService.create(body);

    return c.json(
      {
        code: 201,
        status: "success",
        newCategory,
      },
      201
    );
  }
);
export { categoriesRoute };
