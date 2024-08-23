import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";

import { registerRoute } from "./routes/register";
import { usersRoute } from "./modules/users/route";
import { authRoute } from "./modules/auth/auth.route";
import { recipesRoute } from "./modules/recipes/route";
import { categoriesRoute } from "./modules/categories/route";

type Bindings = {
  TOKEN: string;
};

type Variables = {
  user: {
    id: string;
  };
};

export type HonoApp = { Bindings: Bindings; Variables: Variables };

const app = new OpenAPIHono({ strict: false });

app.use("*", cors());

// OPEN API
app.doc31("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "MasakMudah REST API",
    description:
      "MasakMudah provides access to a large collection of recipe.\n\nIt allows users to search for recipe, retrieve recipe details, and publish own recipe also saving another user recipe.",
  },
});

// SECURITY SCHEMES
app.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  }
);

app.get("/", (c) => {
  return c.json({
    Message: "API Masak Mudah",
    registeURL: "/auth/register",
    loginURL: "/auth/login",
    usersURL: "/users",
    recipesURL: "/recipes",
    categoriesURL: "/categories",
    swaggerURL: "/ui",
  });
});

app.route("/auth", authRoute);
app.route("/users", usersRoute);
app.route("/recipes", recipesRoute);
app.route("/categories", categoriesRoute);

// SWAGGER UI
app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
