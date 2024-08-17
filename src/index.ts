import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";

import { registerRoute } from "./routes/register";
import { userRoute } from "./users/route";
import { loginRoute } from "./routes/login";
import { recipesRoute } from "./routes/recipes";
import { categories } from "./routes/categories";

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
app.doc31("/api-spec", {
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

app.route("/auth/login", loginRoute);
app.route("/auth/register", registerRoute);
app.route("/users", userRoute);
app.route("/recipes", recipesRoute);
app.route("/categories", categories);

// SWAGGER UI
app.get("/ui", swaggerUI({ url: "/api-spec" }));

export default app;
